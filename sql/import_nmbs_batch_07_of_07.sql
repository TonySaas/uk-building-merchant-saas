-- Import NMBS Suppliers Batch 7 of 7
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
    RAISE NOTICE 'Starting NMBS supplier import batch 7 of 7...';

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
            '{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_7", "import_batch": "nmbs_batch_7_of_7", "supplier_name": "Zehnder group UK Ltd"}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

    RAISE NOTICE 'NMBS batch 7 completed: % new suppliers, % existing suppliers skipped, % affiliations created', 
                 supplier_count, skipped_count, affiliation_count;
                 
    -- Current total NMBS suppliers after this batch
    RAISE NOTICE 'Total NMBS suppliers after batch 7: %', (SELECT COUNT(*) FROM supplier_organization_affiliations WHERE organization_id = nmbs_org_id);
END $$;
