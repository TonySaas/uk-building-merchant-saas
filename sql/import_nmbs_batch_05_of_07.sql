-- Import NMBS Suppliers Batch 5 of 7
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
    RAISE NOTICE 'Starting NMBS supplier import batch 5 of 7...';

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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Presto International UK Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Primaflow Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Principal Building Products Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Progressive Safety Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Qualtex"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Quanti-Quote"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Quinn Building Products"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Red Gorilla International"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Regin Products Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Reisser Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Reliance Manufacturing"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Resapol Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Resources Group"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Rexel"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Robert Bosch Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Rockwool UK"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Rodo Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Rollins & Sons"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "ROM Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Rothenberger"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Rowlinson Garden Products Ltd."}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Roxor Group (Ultra Finishing)"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "ROYD Tool Group"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Rustins Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Sabrefix (UK) Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Saint-Gobain Abrasives"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Samac Fixings Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Saneux"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "SCA Wood UK Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Schiedel Chimney Systems Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Sealey Tools"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Sherwin Williams"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Showerdrape Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Siamp Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "SIG Distribution"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "SIG Roofing"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Sika Everbuild"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Simpson Strong-Tie"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Slatescape Limited"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Smiths Briten"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Smith Partnership"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Soudal UK"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Southgate Plastics Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Spax (UK) Limited"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Spear & Jackson"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Stamco"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Stearn Electric"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Sterling Safetywear Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Stone Plus UK"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_5", "import_batch": "nmbs_batch_5_of_7", "supplier_name": "Stax Trade Centres"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    RAISE NOTICE 'NMBS batch 5 completed: % new suppliers, % existing suppliers skipped, % affiliations created', 
                 supplier_count, skipped_count, affiliation_count;
                 
    -- Current total NMBS suppliers after this batch
    RAISE NOTICE 'Total NMBS suppliers after batch 5: %', (SELECT COUNT(*) FROM supplier_organization_affiliations WHERE organization_id = nmbs_org_id);
END $$;
