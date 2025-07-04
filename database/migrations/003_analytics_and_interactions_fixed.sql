-- UK Building Merchant SaaS - Analytics and User Interactions Schema (FIXED)
-- This migration adds analytics tracking, user interactions, and engagement features

-- ========================================
-- ANALYTICS SYSTEM
-- ========================================

-- Create analytics events table for comprehensive tracking
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL, -- 'page_view', 'offer_view', 'merchant_view', 'click', 'search', 'conversion'
    user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    session_id TEXT,
    offer_id UUID REFERENCES offers(id) ON DELETE SET NULL,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    merchant_id UUID REFERENCES merchants(id) ON DELETE SET NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    page_url TEXT,
    referrer_url TEXT,
    event_properties JSONB DEFAULT '{}', -- flexible event data
    device_info JSONB DEFAULT '{}', -- browser, OS, device type
    location_data JSONB DEFAULT '{}', -- city, country, IP (anonymized)
    occurred_at TIMESTAMPTZ DEFAULT now()
);

-- Create offer views tracking
CREATE TABLE IF NOT EXISTS offer_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offer_id UUID REFERENCES offers(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    session_id TEXT,
    view_duration_seconds INTEGER,
    referrer_source TEXT, -- 'search', 'category', 'featured', 'direct'
    device_type TEXT CHECK (device_type IN ('desktop', 'mobile', 'tablet')),
    viewed_at TIMESTAMPTZ DEFAULT now()
);

-- Create merchant views tracking
CREATE TABLE IF NOT EXISTS merchant_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    session_id TEXT,
    page_section TEXT, -- 'profile', 'offers', 'locations', 'contact'
    referrer_source TEXT,
    viewed_at TIMESTAMPTZ DEFAULT now()
);

-- ========================================
-- USER INTERACTIONS
-- ========================================

-- Create user saved offers (wishlist functionality)
CREATE TABLE IF NOT EXISTS user_saved_offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    offer_id UUID REFERENCES offers(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    notes TEXT,
    reminder_date TIMESTAMPTZ,
    saved_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(user_id, offer_id)
);

-- Create user followed merchants
CREATE TABLE IF NOT EXISTS user_followed_merchants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
    notification_preferences JSONB DEFAULT '{"new_offers": true, "price_drops": true}',
    followed_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(user_id, merchant_id)
);

-- Create offer reservations/inquiries
CREATE TABLE IF NOT EXISTS offer_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offer_id UUID REFERENCES offers(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    total_amount DECIMAL(10,2),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'ready', 'collected', 'cancelled', 'expired')),
    collection_method TEXT DEFAULT 'click_and_collect' CHECK (collection_method IN ('click_and_collect', 'local_delivery', 'courier')),
    preferred_collection_date TIMESTAMPTZ,
    customer_notes TEXT,
    merchant_notes TEXT,
    confirmation_code TEXT,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create user search history
CREATE TABLE IF NOT EXISTS user_search_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    search_query TEXT NOT NULL,
    search_filters JSONB DEFAULT '{}', -- categories, price ranges, locations, etc.
    results_count INTEGER DEFAULT 0,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    searched_at TIMESTAMPTZ DEFAULT now()
);

-- ========================================
-- NOTIFICATIONS SYSTEM
-- ========================================

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'offer_approved', 'new_offer', 'price_drop', 'reservation_update', 'system'
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    action_url TEXT,
    action_label TEXT,
    related_offer_id UUID REFERENCES offers(id) ON DELETE SET NULL,
    related_merchant_id UUID REFERENCES merchants(id) ON DELETE SET NULL,
    related_organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    is_read BOOLEAN DEFAULT false,
    is_email_sent BOOLEAN DEFAULT false,
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    read_at TIMESTAMPTZ
);

-- ========================================
-- REVIEWS AND RATINGS
-- ========================================

-- Create offer reviews
CREATE TABLE IF NOT EXISTS offer_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offer_id UUID REFERENCES offers(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    review_text TEXT,
    verified_purchase BOOLEAN DEFAULT false,
    is_anonymous BOOLEAN DEFAULT false,
    helpful_votes INTEGER DEFAULT 0,
    reported_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'published' CHECK (status IN ('published', 'pending', 'rejected', 'hidden')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(offer_id, user_id)
);

-- Create merchant reviews
CREATE TABLE IF NOT EXISTS merchant_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    review_text TEXT,
    service_aspects JSONB DEFAULT '{}', -- {"customer_service": 5, "delivery": 4, "product_quality": 5}
    verified_customer BOOLEAN DEFAULT false,
    is_anonymous BOOLEAN DEFAULT false,
    helpful_votes INTEGER DEFAULT 0,
    status TEXT DEFAULT 'published' CHECK (status IN ('published', 'pending', 'rejected', 'hidden')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(merchant_id, user_id)
);

-- ========================================
-- CREATE INDEXES (SEPARATE FROM TABLE CREATION)
-- ========================================

-- Analytics events indexes
CREATE INDEX IF NOT EXISTS idx_analytics_events_time_type ON analytics_events(occurred_at DESC, event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_offer ON analytics_events(offer_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_merchant ON analytics_events(merchant_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_organization ON analytics_events(organization_id);

-- Offer views indexes
CREATE INDEX IF NOT EXISTS idx_offer_views_offer ON offer_views(offer_id);
CREATE INDEX IF NOT EXISTS idx_offer_views_user ON offer_views(user_id);
CREATE INDEX IF NOT EXISTS idx_offer_views_time ON offer_views(viewed_at DESC);

-- Merchant views indexes
CREATE INDEX IF NOT EXISTS idx_merchant_views_merchant ON merchant_views(merchant_id);
CREATE INDEX IF NOT EXISTS idx_merchant_views_user ON merchant_views(user_id);
CREATE INDEX IF NOT EXISTS idx_merchant_views_time ON merchant_views(viewed_at DESC);

-- User interactions indexes
CREATE INDEX IF NOT EXISTS idx_user_saved_offers_user ON user_saved_offers(user_id);
CREATE INDEX IF NOT EXISTS idx_user_saved_offers_offer ON user_saved_offers(offer_id);
CREATE INDEX IF NOT EXISTS idx_user_followed_merchants_user ON user_followed_merchants(user_id);
CREATE INDEX IF NOT EXISTS idx_user_followed_merchants_merchant ON user_followed_merchants(merchant_id);

-- Reservations indexes
CREATE INDEX IF NOT EXISTS idx_offer_reservations_offer ON offer_reservations(offer_id);
CREATE INDEX IF NOT EXISTS idx_offer_reservations_user ON offer_reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_offer_reservations_merchant ON offer_reservations(merchant_id);
CREATE INDEX IF NOT EXISTS idx_offer_reservations_status ON offer_reservations(status);

-- Search history indexes
CREATE INDEX IF NOT EXISTS idx_user_search_history_user ON user_search_history(user_id);
CREATE INDEX IF NOT EXISTS idx_user_search_history_time ON user_search_history(searched_at DESC);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_time ON notifications(created_at DESC);

-- Reviews indexes
CREATE INDEX IF NOT EXISTS idx_offer_reviews_offer ON offer_reviews(offer_id);
CREATE INDEX IF NOT EXISTS idx_offer_reviews_user ON offer_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_offer_reviews_merchant ON offer_reviews(merchant_id);
CREATE INDEX IF NOT EXISTS idx_offer_reviews_rating ON offer_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_merchant_reviews_merchant ON merchant_reviews(merchant_id);
CREATE INDEX IF NOT EXISTS idx_merchant_reviews_user ON merchant_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_merchant_reviews_rating ON merchant_reviews(rating);

-- ========================================
-- ENABLE RLS ON ALL NEW TABLES
-- ========================================

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE offer_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_saved_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_followed_merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE offer_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE offer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_reviews ENABLE ROW LEVEL SECURITY;

-- ========================================
-- CREATE ANALYTICS VIEWS
-- ========================================

-- Create aggregate views for reporting
CREATE OR REPLACE VIEW offer_analytics AS
SELECT 
    o.id,
    o.title,
    o.supplier_id,
    COUNT(ov.id) as total_views,
    COUNT(DISTINCT ov.user_id) as unique_viewers,
    COUNT(ur.id) as total_reviews,
    AVG(ur.rating) as average_rating,
    COUNT(uso.id) as times_saved,
    COUNT(res.id) as total_reservations,
    COUNT(CASE WHEN res.status = 'confirmed' THEN 1 END) as confirmed_reservations
FROM offers o
LEFT JOIN offer_views ov ON o.id = ov.offer_id
LEFT JOIN offer_reviews ur ON o.id = ur.offer_id AND ur.status = 'published'
LEFT JOIN user_saved_offers uso ON o.id = uso.offer_id
LEFT JOIN offer_reservations res ON o.id = res.offer_id
GROUP BY o.id, o.title, o.supplier_id;

CREATE OR REPLACE VIEW merchant_analytics AS
SELECT 
    m.id,
    m.name,
    m.owner_user_id,
    COUNT(mv.id) as total_views,
    COUNT(DISTINCT mv.user_id) as unique_viewers,
    COUNT(mr.id) as total_reviews,
    AVG(mr.rating) as average_rating,
    COUNT(ufm.id) as follower_count,
    COUNT(mso.id) as selected_offers_count,
    COUNT(res.id) as total_reservations
FROM merchants m
LEFT JOIN merchant_views mv ON m.id = mv.merchant_id
LEFT JOIN merchant_reviews mr ON m.id = mr.merchant_id AND mr.status = 'published'
LEFT JOIN user_followed_merchants ufm ON m.id = ufm.merchant_id
LEFT JOIN merchant_selected_offers mso ON m.id = mso.merchant_id AND mso.is_active = true
LEFT JOIN offer_reservations res ON m.id = res.merchant_id
GROUP BY m.id, m.name, m.owner_user_id;

-- ========================================
-- CREATE ANALYTICS FUNCTIONS
-- ========================================

-- Create functions for common analytics queries
CREATE OR REPLACE FUNCTION get_popular_offers(
    organization_id_param UUID DEFAULT NULL,
    days_back INTEGER DEFAULT 30,
    limit_count INTEGER DEFAULT 10
)
RETURNS TABLE(
    offer_id UUID,
    title TEXT,
    view_count BIGINT,
    unique_viewers BIGINT,
    save_count BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        o.id,
        o.title,
        COUNT(ov.id) as view_count,
        COUNT(DISTINCT ov.user_id) as unique_viewers,
        COUNT(uso.id) as save_count
    FROM offers o
    LEFT JOIN offer_views ov ON o.id = ov.offer_id 
        AND ov.viewed_at >= (now() - INTERVAL '1 day' * days_back)
    LEFT JOIN user_saved_offers uso ON o.id = uso.offer_id
    LEFT JOIN organization_offers oo ON o.id = oo.offer_id
    WHERE 
        (organization_id_param IS NULL OR oo.organization_id = organization_id_param)
        AND o.status = 'active'
        AND o.end_date > now()
    GROUP BY o.id, o.title
    ORDER BY view_count DESC, unique_viewers DESC, save_count DESC
    LIMIT limit_count;
END;
$$;

SELECT 'Analytics and interactions schema deployed successfully' as status;