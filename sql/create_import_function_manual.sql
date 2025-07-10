-- Manual SQL to create supplier import function
-- Execute this in Supabase SQL Editor

CREATE OR REPLACE FUNCTION public.import_supplier_with_nmbs_affiliation(
    p_supplier_name text,
    p_slug text,
    p_supplier_description text,
    p_supplier_website text,
    p_country text DEFAULT 'United Kingdom'
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    nmbs_org_id uuid := '9307d673-0fb8-4533-8c6f-d9c1f114330c'::uuid;
    new_supplier_id uuid;
    existing_supplier_id uuid;
    affiliation_exists boolean := false;
BEGIN
    -- Check if supplier already exists
    SELECT id INTO existing_supplier_id 
    FROM suppliers 
    WHERE supplier_name = p_supplier_name;
    
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
            p_supplier_name,
            p_slug,
            p_supplier_description,
            p_supplier_website,
            p_country,
            true,
            now(),
            now()
        ) RETURNING id INTO new_supplier_id;
    ELSE
        new_supplier_id := existing_supplier_id;
        
        -- Update website if provided
        UPDATE suppliers 
        SET supplier_website = p_supplier_website,
            updated_at = now()
        WHERE id = existing_supplier_id;
    END IF;
    
    -- Check if NMBS affiliation already exists
    SELECT EXISTS(
        SELECT 1 FROM supplier_organization_affiliations 
        WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id
    ) INTO affiliation_exists;
    
    -- Create NMBS affiliation if it doesn't exist
    IF NOT affiliation_exists THEN
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
                'data_source', 'function_import_2025_01_08',
                'import_method', 'single_supplier_function',
                'supplier_name', p_supplier_name
            ),
            now(),
            now()
        );
    END IF;
    
    -- Return result
    RETURN jsonb_build_object(
        'success', true,
        'supplier_id', new_supplier_id,
        'supplier_name', p_supplier_name,
        'status', CASE WHEN existing_supplier_id IS NULL THEN 'created' ELSE 'updated' END,
        'affiliation_status', CASE WHEN affiliation_exists THEN 'already_existed' ELSE 'created' END,
        'message', 'Supplier imported with NMBS affiliation'
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object(
        'success', false,
        'error', SQLERRM,
        'supplier_name', p_supplier_name
    );
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.import_supplier_with_nmbs_affiliation(text, text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.import_supplier_with_nmbs_affiliation(text, text, text, text, text) TO anon;
