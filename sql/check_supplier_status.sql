-- Create a simple supplier import function using existing pattern
-- We'll use SELECT queries to verify the current state first

-- Check current supplier count
SELECT COUNT(*) as total_suppliers FROM suppliers;

-- Check current NMBS affiliations
SELECT COUNT(*) as nmbs_affiliations 
FROM supplier_organization_affiliations 
WHERE organization_id = '9307d673-0fb8-4533-8c6f-d9c1f114330c';

-- Check if our test suppliers already exist
SELECT supplier_name, id 
FROM suppliers 
WHERE supplier_name IN (
    'Acheson & Glover',
    'Ademco 1 Ltd, Honeywell Home', 
    'Adey Innovations'
);

-- Check the current RLS policies on suppliers table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'suppliers';
