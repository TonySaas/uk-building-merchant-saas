#!/usr/bin/env python3
"""
Import NMBS suppliers using Supabase Python client
"""

import csv
import re
import json
import requests
import time
from datetime import datetime

# Supabase configuration
SUPABASE_URL = "https://wmjfxhdoqzvzrjgmgpni.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtamZ4aGRvcXp2enJqZ21ncG5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzNTc2MDcsImV4cCI6MjA1MTkzMzYwN30.lnOUGJNX2aWu5FcAwVkMQEJSRjkFrFkdH2-R8I8Epo8"
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

def call_supabase_rpc(function_name, parameters=None):
    """Call a Supabase RPC function"""
    url = f"{SUPABASE_URL}/rest/v1/rpc/{function_name}"
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json"
    }
    
    response = requests.post(url, headers=headers, json=parameters or {})
    return response

def create_import_function():
    """Create the import function using SQL"""
    sql = """
CREATE OR REPLACE FUNCTION public.import_single_supplier(
    p_name text,
    p_slug text,
    p_description text,
    p_website text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    nmbs_org_id uuid := '9307d673-0fb8-4533-8c6f-d9c1f114330c'::uuid;
    new_supplier_id uuid;
    existing_supplier_id uuid;
    result jsonb;
BEGIN
    -- Check if supplier already exists
    SELECT id INTO existing_supplier_id FROM suppliers WHERE supplier_name = p_name;
    
    IF existing_supplier_id IS NULL THEN
        -- Insert new supplier
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, 
            country, is_active, created_at, updated_at
        ) VALUES (
            p_name, p_slug, p_description, p_website,
            'United Kingdom', true, now(), now()
        ) RETURNING id INTO new_supplier_id;
    ELSE
        new_supplier_id := existing_supplier_id;
    END IF;
    
    -- Create organization affiliation if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM supplier_organization_affiliations 
        WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id
    ) THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, 
            joined_date, organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active',
            now(), 
            jsonb_build_object(
                'membership_type', 'supplier',
                'trading_status', 'active',
                'data_source', 'python_import_2025_01_08',
                'supplier_name', p_name
            ),
            now(), now()
        );
    END IF;
    
    RETURN jsonb_build_object(
        'success', true,
        'supplier_id', new_supplier_id,
        'supplier_name', p_name,
        'action', CASE WHEN existing_supplier_id IS NULL THEN 'created' ELSE 'existed' END
    );
END;
$$;
"""
    
    # Execute SQL via RPC
    response = call_supabase_rpc("exec_sql", {"sql": sql})
    return response

def import_supplier(name, website):
    """Import a single supplier"""
    slug = create_slug(name)
    description = "NMBS affiliated supplier providing building materials and related products."
    normalized_website = normalize_url(website)
    
    response = call_supabase_rpc("import_single_supplier", {
        "p_name": name,
        "p_slug": slug,
        "p_description": description,
        "p_website": normalized_website
    })
    
    return response

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
    
    print("Testing RPC function creation...")
    # Note: Function creation might fail if exec_sql doesn't exist
    # That's okay, we'll proceed with manual execution
    
    # Read suppliers from CSV
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
    
    # Test with first 5 suppliers
    success_count = 0
    error_count = 0
    
    for i, (name, website) in enumerate(suppliers_to_import[:5]):
        print(f"Importing {i+1}/5: {name}")
        
        try:
            response = import_supplier(name, website)
            if response.status_code == 200:
                result = response.json()
                print(f"  ✓ Success: {result}")
                success_count += 1
            else:
                print(f"  ✗ Error {response.status_code}: {response.text}")
                error_count += 1
        except Exception as e:
            print(f"  ✗ Exception: {e}")
            error_count += 1
        
        # Small delay to avoid rate limiting
        time.sleep(0.5)
    
    print(f"\nTest completed: {success_count} successes, {error_count} errors")

if __name__ == '__main__':
    main()
