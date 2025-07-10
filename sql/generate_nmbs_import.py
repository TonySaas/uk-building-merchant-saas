#!/usr/bin/env python3
"""
Generate SQL script to import all NMBS suppliers from CSV file
"""

import csv
import re
from urllib.parse import urlparse

def create_slug(name):
    """Create a URL-friendly slug from supplier name"""
    slug = re.sub(r'[^a-zA-Z0-9\s-]', '', name.lower())
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

def normalize_url(url):
    """Normalize URL to include https:// if missing"""
    if not url.startswith(('http://', 'https://')):
        url = 'https://' + url
    return url.rstrip('/')

def escape_sql_string(text):
    """Escape single quotes for SQL"""
    return text.replace("'", "''")

def main():
    csv_file = '/Users/tonyboyle/Library/CloudStorage/Dropbox/MERCHANT DEALS Folder Dropbox/MERCHANT DEALS DATA/NMBS Merchants and Suppliers/NMBS_Suppliers_Names_Websites_306.csv'
    
    # List of suppliers already imported
    already_imported = {
        'Abracs',
        'ACO Technologies plc', 
        'Makita UK Ltd',
        'Draper Tools',
        'British Gypsum'
    }
    
    sql_script = """-- Import All NMBS Suppliers with Organization Affiliations
-- Generated script to import all suppliers from CSV, excluding already imported ones

DO $$
DECLARE
    nmbs_org_id uuid := '9307d673-0fb8-4533-8c6f-d9c1f114330c'::uuid;
    new_supplier_id uuid;
    existing_supplier_id uuid;
    supplier_count integer := 0;
    skipped_count integer := 0;
    affiliation_count integer := 0;
BEGIN
    RAISE NOTICE 'Starting NMBS supplier import process...';

"""

    with open(csv_file, 'r', encoding='utf-8-sig') as file:
        reader = csv.DictReader(file)
        for row in reader:
            supplier_name = row['supplier_name'].strip()
            supplier_website = row['supplier_website'].strip()
            
            # Skip already imported suppliers
            if supplier_name in already_imported:
                continue
            
            # Clean and prepare data
            escaped_name = escape_sql_string(supplier_name)
            slug = create_slug(supplier_name)
            normalized_url = normalize_url(supplier_website)
            escaped_url = escape_sql_string(normalized_url)
            
            # Create description
            description = f'NMBS affiliated supplier providing building materials and related products.'
            
            sql_script += f"""    -- {escaped_name}
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = '{escaped_name}';
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, country, is_active, created_at, updated_at
        ) VALUES (
            '{escaped_name}', '{slug}', '{description}', '{escaped_url}', 'United Kingdom', true, now(), now()
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
            '{{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_2025_01_08", "import_batch": "full_nmbs_import", "supplier_name": "{escaped_name}"}}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

"""

    sql_script += """    RAISE NOTICE 'NMBS import completed: % new suppliers, % existing suppliers skipped, % affiliations created', 
                 supplier_count, skipped_count, affiliation_count;
    
    -- Final verification
    RAISE NOTICE 'Total NMBS suppliers now: %', (SELECT COUNT(*) FROM supplier_organization_affiliations WHERE organization_id = nmbs_org_id);
END $$;
"""

    # Write the SQL script
    output_file = '/Users/tonyboyle/uk-building-merchant-saas/sql/import_all_nmbs_suppliers_complete.sql'
    with open(output_file, 'w') as f:
        f.write(sql_script)
    
    print(f"SQL script generated: {output_file}")
    print(f"Ready to import {len([row for row in csv.DictReader(open(csv_file, 'r', encoding='utf-8-sig')) if row['supplier_name'].strip() not in already_imported])} suppliers")

if __name__ == '__main__':
    main()
