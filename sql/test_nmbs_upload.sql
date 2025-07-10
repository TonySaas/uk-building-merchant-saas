-- Simple test to verify we can upload NMBS suppliers
-- Insert just a few test suppliers first

INSERT INTO suppliers (
    supplier_name,
    slug,
    supplier_description,
    supplier_website,
    country,
    is_active,
    created_at,
    updated_at
) VALUES 
('Abracs Test', 'abracs-test', 'NMBS affiliated supplier providing abrasives and tools.', 'https://www.abracs.com/', 'United Kingdom', true, now(), now()),
('ACO Technologies Test', 'aco-technologies-test', 'NMBS affiliated supplier providing drainage solutions.', 'https://www.aco.co.uk/', 'United Kingdom', true, now(), now()),
('Makita UK Test', 'makita-uk-test', 'NMBS affiliated supplier providing power tools.', 'https://www.makitauk.com/', 'United Kingdom', true, now(), now())
ON CONFLICT (supplier_name) DO NOTHING;

-- Now create the affiliations
INSERT INTO supplier_organization_affiliations (
    supplier_id,
    organization_id,
    affiliation_type,
    status,
    joined_date,
    organization_specific_data,
    created_at,
    updated_at
)
SELECT 
    s.id,
    '9307d673-0fb8-4533-8c6f-d9c1f114330c'::uuid, -- NMBS organization ID
    'member',
    'active',
    now(),
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'test_import_2025_01_08',
        'website', s.supplier_website,
        'import_notes', 'Test import from NMBS_Suppliers_Names_Websites_306.csv'
    ),
    now(),
    now()
FROM suppliers s
WHERE s.supplier_name IN ('Abracs Test', 'ACO Technologies Test', 'Makita UK Test')
ON CONFLICT (supplier_id, organization_id) DO NOTHING;