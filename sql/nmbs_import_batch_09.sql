-- NMBS Suppliers Import Batch 9
-- Suppliers 160 to 180


-- Import supplier: Mark Vitow Limited
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Mark Vitow Limited', 'mark-vitow-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.markvitow.com', 'United Kingdom', true, now(), now()
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
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'import_batch', 'automated_import',
        'supplier_name', supplier_insert.supplier_name
    ),
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;


-- Import supplier: Marley Alutec
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Marley Alutec', 'marley-alutec', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.marleyalutec.co.uk', 'United Kingdom', true, now(), now()
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
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'import_batch', 'automated_import',
        'supplier_name', supplier_insert.supplier_name
    ),
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;


-- Import supplier: Marley Limited
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Marley Limited', 'marley-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.marley.co.uk', 'United Kingdom', true, now(), now()
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
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'import_batch', 'automated_import',
        'supplier_name', supplier_insert.supplier_name
    ),
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;


-- Import supplier: Marshalls
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Marshalls', 'marshalls', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.marshalls.co.uk', 'United Kingdom', true, now(), now()
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
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'import_batch', 'automated_import',
        'supplier_name', supplier_insert.supplier_name
    ),
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;


-- Import supplier: Marsh Industries
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Marsh Industries', 'marsh-industries', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.marshindustries.co.uk', 'United Kingdom', true, now(), now()
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
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'import_batch', 'automated_import',
        'supplier_name', supplier_insert.supplier_name
    ),
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;


-- Import supplier: Masefield Beta
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Masefield Beta', 'masefield-beta', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.masefield-beta.co.uk', 'United Kingdom', true, now(), now()
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
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'import_batch', 'automated_import',
        'supplier_name', supplier_insert.supplier_name
    ),
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;


-- Import supplier: MasterFlow
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'MasterFlow', 'masterflow', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.masterflow.uk.com', 'United Kingdom', true, now(), now()
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
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'import_batch', 'automated_import',
        'supplier_name', supplier_insert.supplier_name
    ),
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;


-- Import supplier: Maurice Lay / Caple
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Maurice Lay / Caple', 'maurice-lay-caple', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.caple.co.uk', 'United Kingdom', true, now(), now()
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
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'import_batch', 'automated_import',
        'supplier_name', supplier_insert.supplier_name
    ),
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;


-- Import supplier: Measure-Quip Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Measure-Quip Ltd', 'measure-quip-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.measure-quip.com', 'United Kingdom', true, now(), now()
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
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'import_batch', 'automated_import',
        'supplier_name', supplier_insert.supplier_name
    ),
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;


-- Import supplier: Melpass Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Melpass Ltd', 'melpass-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.melpass.co.uk', 'United Kingdom', true, now(), now()
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
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'import_batch', 'automated_import',
        'supplier_name', supplier_insert.supplier_name
    ),
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;


-- Import supplier: Mermaid Panels
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Mermaid Panels', 'mermaid-panels', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.mermaidpanels.com', 'United Kingdom', true, now(), now()
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
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'import_batch', 'automated_import',
        'supplier_name', supplier_insert.supplier_name
    ),
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;


-- Import supplier: Metabo UK Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Metabo UK Ltd', 'metabo-uk-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.metabo.com/uk/en', 'United Kingdom', true, now(), now()
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
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'import_batch', 'automated_import',
        'supplier_name', supplier_insert.supplier_name
    ),
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;


-- Import supplier: Methven UK
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Methven UK', 'methven-uk', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.methven.com', 'United Kingdom', true, now(), now()
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
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'import_batch', 'automated_import',
        'supplier_name', supplier_insert.supplier_name
    ),
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;


-- Import supplier: Midland Lead Limited
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Midland Lead Limited', 'midland-lead-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.midlandlead.co.uk', 'United Kingdom', true, now(), now()
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
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'import_batch', 'automated_import',
        'supplier_name', supplier_insert.supplier_name
    ),
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;


-- Import supplier: Milwaukee
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Milwaukee', 'milwaukee', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.milwaukeetool.co.uk', 'United Kingdom', true, now(), now()
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
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'import_batch', 'automated_import',
        'supplier_name', supplier_insert.supplier_name
    ),
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;


-- Import supplier: Mission Rubber
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Mission Rubber', 'mission-rubber', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.missionrubber.co.uk', 'United Kingdom', true, now(), now()
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
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'import_batch', 'automated_import',
        'supplier_name', supplier_insert.supplier_name
    ),
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;


-- Import supplier: M.Marcus Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'M.Marcus Ltd', 'mmarcus-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.m-marcus.com', 'United Kingdom', true, now(), now()
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
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'import_batch', 'automated_import',
        'supplier_name', supplier_insert.supplier_name
    ),
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;


-- Import supplier: Monarch Water Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Monarch Water Ltd', 'monarch-water-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.monarchwater.co.uk', 'United Kingdom', true, now(), now()
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
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'import_batch', 'automated_import',
        'supplier_name', supplier_insert.supplier_name
    ),
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;


-- Import supplier: Montpellier Domestic Appliances
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Montpellier Domestic Appliances', 'montpellier-domestic-appliances', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.montpellier-appliances.com', 'United Kingdom', true, now(), now()
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
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'import_batch', 'automated_import',
        'supplier_name', supplier_insert.supplier_name
    ),
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;


-- Import supplier: Monument Tools Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Monument Tools Ltd', 'monument-tools-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.monument-tools.com', 'United Kingdom', true, now(), now()
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
    jsonb_build_object(
        'membership_type', 'supplier',
        'trading_status', 'active',
        'data_source', 'csv_import_2025_01_08',
        'import_batch', 'automated_import',
        'supplier_name', supplier_insert.supplier_name
    ),
    now(),
    now()
FROM supplier_insert
ON CONFLICT (supplier_id, organization_id) DO NOTHING;

