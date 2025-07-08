# Merchant Data Replacement Guide

## Overview
This guide will help you safely replace the existing 1,637 merchant records in your Supabase database with the updated CSV file containing 1,687 records with improved geo-location data and other fixes.

## Prerequisites
- Ensure your Supabase environment variables are configured in `.env`
- The CSV file should be located at: `/Users/tonyboyle/Library/CloudStorage/Dropbox/MERCHANT DEALS Folder Dropbox/MERCHANT DEALS DATA/NMBS Merchants and Suppliers/NMBS_merchants_FINAL_COMPLETE.csv`

## Required Environment Variables
Make sure these are set in your `.env` file:
```
VITE_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## CSV File Structure Expected
The script expects these columns in your CSV:
- merchant_name
- merchant_category
- merchant_address_1
- merchant_address_2
- merchant_address_3
- merchant_address_4
- merchant_postcode
- merchant_website_url
- merchant_email
- merchant_phone
- merchant_latitude
- merchant_longitude

## Process Overview

### Phase 1: Data Replacement (RECOMMENDED)
This is the main process that will safely replace your data:

1. **Backup existing data** - Creates JSON backups of all current merchant data
2. **Clear existing data** - Removes current merchants, locations, and affiliations
3. **Import new data** - Imports the 1,687 new records from your CSV
4. **Verify import** - Confirms all data was imported correctly

### Phase 2: Rollback (EMERGENCY ONLY)
If something goes wrong, you can restore from backup:

1. **List available backups** - Shows all backup timestamps
2. **Clear current data** - Removes current data
3. **Restore from backup** - Restores the most recent backup
4. **Verify restoration** - Confirms data was restored correctly

## Step-by-Step Execution

### Step 1: Navigate to Project Directory
```bash
cd /Users/tonyboyle/uk-building-merchant-saas
```

### Step 2: Verify CSV File Location
Check that your CSV file exists and has the correct structure:
```bash
head -5 "/Users/tonyboyle/Library/CloudStorage/Dropbox/MERCHANT DEALS Folder Dropbox/MERCHANT DEALS DATA/NMBS Merchants and Suppliers/NMBS_merchants_FINAL_COMPLETE.csv"
```

### Step 3: Run the Replacement Script
**⚠️ IMPORTANT: This will permanently replace your existing data**
```bash
node scripts/backup-and-replace-merchants.js
```

The script will:
- ✅ Create backups in `./backups/` directory
- ✅ Show progress updates
- ✅ Report success/error counts
- ✅ Verify final data integrity

### Step 4: Verify Results
After successful completion, you should see:
```
🎉 Merchant data replacement completed successfully!
📊 Summary:
   - Backup: 1637 merchants
   - Import: 1687 successful, 0 errors
   - Final: 1687 merchants in database
```

## If Something Goes Wrong

### Option 1: Check Error Messages
The script provides detailed error messages. Common issues:
- **Network connectivity**: Check your internet connection
- **Supabase credentials**: Verify your environment variables
- **CSV format**: Ensure CSV matches expected structure

### Option 2: Rollback to Previous Data
If you need to restore your original data:
```bash
node scripts/rollback-merchants.js
```

This will:
- ✅ Find the most recent backup
- ✅ Clear current data
- ✅ Restore original data
- ✅ Verify restoration

## Data Mapping

The script maps CSV columns to database fields as follows:

### Merchants Table
- `name` ← `merchant_name`
- `website_url` ← `merchant_website_url`
- `email` ← `merchant_email`
- `phone` ← `merchant_phone`
- `is_active` ← `true` (default)
- `verification_status` ← `'verified'` (default)

### Merchant_Locations Table
- `merchant_id` ← Auto-generated from merchants table
- `name` ← `merchant_name`
- `is_primary` ← `true` (default)
- `address_line_1` ← `merchant_address_1`
- `address_line_2` ← `merchant_address_2`
- `city` ← `merchant_address_3`
- `county` ← `merchant_address_4`
- `postal_code` ← `merchant_postcode`
- `country` ← `'United Kingdom'` (default)
- `latitude` ← `merchant_latitude` (parsed as float)
- `longitude` ← `merchant_longitude` (parsed as float)
- `phone` ← `merchant_phone`
- `email` ← `merchant_email`

### Merchant_Organization_Affiliations Table
- `merchant_id` ← Auto-generated from merchants table
- `organization_id` ← NMBS organization ID (auto-created if needed)
- `affiliation_status` ← `'active'` (default)
- `membership_level` ← `'standard'` (default)
- `member_since` ← Current date

## File Locations

### Scripts
- Main replacement script: `./scripts/backup-and-replace-merchants.js`
- Rollback script: `./scripts/rollback-merchants.js`

### Backups
- Backup directory: `./backups/`
- Backup files: `merchants_backup_TIMESTAMP.json`, `merchant_locations_backup_TIMESTAMP.json`, `merchant_affiliations_backup_TIMESTAMP.json`

### CSV Source
- Source file: `/Users/tonyboyle/Library/CloudStorage/Dropbox/MERCHANT DEALS Folder Dropbox/MERCHANT DEALS DATA/NMBS Merchants and Suppliers/NMBS_merchants_FINAL_COMPLETE.csv`

## Best Practices

1. **Always run during low-traffic periods**
2. **Verify CSV data quality before import**
3. **Keep backup files for at least 30 days**
4. **Test the process on a staging environment first (if available)**
5. **Monitor the application after import to ensure everything works correctly**

## Database Tables Affected

- `merchants` - Main merchant information
- `merchant_locations` - Address and geo-location data
- `merchant_organization_affiliations` - NMBS membership relationships
- `organizations` - NMBS organization (created if doesn't exist)

## Success Indicators

✅ **Process completed successfully if you see:**
- All backup files created in `./backups/`
- Import shows 1687 successful records, 0 errors
- Verification shows 1687 merchants, 1687 locations, 1687 affiliations
- No error messages during execution

❌ **Process failed if you see:**
- Error messages during import
- Lower success count than expected
- Verification numbers don't match expectations
- Network or authentication errors

## Recovery Options

1. **Partial failure**: Re-run the main script (it will create a fresh backup)
2. **Complete failure**: Use rollback script to restore original data
3. **Data corruption**: Contact support with backup files for manual restoration

## Support

If you encounter issues:
1. Check the error messages in the script output
2. Verify your CSV file format matches expectations
3. Ensure Supabase credentials are correct
4. Use the rollback script if needed
5. Keep backup files safe for manual recovery if required

---

**Remember**: This process is designed to be safe with automatic backups, but always exercise caution when modifying production data.
