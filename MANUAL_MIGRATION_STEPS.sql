-- MANUAL STEPS FOR SUPABASE SQL EDITOR
-- Copy and paste these commands one by one in Supabase Dashboard > SQL Editor

-- 1. Add address fields for CSV import
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_address_1 TEXT;

ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_address_2 TEXT;

ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_address_3 TEXT;

ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_address_4 TEXT;

ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_postcode TEXT;

-- 2. Add coordinate fields for CSV import
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_latitude DECIMAL(10, 8);

ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_longitude DECIMAL(11, 8);

-- 3. Rename existing fields to match CSV headers (run these one by one)
ALTER TABLE merchants RENAME COLUMN website_url TO merchant_website_url;

ALTER TABLE merchants RENAME COLUMN email TO merchant_email;

ALTER TABLE merchants RENAME COLUMN phone TO merchant_phone;

-- 4. If 'category' exists, rename it to merchant_category
ALTER TABLE merchants RENAME COLUMN category TO merchant_category;

-- 5. Add performance indexes
CREATE INDEX IF NOT EXISTS idx_merchants_address ON merchants(merchant_postcode);
CREATE INDEX IF NOT EXISTS idx_merchants_coords ON merchants(merchant_latitude, merchant_longitude);
CREATE INDEX IF NOT EXISTS idx_merchants_category ON merchants(merchant_category);
