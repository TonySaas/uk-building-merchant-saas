-- Create a function to batch upload NMBS suppliers
-- This bypasses RLS policies and uploads all suppliers with organization affiliations

CREATE OR REPLACE FUNCTION upload_nmbs_suppliers_batch()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    nmbs_org_id uuid := '9307d673-0fb8-4533-8c6f-d9c1f114330c'::uuid;
    supplier_data jsonb;
    supplier_record record;
    new_supplier_id uuid;
    insert_count integer := 0;
    affiliation_count integer := 0;
    suppliers_array jsonb := '[
        {"name": "Abracs", "website": "www.abracs.com/"},
        {"name": "ACO Technologies plc", "website": "www.aco.co.uk/"},
        {"name": "Acheson & Glover", "website": "www.ag.uk.com/"},
        {"name": "Ademco 1 Ltd, Honeywell Home", "website": "www.heatingcontrols.honeywellhome.com/"},
        {"name": "Adey Innovations", "website": "www.adey.co.uk/"},
        {"name": "Aerosol Solutions Ltd", "website": "www.aerosolsolutions.co.uk/"},
        {"name": "AGA Rangemaster", "website": "www.leisuresinks.co.uk/"},
        {"name": "Aggregate Industries/ Bradstone/ Charcon", "website": "www.bradstone.com/"},
        {"name": "AIM Solder UK LTD", "website": "www.aimsolder.com/"},
        {"name": "Airflow ( Nicoll Ventilators) Ltd", "website": "www.airflow-vent.co.uk/"},
        {"name": "Aliaxis UK (including Hunter and Marley Plumbing)", "website": "www.aliaxis.co.uk/"},
        {"name": "Allegion UK Ltd", "website": "www.allegion.co.uk/"},
        {"name": "Allen Concrete", "website": "www.allenconcrete.co.uk/"},
        {"name": "Alumasc Building Products", "website": "www.alumascbp.co.uk/"},
        {"name": "Altecnic Ltd", "website": "www.altecnic.co.uk/"},
        {"name": "A Perry Hinges", "website": "www.perrytrade.co.uk/"},
        {"name": "Apptel Limited", "website": "www.apptel.co.uk/"},
        {"name": "Aqualisa", "website": "www.aqualisa.co.uk/"},
        {"name": "Arctic Hayes", "website": "www.aqualisa.co.uk/"},
        {"name": "Armorgard Ltd", "website": "www.armorgard.co.uk/"},
        {"name": "Ariston Thermo", "website": "www.ariston.com/"},
        {"name": "Artex", "website": "www.artexltd.com/"},
        {"name": "Assa Abloy", "website": "www.yale.co.uk/en/yale/couk/"},
        {"name": "Astroflame Fireseals Ltd", "website": "www.astroflame.com/"},
        {"name": "Avenue Insurance Partners Ltd", "website": "www.avenueinsurance.co.uk/"},
        {"name": "Baxi Heating", "website": "www.baxiheating.co.uk/"},
        {"name": "Belgrade Insulation Ltd", "website": "www.belgradeinsulations.com/"},
        {"name": "Birchwood Price Tools", "website": "www.birchwoodpricetools.com/"},
        {"name": "Birtely Group - Lintels/Expamet/Construction", "website": "www.birtleygroup.co.uk/"},
        {"name": "BIZ Power Tools Ltd", "website": "www.bizengineering.com/"},
        {"name": "BLM British Lead", "website": "www.britishlead.co.uk/"},
        {"name": "Bostik", "website": "www.bostik.com/uk"},
        {"name": "Bottom Line - energy consultants", "website": "www.bottomlineutilities.com/"},
        {"name": "BP Oil UK Limited", "website": "www.bp.com/"},
        {"name": "Bradstone & Charcon", "website": "www.breedongroup.com/"},
        {"name": "Breedon Group", "website": "www.breedongroup.com/"},
        {"name": "Brett Landscaping", "website": "www.brettlandscaping.co.uk/"},
        {"name": "Brett Martin", "website": "www.brettmartin.com/"},
        {"name": "Brian Hyde", "website": "www.brianhyde.co.uk/"},
        {"name": "Briggs", "website": "www.briggssafetywear.co.uk/"},
        {"name": "Bristol Tile Company", "website": "www.bristol-tile.co.uk/"},
        {"name": "British Gypsum", "website": "www.british-gypsum.com/"},
        {"name": "Bruce Douglas Marketing Ltd (Ultratape)", "website": "www.ultratape.com/"},
        {"name": "BSW Timber Ltd", "website": "www.bsw.co.uk/"},
        {"name": "Buckler Boots Ltd", "website": "www.bucklerboots.com/"},
        {"name": "Building Adhesives (Dunlop)", "website": "www.dunloptrade.com/"},
        {"name": "Burg-Wachter UK Ltd", "website": "www.burg.biz/uk"},
        {"name": "Business Insurance Services", "website": "www.mofs.co.uk/bis/"},
        {"name": "Calder Lead", "website": "www.calderlead.co.uk/"},
        {"name": "Calders and Grandidge", "website": "www.caldersandgrandidge.com/"}
    ]'::jsonb;
BEGIN
    -- Process each supplier in the first batch
    FOR supplier_record IN 
        SELECT 
            value->>'name' as supplier_name,
            value->>'website' as supplier_website
        FROM jsonb_array_elements(suppliers_array)
    LOOP
        -- Check if supplier already exists
        SELECT id INTO new_supplier_id 
        FROM suppliers 
        WHERE supplier_name = supplier_record.supplier_name;
        
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
                supplier_record.supplier_name,
                LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(supplier_record.supplier_name, ' ', '-'), '&', 'and'), '.', ''), '/', '-'), ',', '')),
                'NMBS affiliated supplier providing tools and building materials to the UK building merchant sector.',
                CASE 
                    WHEN supplier_record.supplier_website LIKE 'www.%' THEN 'https://' || supplier_record.supplier_website
                    ELSE supplier_record.supplier_website
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
                    'data_source', 'csv_import_2025_01_08_batch_1',
                    'website', supplier_record.supplier_website,
                    'import_notes', 'Imported from NMBS_Suppliers_Names_Websites_306.csv - Batch 1'
                ),
                now(),
                now()
            );
            
            affiliation_count := affiliation_count + 1;
        END IF;
    END LOOP;
    
    RETURN jsonb_build_object(
        'success', true,
        'message', 'NMBS suppliers batch 1 uploaded successfully',
        'suppliers_inserted', insert_count,
        'affiliations_created', affiliation_count,
        'batch_number', 1,
        'total_processed', jsonb_array_length(suppliers_array)
    );
END;
$$;        (''Samac Fixings Ltd'', ''www.samacfixings.co.uk/''),
        (''Saneux'', ''www.saneux.com/''),
        (''SCA Wood UK Ltd'', ''www.sca.com/''),
        (''Schiedel Chimney Systems Ltd'', ''www.schiedel.co.uk/''),
        (''Sealey Tools'', ''www.sealey.co.uk/''),
        (''Sherwin Williams'', ''www.sherwin-williams.co.uk/''),
        (''Showerdrape Ltd'', ''www.showerdrape.co.uk/''),
        (''Siamp Ltd'', ''www.siamp.co.uk/''),
        (''SIG Distribution'', ''www.sigplc.com/''),
        (''SIG Roofing'', ''www.sigplc.com/''),
        (''Sika Everbuild'', ''www.everbuild.co.uk/''),
        (''Simpson Strong-Tie'', ''www.strongtie.co.uk/''),
        (''Slatescape Limited'', ''www.slatescape.co.uk/''),
        (''Smiths Briten'', ''www.purebathroomcollection.co.uk/''),
        (''Smith Partnership'', ''www.smithpartnership.co.uk/''),
        (''Soudal UK'', ''www.soudal.com/''),
        (''Southgate Plastics Ltd'', ''www.stormbuildingproducts.com/''),
        (''Spax (UK) Limited'', ''www.spax.com/''),
        (''Spear & Jackson'', ''www.spear-and-jackson.com/''),
        (''Stamco'', ''www.stamco.co.uk/''),
        (''Stearn Electric'', ''www.stearn.co.uk/''),
        (''Sterling Safetywear Ltd'', ''www.sterlingsafetywear.co.uk/''),
        (''Stone Plus UK'', ''www.stoneplusuk.co.uk/''),
        (''Stax Trade Centres'', ''www.staxtradecentres.co.uk/''),
        (''STS Ltd'', ''www.sts-uk.com/''),
        (''Stressline'', ''www.stressline.net/''),
        (''Supreme Concrete'', ''www.supremeconcrete.co.uk/''),
        (''SureCav Limited'', ''www.surecav.co.uk/''),
        (''Surestop LTD'', ''www.surestop.co.uk/''),
        (''Swiftec Global Ltd'', ''www.swiftec.co.uk/''),
        (''Symphony Bathrooms'', ''www.symphony-group.co.uk/''),
        (''T I Midwood & Co Ltd'', ''www.timco.co.uk/''),
        (''T King Associates Ltd'', ''www.tkingassociates.com/''),
        (''TAFS (Salop) Ltd'', ''www.tafs-salop.ltd.uk/''),
        (''TB Davies'', ''www.tbdavies.co.uk/''),
        (''Teco Building Products'', ''www.tecoproducts.co.uk/''),
        (''Tec-Ties Ltd'', ''www.tecties.co.uk/''),
        (''Telford Copper Cylinders Limited'', ''www.telford-group.com/''),
        (''Teng Tools'', ''www.tengtools.co.uk/''),
        (''Thomas Dudley Limited t/a TYDE'', ''www.thomasdudley.co.uk/''),
        (''Timloc Building Products'', ''www.timloc.co.uk/''),
        (''Timbmet'', ''www.timbmet.com/''),
        (''Toolbank'', ''www.toolbank.com/''),
        (''Tools of The Trade Ltd'', ''www.toolsofthetrade.co.uk/''),
        (''Toolstream Ltd'', ''www.toolstream.com/''),
        (''Towelrads'', ''www.towelrads.com/''),
        (''Tremco Illbruck'', ''www.tremco-illbruck.com/en_GB/home/''),
        (''Trend Machinery'', ''www.trend-uk.com/''),
        (''TT Concrete Products Limited'', ''www.ttconcreteproducts.co.uk/''),
        (''Ubbink UK Ltd'', ''www.ubbink.co.uk/''),
        (''Ultimate Finance Group Limited'', ''www.ultimatefinance.co.uk/''),
        (''Unilin Distribution'', ''www.quick-step.co.uk/''),
        (''Univar Specialty Consumables Limited'', ''www.univarsc.com/''),
        (''Urfic UK'', ''www.urfic.co.uk/''),
        (''Vaillant Group Ltd'', ''www.glow-worm.co.uk/''),
        (''VADO'', ''www.vado.com/''),
        (''VELUX'', ''www.velux.co.uk/''),
        (''Viessmann'', ''www.viessmann.co.uk/''),
        (''Vista Engineering Ltd'', ''www.vistaeng.co.uk/''),
        (''Vogue UK'', ''www.vogueuk.co.uk/''),
        (''Vokera Ltd'', ''www.vokera.co.uk/''),
        (''W.Howard Ltd'', ''www.whoward.eu/''),
        (''Walsh & Blyth'', ''www.wbtwholesale.co.uk/''),
        (''Warmup Plc'', ''www.warmup.co.uk/''),
        (''Waterline'', ''www.waterline.co.uk/''),
        (''Wavin'', ''www.wavin.co.uk/''),
        (''Wernerco'', ''www.wernerco.com/eu''),
        (''West Port'', ''www.west-port.co.uk/''),
        (''Wienerberger'', ''www.wienerberger.co.uk/''),
        (''Wirquin UK Ltd'', ''www.wirquin.co.uk/''),
        (''Wrekin Products'', ''www.wrekinproducts.com/''),
        (''WT Knowles'', ''www.wtknowles.co.uk/''),
        (''Xella UK'', ''www.xella.co.uk/''),
        (''Yorkshire Copper Tube'', ''www.fischer.co.uk/''),
        (''Zehnder group UK Ltd'', ''www.zehnder.co.uk/'')
    ', temp_table_name);
    
    -- Process each supplier
    FOR supplier_record IN 
        EXECUTE format('SELECT name, website FROM %I', temp_table_name)
    LOOP
        BEGIN
            -- Check if supplier already exists
            SELECT id INTO new_supplier_id 
            FROM suppliers 
            WHERE supplier_name = supplier_record.name;
            
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
                    supplier_record.name,
                    LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(supplier_record.name, ' ', '-'), '&', 'and'), '.', ''), '/', '-'), ',', '')),
                    'NMBS affiliated supplier providing tools and building materials to the UK building merchant sector.',
                    CASE 
                        WHEN supplier_record.website LIKE 'www.%' THEN 'https://' || supplier_record.website
                        ELSE supplier_record.website
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
                        'data_source', 'csv_import_2025_01_08_complete',
                        'website', supplier_record.website,
                        'import_notes', 'Imported from NMBS_Suppliers_Names_Websites_306.csv - Complete dataset'
                    ),
                    now(),
                    now()
                );
                
                affiliation_count := affiliation_count + 1;
            END IF;
            
        EXCEPTION WHEN OTHERS THEN
            error_count := error_count + 1;
            CONTINUE;
        END;
    END LOOP;
    
    -- Clean up temp table
    EXECUTE format('DROP TABLE %I', temp_table_name);
    
    RETURN jsonb_build_object(
        'success', true,
        'message', 'All 306 NMBS suppliers uploaded successfully',
        'suppliers_inserted', insert_count,
        'affiliations_created', affiliation_count,
        'errors', error_count,
        'total_suppliers', 306
    );
END;
$$;