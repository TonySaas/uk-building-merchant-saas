-- Create a simple RPC function to upload NMBS suppliers
CREATE OR REPLACE FUNCTION upload_nmbs_test()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result json;
    supplier_id_1 uuid;
    supplier_id_2 uuid;
    supplier_id_3 uuid;
    nmbs_org_id uuid := '9307d673-0fb8-4533-8c6f-d9c1f114330c'::uuid;
BEGIN
    -- Insert test suppliers
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
    ('Abracs', 'abracs', 'NMBS affiliated supplier providing abrasives and cutting tools.', 'https://www.abracs.com/', 'United Kingdom', true, now(), now()),
    ('ACO Technologies plc', 'aco-technologies-plc', 'NMBS affiliated supplier providing drainage solutions.', 'https://www.aco.co.uk/', 'United Kingdom', true, now(), now()),
    ('Makita UK Ltd', 'makita-uk-ltd', 'NMBS affiliated supplier providing power tools and equipment.', 'https://www.makitauk.com/', 'United Kingdom', true, now(), now())
    ON CONFLICT (supplier_name) DO UPDATE SET
        updated_at = now()
    RETURNING id INTO supplier_id_1;

    -- Get the supplier IDs
    SELECT id INTO supplier_id_1 FROM suppliers WHERE supplier_name = 'Abracs';
    SELECT id INTO supplier_id_2 FROM suppliers WHERE supplier_name = 'ACO Technologies plc';
    SELECT id INTO supplier_id_3 FROM suppliers WHERE supplier_name = 'Makita UK Ltd';

    -- Create organization affiliations
    INSERT INTO supplier_organization_affiliations (
        supplier_id,
        organization_id,
        affiliation_type,
        status,
        joined_date,
        organization_specific_data,
        created_at,
        updated_at
    ) VALUES 
    (supplier_id_1, nmbs_org_id, 'member', 'active', now(), 
     '{"membership_type": "supplier", "trading_status": "active", "data_source": "test_import_2025_01_08", "import_notes": "Test import - Abracs"}', now(), now()),
    (supplier_id_2, nmbs_org_id, 'member', 'active', now(), 
     '{"membership_type": "supplier", "trading_status": "active", "data_source": "test_import_2025_01_08", "import_notes": "Test import - ACO Technologies"}', now(), now()),
    (supplier_id_3, nmbs_org_id, 'member', 'active', now(), 
     '{"membership_type": "supplier", "trading_status": "active", "data_source": "test_import_2025_01_08", "import_notes": "Test import - Makita UK"}', now(), now())
    ON CONFLICT (supplier_id, organization_id) DO NOTHING;

    result := json_build_object(
        'success', true,
        'message', 'Test NMBS suppliers uploaded successfully',
        'suppliers_created', 3,
        'affiliations_created', 3
    );

    RETURN result;
END;
$$;