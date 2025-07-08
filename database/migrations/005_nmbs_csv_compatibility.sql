-- Migration to add NMBS CSV compatible fields to merchants table
-- This allows direct import from NMBS_all_merchants_FINAL_READY_FOR_IMPORT.csv

-- Add merchant category field
ALTER TABLE merchants 
ADD COLUMN IF NOT EXISTS merchant_category TEXT;

-- Add address fields for direct CSV import compatibility
ALTER TABLE merchants 
ADD COLUMN IF NOT EXISTS merchant_address_1 TEXT,
ADD COLUMN IF NOT EXISTS merchant_address_2 TEXT,
ADD COLUMN IF NOT EXISTS merchant_address_3 TEXT,
ADD COLUMN IF NOT EXISTS merchant_address_4 TEXT,
ADD COLUMN IF NOT EXISTS merchant_postcode TEXT,
ADD COLUMN IF NOT EXISTS merchant_latitude DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS merchant_longitude DECIMAL(11, 8);

-- Rename existing fields to match CSV headers for consistency
ALTER TABLE merchants 
RENAME COLUMN name TO merchant_name;

ALTER TABLE merchants 
RENAME COLUMN website_url TO merchant_website_url;

ALTER TABLE merchants 
RENAME COLUMN email TO merchant_email;

ALTER TABLE merchants 
RENAME COLUMN phone TO merchant_phone;

-- Create an index for merchant category
CREATE INDEX IF NOT EXISTS idx_merchants_category ON merchants(merchant_category);

-- Create an index for geographic coordinates
CREATE INDEX IF NOT EXISTS idx_merchants_coords ON merchants(merchant_latitude, merchant_longitude);

-- Create an index for postcode
CREATE INDEX IF NOT EXISTS idx_merchants_postcode ON merchants(merchant_postcode);

-- Add a comment to explain the structure
COMMENT ON TABLE merchants IS 'Merchants table with NMBS CSV compatible fields for direct import from NMBS_all_merchants_FINAL_READY_FOR_IMPORT.csv';

-- Update any existing RLS policies if needed
-- (The existing policies should continue to work with renamed columns)

-- Create a function to sync merchant data to merchant_locations when needed
CREATE OR REPLACE FUNCTION sync_merchant_to_location()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- If merchant has address data but no location record, create one
    IF NEW.merchant_address_1 IS NOT NULL AND NEW.merchant_postcode IS NOT NULL THEN
        INSERT INTO merchant_locations (
            merchant_id,
            name,
            is_primary,
            address_line_1,
            address_line_2,
            city,
            county,
            postal_code,
            latitude,
            longitude,
            phone,
            email
        ) VALUES (
            NEW.id,
            NEW.merchant_name || ' - Main Location',
            true,
            NEW.merchant_address_1,
            COALESCE(NEW.merchant_address_2, NEW.merchant_address_3),
            NEW.merchant_address_3,
            NEW.merchant_address_4,
            NEW.merchant_postcode,
            NEW.merchant_latitude,
            NEW.merchant_longitude,
            NEW.merchant_phone,
            NEW.merchant_email
        )
        ON CONFLICT (merchant_id) WHERE is_primary = true 
        DO UPDATE SET
            address_line_1 = EXCLUDED.address_line_1,
            address_line_2 = EXCLUDED.address_line_2,
            city = EXCLUDED.city,
            county = EXCLUDED.county,
            postal_code = EXCLUDED.postal_code,
            latitude = EXCLUDED.latitude,
            longitude = EXCLUDED.longitude,
            phone = EXCLUDED.phone,
            email = EXCLUDED.email,
            updated_at = now();
    END IF;
    
    RETURN NEW;
END;
$$;

-- Create trigger to auto-sync to merchant_locations
DROP TRIGGER IF EXISTS sync_merchant_to_location_trigger ON merchants;
CREATE TRIGGER sync_merchant_to_location_trigger
    AFTER INSERT OR UPDATE ON merchants
    FOR EACH ROW
    EXECUTE FUNCTION sync_merchant_to_location();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION sync_merchant_to_location() TO authenticated;
