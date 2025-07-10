#!/usr/bin/env python3
# Automated script to process all NMBS supplier batches
# This would be used if you want to automate the process

import json
import requests
import time

# Supabase configuration
SUPABASE_URL = "YOUR_SUPABASE_URL"
SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY"

def get_headers():
    return {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': f'Bearer {SUPABASE_ANON_KEY}',
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    }

def import_supplier(supplier_data):
    url = f"{SUPABASE_URL}/rest/v1/rpc/import_supplier_with_nmbs_affiliation"
    
    payload = {
        "p_supplier_name": supplier_data["supplier_name"],
        "p_slug": supplier_data["slug"], 
        "p_supplier_description": supplier_data["supplier_description"],
        "p_supplier_website": supplier_data["supplier_website"],
        "p_country": supplier_data["country"]
    }
    
    response = requests.post(url, headers=get_headers(), json=payload)
    
    if response.status_code == 200:
        return True, response.json()
    else:
        return False, f"Error {response.status_code}: {response.text}"

def process_batch(batch_file):
    with open(batch_file, 'r') as f:
        suppliers = json.load(f)
    
    results = []
    for supplier in suppliers:
        success, result = import_supplier(supplier)
        results.append({
            'supplier_name': supplier['supplier_name'],
            'success': success,
            'result': result
        })
        time.sleep(0.2)  # Small delay between requests
    
    return results

def main():
    # Process all batches
    for batch_num in range(1, 32):
        batch_file = f'/Users/tonyboyle/uk-building-merchant-saas/sql/nmbs_batch_{batch_num:02d}.json'
        print(f"Processing batch {batch_num}...")
        
        results = process_batch(batch_file)
        
        success_count = sum(1 for r in results if r['success'])
        print(f"Batch {batch_num}: {success_count}/{len(results)} successful")
        
        if success_count < len(results):
            print("Some suppliers failed, stopping...")
            break

if __name__ == '__main__':
    main()
