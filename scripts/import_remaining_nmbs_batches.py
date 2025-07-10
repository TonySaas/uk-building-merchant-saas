#!/usr/bin/env python3
"""
NMBS Supplier Import - Automated Batch Processor
Processes remaining NMBS supplier batches efficiently via Supabase API
"""

import json
import requests
import time
import os
from pathlib import Path

# Supabase configuration
SUPABASE_URL = "https://lpsfnwbkofjpzmlbcztw.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwc2Zud2Jrb2ZqcHptbGJjenR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODkyMTQsImV4cCI6MjA2NzU2NTIxNH0.9smyBWRy1UgqEZS2FDrZ0fuK41l_7qevbK99cia6328"

# Headers for Supabase API
headers = {
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
    "Content-Type": "application/json"
}

def import_supplier(supplier_data):
    """Import a single supplier via Supabase function"""
    url = f"{SUPABASE_URL}/rest/v1/rpc/import_supplier_with_nmbs_affiliation"
    
    payload = {
        "p_supplier_name": supplier_data["supplier_name"],
        "p_slug": supplier_data["slug"], 
        "p_supplier_description": supplier_data["supplier_description"],
        "p_supplier_website": supplier_data["supplier_website"],
        "p_country": supplier_data["country"]
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        if response.status_code == 200:
            result = response.json()
            if result.get("success"):
                return True, result
            else:
                return False, result
        else:
            return False, {"error": f"HTTP {response.status_code}", "response": response.text}
    except Exception as e:
        return False, {"error": str(e)}

def process_batch(batch_number):
    """Process a single batch of suppliers"""
    batch_file = f"/Users/tonyboyle/uk-building-merchant-saas/sql/nmbs_batch_{batch_number:02d}.json"
    
    if not os.path.exists(batch_file):
        print(f"❌ Batch file not found: {batch_file}")
        return False, 0
    
    print(f"🚀 Processing Batch {batch_number}...")
    
    try:
        with open(batch_file, 'r') as f:
            suppliers = json.load(f)
        
        success_count = 0
        
        for i, supplier in enumerate(suppliers, 1):
            print(f"  📤 Importing {i}/10: {supplier['supplier_name']}")
            
            success, result = import_supplier(supplier)
            
            if success:
                print(f"  ✅ Success: {supplier['supplier_name']}")
                success_count += 1
            else:
                print(f"  ❌ Failed: {supplier['supplier_name']} - {result}")
            
            # Small delay to avoid overwhelming the API
            time.sleep(0.5)
        
        print(f"📊 Batch {batch_number} complete: {success_count}/10 successful")
        return True, success_count
        
    except Exception as e:
        print(f"❌ Error processing batch {batch_number}: {e}")
        return False, 0

def get_current_supplier_count():
    """Get current supplier count from database"""
    url = f"{SUPABASE_URL}/rest/v1/suppliers?select=count"
    
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            result = response.json()
            return result[0]["count"]
        else:
            return None
    except Exception as e:
        print(f"Error getting supplier count: {e}")
        return None

def main():
    """Main execution function"""
    print("🎯 NMBS Supplier Import - Automated Batch Processor")
    print("=" * 60)
    
    # Get starting count
    start_count = get_current_supplier_count()
    if start_count is None:
        print("❌ Could not get starting supplier count")
        return
    
    print(f"📊 Starting supplier count: {start_count}")
    print()
    
    # Process batches 6-31 (batch 5 was just completed manually)
    total_imported = 0
    successful_batches = 0
    
    for batch_num in range(6, 32):  # Batches 6-31
        success, count = process_batch(batch_num)
        
        if success:
            successful_batches += 1
            total_imported += count
        
        # Get current count
        current_count = get_current_supplier_count()
        if current_count:
            print(f"📈 Current total: {current_count} suppliers")
        
        print()  # Empty line between batches
        
        # Small break between batches
        time.sleep(1)
    
    # Final summary
    print("🏁 IMPORT COMPLETE!")
    print("=" * 60)
    print(f"📊 Successful batches: {successful_batches}/26")
    print(f"📈 Total suppliers imported: {total_imported}")
    
    final_count = get_current_supplier_count()
    if final_count:
        print(f"📋 Final supplier count: {final_count}")
        print(f"🚀 Suppliers added this session: {final_count - start_count}")

if __name__ == "__main__":
    main()
