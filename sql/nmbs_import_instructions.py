#!/usr/bin/env python3
"""
Script to import all NMBS suppliers using the custom RPC function
Run this AFTER creating the import_supplier_with_nmbs_affiliation function
"""

import json
import time

def simulate_rpc_calls():
    """Generate the RPC calls that need to be made"""
    
    # Load the test batch first
    with open('/Users/tonyboyle/uk-building-merchant-saas/sql/test_first_3_suppliers.json', 'r') as f:
        test_suppliers = json.load(f)
    
    print("=== TEST BATCH RPC CALLS ===")
    print("Execute these calls one by one to test:")
    print()
    
    for i, supplier in enumerate(test_suppliers, 1):
        print(f"# Test Supplier {i}: {supplier['supplier_name']}")
        print("supabase:postgrestRequest")
        print("method: POST")
        print("path: /rpc/import_supplier_with_nmbs_affiliation")
        print("body:", json.dumps({
            "p_supplier_name": supplier["supplier_name"],
            "p_slug": supplier["slug"], 
            "p_supplier_description": supplier["supplier_description"],
            "p_supplier_website": supplier["supplier_website"],
            "p_country": supplier["country"]
        }))
        print()
    
    print("=== AFTER SUCCESSFUL TEST ===")
    print("If the test batch works, here are the batch file locations:")
    print()
    
    # List all batch files
    for batch_num in range(1, 32):  # 31 batches total
        batch_file = f'/Users/tonyboyle/uk-building-merchant-saas/sql/nmbs_batch_{batch_num:02d}.json'
        print(f"Batch {batch_num:2d}: {batch_file}")
    
    print()
    print("=== PROCESSING INSTRUCTIONS ===")
    print("1. First execute the CREATE FUNCTION SQL in Supabase SQL Editor")
    print("2. Test with the 3 suppliers above")
    print("3. If successful, process each batch file using the pattern shown")
    print("4. Each batch contains 10 suppliers (except the last which has 1)")
    print("5. Total suppliers to import: 301")

def generate_batch_processing_script():
    """Generate a script to process all batches"""
    
    script_content = """#!/usr/bin/env python3
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
"""
    
    with open('/Users/tonyboyle/uk-building-merchant-saas/sql/automated_batch_processor.py', 'w') as f:
        f.write(script_content)
    
    print("Created automated_batch_processor.py for future use")

if __name__ == '__main__':
    simulate_rpc_calls()
    generate_batch_processing_script()
