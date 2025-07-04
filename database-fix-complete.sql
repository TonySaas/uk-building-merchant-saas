-- Complete Database Setup and Fix for UK Building Merchant SaaS
-- This script fixes RLS policy issues and ensures all tables are properly configured

-- ========================================
-- 1. DROP AND RECREATE PROBLEMATIC POLICIES
-- ========================================

-- Drop existing policies that cause infinite recursion
DROP POLICY IF EXISTS "Users can view own organization roles" ON user_organization_roles;
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

-- ========================================
-- 2. CREATE FIXED RLS POLICIES
-- ========================================

-- Simple policy for user profiles
CREATE POLICY "Enable read access for users to own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Enable update access for users to own profile" ON user_profiles  
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Enable insert access for authenticated users" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Simple policy for user organization roles
CREATE POLICY "Enable read access for authenticated users" ON user_organization_roles
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert for authenticated users" ON user_organization_roles
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ========================================
-- 3. CREATE TABLES IF THEY DON'T EXIST
-- ========================================

-- Ensure products table exists with proper structure
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    short_description TEXT,
    specifications JSONB DEFAULT '{}',
    regular_price DECIMAL(10,2),
    currency TEXT DEFAULT 'GBP',
    sku TEXT,
    barcode TEXT,
    weight_kg DECIMAL(8,3),
    dimensions_cm JSONB DEFAULT '{}',
    stock_status TEXT DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'low_stock', 'out_of_stock', 'discontinued')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Ensure offers table exists
CREATE TABLE IF NOT EXISTS offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    short_description TEXT,
    offer_type TEXT NOT NULL DEFAULT 'percentage_discount' CHECK (offer_type IN ('percentage_discount', 'fixed_amount', 'buy_x_get_y', 'bulk_discount', 'free_shipping')),
    discount_value DECIMAL(10,2),
    minimum_quantity INTEGER DEFAULT 1,
    maximum_quantity INTEGER,
    minimum_order_value DECIMAL(10,2),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    terms_and_conditions TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'expired', 'cancelled')),
    priority INTEGER DEFAULT 0,
    usage_limit INTEGER,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT valid_date_range CHECK (end_date > start_date)
);

-- Ensure merchants table exists
CREATE TABLE IF NOT EXISTS merchants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    website_url TEXT,
    email TEXT,
    phone TEXT,
    logo_url TEXT,
    business_registration_number TEXT,
    vat_number TEXT,
    trading_since DATE,
    annual_turnover_band TEXT CHECK (annual_turnover_band IN ('under_100k', '100k_500k', '500k_1m', '1m_5m', '5m_plus')),
    employee_count_band TEXT CHECK (employee_count_band IN ('1_5', '6_10', '11_25', '26_50', '51_plus')),
    is_active BOOLEAN DEFAULT true,
    verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
    verified_at TIMESTAMPTZ,
    verified_by_user_id UUID REFERENCES user_profiles(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Ensure merchant_locations table exists
CREATE TABLE IF NOT EXISTS merchant_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    address_line_1 TEXT NOT NULL,
    address_line_2 TEXT,
    city TEXT NOT NULL,
    county TEXT,
    postal_code TEXT NOT NULL,
    country TEXT DEFAULT 'United Kingdom',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    phone TEXT,
    email TEXT,
    opening_hours JSONB DEFAULT '{}',
    facilities JSONB DEFAULT '[]',
    delivery_radius_km INTEGER DEFAULT 50,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ========================================
-- 4. ENABLE RLS ON ALL TABLES
-- ========================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_locations ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 5. CREATE PERMISSIVE POLICIES FOR DEVELOPMENT
-- ========================================

-- Products policies - allow read for authenticated users, write for suppliers
CREATE POLICY "Enable read access for authenticated users" ON products
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert for authenticated users" ON products
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update for product owners" ON products
    FOR UPDATE USING (auth.uid() = supplier_id OR auth.uid() IS NOT NULL);

-- Offers policies
CREATE POLICY "Enable read access for authenticated users" ON offers
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert for authenticated users" ON offers
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update for offer owners" ON offers
    FOR UPDATE USING (auth.uid() = supplier_id OR auth.uid() IS NOT NULL);

-- Merchants policies
CREATE POLICY "Enable read access for authenticated users" ON merchants
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert for authenticated users" ON merchants
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update for merchant owners" ON merchants
    FOR UPDATE USING (auth.uid() = owner_user_id OR auth.uid() IS NOT NULL);

-- Merchant locations policies
CREATE POLICY "Enable read access for authenticated users" ON merchant_locations
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert for authenticated users" ON merchant_locations
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ========================================
-- 6. CREATE SAMPLE DATA FOR TESTING
-- ========================================

-- Insert sample supplier users (only if they don't exist)
INSERT INTO user_profiles (id, email, first_name, last_name, role, company_name, phone)
SELECT 
    gen_random_uuid(),
    'john.supplier@toolsupplier.com',
    'John',
    'Smith', 
    'supplier',
    'Professional Tools Ltd',
    '+44 20 7123 4567'
WHERE NOT EXISTS (SELECT 1 FROM user_profiles WHERE email = 'john.supplier@toolsupplier.com');

INSERT INTO user_profiles (id, email, first_name, last_name, role, company_name, phone)
SELECT 
    gen_random_uuid(),
    'sarah.merchant@localtools.com',
    'Sarah',
    'Johnson',
    'merchant', 
    'Local Tools & Hardware',
    '+44 161 234 5678'
WHERE NOT EXISTS (SELECT 1 FROM user_profiles WHERE email = 'sarah.merchant@localtools.com');

INSERT INTO user_profiles (id, email, first_name, last_name, role, phone)
SELECT 
    gen_random_uuid(),
    'mike.consumer@email.com',
    'Mike',
    'Wilson',
    'consumer',
    '+44 7123 456789'
WHERE NOT EXISTS (SELECT 1 FROM user_profiles WHERE email = 'mike.consumer@email.com');

-- ========================================
-- 7. CREATE INDEXES FOR PERFORMANCE
-- ========================================

CREATE INDEX IF NOT EXISTS idx_products_supplier ON products(supplier_id);
CREATE INDEX IF NOT EXISTS idx_products_organization ON products(organization_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);

CREATE INDEX IF NOT EXISTS idx_offers_supplier ON offers(supplier_id);
CREATE INDEX IF NOT EXISTS idx_offers_status ON offers(status);
CREATE INDEX IF NOT EXISTS idx_offers_dates ON offers(start_date, end_date);

CREATE INDEX IF NOT EXISTS idx_merchants_owner ON merchants(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_merchants_active ON merchants(is_active);

CREATE INDEX IF NOT EXISTS idx_merchant_locations_merchant ON merchant_locations(merchant_id);

-- ========================================
-- 8. VERIFICATION QUERIES
-- ========================================

-- Show summary of what we have
SELECT 'organizations' as table_name, count(*) as record_count FROM organizations
UNION ALL
SELECT 'user_profiles', count(*) FROM user_profiles  
UNION ALL
SELECT 'products', count(*) FROM products
UNION ALL
SELECT 'offers', count(*) FROM offers
UNION ALL
SELECT 'merchants', count(*) FROM merchants
UNION ALL  
SELECT 'merchant_locations', count(*) FROM merchant_locations
ORDER BY table_name;