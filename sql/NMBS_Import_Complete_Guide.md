# NMBS Supplier Import - Complete Guide

## 📋 Overview
This guide provides everything needed to import all 301 remaining NMBS suppliers from the CSV file with proper organization affiliations.

## 📁 Files Created
- **Source CSV**: `/Users/tonyboyle/Library/CloudStorage/Dropbox/MERCHANT DEALS Folder Dropbox/MERCHANT DEALS DATA/NMBS Merchants and Suppliers/NMBS_Suppliers_Names_Websites_306.csv`
- **SQL Function**: `/Users/tonyboyle/uk-building-merchant-saas/sql/create_import_function_manual.sql`
- **Test Data**: `/Users/tonyboyle/uk-building-merchant-saas/sql/test_first_3_suppliers.json`
- **Batch Files**: `/Users/tonyboyle/uk-building-merchant-saas/sql/nmbs_batch_XX.json` (31 batches)
- **Import Instructions**: `/Users/tonyboyle/uk-building-merchant-saas/sql/nmbs_import_instructions.py`

## 🚀 Step-by-Step Import Process

### Step 1: Create Import Function
Execute this SQL in the **Supabase SQL Editor**:

```sql
CREATE OR REPLACE FUNCTION public.import_supplier_with_nmbs_affiliation(
    p_supplier_name text,
    p_slug text,
    p_supplier_description text,
    p_supplier_website text,
    p_country text DEFAULT 'United Kingdom'
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
    affiliation_exists boolean := false;
BEGIN
    SELECT id INTO existing_supplier_id 
    FROM suppliers 
    WHERE supplier_name = p_supplier_name;
    
    IF existing_supplier_id IS NULL THEN
        INSERT INTO suppliers (
            supplier_name, slug, supplier_description, supplier_website, 
            country, is_active, created_at, updated_at
        ) VALUES (
            p_supplier_name, p_slug, p_supplier_description, p_supplier_website,
            p_country, true, now(), now()
        ) RETURNING id INTO new_supplier_id;
    ELSE
        new_supplier_id := existing_supplier_id;
        UPDATE suppliers 
        SET supplier_website = p_supplier_website, updated_at = now()
        WHERE id = existing_supplier_id;
    END IF;
    
    SELECT EXISTS(
        SELECT 1 FROM supplier_organization_affiliations 
        WHERE supplier_id = new_supplier_id AND organization_id = nmbs_org_id
    ) INTO affiliation_exists;
    
    IF NOT affiliation_exists THEN
        INSERT INTO supplier_organization_affiliations (
            supplier_id, organization_id, affiliation_type, status, joined_date, 
            organization_specific_data, created_at, updated_at
        ) VALUES (
            new_supplier_id, nmbs_org_id, 'member', 'active', now(),
            jsonb_build_object(
                'membership_type', 'supplier',
                'trading_status', 'active',
                'data_source', 'function_import_2025_01_08',
                'import_method', 'single_supplier_function',
                'supplier_name', p_supplier_name
            ), now(), now()
        );
    END IF;
    
    RETURN jsonb_build_object(
        'success', true,
        'supplier_id', new_supplier_id,
        'supplier_name', p_supplier_name,
        'status', CASE WHEN existing_supplier_id IS NULL THEN 'created' ELSE 'updated' END,
        'affiliation_status', CASE WHEN affiliation_exists THEN 'already_existed' ELSE 'created' END,
        'message', 'Supplier imported with NMBS affiliation'
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object(
        'success', false,
        'error', SQLERRM,
        'supplier_name', p_supplier_name
    );
END;
$$;

GRANT EXECUTE ON FUNCTION public.import_supplier_with_nmbs_affiliation(text, text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.import_supplier_with_nmbs_affiliation(text, text, text, text, text) TO anon;
```

### Step 2: Test with First 3 Suppliers
Execute these MCP calls to test:

**Test Supplier 1: Acheson & Glover**
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Acheson & Glover", "p_slug": "acheson-glover", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.ag.uk.com", "p_country": "United Kingdom"}
```

**Test Supplier 2: Ademco 1 Ltd, Honeywell Home**
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Ademco 1 Ltd, Honeywell Home", "p_slug": "ademco-1-ltd-honeywell-home", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.heatingcontrols.honeywellhome.com", "p_country": "United Kingdom"}
```

**Test Supplier 3: Adey Innovations**
```
supabase:postgrestRequest
method: POST
path: /rpc/import_supplier_with_nmbs_affiliation
body: {"p_supplier_name": "Adey Innovations", "p_slug": "adey-innovations", "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.", "p_supplier_website": "https://www.adey.co.uk", "p_country": "United Kingdom"}
```

### Step 3: Process All Batches
After successful testing, process all 31 batch files using the same pattern.

## 📊 Current Status
- **Already Imported**: 5 suppliers (Abracs, ACO Technologies plc, Makita UK Ltd, Draper Tools, British Gypsum)
- **To Import**: 301 suppliers from CSV
- **Total Target**: 306 NMBS suppliers
- **Organization ID**: `9307d673-0fb8-4533-8c6f-d9c1f114330c` (NMBS)

## 🔧 Batch Processing Structure
- **31 total batches**
- **Batches 1-30**: 10 suppliers each
- **Batch 31**: 1 supplier
- **Each supplier gets NMBS organization affiliation**
- **Duplicate handling**: Updates existing suppliers, creates affiliations if missing

## ✅ Expected Results
After completion:
- All 306 NMBS suppliers in the database
- Each supplier properly affiliated with NMBS organization
- Proper audit trail in `organization_specific_data`
- Full website URLs normalized to include https://

## 🚨 Important Notes
1. **Function Creation**: Must be done in Supabase SQL Editor (DDL not supported in MCP)
2. **RLS Policies**: Function uses SECURITY DEFINER to bypass RLS restrictions
3. **Idempotent**: Safe to re-run, handles duplicates gracefully
4. **Error Handling**: Function returns success/error status for each supplier
5. **Organization Affiliation**: All suppliers get NMBS membership with proper metadata

## 📝 Next Steps After Import
1. Verify total supplier count matches expected (306)
2. Check NMBS organization affiliations count
3. Review any failed imports from error responses
4. Consider adding supplier categories/subcategories
5. Set up merchant relationships as needed

## 🔍 Verification Queries
After import, run these to verify success:

```sql
-- Total suppliers
SELECT COUNT(*) FROM suppliers;

-- NMBS affiliations
SELECT COUNT(*) FROM supplier_organization_affiliations 
WHERE organization_id = '9307d673-0fb8-4533-8c6f-d9c1f114330c';

-- Recent imports
SELECT supplier_name, created_at FROM suppliers 
WHERE created_at > '2025-01-08' 
ORDER BY created_at DESC LIMIT 10;
```

## 📋 Supplier Categories for Future
Consider adding these categories for NMBS suppliers:
- Power Tools & Equipment
- Hand Tools & Accessories  
- Building Materials
- Plumbing & Heating
- Electrical Supplies
- Safety & Workwear
- Fasteners & Fixings
- Insulation & Membranes
- Drainage & Civils
- Decorating & Finishing

This completes the comprehensive import solution for all 301 remaining NMBS suppliers with proper organization affiliations.
