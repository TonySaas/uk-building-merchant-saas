-- NMBS Suppliers Import Batch 11
-- Suppliers 200 to 220


-- Import supplier: Presto International UK Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Presto International UK Ltd', 'presto-international-uk-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.presto-tools.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Primaflow Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Primaflow Ltd', 'primaflow-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.primaflowfandp.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Principal Building Products Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Principal Building Products Ltd', 'principal-building-products-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.pbpltd.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Progressive Safety Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Progressive Safety Ltd', 'progressive-safety-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.psf.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Qualtex
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Qualtex', 'qualtex', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.qualtexuk.com', 'United Kingdom', true, now(), now()
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


-- Import supplier: Quanti-Quote
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Quanti-Quote', 'quanti-quote', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.quantiquote.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Quinn Building Products
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Quinn Building Products', 'quinn-building-products', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.quinn-buildingproducts.com', 'United Kingdom', true, now(), now()
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


-- Import supplier: Red Gorilla International
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Red Gorilla International', 'red-gorilla-international', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.redgorilla.red', 'United Kingdom', true, now(), now()
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


-- Import supplier: Regin Products Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Regin Products Ltd', 'regin-products-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.regin.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Reisser Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Reisser Ltd', 'reisser-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.reisser.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Reliance Manufacturing
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Reliance Manufacturing', 'reliance-manufacturing', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.reliancewheelbarrows.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Resapol Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Resapol Ltd', 'resapol-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.resapol.com', 'United Kingdom', true, now(), now()
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


-- Import supplier: Resources Group
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Resources Group', 'resources-group', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.the-resources-group.com', 'United Kingdom', true, now(), now()
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


-- Import supplier: Rexel
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Rexel', 'rexel', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.rexel.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Robert Bosch Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Robert Bosch Ltd', 'robert-bosch-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.bosch-professional.com/gb/en', 'United Kingdom', true, now(), now()
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


-- Import supplier: Rockwool UK
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Rockwool UK', 'rockwool-uk', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.rockwool.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Rodo Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Rodo Ltd', 'rodo-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.prodec.uk.com', 'United Kingdom', true, now(), now()
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


-- Import supplier: Rollins & Sons
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Rollins & Sons', 'rollins-sons', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.rollins.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: ROM Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'ROM Ltd', 'rom-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.rom.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Rothenberger
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Rothenberger', 'rothenberger', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.rothenberger.com/us-en', 'United Kingdom', true, now(), now()
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

