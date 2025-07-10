-- NMBS Suppliers Import Batch 2
-- Suppliers 20 to 40


-- Import supplier: Assa Abloy
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Assa Abloy', 'assa-abloy', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.yale.co.uk/en/yale/couk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Astroflame Fireseals Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Astroflame Fireseals Ltd', 'astroflame-fireseals-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.astroflame.com', 'United Kingdom', true, now(), now()
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


-- Import supplier: Avenue Insurance Partners Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Avenue Insurance Partners Ltd', 'avenue-insurance-partners-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.avenueinsurance.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Baxi Heating
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Baxi Heating', 'baxi-heating', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.baxiheating.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Belgrade Insulation Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Belgrade Insulation Ltd', 'belgrade-insulation-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.belgradeinsulations.com', 'United Kingdom', true, now(), now()
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


-- Import supplier: Birchwood Price Tools
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Birchwood Price Tools', 'birchwood-price-tools', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.birchwoodpricetools.com', 'United Kingdom', true, now(), now()
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


-- Import supplier: Birtely Group - Lintels/Expamet/Construction
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Birtely Group - Lintels/Expamet/Construction', 'birtely-group-lintelsexpametconstruction', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.birtleygroup.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: BIZ Power Tools Ltd
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'BIZ Power Tools Ltd', 'biz-power-tools-ltd', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.bizengineering.com', 'United Kingdom', true, now(), now()
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


-- Import supplier: BLM British Lead
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'BLM British Lead', 'blm-british-lead', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.britishlead.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Bostik
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Bostik', 'bostik', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.bostik.com/uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Bottom Line - energy consultants
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Bottom Line - energy consultants', 'bottom-line-energy-consultants', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.bottomlineutilities.com', 'United Kingdom', true, now(), now()
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


-- Import supplier: BP Oil UK Limited
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'BP Oil UK Limited', 'bp-oil-uk-limited', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.bp.com', 'United Kingdom', true, now(), now()
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


-- Import supplier: Bradstone & Charcon
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Bradstone & Charcon', 'bradstone-charcon', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.breedongroup.com', 'United Kingdom', true, now(), now()
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


-- Import supplier: Breedon Group
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Breedon Group', 'breedon-group', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.breedongroup.com', 'United Kingdom', true, now(), now()
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


-- Import supplier: Brett Landscaping
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Brett Landscaping', 'brett-landscaping', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.brettlandscaping.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Brett Martin
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Brett Martin', 'brett-martin', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.brettmartin.com', 'United Kingdom', true, now(), now()
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


-- Import supplier: Brian Hyde
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Brian Hyde', 'brian-hyde', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.brianhyde.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Briggs
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Briggs', 'briggs', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.briggssafetywear.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Bristol Tile Company
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Bristol Tile Company', 'bristol-tile-company', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.bristol-tile.co.uk', 'United Kingdom', true, now(), now()
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


-- Import supplier: Bruce Douglas Marketing Ltd (Ultratape)
WITH supplier_insert AS (
    INSERT INTO suppliers (
        supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
    ) VALUES (
        'Bruce Douglas Marketing Ltd (Ultratape)', 'bruce-douglas-marketing-ltd-ultratape', 'NMBS affiliated supplier providing building materials and related products.', 'https://www.ultratape.com', 'United Kingdom', true, now(), now()
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

