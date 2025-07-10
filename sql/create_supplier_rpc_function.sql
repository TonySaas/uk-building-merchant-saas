-- Create RPC function to upload suppliers with organization affiliations
-- This function bypasses RLS policies and creates both supplier and affiliation records

CREATE OR REPLACE FUNCTION create_supplier_with_affiliation(
    p_supplier_name text,
    p_slug text,
    p_description text,
    p_website text,
    p_organization_id uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    new_supplier_id uuid;
    existing_supplier_id uuid;
    affiliation_exists boolean;
    result jsonb;
BEGIN
    -- Check if supplier already exists
    SELECT id INTO existing_supplier_id 
    FROM suppliers 
    WHERE supplier_name = p_supplier_name;
    
    IF existing_supplier_id IS NOT NULL THEN
        new_supplier_id := existing_supplier_id;
        
        -- Check if affiliation already exists
        SELECT EXISTS(
            SELECT 1 FROM supplier_organization_affiliations 
            WHERE supplier_id = new_supplier_id 
            AND organization_id = p_organization_id
        ) INTO affiliation_exists;
        
        IF affiliation_exists THEN
            result := jsonb_build_object(
                'success', true,
                'message', 'Supplier and affiliation already exist',
                'supplier_id', new_supplier_id,
                'action', 'skipped'
            );
            RETURN result;
        END IF;
    ELSE
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
            p_description,
            p_website,
            'United Kingdom',
            true,
            now(),
            now()
        ) RETURNING id INTO new_supplier_id;
    END IF;
    
    -- Create organization affiliation
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
        p_organization_id,
        'member',
        'active',
        now(),
        jsonb_build_object(
            'membership_type', 'supplier',
            'trading_status', 'active',
            'data_source', 'csv_import_2025_01_08',
            'website', p_website,
            'import_notes', 'Imported from NMBS_Suppliers_Names_Websites_306.csv via RPC function'
        ),
        now(),
        now()
    ) ON CONFLICT (supplier_id, organization_id) DO NOTHING;
    
    result := jsonb_build_object(
        'success', true,
        'message', 'Supplier and affiliation created successfully',
        'supplier_id', new_supplier_id,
        'supplier_name', p_supplier_name,
        'organization_id', p_organization_id,
        'action', CASE WHEN existing_supplier_id IS NOT NULL THEN 'affiliation_added' ELSE 'created' END
    );
    
    RETURN result;
END;
$$;