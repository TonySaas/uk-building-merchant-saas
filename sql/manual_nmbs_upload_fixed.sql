-- NMBS Supplier Batch Upload - Fixed version without ON CONFLICT
-- This version handles the lack of unique constraints properly

DO $$
DECLARE
    nmbs_org_id uuid := '9307d673-0fb8-4533-8c6f-d9c1f114330c'::uuid;
    new_supplier_id uuid;
    existing_supplier_id uuid;
BEGIN
    -- Supplier 1: Abracs
    -- Check if supplier already exists
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Abracs';
    
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Abracs', 'abracs', 'NMBS affiliated supplier providing abrasives and cutting tools.', 'https://www.abracs.com/', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
    ELSE
        new_supplier_id := existing_supplier_id;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM supplier_organization_affiliations 
        WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id
    ) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "manual_import_2025_01_08", "import_notes": "NMBS supplier - Abracs"}'::jsonb,
            now(), now()
        );
    END IF;

    -- Supplier 2: ACO Technologies plc
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'ACO Technologies plc';
    
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'ACO Technologies plc', 'aco-technologies-plc', 'NMBS affiliated supplier providing drainage solutions.', 'https://www.aco.co.uk/', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
    ELSE
        new_supplier_id := existing_supplier_id;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM supplier_organization_affiliations 
        WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id
    ) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "manual_import_2025_01_08", "import_notes": "NMBS supplier - ACO Technologies"}'::jsonb,
            now(), now()
        );
    END IF;

    -- Supplier 3: Makita UK Ltd
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Makita UK Ltd';
    
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Makita UK Ltd', 'makita-uk-ltd', 'NMBS affiliated supplier providing power tools and equipment.', 'https://www.makitauk.com/', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
    ELSE
        new_supplier_id := existing_supplier_id;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM supplier_organization_affiliations 
        WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id
    ) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "manual_import_2025_01_08", "import_notes": "NMBS supplier - Makita UK"}'::jsonb,
            now(), now()
        );
    END IF;

    -- Supplier 4: Draper Tools
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Draper Tools';
    
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Draper Tools', 'draper-tools', 'NMBS affiliated supplier providing hand and power tools.', 'https://www.drapertools.com/', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
    ELSE
        new_supplier_id := existing_supplier_id;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM supplier_organization_affiliations 
        WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id
    ) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "manual_import_2025_01_08", "import_notes": "NMBS supplier - Draper Tools"}'::jsonb,
            now(), now()
        );
    END IF;

    -- Supplier 5: British Gypsum
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'British Gypsum';
    
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'British Gypsum', 'british-gypsum', 'NMBS affiliated supplier providing building materials and plasterboard.', 'https://www.british-gypsum.com/', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
    ELSE
        new_supplier_id := existing_supplier_id;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM supplier_organization_affiliations 
        WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id
    ) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "manual_import_2025_01_08", "import_notes": "NMBS supplier - British Gypsum"}'::jsonb,
            now(), now()
        );
    END IF;

    RAISE NOTICE 'Successfully processed 5 NMBS suppliers and their organization affiliations';
END $$;