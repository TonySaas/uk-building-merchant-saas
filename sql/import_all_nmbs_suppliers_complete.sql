-- Import All NMBS Suppliers with Organization Affiliations
-- Generated script to import all suppliers from CSV, excluding already imported ones

DO $$
DECLARE
    nmbs_org_id uuid := '9307d673-0fb8-4533-8c6f-d9c1f114330c'::uuid;
    new_supplier_id uuid;
    existing_supplier_id uuid;
    supplier_count integer := 0;
    skipped_count integer := 0;
    affiliation_count integer := 0;
BEGIN
    RAISE NOTICE 'Starting NMBS supplier import process...';

    -- Acheson & Glover
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Acheson & Glover';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Acheson & Glover', 'acheson-glover', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.ag.uk.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Acheson & Glover"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Ademco 1 Ltd, Honeywell Home
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Ademco 1 Ltd, Honeywell Home';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Ademco 1 Ltd, Honeywell Home', 'ademco-1-ltd-honeywell-home', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.heatingcontrols.honeywellhome.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Ademco 1 Ltd, Honeywell Home"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Adey Innovations
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Adey Innovations';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Adey Innovations', 'adey-innovations', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.adey.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Adey Innovations"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Aerosol Solutions Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Aerosol Solutions Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Aerosol Solutions Ltd', 'aerosol-solutions-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.aerosolsolutions.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Aerosol Solutions Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- AGA Rangemaster
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'AGA Rangemaster';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'AGA Rangemaster', 'aga-rangemaster', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.leisuresinks.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "AGA Rangemaster"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Aggregate Industries/ Bradstone/ Charcon
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Aggregate Industries/ Bradstone/ Charcon';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Aggregate Industries/ Bradstone/ Charcon', 'aggregate-industries-bradstone-charcon', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.bradstone.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Aggregate Industries/ Bradstone/ Charcon"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- AIM Solder UK LTD
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'AIM Solder UK LTD';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'AIM Solder UK LTD', 'aim-solder-uk-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.aimsolder.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "AIM Solder UK LTD"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Airflow ( Nicoll Ventilators) Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Airflow ( Nicoll Ventilators) Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Airflow ( Nicoll Ventilators) Ltd', 'airflow-nicoll-ventilators-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.airflow-vent.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Airflow ( Nicoll Ventilators) Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Aliaxis UK (including Hunter and Marley Plumbing)
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Aliaxis UK (including Hunter and Marley Plumbing)';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Aliaxis UK (including Hunter and Marley Plumbing)', 'aliaxis-uk-including-hunter-and-marley-plumbing', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.aliaxis.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Aliaxis UK (including Hunter and Marley Plumbing)"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Allegion UK Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Allegion UK Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Allegion UK Ltd', 'allegion-uk-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.allegion.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Allegion UK Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Allen Concrete
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Allen Concrete';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Allen Concrete', 'allen-concrete', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.allenconcrete.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Allen Concrete"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Alumasc Building Products
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Alumasc Building Products';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Alumasc Building Products', 'alumasc-building-products', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.alumascbp.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Alumasc Building Products"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Altecnic Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Altecnic Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Altecnic Ltd', 'altecnic-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.altecnic.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Altecnic Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- A Perry Hinges
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'A Perry Hinges';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'A Perry Hinges', 'a-perry-hinges', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.perrytrade.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "A Perry Hinges"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Apptel Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Apptel Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Apptel Limited', 'apptel-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.apptel.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Apptel Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Aqualisa
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Aqualisa';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Aqualisa', 'aqualisa', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.aqualisa.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Aqualisa"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Arctic Hayes
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Arctic Hayes';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Arctic Hayes', 'arctic-hayes', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.aqualisa.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Arctic Hayes"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Armorgard Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Armorgard Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Armorgard Ltd', 'armorgard-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.armorgard.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Armorgard Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Ariston Thermo
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Ariston Thermo';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Ariston Thermo', 'ariston-thermo', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.ariston.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Ariston Thermo"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Artex
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Artex';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Artex', 'artex', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.artexltd.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Artex"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Assa Abloy
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Assa Abloy';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Assa Abloy', 'assa-abloy', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.yale.co.uk/en/yale/couk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Assa Abloy"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Astroflame Fireseals Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Astroflame Fireseals Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Astroflame Fireseals Ltd', 'astroflame-fireseals-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.astroflame.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Astroflame Fireseals Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Avenue Insurance Partners Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Avenue Insurance Partners Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Avenue Insurance Partners Ltd', 'avenue-insurance-partners-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.avenueinsurance.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Avenue Insurance Partners Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Baxi Heating
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Baxi Heating';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Baxi Heating', 'baxi-heating', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.baxiheating.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Baxi Heating"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Belgrade Insulation Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Belgrade Insulation Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Belgrade Insulation Ltd', 'belgrade-insulation-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.belgradeinsulations.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Belgrade Insulation Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Birchwood Price Tools
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Birchwood Price Tools';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Birchwood Price Tools', 'birchwood-price-tools', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.birchwoodpricetools.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Birchwood Price Tools"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Birtely Group - Lintels/Expamet/Construction
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Birtely Group - Lintels/Expamet/Construction';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Birtely Group - Lintels/Expamet/Construction', 'birtely-group-lintelsexpametconstruction', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.birtleygroup.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Birtely Group - Lintels/Expamet/Construction"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- BIZ Power Tools Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'BIZ Power Tools Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'BIZ Power Tools Ltd', 'biz-power-tools-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.bizengineering.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "BIZ Power Tools Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- BLM British Lead
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'BLM British Lead';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'BLM British Lead', 'blm-british-lead', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.britishlead.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "BLM British Lead"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Bostik
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Bostik';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Bostik', 'bostik', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.bostik.com/uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Bostik"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Bottom Line - energy consultants
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Bottom Line - energy consultants';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Bottom Line - energy consultants', 'bottom-line-energy-consultants', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.bottomlineutilities.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Bottom Line - energy consultants"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- BP Oil UK Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'BP Oil UK Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'BP Oil UK Limited', 'bp-oil-uk-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.bp.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "BP Oil UK Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Bradstone & Charcon
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Bradstone & Charcon';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Bradstone & Charcon', 'bradstone-charcon', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.breedongroup.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Bradstone & Charcon"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Breedon Group
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Breedon Group';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Breedon Group', 'breedon-group', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.breedongroup.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Breedon Group"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Brett Landscaping
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Brett Landscaping';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Brett Landscaping', 'brett-landscaping', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.brettlandscaping.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Brett Landscaping"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Brett Martin
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Brett Martin';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Brett Martin', 'brett-martin', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.brettmartin.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Brett Martin"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Brian Hyde
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Brian Hyde';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Brian Hyde', 'brian-hyde', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.brianhyde.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Brian Hyde"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Briggs
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Briggs';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Briggs', 'briggs', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.briggssafetywear.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Briggs"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Bristol Tile Company
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Bristol Tile Company';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Bristol Tile Company', 'bristol-tile-company', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.bristol-tile.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Bristol Tile Company"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Bruce Douglas Marketing Ltd (Ultratape)
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Bruce Douglas Marketing Ltd (Ultratape)';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Bruce Douglas Marketing Ltd (Ultratape)', 'bruce-douglas-marketing-ltd-ultratape', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.ultratape.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Bruce Douglas Marketing Ltd (Ultratape)"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- BSW Timber Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'BSW Timber Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'BSW Timber Ltd', 'bsw-timber-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.bsw.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "BSW Timber Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Buckler Boots Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Buckler Boots Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Buckler Boots Ltd', 'buckler-boots-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.bucklerboots.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Buckler Boots Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Building Adhesives (Dunlop)
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Building Adhesives (Dunlop)';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Building Adhesives (Dunlop)', 'building-adhesives-dunlop', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.dunloptrade.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Building Adhesives (Dunlop)"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Burg-Wachter UK Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Burg-Wachter UK Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Burg-Wachter UK Ltd', 'burg-wachter-uk-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.burg.biz/uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Burg-Wachter UK Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Business Insurance Services
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Business Insurance Services';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Business Insurance Services', 'business-insurance-services', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.mofs.co.uk/bis', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Business Insurance Services"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Calder Lead
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Calder Lead';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Calder Lead', 'calder-lead', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.calderlead.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Calder Lead"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Calders and Grandidge
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Calders and Grandidge';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Calders and Grandidge', 'calders-and-grandidge', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.caldersandgrandidge.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Calders and Grandidge"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Carlisle Brass
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Carlisle Brass';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Carlisle Brass', 'carlisle-brass', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.carlislebrass.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Carlisle Brass"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Castacrete Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Castacrete Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Castacrete Ltd', 'castacrete-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.castacrete.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Castacrete Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Castle Brooke Tools
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Castle Brooke Tools';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Castle Brooke Tools', 'castle-brooke-tools', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.castlebrooke.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Castle Brooke Tools"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Catnic
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Catnic';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Catnic', 'catnic', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.catnic.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Catnic"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Cavity Trays Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Cavity Trays Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Cavity Trays Ltd', 'cavity-trays-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.cavitytrays.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Cavity Trays Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- CDA Group
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'CDA Group';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'CDA Group', 'cda-group', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.cda.eu', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "CDA Group"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Cellecta Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Cellecta Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Cellecta Limited', 'cellecta-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.cellecta.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Cellecta Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Cembrit
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Cembrit';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Cembrit', 'cembrit', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.cembrit.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Cembrit"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Cemex Concrete Products
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Cemex Concrete Products';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Cemex Concrete Products', 'cemex-concrete-products', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.cemex.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Cemex Concrete Products"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Centurion Europe Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Centurion Europe Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Centurion Europe Ltd', 'centurion-europe-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.centurioneurope.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Centurion Europe Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Ceramic Tile Distributors
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Ceramic Tile Distributors';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Ceramic Tile Distributors', 'ceramic-tile-distributors', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.ctdtiles.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Ceramic Tile Distributors"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Chain Products
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Chain Products';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Chain Products', 'chain-products', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.chainproducts.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Chain Products"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Charltons Gates & Fencing
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Charltons Gates & Fencing';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Charltons Gates & Fencing', 'charltons-gates-fencing', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.charltonsgates.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Charltons Gates & Fencing"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Cheshire Mouldings Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Cheshire Mouldings Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Cheshire Mouldings Limited', 'cheshire-mouldings-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.cheshiremouldings.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Cheshire Mouldings Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Chesterfelt Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Chesterfelt Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Chesterfelt Ltd', 'chesterfelt-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.chesterfelt.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Chesterfelt Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Ciret
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Ciret';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Ciret', 'ciret', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.ciret.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Ciret"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Clark Drain Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Clark Drain Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Clark Drain Ltd', 'clark-drain-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.clark-drain.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Clark Drain Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Claygate Distribution
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Claygate Distribution';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Claygate Distribution', 'claygate-distribution', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.claygate.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Claygate Distribution"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Clear Amber Group Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Clear Amber Group Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Clear Amber Group Ltd', 'clear-amber-group-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.clearamber.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Clear Amber Group Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Cottam Brush Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Cottam Brush Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Cottam Brush Ltd', 'cottam-brush-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.cottambrush.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Cottam Brush Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Coxdome
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Coxdome';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Coxdome', 'coxdome', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.coxdome.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Coxdome"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- CQFD Profiles
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'CQFD Profiles';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'CQFD Profiles', 'cqfd-profiles', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.cqfdprofiles.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "CQFD Profiles"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- CQI Ltd t/a Embrass Peerless
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'CQI Ltd t/a Embrass Peerless';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'CQI Ltd t/a Embrass Peerless', 'cqi-ltd-ta-embrass-peerless', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.embrasspeerless.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "CQI Ltd t/a Embrass Peerless"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Cromar Building Products
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Cromar Building Products';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Cromar Building Products', 'cromar-building-products', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.cromar.uk.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Cromar Building Products"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Croydex
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Croydex';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Croydex', 'croydex', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.croydex.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Croydex"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Danfoss Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Danfoss Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Danfoss Ltd', 'danfoss-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.heating.danfoss.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Danfoss Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- DART Tool Group
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'DART Tool Group';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'DART Tool Group', 'dart-tool-group', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.darttoolgroup.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "DART Tool Group"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Davant
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Davant';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Davant', 'davant', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.davant.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Davant"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Deanta UK Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Deanta UK Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Deanta UK Ltd', 'deanta-uk-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.deantawood.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Deanta UK Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Dickies
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Dickies';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Dickies', 'dickies', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.dickiesworkwear.com/uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Dickies"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Digby Stone
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Digby Stone';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Digby Stone', 'digby-stone', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.digbystone.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Digby Stone"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Duro Yokota Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Duro Yokota Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Duro Yokota Ltd', 'duro-yokota-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.duro-diamonds.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Duro Yokota Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Easy Trim Roofing & Construction
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Easy Trim Roofing & Construction';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Easy Trim Roofing & Construction', 'easy-trim-roofing-construction', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.easy-trim.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Easy Trim Roofing & Construction"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- EBP Building Products
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'EBP Building Products';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'EBP Building Products', 'ebp-building-products', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.ebpbuilding.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "EBP Building Products"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- EJ Fabrication and Access Solutions Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'EJ Fabrication and Access Solutions Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'EJ Fabrication and Access Solutions Ltd', 'ej-fabrication-and-access-solutions-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.ejco.com/em/en', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "EJ Fabrication and Access Solutions Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Electrolux Major Appliances
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Electrolux Major Appliances';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Electrolux Major Appliances', 'electrolux-major-appliances', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.electrolux.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Electrolux Major Appliances"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Eliza Tinsley / Avocet Hardware
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Eliza Tinsley / Avocet Hardware';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Eliza Tinsley / Avocet Hardware', 'eliza-tinsley-avocet-hardware', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.elizatinsley.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Eliza Tinsley / Avocet Hardware"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Elnur UK
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Elnur UK';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Elnur UK', 'elnur-uk', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.elnur.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Elnur UK"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Encon Insulation
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Encon Insulation';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Encon Insulation', 'encon-insulation', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.merchantchoice.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Encon Insulation"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Etex (Exteriors)UK Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Etex (Exteriors)UK Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Etex (Exteriors)UK Ltd', 'etex-exteriorsuk-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.etexgroup.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Etex (Exteriors)UK Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Eucotherm
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Eucotherm';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Eucotherm', 'eucotherm', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.eucotherm.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Eucotherm"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- F Ball & Co Ltd - Setcrete
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'F Ball & Co Ltd - Setcrete';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'F Ball & Co Ltd - Setcrete', 'f-ball-co-ltd-setcrete', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.setcrete.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "F Ball & Co Ltd - Setcrete"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Fabdec Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Fabdec Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Fabdec Limited', 'fabdec-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.fabdec.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Fabdec Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Fakro GB Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Fakro GB Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Fakro GB Ltd', 'fakro-gb-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.fakro.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Fakro GB Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- FEIN Industrial Power Tools
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'FEIN Industrial Power Tools';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'FEIN Industrial Power Tools', 'fein-industrial-power-tools', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.fein.com/en_uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "FEIN Industrial Power Tools"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Fernox
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Fernox';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Fernox', 'fernox', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.fernox.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Fernox"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Fillcrete Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Fillcrete Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Fillcrete Limited', 'fillcrete-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.fillcrete.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Fillcrete Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Filplastic
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Filplastic';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Filplastic', 'filplastic', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.filstorage.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Filplastic"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Fischer Fixings
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Fischer Fixings';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Fischer Fixings', 'fischer-fixings', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.fischer.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Fischer Fixings"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- First Trace Heating
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'First Trace Heating';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'First Trace Heating', 'first-trace-heating', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.first-traceheating.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "First Trace Heating"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Flambeau Europlast
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Flambeau Europlast';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Flambeau Europlast', 'flambeau-europlast', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.flamcogroup.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Flambeau Europlast"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Flamco Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Flamco Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Flamco Ltd', 'flamco-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.flamcogroup.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Flamco Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Flex Power Tools
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Flex Power Tools';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Flex Power Tools', 'flex-power-tools', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.flex-tools.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Flex Power Tools"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Flexseal Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Flexseal Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Flexseal Ltd', 'flexseal-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.flexseal.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Flexseal Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Floplast
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Floplast';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Floplast', 'floplast', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.floplast.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Floplast"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Forgefix
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Forgefix';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Forgefix', 'forgefix', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.forgefix.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Forgefix"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Formpave
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Formpave';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Formpave', 'formpave', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.forterra.co.uk/formpave', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Formpave"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Franke UK
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Franke UK';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Franke UK', 'franke-uk', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.franke.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Franke UK"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Frelan Hardware ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Frelan Hardware ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Frelan Hardware ltd', 'frelan-hardware-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.frelanironmongery.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Frelan Hardware ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Frisco UK Sales Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Frisco UK Sales Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Frisco UK Sales Limited', 'frisco-uk-sales-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.frisco.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Frisco UK Sales Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Garrison Dales
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Garrison Dales';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Garrison Dales', 'garrison-dales', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.garrisondales.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Garrison Dales"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Geosynthetics Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Geosynthetics Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Geosynthetics Ltd', 'geosynthetics-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.geosyn.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Geosynthetics Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Grant Westfield
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Grant Westfield';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Grant Westfield', 'grant-westfield', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.grantwestfield.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Grant Westfield"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Gripsure (UK) Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Gripsure (UK) Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Gripsure (UK) Ltd', 'gripsure-uk-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.gripsure.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Gripsure (UK) Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Grono
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Grono';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Grono', 'grono', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.grono.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Grono"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- GRS Bagging
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'GRS Bagging';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'GRS Bagging', 'grs-bagging', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.grsroadstone.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "GRS Bagging"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Grundfos Pumps Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Grundfos Pumps Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Grundfos Pumps Ltd', 'grundfos-pumps-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.uk.grundfos.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Grundfos Pumps Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Guttercrest Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Guttercrest Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Guttercrest Ltd', 'guttercrest-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.guttercrest.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Guttercrest Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- H&V Controls
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'H&V Controls';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'H&V Controls', 'hv-controls', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.hav.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "H&V Controls"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- H+H UK Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'H+H UK Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'H+H UK Limited', 'hh-uk-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.hhcelcon.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "H+H UK Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Haemmerlin
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Haemmerlin';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Haemmerlin', 'haemmerlin', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.haemmerlin.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Haemmerlin"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Hambleside Danelaw
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Hambleside Danelaw';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Hambleside Danelaw', 'hambleside-danelaw', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.hambleside-danelaw.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Hambleside Danelaw"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Hansgrohe
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Hansgrohe';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Hansgrohe', 'hansgrohe', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.hansgrohe.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Hansgrohe"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Harlequin MFG Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Harlequin MFG Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Harlequin MFG Ltd', 'harlequin-mfg-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.harlequinplastics.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Harlequin MFG Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Helifix
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Helifix';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Helifix', 'helifix', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.helifix.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Helifix"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- HiB Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'HiB Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'HiB Ltd', 'hib-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.hib.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "HiB Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- HiKOKI
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'HiKOKI';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'HiKOKI', 'hikoki', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.hikoki-powertools.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "HiKOKI"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Homepack Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Homepack Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Homepack Limited', 'homepack-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.homepackltd.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Homepack Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Hoppe UK
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Hoppe UK';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Hoppe UK', 'hoppe-uk', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.hoppe.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Hoppe UK"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Icopal
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Icopal';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Icopal', 'icopal', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.icopal.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Icopal"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Ideal Bathrooms
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Ideal Bathrooms';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Ideal Bathrooms', 'ideal-bathrooms', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.idealbathrooms.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Ideal Bathrooms"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- IKO plc
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'IKO plc';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'IKO plc', 'iko-plc', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.ikogroup.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "IKO plc"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Industrial Textiles & Plastics Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Industrial Textiles & Plastics Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Industrial Textiles & Plastics Ltd', 'industrial-textiles-plastics-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.itpltd.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Industrial Textiles & Plastics Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Interclamp
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Interclamp';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Interclamp', 'interclamp', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.interclamp.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Interclamp"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Irsap UK Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Irsap UK Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Irsap UK Ltd', 'irsap-uk-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.irsap.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Irsap UK Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- James Hardie
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'James Hardie';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'James Hardie', 'james-hardie', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.jameshardie.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "James Hardie"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- JB Kind
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'JB Kind';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'JB Kind', 'jb-kind', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.jbkind.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "JB Kind"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Jefferson Professional Tools & Equipment
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Jefferson Professional Tools & Equipment';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Jefferson Professional Tools & Equipment', 'jefferson-professional-tools-equipment', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.jeffersontools.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Jefferson Professional Tools & Equipment"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Jeld - Wen Uk
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Jeld - Wen Uk';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Jeld - Wen Uk', 'jeld-wen-uk', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.jeld-wen.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Jeld - Wen Uk"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- John George
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'John George';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'John George', 'john-george', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.johngeorge.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "John George"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Joule UK Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Joule UK Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Joule UK Ltd', 'joule-uk-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.jouleuk.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Joule UK Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- JRC Roofing Distributors
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'JRC Roofing Distributors';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'JRC Roofing Distributors', 'jrc-roofing-distributors', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.jrcslate.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "JRC Roofing Distributors"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- JSP
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'JSP';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'JSP', 'jsp', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.jspsafety.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "JSP"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Just1Source & Supply Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Just1Source & Supply Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Just1Source & Supply Limited', 'just1source-supply-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.just1source.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Just1Source & Supply Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Karcher UK Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Karcher UK Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Karcher UK Ltd', 'karcher-uk-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.karcher.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Karcher UK Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Kendon Rope and Twine
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Kendon Rope and Twine';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Kendon Rope and Twine', 'kendon-rope-and-twine', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.kendon.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Kendon Rope and Twine"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- KestrelBCE
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'KestrelBCE';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'KestrelBCE', 'kestrelbce', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.kbp.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "KestrelBCE"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Keylite Roof Windows Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Keylite Roof Windows Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Keylite Roof Windows Limited', 'keylite-roof-windows-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.keyliteroofwindows.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Keylite Roof Windows Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Keystone Lintels & IG Lintels
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Keystone Lintels & IG Lintels';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Keystone Lintels & IG Lintels', 'keystone-lintels-ig-lintels', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.keystonegroup.co.uk/brands/keystone-lintels', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Keystone Lintels & IG Lintels"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Klingspor Abrasives
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Klingspor Abrasives';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Klingspor Abrasives', 'klingspor-abrasives', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.klingspor.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Klingspor Abrasives"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Knauf Insulation
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Knauf Insulation';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Knauf Insulation', 'knauf-insulation', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.knaufinsulation.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Knauf Insulation"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Knauf UK
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Knauf UK';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Knauf UK', 'knauf-uk', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.knauf.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Knauf UK"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Kyocera Senco UK Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Kyocera Senco UK Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Kyocera Senco UK Ltd', 'kyocera-senco-uk-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.kyocera-senco.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Kyocera Senco UK Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- L.D.D.Ltd.
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'L.D.D.Ltd.';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'L.D.D.Ltd.', 'lddltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.leakerdirect.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "L.D.D.Ltd."}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- LPD Doors
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'LPD Doors';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'LPD Doors', 'lpd-doors', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.lpddoors.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "LPD Doors"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Lecico
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Lecico';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Lecico', 'lecico', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.lecico.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Lecico"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Liberon UK
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Liberon UK';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Liberon UK', 'liberon-uk', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.liberon.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Liberon UK"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Long Rake Spar
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Long Rake Spar';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Long Rake Spar', 'long-rake-spar', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.longrakespar.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Long Rake Spar"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Luceco PLC
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Luceco PLC';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Luceco PLC', 'luceco-plc', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.luceco.com/uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Luceco PLC"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Lyreco UK
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Lyreco UK';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Lyreco UK', 'lyreco-uk', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.lyreco.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Lyreco UK"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- M. Greenaway and Son Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'M. Greenaway and Son Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'M. Greenaway and Son Ltd', 'm-greenaway-and-son-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.greenaways.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "M. Greenaway and Son Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Manrose Manufacturing Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Manrose Manufacturing Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Manrose Manufacturing Ltd', 'manrose-manufacturing-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.manrose.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Manrose Manufacturing Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Marcrist International
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Marcrist International';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Marcrist International', 'marcrist-international', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.marcrist.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Marcrist International"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Mark Vitow Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Mark Vitow Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Mark Vitow Limited', 'mark-vitow-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.markvitow.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Mark Vitow Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Marley Alutec
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Marley Alutec';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Marley Alutec', 'marley-alutec', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.marleyalutec.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Marley Alutec"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Marley Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Marley Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Marley Limited', 'marley-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.marley.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Marley Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Marshalls
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Marshalls';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Marshalls', 'marshalls', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.marshalls.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Marshalls"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Marsh Industries
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Marsh Industries';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Marsh Industries', 'marsh-industries', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.marshindustries.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Marsh Industries"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Masefield Beta
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Masefield Beta';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Masefield Beta', 'masefield-beta', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.masefield-beta.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Masefield Beta"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- MasterFlow
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'MasterFlow';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'MasterFlow', 'masterflow', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.masterflow.uk.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "MasterFlow"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Maurice Lay / Caple
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Maurice Lay / Caple';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Maurice Lay / Caple', 'maurice-lay-caple', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.caple.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Maurice Lay / Caple"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Measure-Quip Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Measure-Quip Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Measure-Quip Ltd', 'measure-quip-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.measure-quip.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Measure-Quip Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Melpass Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Melpass Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Melpass Ltd', 'melpass-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.melpass.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Melpass Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Mermaid Panels
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Mermaid Panels';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Mermaid Panels', 'mermaid-panels', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.mermaidpanels.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Mermaid Panels"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Metabo UK Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Metabo UK Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Metabo UK Ltd', 'metabo-uk-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.metabo.com/uk/en', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Metabo UK Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Methven UK
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Methven UK';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Methven UK', 'methven-uk', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.methven.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Methven UK"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Midland Lead Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Midland Lead Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Midland Lead Limited', 'midland-lead-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.midlandlead.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Midland Lead Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Milwaukee
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Milwaukee';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Milwaukee', 'milwaukee', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.milwaukeetool.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Milwaukee"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Mission Rubber
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Mission Rubber';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Mission Rubber', 'mission-rubber', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.missionrubber.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Mission Rubber"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- M.Marcus Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'M.Marcus Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'M.Marcus Ltd', 'mmarcus-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.m-marcus.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "M.Marcus Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Monarch Water Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Monarch Water Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Monarch Water Ltd', 'monarch-water-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.monarchwater.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Monarch Water Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Montpellier Domestic Appliances
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Montpellier Domestic Appliances';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Montpellier Domestic Appliances', 'montpellier-domestic-appliances', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.montpellier-appliances.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Montpellier Domestic Appliances"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Monument Tools Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Monument Tools Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Monument Tools Ltd', 'monument-tools-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.monument-tools.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Monument Tools Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Mueller Europe Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Mueller Europe Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Mueller Europe Ltd', 'mueller-europe-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.muellereurope.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Mueller Europe Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- MX Group
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'MX Group';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'MX Group', 'mx-group', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.mx-group.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "MX Group"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- National Abrasives Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'National Abrasives Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'National Abrasives Ltd', 'national-abrasives-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.national-abrasives.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "National Abrasives Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- National Shower Spares
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'National Shower Spares';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'National Shower Spares', 'national-shower-spares', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.showerspares.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "National Shower Spares"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Naylor Concrete Products
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Naylor Concrete Products';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Naylor Concrete Products', 'naylor-concrete-products', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.naylor.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Naylor Concrete Products"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Naylor Drainage Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Naylor Drainage Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Naylor Drainage Ltd', 'naylor-drainage-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.naylor.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Naylor Drainage Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Nicholls & Clarke Group
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Nicholls & Clarke Group';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Nicholls & Clarke Group', 'nicholls-clarke-group', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.ncdirect.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Nicholls & Clarke Group"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- OmegaFlex (TracPipe)
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'OmegaFlex (TracPipe)';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'OmegaFlex (TracPipe)', 'omegaflex-tracpipe', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.omegaflex.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "OmegaFlex (TracPipe)"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Orkla
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Orkla';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Orkla', 'orkla', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.orkla.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Orkla"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Osborn Dronco
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Osborn Dronco';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Osborn Dronco', 'osborn-dronco', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.osborn.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Osborn Dronco"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Owlett-Jaton
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Owlett-Jaton';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Owlett-Jaton', 'owlett-jaton', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.ojtrade.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Owlett-Jaton"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Parkes Products
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Parkes Products';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Parkes Products', 'parkes-products', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.parkesgroup.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Parkes Products"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Pavestone Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Pavestone Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Pavestone Ltd', 'pavestone-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.pavestone.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Pavestone Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- PC Henderson
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'PC Henderson';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'PC Henderson', 'pc-henderson', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.pchenderson.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "PC Henderson"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Pegler Yorkshire
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Pegler Yorkshire';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Pegler Yorkshire', 'pegler-yorkshire', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.pegleryorkshire.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Pegler Yorkshire"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- PJH Group
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'PJH Group';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'PJH Group', 'pjh-group', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.pjh.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "PJH Group"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Polydrain Civils
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Polydrain Civils';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Polydrain Civils', 'polydrain-civils', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.polydraincivils.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Polydrain Civils"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Polypipe Building Products
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Polypipe Building Products';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Polypipe Building Products', 'polypipe-building-products', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.polypipe.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Polypipe Building Products"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- PPG
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'PPG';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'PPG', 'ppg', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.ppg.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "PPG"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Premier Diamond Products Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Premier Diamond Products Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Premier Diamond Products Ltd', 'premier-diamond-products-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.premierdiamondproducts.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Premier Diamond Products Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Presto International UK Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Presto International UK Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Presto International UK Ltd', 'presto-international-uk-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.presto-tools.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Presto International UK Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Primaflow Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Primaflow Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Primaflow Ltd', 'primaflow-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.primaflowfandp.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Primaflow Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Principal Building Products Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Principal Building Products Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Principal Building Products Ltd', 'principal-building-products-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.pbpltd.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Principal Building Products Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Progressive Safety Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Progressive Safety Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Progressive Safety Ltd', 'progressive-safety-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.psf.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Progressive Safety Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Qualtex
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Qualtex';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Qualtex', 'qualtex', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.qualtexuk.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Qualtex"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Quanti-Quote
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Quanti-Quote';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Quanti-Quote', 'quanti-quote', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.quantiquote.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Quanti-Quote"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Quinn Building Products
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Quinn Building Products';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Quinn Building Products', 'quinn-building-products', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.quinn-buildingproducts.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Quinn Building Products"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Red Gorilla International
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Red Gorilla International';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Red Gorilla International', 'red-gorilla-international', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.redgorilla.red', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Red Gorilla International"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Regin Products Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Regin Products Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Regin Products Ltd', 'regin-products-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.regin.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Regin Products Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Reisser Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Reisser Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Reisser Ltd', 'reisser-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.reisser.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Reisser Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Reliance Manufacturing
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Reliance Manufacturing';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Reliance Manufacturing', 'reliance-manufacturing', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.reliancewheelbarrows.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Reliance Manufacturing"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Resapol Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Resapol Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Resapol Ltd', 'resapol-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.resapol.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Resapol Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Resources Group
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Resources Group';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Resources Group', 'resources-group', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.the-resources-group.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Resources Group"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Rexel
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Rexel';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Rexel', 'rexel', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.rexel.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Rexel"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Robert Bosch Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Robert Bosch Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Robert Bosch Ltd', 'robert-bosch-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.bosch-professional.com/gb/en', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Robert Bosch Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Rockwool UK
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Rockwool UK';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Rockwool UK', 'rockwool-uk', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.rockwool.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Rockwool UK"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Rodo Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Rodo Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Rodo Ltd', 'rodo-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.prodec.uk.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Rodo Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Rollins & Sons
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Rollins & Sons';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Rollins & Sons', 'rollins-sons', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.rollins.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Rollins & Sons"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- ROM Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'ROM Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'ROM Ltd', 'rom-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.rom.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "ROM Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Rothenberger
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Rothenberger';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Rothenberger', 'rothenberger', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.rothenberger.com/us-en', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Rothenberger"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Rowlinson Garden Products Ltd.
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Rowlinson Garden Products Ltd.';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Rowlinson Garden Products Ltd.', 'rowlinson-garden-products-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.rowgar.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Rowlinson Garden Products Ltd."}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Roxor Group (Ultra Finishing)
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Roxor Group (Ultra Finishing)';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Roxor Group (Ultra Finishing)', 'roxor-group-ultra-finishing', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.premierbathroomcollection.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Roxor Group (Ultra Finishing)"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- ROYD Tool Group
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'ROYD Tool Group';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'ROYD Tool Group', 'royd-tool-group', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.roydtoolgroup.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "ROYD Tool Group"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Rustins Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Rustins Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Rustins Ltd', 'rustins-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.rustins.ltd', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Rustins Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Sabrefix (UK) Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Sabrefix (UK) Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Sabrefix (UK) Ltd', 'sabrefix-uk-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.sabrefix.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Sabrefix (UK) Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Saint-Gobain Abrasives
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Saint-Gobain Abrasives';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Saint-Gobain Abrasives', 'saint-gobain-abrasives', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.saint-gobain-abrasives.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Saint-Gobain Abrasives"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Samac Fixings Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Samac Fixings Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Samac Fixings Ltd', 'samac-fixings-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.samacfixings.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Samac Fixings Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Saneux
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Saneux';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Saneux', 'saneux', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.saneux.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Saneux"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- SCA Wood UK Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'SCA Wood UK Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'SCA Wood UK Ltd', 'sca-wood-uk-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.sca.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "SCA Wood UK Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Schiedel Chimney Systems Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Schiedel Chimney Systems Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Schiedel Chimney Systems Ltd', 'schiedel-chimney-systems-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.schiedel.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Schiedel Chimney Systems Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Sealey Tools
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Sealey Tools';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Sealey Tools', 'sealey-tools', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.sealey.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Sealey Tools"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Sherwin Williams
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Sherwin Williams';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Sherwin Williams', 'sherwin-williams', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.sherwin-williams.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Sherwin Williams"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Showerdrape Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Showerdrape Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Showerdrape Ltd', 'showerdrape-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.showerdrape.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Showerdrape Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Siamp Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Siamp Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Siamp Ltd', 'siamp-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.siamp.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Siamp Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- SIG Distribution
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'SIG Distribution';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'SIG Distribution', 'sig-distribution', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.sigplc.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "SIG Distribution"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- SIG Roofing
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'SIG Roofing';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'SIG Roofing', 'sig-roofing', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.sigplc.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "SIG Roofing"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Sika Everbuild
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Sika Everbuild';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Sika Everbuild', 'sika-everbuild', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.everbuild.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Sika Everbuild"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Simpson Strong-Tie
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Simpson Strong-Tie';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Simpson Strong-Tie', 'simpson-strong-tie', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.strongtie.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Simpson Strong-Tie"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Slatescape Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Slatescape Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Slatescape Limited', 'slatescape-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.slatescape.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Slatescape Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Smiths Briten
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Smiths Briten';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Smiths Briten', 'smiths-briten', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.purebathroomcollection.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Smiths Briten"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Smith Partnership
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Smith Partnership';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Smith Partnership', 'smith-partnership', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.smithpartnership.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Smith Partnership"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Soudal UK
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Soudal UK';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Soudal UK', 'soudal-uk', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.soudal.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Soudal UK"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Southgate Plastics Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Southgate Plastics Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Southgate Plastics Ltd', 'southgate-plastics-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.stormbuildingproducts.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Southgate Plastics Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Spax (UK) Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Spax (UK) Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Spax (UK) Limited', 'spax-uk-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.spax.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Spax (UK) Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Spear & Jackson
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Spear & Jackson';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Spear & Jackson', 'spear-jackson', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.spear-and-jackson.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Spear & Jackson"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Stamco
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Stamco';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Stamco', 'stamco', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.stamco.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Stamco"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Stearn Electric
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Stearn Electric';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Stearn Electric', 'stearn-electric', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.stearn.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Stearn Electric"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Sterling Safetywear Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Sterling Safetywear Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Sterling Safetywear Ltd', 'sterling-safetywear-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.sterlingsafetywear.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Sterling Safetywear Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Stone Plus UK
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Stone Plus UK';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Stone Plus UK', 'stone-plus-uk', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.stoneplusuk.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Stone Plus UK"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Stax Trade Centres
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Stax Trade Centres';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Stax Trade Centres', 'stax-trade-centres', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.staxtradecentres.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Stax Trade Centres"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- STS Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'STS Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'STS Ltd', 'sts-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.sts-uk.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "STS Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Stressline
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Stressline';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Stressline', 'stressline', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.stressline.net', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Stressline"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Supreme Concrete
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Supreme Concrete';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Supreme Concrete', 'supreme-concrete', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.supremeconcrete.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Supreme Concrete"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- SureCav Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'SureCav Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'SureCav Limited', 'surecav-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.surecav.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "SureCav Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Surestop LTD
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Surestop LTD';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Surestop LTD', 'surestop-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.surestop.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Surestop LTD"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Swiftec Global Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Swiftec Global Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Swiftec Global Ltd', 'swiftec-global-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.swiftec.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Swiftec Global Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Symphony Bathrooms
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Symphony Bathrooms';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Symphony Bathrooms', 'symphony-bathrooms', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.symphony-group.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Symphony Bathrooms"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- T I Midwood & Co Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'T I Midwood & Co Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'T I Midwood & Co Ltd', 't-i-midwood-co-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.timco.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "T I Midwood & Co Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- T King Associates Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'T King Associates Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'T King Associates Ltd', 't-king-associates-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.tkingassociates.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "T King Associates Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- TAFS (Salop) Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'TAFS (Salop) Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'TAFS (Salop) Ltd', 'tafs-salop-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.tafs-salop.ltd.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "TAFS (Salop) Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- TB Davies
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'TB Davies';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'TB Davies', 'tb-davies', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.tbdavies.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "TB Davies"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Teco Building Products
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Teco Building Products';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Teco Building Products', 'teco-building-products', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.tecoproducts.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Teco Building Products"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Tec-Ties Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Tec-Ties Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Tec-Ties Ltd', 'tec-ties-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.tecties.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Tec-Ties Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Telford Copper Cylinders Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Telford Copper Cylinders Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Telford Copper Cylinders Limited', 'telford-copper-cylinders-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.telford-group.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Telford Copper Cylinders Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Teng Tools
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Teng Tools';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Teng Tools', 'teng-tools', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.tengtools.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Teng Tools"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Thomas Dudley Limited t/a TYDE
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Thomas Dudley Limited t/a TYDE';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Thomas Dudley Limited t/a TYDE', 'thomas-dudley-limited-ta-tyde', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.thomasdudley.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Thomas Dudley Limited t/a TYDE"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Timloc Building Products
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Timloc Building Products';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Timloc Building Products', 'timloc-building-products', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.timloc.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Timloc Building Products"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Timbmet
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Timbmet';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Timbmet', 'timbmet', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.timbmet.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Timbmet"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Toolbank
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Toolbank';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Toolbank', 'toolbank', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.toolbank.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Toolbank"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Tools of The Trade Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Tools of The Trade Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Tools of The Trade Ltd', 'tools-of-the-trade-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.toolsofthetrade.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Tools of The Trade Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Toolstream Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Toolstream Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Toolstream Ltd', 'toolstream-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.toolstream.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Toolstream Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Towelrads
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Towelrads';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Towelrads', 'towelrads', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.towelrads.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Towelrads"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Tremco Illbruck
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Tremco Illbruck';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Tremco Illbruck', 'tremco-illbruck', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.tremco-illbruck.com/en_GB/home', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Tremco Illbruck"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Trend Machinery
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Trend Machinery';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Trend Machinery', 'trend-machinery', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.trend-uk.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Trend Machinery"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- TT Concrete Products Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'TT Concrete Products Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'TT Concrete Products Limited', 'tt-concrete-products-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.ttconcreteproducts.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "TT Concrete Products Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Ubbink UK Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Ubbink UK Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Ubbink UK Ltd', 'ubbink-uk-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.ubbink.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Ubbink UK Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Ultimate Finance Group Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Ultimate Finance Group Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Ultimate Finance Group Limited', 'ultimate-finance-group-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.ultimatefinance.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Ultimate Finance Group Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Unilin Distribution
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Unilin Distribution';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Unilin Distribution', 'unilin-distribution', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.quick-step.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Unilin Distribution"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Univar Specialty Consumables Limited
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Univar Specialty Consumables Limited';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Univar Specialty Consumables Limited', 'univar-specialty-consumables-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.univarsc.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Univar Specialty Consumables Limited"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Urfic UK
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Urfic UK';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Urfic UK', 'urfic-uk', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.urfic.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Urfic UK"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Vaillant Group Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Vaillant Group Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Vaillant Group Ltd', 'vaillant-group-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.glow-worm.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Vaillant Group Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- VADO
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'VADO';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'VADO', 'vado', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.vado.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "VADO"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- VELUX
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'VELUX';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'VELUX', 'velux', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.velux.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "VELUX"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Viessmann
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Viessmann';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Viessmann', 'viessmann', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.viessmann.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Viessmann"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Vista Engineering Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Vista Engineering Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Vista Engineering Ltd', 'vista-engineering-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.vistaeng.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Vista Engineering Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Vogue UK
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Vogue UK';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Vogue UK', 'vogue-uk', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.vogueuk.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Vogue UK"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Vokera Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Vokera Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Vokera Ltd', 'vokera-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.vokera.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Vokera Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- W.Howard Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'W.Howard Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'W.Howard Ltd', 'whoward-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.whoward.eu', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "W.Howard Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Walsh & Blyth
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Walsh & Blyth';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Walsh & Blyth', 'walsh-blyth', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.wbtwholesale.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Walsh & Blyth"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Warmup Plc
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Warmup Plc';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Warmup Plc', 'warmup-plc', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.warmup.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Warmup Plc"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Waterline
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Waterline';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Waterline', 'waterline', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.waterline.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Waterline"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Wavin
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Wavin';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Wavin', 'wavin', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.wavin.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Wavin"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Wernerco
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Wernerco';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Wernerco', 'wernerco', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.wernerco.com/eu', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Wernerco"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- West Port
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'West Port';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'West Port', 'west-port', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.west-port.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "West Port"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Wienerberger
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Wienerberger';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Wienerberger', 'wienerberger', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.wienerberger.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Wienerberger"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Wirquin UK Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Wirquin UK Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Wirquin UK Ltd', 'wirquin-uk-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.wirquin.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Wirquin UK Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Wrekin Products
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Wrekin Products';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Wrekin Products', 'wrekin-products', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.wrekinproducts.com', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Wrekin Products"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- WT Knowles
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'WT Knowles';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'WT Knowles', 'wt-knowles', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.wtknowles.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "WT Knowles"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Xella UK
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Xella UK';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Xella UK', 'xella-uk', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.xella.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Xella UK"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Yorkshire Copper Tube
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Yorkshire Copper Tube';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Yorkshire Copper Tube', 'yorkshire-copper-tube', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.fischer.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Yorkshire Copper Tube"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    -- Zehnder group UK Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Zehnder group UK Ltd';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Zehnder group UK Ltd', 'zehnder-group-uk-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.zehnder.co.uk', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "Zehnder group UK Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    RAISE NOTICE 'NMBS import completed: % new suppliers, % existing suppliers skipped, % affiliations created', 
                 supplier_count, skipped_count, affiliation_count;
    
    -- Final verification
    RAISE NOTICE 'Total NMBS suppliers now: %', (SELECT COUNT(*) FROM supplier_organization_affiliations WHERE organization_id = nmbs_org_id);
END $$;
