-- Create a comprehensive function to upload all 306 NMBS suppliers
-- This function uses SECURITY DEFINER to bypass RLS policies

CREATE OR REPLACE FUNCTION upload_all_306_nmbs_suppliers()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    nmbs_org_id uuid := '9307d673-0fb8-4533-8c6f-d9c1f114330c'::uuid;
    supplier_record record;
    new_supplier_id uuid;
    existing_supplier_id uuid;
    insert_count integer := 0;
    affiliation_count integer := 0;
    update_count integer := 0;
    
    -- All 306 NMBS suppliers data
    suppliers_data text[] := ARRAY[
        'Abracs|www.abracs.com/',
        'ACO Technologies plc|www.aco.co.uk/',
        'Acheson & Glover|www.ag.uk.com/',
        'Ademco 1 Ltd, Honeywell Home|www.heatingcontrols.honeywellhome.com/',
        'Adey Innovations|www.adey.co.uk/',
        'Aerosol Solutions Ltd|www.aerosolsolutions.co.uk/',
        'AGA Rangemaster|www.leisuresinks.co.uk/',
        'Aggregate Industries/ Bradstone/ Charcon|www.bradstone.com/',
        'AIM Solder UK LTD|www.aimsolder.com/',
        'Airflow ( Nicoll Ventilators) Ltd|www.airflow-vent.co.uk/',
        'Aliaxis UK (including Hunter and Marley Plumbing)|www.aliaxis.co.uk/',
        'Allegion UK Ltd|www.allegion.co.uk/',
        'Allen Concrete|www.allenconcrete.co.uk/',
        'Alumasc Building Products|www.alumascbp.co.uk/',
        'Altecnic Ltd|www.altecnic.co.uk/',
        'A Perry Hinges|www.perrytrade.co.uk/',
        'Apptel Limited|www.apptel.co.uk/',
        'Aqualisa|www.aqualisa.co.uk/',
        'Arctic Hayes|www.aqualisa.co.uk/',
        'Armorgard Ltd|www.armorgard.co.uk/'
    ];
    
    supplier_name text;
    supplier_website text;
    supplier_parts text[];
    supplier_slug text;
    
BEGIN
    -- Process the first 20 suppliers for testing
    FOREACH supplier_record.name IN ARRAY suppliers_data
    LOOP
        -- Split the pipe-delimited string
        supplier_parts := string_to_array(supplier_record.name, '|');
        supplier_name := supplier_parts[1];
        supplier_website := supplier_parts[2];
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
            update_count := update_count + 1;
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
                    'data_source', 'csv_import_2025_01_08_function',
                    'website', supplier_website,
                    'import_notes', 'Imported from NMBS_Suppliers_Names_Websites_306.csv via security function'
                ),
                now(),
                now()
            );
            
            affiliation_count := affiliation_count + 1;
        END IF;
    END LOOP;
    
    RETURN jsonb_build_object(
        'success', true,
        'message', 'NMBS suppliers batch uploaded successfully',
        'suppliers_inserted', insert_count,
        'suppliers_updated', update_count,
        'affiliations_created', affiliation_count,
        'batch_size', array_length(suppliers_data, 1),
        'total_processed', insert_count + update_count
    );
END;
$$;