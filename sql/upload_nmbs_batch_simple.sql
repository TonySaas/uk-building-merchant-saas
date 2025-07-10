-- Create a function to upload NMBS suppliers in smaller batches to avoid size limits
-- This function processes 50 suppliers at a time

CREATE OR REPLACE FUNCTION upload_nmbs_suppliers_batch_50()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    nmbs_org_id uuid := '9307d673-0fb8-4533-8c6f-d9c1f114330c'::uuid;
    supplier_record record;
    new_supplier_id uuid;
    insert_count integer := 0;
    affiliation_count integer := 0;
    
    -- First batch of 50 suppliers
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
        'Armorgard Ltd|www.armorgard.co.uk/',
        'Ariston Thermo|www.ariston.com/',
        'Artex|www.artexltd.com/',
        'Assa Abloy|www.yale.co.uk/en/yale/couk/',
        'Astroflame Fireseals Ltd|www.astroflame.com/',
        'Avenue Insurance Partners Ltd|www.avenueinsurance.co.uk/',
        'Baxi Heating|www.baxiheating.co.uk/',
        'Belgrade Insulation Ltd|www.belgradeinsulations.com/',
        'Birchwood Price Tools|www.birchwoodpricetools.com/',
        'Birtely Group - Lintels/Expamet/Construction|www.birtleygroup.co.uk/',
        'BIZ Power Tools Ltd|www.bizengineering.com/',
        'BLM British Lead|www.britishlead.co.uk/',
        'Bostik|www.bostik.com/uk',
        'Bottom Line - energy consultants|www.bottomlineutilities.com/',
        'BP Oil UK Limited|www.bp.com/',
        'Bradstone & Charcon|www.breedongroup.com/',
        'Breedon Group|www.breedongroup.com/',
        'Brett Landscaping|www.brettlandscaping.co.uk/',
        'Brett Martin|www.brettmartin.com/',
        'Brian Hyde|www.brianhyde.co.uk/',
        'Briggs|www.briggssafetywear.co.uk/',
        'Bristol Tile Company|www.bristol-tile.co.uk/',
        'British Gypsum|www.british-gypsum.com/',
        'Bruce Douglas Marketing Ltd (Ultratape)|www.ultratape.com/',
        'BSW Timber Ltd|www.bsw.co.uk/',
        'Buckler Boots Ltd|www.bucklerboots.com/',
        'Building Adhesives (Dunlop)|www.dunloptrade.com/',
        'Burg-Wachter UK Ltd|www.burg.biz/uk',
        'Business Insurance Services|www.mofs.co.uk/bis/',
        'Calder Lead|www.calderlead.co.uk/',
        'Calders and Grandidge|www.caldersandgrandidge.com/'
    ];
    
    supplier_name text;
    supplier_website text;
    supplier_parts text[];
    
BEGIN
    -- Process each supplier string
    FOREACH supplier_record.name IN ARRAY suppliers_data
    LOOP
        -- Split the pipe-delimited string
        supplier_parts := string_to_array(supplier_record.name, '|');
        supplier_name := supplier_parts[1];
        supplier_website := supplier_parts[2];
        
        -- Check if supplier already exists
        SELECT id INTO new_supplier_id 
        FROM suppliers 
        WHERE supplier_name = supplier_name;
        
        IF new_supplier_id IS NULL THEN
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
                LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(supplier_name, ' ', '-'), '&', 'and'), '.', ''), '/', '-'), ',', '')),
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
                    'data_source', 'csv_import_2025_01_08_batch_50',
                    'website', supplier_website,
                    'import_notes', 'Imported from NMBS_Suppliers_Names_Websites_306.csv - Batch 1 of 7'
                ),
                now(),
                now()
            );
            
            affiliation_count := affiliation_count + 1;
        END IF;
    END LOOP;
    
    RETURN jsonb_build_object(
        'success', true,
        'message', 'NMBS suppliers batch 1 (50 suppliers) uploaded successfully',
        'suppliers_inserted', insert_count,
        'affiliations_created', affiliation_count,
        'batch_number', 1,
        'total_processed', array_length(suppliers_data, 1)
    );
END;
$$;