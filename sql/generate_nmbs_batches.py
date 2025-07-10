#!/usr/bin/env python3
"""
Generate SQL scripts in batches for NMBS supplier import
"""

import csv
import re
import math

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

def create_batch_script(suppliers_batch, batch_num, total_batches):
    """Create SQL script for a batch of suppliers"""
    
    sql_script = f"""-- Import NMBS Suppliers Batch {batch_num} of {total_batches}
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
    RAISE NOTICE 'Starting NMBS supplier import batch {batch_num} of {total_batches}...';

"""

    for supplier_name, supplier_website in suppliers_batch:
        escaped_name = escape_sql_string(supplier_name)
        slug = create_slug(supplier_name)
        normalized_url = normalize_url(supplier_website)
        escaped_url = escape_sql_string(normalized_url)
        
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
            '{{"membership_type": "supplier", "trading_status": "active", "data_source": "csv_import_batch_{batch_num}", "import_batch": "nmbs_batch_{batch_num}_of_{total_batches}", "supplier_name": "{escaped_name}"}}'::jsonb,
            now(), now()
        );
        affiliation_count := affiliation_count + 1;
    END IF;

"""

    sql_script += f"""    RAISE NOTICE 'NMBS batch {batch_num} completed: % new suppliers, % existing suppliers skipped, % affiliations created', 
                 supplier_count, skipped_count, affiliation_count;
                 
    -- Current total NMBS suppliers after this batch
    RAISE NOTICE 'Total NMBS suppliers after batch {batch_num}: %', (SELECT COUNT(*) FROM supplier_organization_affiliations WHERE organization_id = nmbs_org_id);
END $$;
"""

    return sql_script

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
    
    # Read all suppliers from CSV
    suppliers_to_import = []
    with open(csv_file, 'r', encoding='utf-8-sig') as file:
        reader = csv.DictReader(file)
        for row in reader:
            supplier_name = row['supplier_name'].strip()
            supplier_website = row['supplier_website'].strip()
            
            # Skip already imported suppliers
            if supplier_name not in already_imported:
                suppliers_to_import.append((supplier_name, supplier_website))
    
    # Create batches of 50 suppliers each
    batch_size = 50
    total_suppliers = len(suppliers_to_import)
    total_batches = math.ceil(total_suppliers / batch_size)
    
    print(f"Creating {total_batches} batches for {total_suppliers} suppliers")
    
    for i in range(total_batches):
        start_idx = i * batch_size
        end_idx = min((i + 1) * batch_size, total_suppliers)
        batch = suppliers_to_import[start_idx:end_idx]
        
        batch_num = i + 1
        sql_script = create_batch_script(batch, batch_num, total_batches)
        
        # Write the batch SQL script
        output_file = f'/Users/tonyboyle/uk-building-merchant-saas/sql/import_nmbs_batch_{batch_num:02d}_of_{total_batches:02d}.sql'
        with open(output_file, 'w') as f:
            f.write(sql_script)
        
        print(f"Batch {batch_num:2d}/{total_batches}: {len(batch):2d} suppliers -> {output_file}")

if __name__ == '__main__':
    main()
