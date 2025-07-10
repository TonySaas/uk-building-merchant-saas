-- Create a simple function to import a single NMBS supplier
CREATE OR REPLACE FUNCTION public.add_nmbs_supplier(
    supplier_name text,
    supplier_website text
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
    supplier_slug text;
BEGIN
    -- Create slug from name
    supplier_slug := lower(trim(regexp_replace(supplier_name, '[^a-zA-Z0-9\s-]', '', 'g')));
    supplier_slug := regexp_replace(supplier_slug, '\s+', '-', 'g');
    supplier_slug := regexp_replace(supplier_slug, '-+', '-', 'g');
    supplier_slug := trim(supplier_slug, '-');
    
    -- Check if supplier exists
    SELECT id INTO existing_supplier_id FROM suppliers WHERE suppliers.supplier_name = add_nmbs_supplier.supplier_name;
    
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
            add_nmbs_supplier.supplier_name,
            supplier_slug,
            'NMBS affiliated supplier providing building materials and related products.',
            CASE 
                WHEN supplier_website LIKE 'http%' THEN supplier_website
                ELSE 'https://' || supplier_website
            END,
            'United Kingdom',
            true,
            now(),
            now()
        ) RETURNING id INTO new_supplier_id;
    ELSE
        new_supplier_id := existing_supplier_id;
    END IF;
    
    -- Add organization affiliation if not exists
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
                'data_source', 'function_import',
                'import_date', now()::text,
                'supplier_name', add_nmbs_supplier.supplier_name
            ),
            now(),
            now()
        );
    END IF;
    
    RETURN jsonb_build_object(
        'success', true,
        'supplier_id', new_supplier_id,
        'supplier_name', add_nmbs_supplier.supplier_name,
        'action', CASE WHEN existing_supplier_id IS NULL THEN 'created' ELSE 'existed' END,
        'slug', supplier_slug
    );
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.add_nmbs_supplier(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.add_nmbs_supplier(text, text) TO anon;
