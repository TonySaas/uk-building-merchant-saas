# NMBS Supplier Import - Batch 4-31 Execution Guide

## 🚀 BATCH 4 - READY FOR EXECUTION

Execute these 10 API calls in order:

### 1. Bottom Line - energy consultants
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Bottom Line - energy consultants", "p_slug": "bottom-line-energy-consultants", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.bottomlineutilities.com", "p_country": "United Kingdom"}
```

### 2. BP Oil UK Limited
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "BP Oil UK Limited", "p_slug": "bp-oil-uk-limited", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.bp.com", "p_country": "United Kingdom"}
```

### 3. Bradstone & Charcon
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Bradstone & Charcon", "p_slug": "bradstone-charcon", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.breedongroup.com", "p_country": "United Kingdom"}
```

### 4. Breedon Group
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Breedon Group", "p_slug": "breedon-group", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.breedongroup.com", "p_country": "United Kingdom"}
```

### 5. Brett Landscaping
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Brett Landscaping", "p_slug": "brett-landscaping", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.brettlandscaping.co.uk", "p_country": "United Kingdom"}
```

### 6. Brett Martin
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Brett Martin", "p_slug": "brett-martin", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.brettmartin.com", "p_country": "United Kingdom"}
```

### 7. Brian Hyde
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Brian Hyde", "p_slug": "brian-hyde", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.brianhyde.co.uk", "p_country": "United Kingdom"}
```

### 8. Briggs
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Briggs", "p_slug": "briggs", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.briggssafetywear.co.uk", "p_country": "United Kingdom"}
```

### 9. Bristol Tile Company
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Bristol Tile Company", "p_slug": "bristol-tile-company", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.bristol-tile.co.uk", "p_country": "United Kingdom"}
```

### 10. Bruce Douglas Marketing Ltd (Ultratape)
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Bruce Douglas Marketing Ltd (Ultratape)", "p_slug": "bruce-douglas-marketing-ltd-ultratape", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.ultratape.com", "p_country": "United Kingdom"}
```

## 📊 EXPECTED RESULTS FOR BATCH 4

After executing all 10 API calls above, you should see responses like:
```json
{
  "status": "created",
  "message": "Supplier imported with NMBS affiliation",
  "success": true,
  "supplier_id": "[UUID]",
  "supplier_name": "[SUPPLIER_NAME]",
  "affiliation_status": "created"
}
```

## 🔍 VERIFICATION AFTER BATCH 4

Check total count (should be 46):
```
supabase:postgrestRequest
method: GET
path: /suppliers?select=count
```

## 📋 CONTINUING WITH REMAINING BATCHES (5-31)

For each subsequent batch:

1. **Read the batch file**: `/Users/tonyboyle/uk-building-merchant-saas/sql/nmbs_batch_XX.json`
2. **Extract supplier data** from the JSON
3. **Execute API calls** using the same pattern as above
4. **Verify count** increases by ~10 after each batch

### Pattern for Each Supplier:
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {
  "p_supplier_name": "[EXACT_NAME_FROM_JSON]",
  "p_slug": "[SLUG_FROM_JSON]", 
  "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.",
  "p_supplier_website": "[WEBSITE_FROM_JSON]",
  "p_country": "United Kingdom"
}
```

## 🎯 BATCH PROGRESS TRACKING

- ✅ Batch 1: Complete (10 suppliers)
- ✅ Batch 2: Complete (10 suppliers) 
- ✅ Batch 3: Complete (10 suppliers)
- 🚀 Batch 4: Ready for execution (10 suppliers)
- ⏳ Batches 5-31: Remaining (27 batches, ~270 suppliers)

## 🏁 FINAL TARGET

**Goal**: 306 total suppliers (6 existing + 301 new)
**Current**: 36 suppliers
**After Batch 4**: 46 suppliers
**Remaining**: 260 suppliers across 27 batches

## 📁 BATCH FILES LOCATION

All batch files are located at:
```
/Users/tonyboyle/uk-building-merchant-saas/sql/nmbs_batch_XX.json
```

Where XX ranges from 05 to 31 for the remaining batches.
