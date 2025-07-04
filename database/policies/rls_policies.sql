-- UK Building Merchant SaaS - Row Level Security Policies
-- Comprehensive RLS policies for multi-organization data isolation

-- ========================================
-- PRODUCTS AND OFFERS POLICIES
-- ========================================

-- Products: Suppliers can manage their own, others can view active products
CREATE POLICY "Suppliers can manage own products" ON products
    FOR ALL USING (
        supplier_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM user_organization_roles uor
            JOIN organization_role_permissions orp ON uor.role_id = orp.role_id
            WHERE uor.user_id = auth.uid()
            AND uor.organization_id = products.organization_id
            AND orp.permission_name = 'manage_products'
        )
    );

CREATE POLICY "Active products are viewable by authenticated users" ON products
    FOR SELECT USING (
        is_active = true AND
        auth.role() = 'authenticated'
    );

-- Product categories: Public read access
CREATE POLICY "Product categories are publicly viewable" ON product_categories
    FOR SELECT USING (is_active = true);

-- Product media: Public read for active products
CREATE POLICY "Product media viewable for active products" ON product_media
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM products p
            WHERE p.id = product_media.product_id
            AND p.is_active = true
        )
    );

-- Offers: Complex multi-organization access control
CREATE POLICY "Suppliers can manage own offers" ON offers
    FOR ALL USING (supplier_id = auth.uid());

CREATE POLICY "Users can view approved active offers in their organizations" ON offers
    FOR SELECT USING (
        status = 'active' AND
        end_date > now() AND
        EXISTS (
            SELECT 1 FROM organization_offers oo
            WHERE oo.offer_id = offers.id
            AND oo.approval_status = 'approved'
            AND EXISTS (
                SELECT 1 FROM user_organization_roles uor
                WHERE uor.user_id = auth.uid()
                AND uor.organization_id = oo.organization_id
            )
        )
    );

-- Organization offers: Organization-specific access
CREATE POLICY "Organization offers viewable by organization members" ON organization_offers
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_organization_roles uor
            WHERE uor.user_id = auth.uid()
            AND uor.organization_id = organization_offers.organization_id
        )
    );

CREATE POLICY "Admins can manage organization offers" ON organization_offers
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_organization_roles uor
            JOIN organization_role_permissions orp ON uor.role_id = orp.role_id
            WHERE uor.user_id = auth.uid()
            AND uor.organization_id = organization_offers.organization_id
            AND orp.permission_name = 'approve_offers'
        )
    );

-- ========================================
-- MERCHANT POLICIES
-- ========================================

-- Merchants: Owners and organization admins can manage
CREATE POLICY "Merchant owners can manage their merchants" ON merchants
    FOR ALL USING (owner_user_id = auth.uid());

CREATE POLICY "Organization admins can view affiliated merchants" ON merchants
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM merchant_organization_affiliations moa
            JOIN user_organization_roles uor ON uor.organization_id = moa.organization_id
            JOIN organization_role_permissions orp ON uor.role_id = orp.role_id
            WHERE moa.merchant_id = merchants.id
            AND uor.user_id = auth.uid()
            AND orp.permission_name IN ('manage_organization', 'view_merchants')
        )
    );

CREATE POLICY "Active verified merchants are publicly viewable" ON merchants
    FOR SELECT USING (
        is_active = true AND
        verification_status = 'verified'
    );

-- Merchant locations: Public read for active merchants
CREATE POLICY "Merchant locations viewable for active merchants" ON merchant_locations
    FOR SELECT USING (
        is_active = true AND
        EXISTS (
            SELECT 1 FROM merchants m
            WHERE m.id = merchant_locations.merchant_id
            AND m.is_active = true
            AND m.verification_status = 'verified'
        )
    );

CREATE POLICY "Merchant owners can manage their locations" ON merchant_locations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM merchants m
            WHERE m.id = merchant_locations.merchant_id
            AND m.owner_user_id = auth.uid()
        )
    );

-- Merchant selected offers: Merchant owners can manage
CREATE POLICY "Merchant owners can manage selected offers" ON merchant_selected_offers
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM merchants m
            WHERE m.id = merchant_selected_offers.merchant_id
            AND m.owner_user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view merchant selected offers in their organizations" ON merchant_selected_offers
    FOR SELECT USING (
        is_active = true AND
        EXISTS (
            SELECT 1 FROM user_organization_roles uor
            WHERE uor.user_id = auth.uid()
            AND uor.organization_id = merchant_selected_offers.organization_id
        )
    );

-- ========================================
-- USER INTERACTION POLICIES
-- ========================================

-- User saved offers: Users can only access their own
CREATE POLICY "Users can manage their own saved offers" ON user_saved_offers
    FOR ALL USING (user_id = auth.uid());

-- User followed merchants: Users can only access their own
CREATE POLICY "Users can manage their own followed merchants" ON user_followed_merchants
    FOR ALL USING (user_id = auth.uid());

-- Offer reservations: Users can manage their own, merchants can view theirs
CREATE POLICY "Users can manage their own reservations" ON offer_reservations
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Merchants can view reservations for their offers" ON offer_reservations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM merchants m
            WHERE m.id = offer_reservations.merchant_id
            AND m.owner_user_id = auth.uid()
        )
    );

CREATE POLICY "Merchants can update reservation status" ON offer_reservations
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM merchants m
            WHERE m.id = offer_reservations.merchant_id
            AND m.owner_user_id = auth.uid()
        )
    );

-- User search history: Users can only access their own
CREATE POLICY "Users can manage their own search history" ON user_search_history
    FOR ALL USING (user_id = auth.uid());

-- ========================================
-- ANALYTICS POLICIES
-- ========================================

-- Analytics events: Suppliers can view their own offer analytics
CREATE POLICY "Suppliers can view analytics for their offers" ON analytics_events
    FOR SELECT USING (
        offer_id IS NOT NULL AND
        EXISTS (
            SELECT 1 FROM offers o
            WHERE o.id = analytics_events.offer_id
            AND o.supplier_id = auth.uid()
        )
    );

CREATE POLICY "Merchants can view analytics for their merchant" ON analytics_events
    FOR SELECT USING (
        merchant_id IS NOT NULL AND
        EXISTS (
            SELECT 1 FROM merchants m
            WHERE m.id = analytics_events.merchant_id
            AND m.owner_user_id = auth.uid()
        )
    );

CREATE POLICY "Organization admins can view organization analytics" ON analytics_events
    FOR SELECT USING (
        organization_id IS NOT NULL AND
        EXISTS (
            SELECT 1 FROM user_organization_roles uor
            JOIN organization_role_permissions orp ON uor.role_id = orp.role_id
            WHERE uor.user_id = auth.uid()
            AND uor.organization_id = analytics_events.organization_id
            AND orp.permission_name = 'view_analytics'
        )
    );

-- Analytics events can be inserted by authenticated users
CREATE POLICY "Authenticated users can create analytics events" ON analytics_events
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Offer views: Public insert, restricted read
CREATE POLICY "Anyone can record offer views" ON offer_views
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Suppliers can view their offer analytics" ON offer_views
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM offers o
            WHERE o.id = offer_views.offer_id
            AND o.supplier_id = auth.uid()
        )
    );

-- Merchant views: Public insert, restricted read
CREATE POLICY "Anyone can record merchant views" ON merchant_views
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Merchants can view their analytics" ON merchant_views
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM merchants m
            WHERE m.id = merchant_views.merchant_id
            AND m.owner_user_id = auth.uid()
        )
    );

-- ========================================
-- NOTIFICATION POLICIES
-- ========================================

-- Notifications: Users can only access their own
CREATE POLICY "Users can manage their own notifications" ON notifications
    FOR ALL USING (user_id = auth.uid());

-- Notification preferences: Users can only access their own
CREATE POLICY "Users can manage their own notification preferences" ON notification_preferences
    FOR ALL USING (user_id = auth.uid());

-- ========================================
-- REVIEW POLICIES
-- ========================================

-- Offer reviews: Users can write reviews, everyone can read published reviews
CREATE POLICY "Users can manage their own offer reviews" ON offer_reviews
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Published offer reviews are publicly viewable" ON offer_reviews
    FOR SELECT USING (status = 'published');

-- Merchant reviews: Users can write reviews, everyone can read published reviews
CREATE POLICY "Users can manage their own merchant reviews" ON merchant_reviews
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Published merchant reviews are publicly viewable" ON merchant_reviews
    FOR SELECT USING (status = 'published');

-- ========================================
-- ORGANIZATION-SPECIFIC POLICIES
-- ========================================

-- Organization business rules: Organization admins only
CREATE POLICY "Organization admins can manage business rules" ON organization_business_rules
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_organization_roles uor
            JOIN organization_role_permissions orp ON uor.role_id = orp.role_id
            WHERE uor.user_id = auth.uid()
            AND uor.organization_id = organization_business_rules.organization_id
            AND orp.permission_name = 'manage_organization'
        )
    );

-- Organization roles: Organization admins can manage
CREATE POLICY "Organization admins can manage roles" ON organization_roles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_organization_roles uor
            JOIN organization_role_permissions orp ON uor.role_id = orp.role_id
            WHERE uor.user_id = auth.uid()
            AND uor.organization_id = organization_roles.organization_id
            AND orp.permission_name = 'manage_organization'
        )
    );

-- Organization role permissions: Organization admins can manage
CREATE POLICY "Organization admins can manage role permissions" ON organization_role_permissions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM organization_roles or_inner
            JOIN user_organization_roles uor ON uor.organization_id = or_inner.organization_id
            JOIN organization_role_permissions orp ON uor.role_id = orp.role_id
            WHERE or_inner.id = organization_role_permissions.role_id
            AND uor.user_id = auth.uid()
            AND orp.permission_name = 'manage_organization'
        )
    );

-- User organization roles: Users can view their own, admins can manage
CREATE POLICY "Users can view their own organization roles" ON user_organization_roles
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Organization admins can manage user roles" ON user_organization_roles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_organization_roles uor
            JOIN organization_role_permissions orp ON uor.role_id = orp.role_id
            WHERE uor.user_id = auth.uid()
            AND uor.organization_id = user_organization_roles.organization_id
            AND orp.permission_name = 'manage_users'
        )
    );

-- ========================================
-- UTILITY FUNCTIONS FOR RLS
-- ========================================

-- Function to check if user has any role in organization
CREATE OR REPLACE FUNCTION public.user_is_organization_member(
    user_id_param uuid,
    organization_id_param uuid
)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 
        FROM user_organization_roles 
        WHERE user_id = user_id_param 
        AND organization_id = organization_id_param
    );
$$;

-- Function to get user's organizations
CREATE OR REPLACE FUNCTION public.get_user_organizations(user_id_param uuid)
RETURNS TABLE(organization_id uuid, organization_name text, role_name text)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT 
        uor.organization_id,
        o.name as organization_name,
        or_table.name as role_name
    FROM user_organization_roles uor
    JOIN organizations o ON uor.organization_id = o.id
    JOIN organization_roles or_table ON uor.role_id = or_table.id
    WHERE uor.user_id = user_id_param
    AND o.is_active = true;
$$;