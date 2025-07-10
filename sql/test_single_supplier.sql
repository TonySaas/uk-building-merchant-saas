-- Test single supplier insert for NMBS batch processing
-- Acheson & Glover test

WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Acheson & Glover', 'acheson-glover', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.ag.uk.com', 'United Kingdom', true, now(), now()
    ) 
    ON CONFLICT (supplier_name) DO UPDATE SET
        supplier_website = EXCLUDED.supplier_website,
        updated_at = now()
    RETURNING id, supplier_name
)
INSERT INTO supplier_organization_affiliations (
    supplier_id, organization_id, affiliation_type, status, joined_date, organization_specific_data, created_at, updated_at
) 
SELECT 
    supplier_insert.id,
    '9307d673-0fb8-4533-8c6f-d9c1f114330c'::uuid,
    'member',
    'active',
    now(),
    json_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_test',
        'import_batch', 'test_single',
        'supplier_name', supplier_insert.supplier_name
    )::jsonb,
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;
