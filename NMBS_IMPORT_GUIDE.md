# NMBS CSV Import Setup Guide

## 🎯 Overview
This guide will help you modify your Supabase merchants table to match the NMBS CSV structure and import the merchant data.

## 📋 Current Status
✅ **CSV File Analyzed**: `/Users/tonyboyle/Library/CloudStorage/Dropbox/MERCHANT DEALS Folder Dropbox/MERCHANT DEALS DATA/NMBS Merchants and Suppliers/NMBS_all_merchants_FINAL_READY_FOR_IMPORT.csv`

✅ **Migration Files Created**:
- `MANUAL_MIGRATION_STEPS.sql` - SQL commands to modify table structure
- `scripts/import-nmbs-csv.js` - Node.js script to import CSV data

## 🔧 Step 1: Update Database Structure

**You need to manually run these SQL commands in Supabase Dashboard:**

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Navigate to **SQL Editor**
3. Copy and paste each command from `MANUAL_MIGRATION_STEPS.sql` **one by one**:

```sql
-- Add address fields
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_address_1 TEXT;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_address_2 TEXT;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_address_3 TEXT;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_address_4 TEXT;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_postcode TEXT;

-- Add coordinates
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_latitude DECIMAL(10, 8);
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_longitude DECIMAL(11, 8);

-- Rename existing fields (if needed)
ALTER TABLE merchants RENAME COLUMN website_url TO merchant_website_url;
ALTER TABLE merchants RENAME COLUMN email TO merchant_email;
ALTER TABLE merchants RENAME COLUMN phone TO merchant_phone;
ALTER TABLE merchants RENAME COLUMN category TO merchant_category;

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_merchants_address ON merchants(merchant_postcode);
CREATE INDEX IF NOT EXISTS idx_merchants_coords ON merchants(merchant_latitude, merchant_longitude);
CREATE INDEX IF NOT EXISTS idx_merchants_category ON merchants(merchant_category);
```

## 📊 Step 2: Import CSV Data

After updating the database structure, run the import script:

```bash
cd /Users/tonyboyle/uk-building-merchant-saas
node scripts/import-nmbs-csv.js
```

## 📁 CSV Structure Mapping

The CSV contains these fields which will be mapped to your database:

| CSV Column | Database Column | Description |
|------------|-----------------|-------------|
| merchant_name | merchant_name | Business name |
| merchant_category | merchant_category | Business category (Plumbing, General, etc.) |
| merchant_address_1 | merchant_address_1 | Primary address line |
| merchant_address_2 | merchant_address_2 | Secondary address line |
| merchant_address_3 | merchant_address_3 | City/Town |
| merchant_address_4 | merchant_address_4 | County |
| merchant_postcode | merchant_postcode | UK postcode |
| merchant_website_url | merchant_website_url | Website URL |
| merchant_email | merchant_email | Contact email |
| merchant_phone | merchant_phone | Phone number |
| merchant_latitude | merchant_latitude | GPS latitude |
| merchant_longitude | merchant_longitude | GPS longitude |

## 🔍 What the Import Script Does

1. **Validates** the database structure has all required columns
2. **Reads** the CSV file from the Dropbox location
3. **Transforms** CSV data to match database schema
4. **Imports** merchants in batches of 50 for performance
5. **Creates** NMBS organization affiliations automatically
6. **Reports** success/error statistics

## 📈 Expected Results

From the CSV analysis, you have **~19 NMBS merchants** to import including:
- Best Plumbing Supplies Limited (Bedfordshire)
- Mech-Elec Wholesale Ltd (Norfolk)  
- The Pipe Crew Ltd (Co Fermanagh)
- Rock Bottom (Northampton) Ltd
- And many more...

## ⚠️ Important Notes

1. **Backup First**: The migration will modify your merchants table structure
2. **Manual Steps Required**: The ALTER TABLE commands must be run manually in Supabase
3. **NMBS Organization**: Ensure you have an "NMBS" organization in your organizations table
4. **Duplicate Handling**: The script will skip merchants that already exist with the same name

## 🆘 Troubleshooting

### If Import Script Fails:
```bash
# Check if database structure is ready
node scripts/import-nmbs-csv.js
```

Look for the "Missing required columns" warning and ensure all manual SQL steps were completed.

### If Manual SQL Fails:
- Some columns might already exist (ignore "column already exists" errors)
- Some renames might fail if the old column doesn't exist (this is OK)
- Focus on getting the address and coordinate columns added

## 🎉 Success Indicators

✅ **Database Ready**: All required columns exist
✅ **CSV Parsed**: ~19 merchant records found
✅ **Import Complete**: All merchants imported with NMBS affiliation
✅ **Verification**: Sample merchants visible in Supabase dashboard

---

## 🚀 Quick Start Commands

```bash
# 1. First, run manual SQL commands in Supabase Dashboard
# 2. Then run the import:
cd /Users/tonyboyle/uk-building-merchant-saas
node scripts/import-nmbs-csv.js
```

Your NMBS merchants will be ready for the UK Building Merchant SaaS platform! 🏗️
