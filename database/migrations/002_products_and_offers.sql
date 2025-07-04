-- UK Building Merchant SaaS - Products and Offers Schema
-- This migration adds product catalog, offers, and merchant functionality

-- ========================================
-- PRODUCT CATALOG SYSTEM
-- ========================================

-- Create product categories
CREATE TABLE IF NOT EXISTS product_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    slug TEXT NOT NULL,
    parent_category_id UUID REFERENCES product_categories(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(slug)
);

-- Create products table
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
    dimensions_cm JSONB DEFAULT '{}', -- {length, width, height}
    stock_status TEXT DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'low_stock', 'out_of_stock', 'discontinued')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(supplier_id, sku)
);

-- Create product category mappings (many-to-many)
CREATE TABLE IF NOT EXISTS product_category_mappings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    category_id UUID REFERENCES product_categories(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(product_id, category_id)
);

-- Create product media
CREATE TABLE IF NOT EXISTS product_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video', 'document', 'brochure')),
    url TEXT NOT NULL,
    alt_text TEXT,
    title TEXT,
    sort_order INTEGER DEFAULT 0,
    file_size_bytes INTEGER,
    mime_type TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ========================================
-- OFFERS SYSTEM
-- ========================================

-- Create offers table
CREATE TABLE IF NOT EXISTS offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    short_description TEXT,
    offer_type TEXT NOT NULL DEFAULT 'percentage_discount' CHECK (offer_type IN ('percentage_discount', 'fixed_amount', 'buy_x_get_y', 'bulk_discount', 'free_shipping')),
    discount_value DECIMAL(10,2), -- percentage or fixed amount
    minimum_quantity INTEGER DEFAULT 1,
    maximum_quantity INTEGER,
    minimum_order_value DECIMAL(10,2),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    terms_and_conditions TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'expired', 'cancelled')),
    priority INTEGER DEFAULT 0,
    usage_limit INTEGER, -- total uses across all customers
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    CONSTRAINT valid_date_range CHECK (end_date > start_date)
);

-- Create offer products (many-to-many with pricing)
CREATE TABLE IF NOT EXISTS offer_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offer_id UUID REFERENCES offers(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    regular_price DECIMAL(10,2) NOT NULL,
    offer_price DECIMAL(10,2) NOT NULL,
    savings_amount DECIMAL(10,2) GENERATED ALWAYS AS (regular_price - offer_price) STORED,
    savings_percentage DECIMAL(5,2) GENERATED ALWAYS AS (
        CASE 
            WHEN regular_price > 0 THEN ((regular_price - offer_price) / regular_price * 100)
            ELSE 0 
        END
    ) STORED,
    max_quantity_per_customer INTEGER,
    created_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(offer_id, product_id),
    CONSTRAINT positive_prices CHECK (regular_price > 0 AND offer_price >= 0),
    CONSTRAINT offer_price_less_than_regular CHECK (offer_price <= regular_price)
);

-- Create offer media
CREATE TABLE IF NOT EXISTS offer_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offer_id UUID REFERENCES offers(id) ON DELETE CASCADE,
    media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video', 'document', 'banner')),
    url TEXT NOT NULL,
    alt_text TEXT,
    title TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create organization offers (approval system)
CREATE TABLE IF NOT EXISTS organization_offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offer_id UUID REFERENCES offers(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    approval_status TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected', 'expired')),
    approved_by_user_id UUID REFERENCES user_profiles(id),
    approved_at TIMESTAMPTZ,
    rejection_reason TEXT,
    visibility_settings JSONB DEFAULT '{}', -- organization-specific display rules
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(offer_id, organization_id)
);

-- ========================================
-- MERCHANT SYSTEM
-- ========================================

-- Create merchants table
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
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(business_registration_number),
    UNIQUE(name, owner_user_id)
);

-- Create merchant organization affiliations
CREATE TABLE IF NOT EXISTS merchant_organization_affiliations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    affiliation_status TEXT DEFAULT 'active' CHECK (affiliation_status IN ('active', 'suspended', 'terminated')),
    membership_level TEXT DEFAULT 'standard' CHECK (membership_level IN ('standard', 'premium', 'enterprise')),
    member_since DATE DEFAULT CURRENT_DATE,
    membership_benefits JSONB DEFAULT '{}',
    fees_paid_up_to DATE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(merchant_id, organization_id)
);

-- Create merchant locations
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
    opening_hours JSONB DEFAULT '{}', -- {monday: {open: "09:00", close: "17:00"}, ...}
    facilities JSONB DEFAULT '[]', -- ["parking", "loading_bay", "showroom", ...]
    delivery_radius_km INTEGER DEFAULT 50,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create merchant selected offers (merchant's offer choices)
CREATE TABLE IF NOT EXISTS merchant_selected_offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
    offer_id UUID REFERENCES offers(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    selected_at TIMESTAMPTZ DEFAULT now(),
    is_active BOOLEAN DEFAULT true,
    stock_availability TEXT DEFAULT 'available' CHECK (stock_availability IN ('available', 'limited', 'out_of_stock')),
    estimated_stock_quantity INTEGER,
    merchant_notes TEXT,
    display_on_website BOOLEAN DEFAULT true,
    local_delivery_available BOOLEAN DEFAULT false,
    click_and_collect_available BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(merchant_id, offer_id, organization_id)
);

-- Enable RLS on all new tables
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_category_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE offer_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE offer_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_organization_affiliations ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_selected_offers ENABLE ROW LEVEL SECURITY;

-- Create performance indexes
CREATE INDEX IF NOT EXISTS idx_products_supplier ON products(supplier_id);
CREATE INDEX IF NOT EXISTS idx_products_organization ON products(organization_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_stock_status ON products(stock_status);
CREATE INDEX IF NOT EXISTS idx_product_media_product ON product_media(product_id);

CREATE INDEX IF NOT EXISTS idx_offers_supplier ON offers(supplier_id);
CREATE INDEX IF NOT EXISTS idx_offers_status ON offers(status);
CREATE INDEX IF NOT EXISTS idx_offers_dates ON offers(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_offer_products_offer ON offer_products(offer_id);
CREATE INDEX IF NOT EXISTS idx_offer_products_product ON offer_products(product_id);

CREATE INDEX IF NOT EXISTS idx_organization_offers_org ON organization_offers(organization_id);
CREATE INDEX IF NOT EXISTS idx_organization_offers_status ON organization_offers(approval_status);

CREATE INDEX IF NOT EXISTS idx_merchants_owner ON merchants(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_merchants_active ON merchants(is_active);
CREATE INDEX IF NOT EXISTS idx_merchants_verification ON merchants(verification_status);
CREATE INDEX IF NOT EXISTS idx_merchant_locations_merchant ON merchant_locations(merchant_id);
CREATE INDEX IF NOT EXISTS idx_merchant_locations_coords ON merchant_locations(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_merchant_selected_offers_merchant ON merchant_selected_offers(merchant_id);
CREATE INDEX IF NOT EXISTS idx_merchant_selected_offers_offer ON merchant_selected_offers(offer_id);

-- Insert sample product categories
INSERT INTO product_categories (name, description, slug, sort_order) VALUES
('Power Tools', 'Electric and battery-powered tools for professional use', 'power-tools', 1),
('Hand Tools', 'Manual tools for construction and maintenance', 'hand-tools', 2),
('Fasteners', 'Screws, bolts, nails, and fixing solutions', 'fasteners', 3),
('Building Materials', 'Timber, aggregates, and construction materials', 'building-materials', 4),
('Safety Equipment', 'Personal protective equipment and safety gear', 'safety-equipment', 5),
('Electrical', 'Electrical supplies and components', 'electrical', 6),
('Plumbing', 'Pipes, fittings, and plumbing supplies', 'plumbing', 7),
('Paint & Decorating', 'Paints, brushes, and decorating supplies', 'paint-decorating', 8)
ON CONFLICT (slug) DO NOTHING;

-- Insert subcategories
INSERT INTO product_categories (name, description, slug, parent_category_id, sort_order) 
SELECT 
    subcategory_data.name,
    subcategory_data.description,
    subcategory_data.slug,
    pc.id,
    subcategory_data.sort_order
FROM (VALUES
    ('Drills', 'Cordless and corded drills', 'drills', 'power-tools', 1),
    ('Saws', 'Circular saws, reciprocating saws, and jigsaws', 'saws', 'power-tools', 2),
    ('Sanders', 'Orbital sanders and belt sanders', 'sanders', 'power-tools', 3),
    ('Hammers', 'Claw hammers, sledgehammers, and specialty hammers', 'hammers', 'hand-tools', 1),
    ('Screwdrivers', 'Phillips, flathead, and specialty screwdrivers', 'screwdrivers', 'hand-tools', 2),
    ('Wrenches', 'Spanners, socket sets, and adjustable wrenches', 'wrenches', 'hand-tools', 3)
) AS subcategory_data(name, description, slug, parent_slug, sort_order)
JOIN product_categories pc ON pc.slug = subcategory_data.parent_slug
ON CONFLICT (slug) DO NOTHING;