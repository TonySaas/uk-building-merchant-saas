#!/usr/bin/env python3
"""
Import NMBS suppliers using Supabase Python client
"""

import csv
import re
import requests
import json
import time
import os

# Supabase configuration - these would normally be environment variables
SUPABASE_URL = "https://ymhnogsrjcbgzlnrwgue.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltaG5vZ3NyamNiZ3psbnJ3Z3VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzNjEzMzIsImV4cCI6MjA1MTkzNzMzMn0.HfLuafGcO1QhgT8dXx6JCQNpWCw0GUMLkF5nh_Q5w_s"

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

def call_rpc_function(function_name, params=None):
    """Call a Supabase RPC function"""
    headers = {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': f'Bearer {SUPABASE_ANON_KEY}',
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    }
    
    url = f"{SUPABASE_URL}/rest/v1/rpc/{function_name}"
    
    response = requests.post(url, headers=headers, json=params or {})
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error calling {function_name}: {response.status_code}")
        print(f"Response: {response.text}")
        return None

def import_suppliers_batch(suppliers_batch, batch_num):
    """Import a batch of suppliers using RPC function"""
    
    # Prepare supplier data for the batch
    supplier_data = []
    for supplier_name, supplier_website in suppliers_batch:
        slug = create_slug(supplier_name)
        normalized_url = normalize_url(supplier_website)
        
        supplier_data.append({
            "supplier_name": supplier_name,
            "slug": slug,
            "supplier_description": "NMBS affiliated supplier providing building materials and related products.",
            "supplier_website": normalized_url,
            "country": "United Kingdom",
            "is_active": True
        })
    
    print(f"Importing batch {batch_num} with {len(supplier_data)} suppliers...")
    
    # Call the RPC function
    result = call_rpc_function('import_nmbs_supplier_batch', {
        'supplier_data': supplier_data
    })
    
    if result:
        print(f"Batch {batch_num} results:")
        print(f"  Created: {result.get('suppliers_created', 0)}")
        print(f"  Skipped: {result.get('suppliers_skipped', 0)}")
        print(f"  Affiliations: {result.get('affiliations_created', 0)}")
        print(f"  Total NMBS suppliers: {result.get('total_nmbs_suppliers', 0)}")
        return True
    else:
        print(f"Failed to import batch {batch_num}")
        return False

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
    
    print(f"Found {len(suppliers_to_import)} suppliers to import")
    
    # First, let's test with a small batch of 5 suppliers
    test_batch = suppliers_to_import[:5]
    
    print("Starting test import with first 5 suppliers...")
    success = import_suppliers_batch(test_batch, "TEST")
    
    if success:
        print("Test batch successful! Ready to continue with full import.")
        
        # Ask for confirmation to continue
        response = input("Continue with full import? (y/n): ")
        if response.lower() == 'y':
            # Import remaining suppliers in batches of 25
            batch_size = 25
            remaining_suppliers = suppliers_to_import[5:]  # Skip the test batch
            
            for i in range(0, len(remaining_suppliers), batch_size):
                batch = remaining_suppliers[i:i + batch_size]
                batch_num = (i // batch_size) + 2  # Start from 2 since test was batch 1
                
                success = import_suppliers_batch(batch, batch_num)
                if not success:
                    print(f"Failed at batch {batch_num}, stopping import")
                    break
                
                # Small delay between batches
                time.sleep(1)
            
            print("Import completed!")
        else:
            print("Import cancelled by user")
    else:
        print("Test batch failed, not continuing with full import")

if __name__ == '__main__':
    main()
