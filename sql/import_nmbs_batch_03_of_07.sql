-- Import NMBS Suppliers Batch 3 of 7
-- Generated script to import suppliers from CSV

DO $$
DECLARE
    nmbs_org_id uuid := '9307d673-0fb8-4533-8c6f-d9c1f114330c'::uuid;
    new_supplier_id uuid;
    existing_supplier_id uuid;
    supplier_count integer := 0;
    skipped_count integer := 0;
    affiliation_count integer := 0;
BEGIN
    RAISE NOTICE 'Starting NMBS supplier import batch 3 of 7...';

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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Flexseal Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Floplast"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Forgefix"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Formpave"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Franke UK"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Frelan Hardware ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Frisco UK Sales Limited"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Garrison Dales"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Geosynthetics Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Grant Westfield"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Gripsure (UK) Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Grono"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "GRS Bagging"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Grundfos Pumps Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Guttercrest Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "H&V Controls"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "H+H UK Limited"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Haemmerlin"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Hambleside Danelaw"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Hansgrohe"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Harlequin MFG Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Helifix"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "HiB Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "HiKOKI"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Homepack Limited"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Hoppe UK"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Icopal"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Ideal Bathrooms"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "IKO plc"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Industrial Textiles & Plastics Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Interclamp"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Irsap UK Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "James Hardie"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "JB Kind"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Jefferson Professional Tools & Equipment"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Jeld - Wen Uk"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "John George"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Joule UK Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "JRC Roofing Distributors"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "JSP"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Just1Source & Supply Limited"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Karcher UK Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Kendon Rope and Twine"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "KestrelBCE"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Keylite Roof Windows Limited"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Keystone Lintels & IG Lintels"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Klingspor Abrasives"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Knauf Insulation"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Knauf UK"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_3", "import_batch": "nmbs_batch_3_of_7", "supplier_name": "Kyocera Senco UK Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    RAISE NOTICE 'NMBS batch 3 completed: % new suppliers, % existing suppliers skipped, % affiliations created', 
                 supplier_count, skipped_count, affiliation_count;
                 
    -- Current total NMBS suppliers after this batch
    RAISE NOTICE 'Total NMBS suppliers after batch 3: %', (SELECT COUNT(*) FROM supplier_organization_affiliations WHERE organization_id = nmbs_org_id);
END $$;
