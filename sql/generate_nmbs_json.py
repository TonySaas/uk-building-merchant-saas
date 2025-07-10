#!/usr/bin/env python3
"""
Generate individual INSERT statements for NMBS suppliers
"""

import csv
import re
import json

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
    
    # Read suppliers from CSV and create JSON for MCP API calls
    suppliers_data = []
    
    with open(csv_file, 'r', encoding='utf-8-sig') as file:
        reader = csv.DictReader(file)
        for row in reader:
            supplier_name = row['supplier_name'].strip()
            supplier_website = row['supplier_website'].strip()
            
            # Skip already imported suppliers
            if supplier_name not in already_imported:
                suppliers_data.append({
                    "supplier_name": supplier_name,
                    "slug": create_slug(supplier_name),
                    "supplier_description": "NMBS affiliated supplier providing building materials and related products.",
                    "supplier_website": normalize_url(supplier_website),
                    "country": "United Kingdom",
                    "is_active": True
                })
    
    # Create batches of 10 suppliers each for manageable processing
    batch_size = 10
    total_suppliers = len(suppliers_data)
    
    print(f"Creating batches for {total_suppliers} suppliers")
    
    for i in range(0, total_suppliers, batch_size):
        batch = suppliers_data[i:i + batch_size]
        batch_num = (i // batch_size) + 1
        
        # Save batch as JSON file for manual processing
        output_file = f'/Users/tonyboyle/uk-building-merchant-saas/sql/nmbs_batch_{batch_num:02d}.json'
        with open(output_file, 'w') as f:
            json.dump(batch, f, indent=2)
        
        print(f"Batch {batch_num:2d}: {len(batch):2d} suppliers -> {output_file}")
        
        # Also create individual API call examples
        api_calls_file = f'/Users/tonyboyle/uk-building-merchant-saas/sql/nmbs_batch_{batch_num:02d}_api_calls.txt'
        with open(api_calls_file, 'w') as f:
            f.write(f"# API calls for NMBS Batch {batch_num}\n\n")
            
            for supplier in batch:
                f.write(f"# {supplier['supplier_name']}\n")
                f.write("supabase:postgrestRequest\n")
                f.write("method: POST\n")
                f.write("path: /suppliers\n")
                f.write(f"body: {json.dumps(supplier)}\n\n")
    
    # Create a simple first batch test file
    test_batch = suppliers_data[:3]
    with open('/Users/tonyboyle/uk-building-merchant-saas/sql/test_first_3_suppliers.json', 'w') as f:
        json.dump(test_batch, f, indent=2)
    
    print(f"\nCreated test file with first 3 suppliers: test_first_3_suppliers.json")
    print("Ready for import!")

if __name__ == '__main__':
    main()
