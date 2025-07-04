-- UK Building Merchant SaaS Database Schema
-- This migration creates the foundational multi-organization architecture

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('wholesaler', 'buying_group', 'trade_association')),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(name)
);

-- Create organization settings for branding and configuration
CREATE TABLE IF NOT EXISTS organization_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    logo_url TEXT,
    primary_color TEXT DEFAULT '#3b82f6',
    secondary_color TEXT DEFAULT '#1e40af',
    tagline TEXT,
    terms_and_conditions TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(organization_id)
);

-- Create organization business rules for configurable workflows
CREATE TABLE IF NOT EXISTS organization_business_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    rule_type TEXT NOT NULL,
    rule_config JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create organization roles for RBAC
CREATE TABLE IF NOT EXISTS organization_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(organization_id, name)
);

-- Create organization role permissions
CREATE TABLE IF NOT EXISTS organization_role_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id UUID REFERENCES organization_roles(id) ON DELETE CASCADE,
    permission_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(role_id, permission_name)
);

-- Create user profiles extending auth.users
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    role TEXT NOT NULL DEFAULT 'consumer' CHECK (role IN ('supplier', 'merchant', 'consumer', 'admin')),
    company_name TEXT,
    phone TEXT,
    address_line_1 TEXT,
    address_line_2 TEXT,
    city TEXT,
    county TEXT,
    postal_code TEXT,
    country TEXT DEFAULT 'United Kingdom',
    email_verified BOOLEAN DEFAULT false,
    email_verified_at TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    login_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(email)
);

-- Create user organization roles junction table
CREATE TABLE IF NOT EXISTS user_organization_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    role_id UUID REFERENCES organization_roles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(user_id, organization_id, role_id)
);

-- Create organization relationships for hierarchies
CREATE TABLE IF NOT EXISTS organization_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    child_organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    relationship_type TEXT NOT NULL DEFAULT 'partnership',
    created_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(parent_organization_id, child_organization_id)
);

-- Create approval workflows
CREATE TABLE IF NOT EXISTS approval_workflows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    workflow_type TEXT NOT NULL,
    config JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create RLS policies
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_business_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_organization_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE approval_workflows ENABLE ROW LEVEL SECURITY;

-- RLS Policies for organizations (public read access)
CREATE POLICY "Organizations are viewable by everyone" ON organizations
    FOR SELECT USING (true);

CREATE POLICY "Organization settings are viewable by everyone" ON organization_settings
    FOR SELECT USING (true);

-- RLS Policies for user profiles (users can only see their own)
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for user organization roles
CREATE POLICY "Users can view own organization roles" ON user_organization_roles
    FOR SELECT USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_organizations_type ON organizations(type);
CREATE INDEX IF NOT EXISTS idx_organizations_active ON organizations(is_active);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_org_roles_user ON user_organization_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_org_roles_org ON user_organization_roles(organization_id);
CREATE INDEX IF NOT EXISTS idx_org_roles_org ON organization_roles(organization_id);

-- Insert initial organizations
INSERT INTO organizations (name, type, description, is_active) VALUES
('Toolbank', 'wholesaler', 'UK''s leading tool wholesaler with "Keeping the Tool Trade Local" ethos', true),
('NMBS', 'buying_group', 'National Merchant Buying Society - 1,250+ merchant members empowering independent merchants', true),
('BMN', 'buying_group', 'Builders'' Merchants News', true),
('BMF', 'trade_association', 'Builders Merchants Federation - Trade association representing 1,020+ companies', true)
ON CONFLICT (name) DO NOTHING;

-- Insert organization settings with brand colors
INSERT INTO organization_settings (organization_id, logo_url, primary_color, secondary_color, tagline) 
SELECT 
    o.id,
    CASE o.name
        WHEN 'Toolbank' THEN '/logos/toolbank-logo.png'
        WHEN 'NMBS' THEN '/logos/nmbs-logo.png'
        WHEN 'BMN' THEN '/logos/ibc-logo.png'
        WHEN 'BMF' THEN '/logos/bmf-logo.png'
    END,
    CASE o.name
        WHEN 'Toolbank' THEN '#3b82f6'
        WHEN 'NMBS' THEN '#22c55e'
        WHEN 'BMN' THEN '#a855f7'
        WHEN 'BMF' THEN '#f97316'
    END,
    CASE o.name
        WHEN 'Toolbank' THEN '#1d4ed8'
        WHEN 'NMBS' THEN '#15803d'
        WHEN 'BMN' THEN '#7c3aed'
        WHEN 'BMF' THEN '#c2410c'
    END,
    CASE o.name
        WHEN 'Toolbank' THEN 'Keeping the Tool Trade Local'
        WHEN 'NMBS' THEN 'Empowering Independent Merchants'
        WHEN 'BMN' THEN 'Builders'' Merchants News'
        WHEN 'BMF' THEN 'Representing the Building Materials Industry'
    END
FROM organizations o
ON CONFLICT (organization_id) DO NOTHING;