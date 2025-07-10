#!/usr/bin/env python3
"""
NMBS Supplier Import Script
Processes all remaining batches automatically through the API
"""

import json
import time
import sys
import os
from pathlib import Path

# Batch data for remaining batches (3-31)
def get_batch_file_path(batch_num):
    return f"/Users/tonyboyle/uk-building-merchant-saas/sql/nmbs_batch_{batch_num:02d}.json"

def load_batch_data(batch_num):
    """Load supplier data from batch file"""
    batch_file = get_batch_file_path(batch_num)
    try:
        with open(batch_file, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"❌ Batch file not found: {batch_file}")
        return []
    except json.JSONDecodeError:
        print(f"❌ Invalid JSON in batch file: {batch_file}")
        return []

def print_api_call(supplier, batch_num, supplier_index):
    """Print the API call for manual execution"""
    api_call = {
        "p_supplier_name": supplier["supplier_name"],
        "p_slug": supplier["slug"],
        "p_supplier_description": supplier["supplier_description"],
        "p_supplier_website": supplier["supplier_website"],
        "p_country": supplier["country"]
    }
    
    print(f"\n[Batch {batch_num:02d} - {supplier_index}] {supplier['supplier_name']}")
    print("="*60)
    print("supabase:postgrestRequest")
    print("method: POST")
    print("path: /rpc/import_supplier_with_nmbs_affiliation")
    print(f"body: {json.dumps(api_call)}")

def process_remaining_batches():
    """Process all remaining batches (3-31)"""
    print("🚀 NMBS Supplier Import - Remaining Batches (3-31)")
    print("="*60)
    
    total_suppliers = 0
    total_batches = 0
    
    # Process batches 3-31
    for batch_num in range(3, 32):
        print(f"\n📦 Processing Batch {batch_num:02d}")
        print("-" * 40)
        
        suppliers = load_batch_data(batch_num)
        
        if not suppliers:
            print(f"⚠️  Skipping batch {batch_num:02d} - no data")
            continue
            
        total_batches += 1
        batch_count = len(suppliers)
        total_suppliers += batch_count
        
        print(f"📊 Batch {batch_num:02d}: {batch_count} suppliers")
        
        # Print all API calls for this batch
        for i, supplier in enumerate(suppliers, 1):
            print_api_call(supplier, batch_num, i)
            
        print(f"\n✅ Batch {batch_num:02d} prepared ({batch_count} suppliers)")
    
    print(f"\n📈 SUMMARY")
    print("="*60)
    print(f"📦 Total batches processed: {total_batches}")
    print(f"👥 Total suppliers ready for import: {total_suppliers}")
    print(f"🎯 NMBS Organization ID: 9307d673-0fb8-4533-8c6f-d9c1f114330c")
    
    print(f"\n💡 NEXT STEPS:")
    print("1. Copy each API call above")
    print("2. Execute in order using MCP supabase:postgrestRequest")
    print("3. Verify successful responses")
    print("4. All suppliers will be created with NMBS affiliations")

if __name__ == "__main__":
    process_remaining_batches()
