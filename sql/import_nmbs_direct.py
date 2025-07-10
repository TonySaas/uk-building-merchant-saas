#!/usr/bin/env python3
"""
Import NMBS suppliers using direct REST API calls
"""

import csv
import re
import requests
import json
import time

# Supabase configuration
SUPABASE_URL = "https://ymhnogsrjcbgzlnrwgue.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltaG5vZ3NyamNiZ3psbnJ3Z3VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzNjEzMzIsImV4cCI6MjA1MTkzNzMzMn0.HfLuafGcO1QhgT8dXx6JCQNpWCw0GUMLkF5nh_Q5w_s"

NMBS_ORG_ID = "9307d673-0fb8-4533-8c6f-d9c1f114330c"

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

def get_headers():
    """Get headers for API requests"""
    return {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': f'Bearer {SUPABASE_ANON_KEY}',
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    }

def check_supplier_exists(supplier_name):
    """Check if supplier already exists"""
    url = f"{SUPABASE_URL}/rest/v1/suppliers"
    params = {
        'supplier_name': f'eq.{supplier_name}',
        'select': 'id,supplier_name'
    }
    
    response = requests.get(url, headers=get_headers(), params=params)
    
    if response.status_code == 200:
        data = response.json()
        return data[0]['id'] if data else None
    return None

def create_supplier(supplier_data):
    """Create a new supplier"""
    url = f"{SUPABASE_URL}/rest/v1/suppliers"
    
    response = requests.post(url, headers=get_headers(), json=supplier_data)
    
    if response.status_code == 201:
        return response.json()[0]['id']
    else:
        print(f"Error creating supplier {supplier_data['supplier_name']}: {response.status_code}")
        print(f"Response: {response.text}")
        return None

def check_affiliation_exists(supplier_id, organization_id):
    """Check if supplier-organization affiliation exists"""
    url = f"{SUPABASE_URL}/rest/v1/supplier_organization_affiliations"
    params = {
        'supplier_id': f'eq.{supplier_id}',
        'organization_id': f'eq.{organization_id}',
        'select': 'id'
    }
    
    response = requests.get(url, headers=get_headers(), params=params)
    
    if response.status_code == 200:
        data = response.json()
        return len(data) > 0
    return False

def create_affiliation(supplier_id, organization_id, supplier_name):
    """Create supplier-organization affiliation"""
    url = f"{SUPABASE_URL}/rest/v1/supplier_organization_affiliations"
    
    affiliation_data = {
        "supplier_id": supplier_id,
        "organization_id": organization_id,
        "affiliation_type": "member",
        "status": "active",
        "organization_specific_data": {
            "membership_type": "supplier",
            "trading_status": "active",
            "data_source": "csv_import_2025_01_08",
            "import_batch": "nmbs_python_import",
            "supplier_name": supplier_name
        }
    }
    
    response = requests.post(url, headers=get_headers(), json=affiliation_data)
    
    if response.status_code == 201:
        return True
    else:
        print(f"Error creating affiliation for {supplier_name}: {response.status_code}")
        print(f"Response: {response.text}")
        return False

def import_single_supplier(supplier_name, supplier_website):
    """Import a single supplier with NMBS affiliation"""
    
    # Check if supplier already exists
    existing_supplier_id = check_supplier_exists(supplier_name)
    
    if existing_supplier_id:
        print(f"Supplier '{supplier_name}' already exists with ID: {existing_supplier_id}")
        supplier_id = existing_supplier_id
    else:
        # Create new supplier
        supplier_data = {
            "supplier_name": supplier_name,
            "slug": create_slug(supplier_name),
            "supplier_description": "NMBS affiliated supplier providing building materials and related products.",
            "supplier_website": normalize_url(supplier_website),
            "country": "United Kingdom",
            "is_active": True
        }
        
        supplier_id = create_supplier(supplier_data)
        if not supplier_id:
            return False, "Failed to create supplier"
        
        print(f"Created supplier '{supplier_name}' with ID: {supplier_id}")
    
    # Check if affiliation already exists
    if check_affiliation_exists(supplier_id, NMBS_ORG_ID):
        print(f"Affiliation already exists for '{supplier_name}'")
        return True, "Affiliation already exists"
    
    # Create affiliation
    if create_affiliation(supplier_id, NMBS_ORG_ID, supplier_name):
        print(f"Created NMBS affiliation for '{supplier_name}'")
        return True, "Successfully imported"
    else:
        return False, "Failed to create affiliation"

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
    
    # Start with a test batch of 3 suppliers
    test_batch = suppliers_to_import[:3]
    
    print("Starting test import with first 3 suppliers...")
    
    success_count = 0
    failure_count = 0
    
    for supplier_name, supplier_website in test_batch:
        success, message = import_single_supplier(supplier_name, supplier_website)
        if success:
            success_count += 1
        else:
            failure_count += 1
            print(f"Failed to import {supplier_name}: {message}")
        
        # Small delay between requests to avoid rate limiting
        time.sleep(0.5)
    
    print(f"\nTest batch results: {success_count} successful, {failure_count} failed")
    
    if success_count > 0:
        response = input("Continue with full import? (y/n): ")
        if response.lower() == 'y':
            print("Starting full import...")
            
            remaining_suppliers = suppliers_to_import[3:]  # Skip test batch
            total_success = success_count
            total_failure = failure_count
            
            for i, (supplier_name, supplier_website) in enumerate(remaining_suppliers, 1):
                print(f"Processing {i}/{len(remaining_suppliers)}: {supplier_name}")
                
                success, message = import_single_supplier(supplier_name, supplier_website)
                if success:
                    total_success += 1
                else:
                    total_failure += 1
                    print(f"Failed to import {supplier_name}: {message}")
                
                # Progress update every 25 suppliers
                if i % 25 == 0:
                    print(f"Progress: {i}/{len(remaining_suppliers)} processed")
                
                # Small delay between requests
                time.sleep(0.3)
            
            print(f"\nFinal results: {total_success} successful, {total_failure} failed")
        else:
            print("Full import cancelled")
    else:
        print("Test batch failed completely, not continuing")

if __name__ == '__main__':
    main()
