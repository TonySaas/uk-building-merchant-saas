-- NMBS Suppliers Import Batch 3
-- Suppliers 40 to 60


-- Import supplier: BSW Timber Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'BSW Timber Ltd', 'bsw-timber-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.bsw.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Buckler Boots Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Buckler Boots Ltd', 'buckler-boots-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.bucklerboots.com', 'United Kingdom', true, now(), now()
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


-- Import supplier: Building Adhesives (Dunlop)
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Building Adhesives (Dunlop)', 'building-adhesives-dunlop', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.dunloptrade.com', 'United Kingdom', true, now(), now()
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


-- Import supplier: Burg-Wachter UK Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Burg-Wachter UK Ltd', 'burg-wachter-uk-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.burg.biz/uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Business Insurance Services
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Business Insurance Services', 'business-insurance-services', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.mofs.co.uk/bis', 'United Kingdom', true, now(), now()
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


-- Import supplier: Calder Lead
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Calder Lead', 'calder-lead', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.calderlead.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Calders and Grandidge
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Calders and Grandidge', 'calders-and-grandidge', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.caldersandgrandidge.com', 'United Kingdom', true, now(), now()
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


-- Import supplier: Carlisle Brass
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Carlisle Brass', 'carlisle-brass', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.carlislebrass.com', 'United Kingdom', true, now(), now()
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


-- Import supplier: Castacrete Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Castacrete Ltd', 'castacrete-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.castacrete.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Castle Brooke Tools
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Castle Brooke Tools', 'castle-brooke-tools', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.castlebrooke.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Catnic
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Catnic', 'catnic', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.catnic.com', 'United Kingdom', true, now(), now()
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


-- Import supplier: Cavity Trays Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Cavity Trays Ltd', 'cavity-trays-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.cavitytrays.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: CDA Group
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'CDA Group', 'cda-group', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.cda.eu', 'United Kingdom', true, now(), now()
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


-- Import supplier: Cellecta Limited
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Cellecta Limited', 'cellecta-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.cellecta.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Cembrit
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Cembrit', 'cembrit', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.cembrit.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Cemex Concrete Products
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Cemex Concrete Products', 'cemex-concrete-products', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.cemex.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Centurion Europe Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Centurion Europe Ltd', 'centurion-europe-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.centurioneurope.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Ceramic Tile Distributors
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Ceramic Tile Distributors', 'ceramic-tile-distributors', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.ctdtiles.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Chain Products
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Chain Products', 'chain-products', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.chainproducts.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Charltons Gates & Fencing
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Charltons Gates & Fencing', 'charltons-gates-fencing', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.charltonsgates.com', 'United Kingdom', true, now(), now()
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

