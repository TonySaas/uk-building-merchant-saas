-- Simple function to test uploading 10 NMBS suppliers
-- This uses SECURITY DEFINER to bypass RLS policies

CREATE OR REPLACE FUNCTION test_upload_10_nmbs_suppliers()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    nmbs_org_id uuid := '9307d673-0fb8-4533-8c6f-d9c1f114330c'::uuid;
    new_supplier_id uuid;
    existing_supplier_id uuid;
    insert_count integer := 0;
    affiliation_count integer := 0;
    
    -- First 10 suppliers for testing
    suppliers_list text[][] := ARRAY[
        ARRAY['Abracs', 'www.abracs.com/'],
        ARRAY['ACO Technologies plc', 'www.aco.co.uk/'],
        ARRAY['Acheson & Glover', 'www.ag.uk.com/'],
        ARRAY['Adey Innovations', 'www.adey.co.uk/'],
        ARRAY['AGA Rangemaster', 'www.leisuresinks.co.uk/'],
        ARRAY['Armorgard Ltd', 'www.armorgard.co.uk/'],
        ARRAY['British Gypsum', 'www.british-gypsum.com/'],
        ARRAY['Draper Tools', 'www.drapertools.com/'],
        ARRAY['Makita UK Ltd', 'www.makitauk.com/'],
        ARRAY['Sealey Tools', 'www.sealey.co.uk/']
    ];
    
    supplier_name text;
    supplier_website text;
    supplier_slug text;
    i integer;
    
BEGIN
    -- Process each supplier
    FOR i IN 1..array_length(suppliers_list, 1)
    LOOP
        supplier_name := suppliers_list[i][1];
        supplier_website := suppliers_list[i][2];
        supplier_slug := LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(supplier_name, ' ', '-'), '&', 'and'), '.', ''), '/', '-'), ',', ''));
        
        -- Check if supplier already exists
        SELECT id INTO existing_supplier_id 
        FROM suppliers 
        WHERE supplier_name = supplier_name;
        
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
                supplier_name,
                supplier_slug,
                'NMBS affiliated supplier providing tools and building materials to the UK building merchant sector.',
                CASE 
                    WHEN supplier_website LIKE 'www.%' THEN 'https://' || supplier_website
                    ELSE supplier_website
                END,
                'United Kingdom',
                true,
                now(),
                now()
            ) RETURNING id INTO new_supplier_id;
            
            insert_count := insert_count + 1;
        ELSE
            new_supplier_id := existing_supplier_id;
        END IF;
        
        -- Create organization affiliation if it doesn't exist
        IF NOT EXISTS (
            SELECT 1 FROM supplier_organization_affiliations 
            WHERE supplier_id = new_supplier_id 
            AND organization_id = nmbs_org_id
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
                    'data_source', 'test_function_2025_01_08',
                    'website', supplier_website,
                    'import_notes', 'Test import of 10 NMBS suppliers'
                ),
                now(),
                now()
            );
            
            affiliation_count := affiliation_count + 1;
        END IF;
    END LOOP;
    
    RETURN json_build_object(
        'success', true,
        'message', '10 NMBS test suppliers uploaded successfully',
        'suppliers_inserted', insert_count,
        'affiliations_created', affiliation_count,
        'total_processed', array_length(suppliers_list, 1)
    );
END;
$$;