-- NMBS Supplier Batch Upload - Manual approach
-- Since we can't execute complex functions directly, we'll create a series of INSERT statements

-- First, let's create a few test suppliers manually to verify the approach works
-- We'll use the exact same approach as the sample data that's already in the database

-- Test suppliers batch 1 (5 suppliers)
DO $$
DECLARE
    nmbs_org_id uuid := '9307d673-0fb8-4533-8c6f-d9c1f114330c'::uuid;
    new_supplier_id uuid;
BEGIN
    -- Supplier 1: Abracs
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Abracs', 'abracs', 'NMBS affiliated supplier providing abrasives and cutting tools.', 'https://www.abracs.com/', 'United Kingdom', true, now(), now()
    ) ON CONFLICT (supplier_name) DO UPDATE SET updated_at = now()
    RETURNING id INTO new_supplier_id;
    
    IF new_supplier_id IS NULL THEN
        SELECT id INTO new_supplier_id FROM suppliers WHERE supplier_name = 'Abracs';
    END IF;
    
    INSERT INTO supplier_organization_affiliations (
        supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
    ) VALUES (
        new_supplier_id, nmbs_org_id, 'member', 'active', now(),
        '{"membership_type": "supplier", "trading_status": "active", "data_source": "manual_import_2025_01_08", "import_notes": "NMBS supplier - Abracs"}'::jsonb,
        now(), now()
    ) ON CONFLICT (supplier_id, organization_id) DO NOTHING;

    -- Supplier 2: ACO Technologies plc  
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'ACO Technologies plc', 'aco-technologies-plc', 'NMBS affiliated supplier providing drainage solutions.', 'https://www.aco.co.uk/', 'United Kingdom', true, now(), now()
    ) ON CONFLICT (supplier_name) DO UPDATE SET updated_at = now()
    RETURNING id INTO new_supplier_id;
    
    IF new_supplier_id IS NULL THEN
        SELECT id INTO new_supplier_id FROM suppliers WHERE supplier_name = 'ACO Technologies plc';
    END IF;
    
    INSERT INTO supplier_organization_affiliations (
        supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
    ) VALUES (
        new_supplier_id, nmbs_org_id, 'member', 'active', now(),
        '{"membership_type": "supplier", "trading_status": "active", "data_source": "manual_import_2025_01_08", "import_notes": "NMBS supplier - ACO Technologies"}'::jsonb,
        now(), now()
    ) ON CONFLICT (supplier_id, organization_id) DO NOTHING;

    -- Supplier 3: Makita UK Ltd
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Makita UK Ltd', 'makita-uk-ltd', 'NMBS affiliated supplier providing power tools and equipment.', 'https://www.makitauk.com/', 'United Kingdom', true, now(), now()
    ) ON CONFLICT (supplier_name) DO UPDATE SET updated_at = now()
    RETURNING id INTO new_supplier_id;
    
    IF new_supplier_id IS NULL THEN
        SELECT id INTO new_supplier_id FROM suppliers WHERE supplier_name = 'Makita UK Ltd';
    END IF;
    
    INSERT INTO supplier_organization_affiliations (
        supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
    ) VALUES (
        new_supplier_id, nmbs_org_id, 'member', 'active', now(),
        '{"membership_type": "supplier", "trading_status": "active", "data_source": "manual_import_2025_01_08", "import_notes": "NMBS supplier - Makita UK"}'::jsonb,
        now(), now()
    ) ON CONFLICT (supplier_id, organization_id) DO NOTHING;

    -- Supplier 4: Draper Tools
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Draper Tools', 'draper-tools', 'NMBS affiliated supplier providing hand and power tools.', 'https://www.drapertools.com/', 'United Kingdom', true, now(), now()
    ) ON CONFLICT (supplier_name) DO UPDATE SET updated_at = now()
    RETURNING id INTO new_supplier_id;
    
    IF new_supplier_id IS NULL THEN
        SELECT id INTO new_supplier_id FROM suppliers WHERE supplier_name = 'Draper Tools';
    END IF;
    
    INSERT INTO supplier_organization_affiliations (
        supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
    ) VALUES (
        new_supplier_id, nmbs_org_id, 'member', 'active', now(),
        '{"membership_type": "supplier", "trading_status": "active", "data_source": "manual_import_2025_01_08", "import_notes": "NMBS supplier - Draper Tools"}'::jsonb,
        now(), now()
    ) ON CONFLICT (supplier_id, organization_id) DO NOTHING;

    -- Supplier 5: British Gypsum
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'British Gypsum', 'british-gypsum', 'NMBS affiliated supplier providing building materials and plasterboard.', 'https://www.british-gypsum.com/', 'United Kingdom', true, now(), now()
    ) ON CONFLICT (supplier_name) DO UPDATE SET updated_at = now()
    RETURNING id INTO new_supplier_id;
    
    IF new_supplier_id IS NULL THEN
        SELECT id INTO new_supplier_id FROM suppliers WHERE supplier_name = 'British Gypsum';
    END IF;
    
    INSERT INTO supplier_organization_affiliations (
        supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
    ) VALUES (
        new_supplier_id, nmbs_org_id, 'member', 'active', now(),
        '{"membership_type": "supplier", "trading_status": "active", "data_source": "manual_import_2025_01_08", "import_notes": "NMBS supplier - British Gypsum"}'::jsonb,
        now(), now()
    ) ON CONFLICT (supplier_id, organization_id) DO NOTHING;

    RAISE NOTICE 'Successfully created 5 NMBS suppliers and their organization affiliations';
END $$;