-- Import NMBS Suppliers Batch 4 of 7
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
    RAISE NOTICE 'Starting NMBS supplier import batch 4 of 7...';

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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "L.D.D.Ltd."}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "LPD Doors"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Lecico"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Liberon UK"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Long Rake Spar"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Luceco PLC"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Lyreco UK"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "M. Greenaway and Son Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Manrose Manufacturing Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Marcrist International"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Mark Vitow Limited"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Marley Alutec"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Marley Limited"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Marshalls"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Marsh Industries"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Masefield Beta"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "MasterFlow"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Maurice Lay / Caple"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Measure-Quip Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Melpass Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Mermaid Panels"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Metabo UK Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Methven UK"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Midland Lead Limited"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Milwaukee"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Mission Rubber"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "M.Marcus Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Monarch Water Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Montpellier Domestic Appliances"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Monument Tools Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Mueller Europe Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "MX Group"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "National Abrasives Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "National Shower Spares"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Naylor Concrete Products"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Naylor Drainage Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Nicholls & Clarke Group"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "OmegaFlex (TracPipe)"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Orkla"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Osborn Dronco"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Owlett-Jaton"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Parkes Products"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Pavestone Ltd"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "PC Henderson"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Pegler Yorkshire"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "PJH Group"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Polydrain Civils"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Polypipe Building Products"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "PPG"}'::jsonb,
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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_4", "import_batch": "nmbs_batch_4_of_7", "supplier_name": "Premier Diamond Products Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    RAISE NOTICE 'NMBS batch 4 completed: % new suppliers, % existing suppliers skipped, % affiliations created', 
                 supplier_count, skipped_count, affiliation_count;
                 
    -- Current total NMBS suppliers after this batch
    RAISE NOTICE 'Total NMBS suppliers after batch 4: %', (SELECT COUNT(*) FROM supplier_organization_affiliations WHERE organization_id = nmbs_org_id);
END $$;
