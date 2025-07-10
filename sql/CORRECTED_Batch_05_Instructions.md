# 🚀 CORRECTED BATCH 5 - READY FOR EXECUTION

Execute these 10 API calls for the actual Batch 5 suppliers:

## Batch 5 Suppliers (Corrected):

1. **BSW Timber Ltd**
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "BSW Timber Ltd", "p_slug": "bsw-timber-ltd", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.bsw.co.uk", "p_country": "United Kingdom"}
```

2. **Buckler Boots Ltd**
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Buckler Boots Ltd", "p_slug": "buckler-boots-ltd", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.bucklerboots.com", "p_country": "United Kingdom"}
```

3. **Building Adhesives (Dunlop)**
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Building Adhesives (Dunlop)", "p_slug": "building-adhesives-dunlop", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.dunloptrade.com", "p_country": "United Kingdom"}
```

4. **Burg-Wachter UK Ltd**
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Burg-Wachter UK Ltd", "p_slug": "burg-wachter-uk-ltd", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.burg.biz/uk", "p_country": "United Kingdom"}
```

5. **Business Insurance Services**
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Business Insurance Services", "p_slug": "business-insurance-services", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.mofs.co.uk/bis", "p_country": "United Kingdom"}
```

6. **Calder Lead**
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Calder Lead", "p_slug": "calder-lead", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.calderlead.co.uk", "p_country": "United Kingdom"}
```

7. **Calders and Grandidge**
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Calders and Grandidge", "p_slug": "calders-and-grandidge", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.caldersandgrandidge.com", "p_country": "United Kingdom"}
```

8. **Carlisle Brass**
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Carlisle Brass", "p_slug": "carlisle-brass", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.carlislebrass.com", "p_country": "United Kingdom"}
```

9. **Castacrete Ltd**
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Castacrete Ltd", "p_slug": "castacrete-ltd", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.castacrete.co.uk", "p_country": "United Kingdom"}
```

10. **Castle Brooke Tools**
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Castle Brooke Tools", "p_slug": "castle-brooke-tools", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.castlebrooke.co.uk", "p_country": "United Kingdom"}
```

## After Batch 5 Completion:
Expected total count: 56 suppliers

## Verification:
```
supabase:postgrestRequest
method: GET
path: /suppliers?select=count
```

Continue with Batch 6 by reading: `/Users/tonyboyle/uk-building-merchant-saas/sql/nmbs_batch_06.json`