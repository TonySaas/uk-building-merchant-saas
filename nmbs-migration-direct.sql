-- Direct SQL to add NMBS CSV compatible fields
-- Execute this in Supabase SQL Editor

-- Add missing address fields
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_address_1 TEXT;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_address_2 TEXT; 
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_address_3 TEXT;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_address_4 TEXT;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_postcode TEXT;

-- Add latitude and longitude for direct CSV import
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_latitude DECIMAL(10, 8);
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_longitude DECIMAL(11, 8);

-- Rename category to merchant_category if needed
ALTER TABLE merchants RENAME COLUMN category TO merchant_category;

-- Rename other fields to match CSV headers (if not already done)
-- (Skip if already renamed)
-- ALTER TABLE merchants RENAME COLUMN name TO merchant_name;
-- ALTER TABLE merchants RENAME COLUMN website_url TO merchant_website_url;
-- ALTER TABLE merchants RENAME COLUMN email TO merchant_email;
-- ALTER TABLE merchants RENAME COLUMN phone TO merchant_phone;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_merchants_category ON merchants(merchant_category);
CREATE INDEX IF NOT EXISTS idx_merchants_coords ON merchants(merchant_latitude, merchant_longitude);
CREATE INDEX IF NOT EXISTS idx_merchants_postcode ON merchants(merchant_postcode);

-- Add comment
COMMENT ON TABLE merchants IS 'Merchants table compatible with NMBS CSV import structure';
