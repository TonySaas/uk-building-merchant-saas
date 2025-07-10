-- Import All 306 NMBS Suppliers with Organization Affiliations
-- This script processes the complete NMBS supplier list, skipping the 5 already imported

DO $$
DECLARE
    nmbs_org_id uuid := '9307d673-0fb8-4533-8c6f-d9c1f114330c'::uuid;
    new_supplier_id uuid;
    existing_supplier_id uuid;
    supplier_count integer := 0;
    skipped_count integer := 0;
    
    -- Function to create slug from supplier name
    create_slug text;
BEGIN
    RAISE NOTICE 'Starting NMBS supplier import process...';

    -- Acheson & Glover
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Acheson & Glover';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Acheson & Glover', 'acheson-glover', 'NMBS affiliated supplier providing building materials and supplies.', 'https://www.ag.uk.com/', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import"}'::jsonb,
            now(), now()
        );
    END IF;

    -- Ademco 1 Ltd, Honeywell Home
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Ademco 1 Ltd, Honeywell Home';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Ademco 1 Ltd, Honeywell Home', 'ademco-1-ltd-honeywell-home', 'NMBS affiliated supplier providing heating controls and home automation.', 'https://www.heatingcontrols.honeywellhome.com/', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import"}'::jsonb,
            now(), now()
        );
    END IF;

    -- Adey Innovations
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = 'Adey Innovations';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            'Adey Innovations', 'adey-innovations', 'NMBS affiliated supplier providing heating system chemicals and products.', 'https://www.adey.co.uk/', 'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
        supplier_count := supplier_count + 1;
    ELSE
        new_supplier_id := existing_supplier_id;
        skipped_count := skipped_count + 1;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM supplier_organization_affiliations WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import"}'::jsonb,
            now(), now()
        );
    END IF;

    -- Continue with the next batch of suppliers...
    -- Due to size limitations, I'll create this in chunks

    RAISE NOTICE 'Processed batch 1: % new suppliers, % skipped', supplier_count, skipped_count;
END $$;
