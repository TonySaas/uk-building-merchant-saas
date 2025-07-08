-- CORRECTED MIGRATION - Handles existing column names
-- Copy and paste these commands one by one in Supabase SQL Editor
-- This version checks for existing columns to avoid errors

-- 1. Add address fields (safe to run multiple times)
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_address_1 TEXT;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_address_2 TEXT;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_address_3 TEXT;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_address_4 TEXT;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_postcode TEXT;

-- 2. Add coordinate fields (safe to run multiple times)
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_latitude DECIMAL(10, 8);
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_longitude DECIMAL(11, 8);

-- 3. Add category field if needed (safe to run multiple times)
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_category TEXT;

-- 4. CONDITIONAL RENAMES - Only run these if the source column exists
-- Check what columns exist first by running: SELECT column_name FROM information_schema.columns WHERE table_name = 'merchants';

-- If you have 'email' column, rename it:
-- ALTER TABLE merchants RENAME COLUMN email TO merchant_email;

-- If you have 'phone' column, rename it:
-- ALTER TABLE merchants RENAME COLUMN phone TO merchant_phone;

-- If you have 'website_url' column, rename it:
-- ALTER TABLE merchants RENAME COLUMN website_url TO merchant_website_url;

-- If you have 'name' column, rename it:
-- ALTER TABLE merchants RENAME COLUMN name TO merchant_name;

-- 5. Add performance indexes (safe to run multiple times)
CREATE INDEX IF NOT EXISTS idx_merchants_address ON merchants(merchant_postcode);
CREATE INDEX IF NOT EXISTS idx_merchants_coords ON merchants(merchant_latitude, merchant_longitude);
CREATE INDEX IF NOT EXISTS idx_merchants_category ON merchants(merchant_category);

-- 6. Check current structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'merchants' 
ORDER BY ordinal_position;
