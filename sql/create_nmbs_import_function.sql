-- Create function to import NMBS suppliers in batch
CREATE OR REPLACE FUNCTION public.import_nmbs_supplier_batch(
    supplier_data jsonb[]
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    nmbs_org_id uuid := '9307d673-0fb8-4533-8c6f-d9c1f114330c'::uuid;
    supplier_record jsonb;
    new_supplier_id uuid;
    existing_supplier_id uuid;
    supplier_count integer := 0;
    affiliation_count integer := 0;
    skipped_count integer := 0;
    processed_suppliers jsonb[] := '{}';
BEGIN
    -- Loop through each supplier in the batch
    FOREACH supplier_record IN ARRAY supplier_data
    LOOP
        -- Check if supplier already exists
        SELECT id INTO existing_supplier_id 
        FROM suppliers 
        WHERE supplier_name = (supplier_record->>'supplier_name');
        
        IF existing_supplier_id IS NULL THEN
            -- Insert new supplier
            INSERT INTO suppliers (
                supplier_name, 
                slug, 
                supplier_description, 
                supplier_website, 
                country, 
                is_active, 
                created_at, 
                updated_at
            ) VALUES (
                supplier_record->>'supplier_name',
                supplier_record->>'slug',
                supplier_record->>'supplier_description',
                supplier_record->>'supplier_website',
                COALESCE(supplier_record->>'country', 'United Kingdom'),
                COALESCE((supplier_record->>'is_active')::boolean, true),
                now(),
                now()
            ) RETURNING id INTO new_supplier_id;
            
            supplier_count := supplier_count + 1;
        ELSE
            new_supplier_id := existing_supplier_id;
            skipped_count := skipped_count + 1;
            
            -- Update website if provided
            IF supplier_record->>'supplier_website' IS NOT NULL THEN
                UPDATE suppliers 
                SET supplier_website = supplier_record->>'supplier_website',
                    updated_at = now()
                WHERE id = existing_supplier_id;
            END IF;
        END IF;
        
        -- Create organization affiliation if it doesn't exist
        IF NOT EXISTS (
            SELECT 1 FROM supplier_organization_affiliations 
            WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id
        ) THEN
            INSERT INTO supplier_organization_affiliations (
                supplier_id, 
                organization_id, 
                affiliation_type, 
                status, 
                joined_date, 
                organization_specific_data, 
                created_at, 
                updated_at
            ) VALUES (
                new_supplier_id,
                nmbs_org_id,
                'member',
                'active',
                now(),
                jsonb_build_object(
                    'membership_type', 'supplier',
                    'trading_status', 'active',
                    'data_source', 'csv_import_2025_01_08',
                    'import_batch', 'nmbs_full_import',
                    'supplier_name', supplier_record->>'supplier_name'
                ),
                now(),
                now()
            );
            
            affiliation_count := affiliation_count + 1;
        END IF;
        
        -- Add to processed list
        processed_suppliers := processed_suppliers || jsonb_build_object(
            'supplier_name', supplier_record->>'supplier_name',
            'supplier_id', new_supplier_id,
            'status', CASE WHEN existing_supplier_id IS NULL THEN 'created' ELSE 'existing' END
        );
    END LOOP;
    
    RETURN jsonb_build_object(
        'success', true,
        'suppliers_created', supplier_count,
        'suppliers_skipped', skipped_count,
        'affiliations_created', affiliation_count,
        'total_processed', array_length(supplier_data, 1),
        'processed_suppliers', processed_suppliers,
        'total_nmbs_suppliers', (SELECT COUNT(*) FROM supplier_organization_affiliations WHERE organization_id = nmbs_org_id)
    );
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.import_nmbs_supplier_batch(jsonb[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.import_nmbs_supplier_batch(jsonb[]) TO anon;