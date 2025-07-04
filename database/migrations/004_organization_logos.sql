-- Create organization_logos table
CREATE TABLE organization_logos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    logo_url TEXT,
    logo_storage_path TEXT,
    logo_alt_text TEXT,
    is_primary BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_organization_logos_organization_id ON organization_logos(organization_id);
CREATE INDEX idx_organization_logos_is_primary ON organization_logos(is_primary);

-- Enable RLS
ALTER TABLE organization_logos ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Organization logos are viewable by everyone" ON organization_logos
    FOR SELECT USING (true);

CREATE POLICY "Organization logos are editable by organization admins" ON organization_logos
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_organizations uo
            WHERE uo.organization_id = organization_logos.organization_id
            AND uo.user_id = auth.uid()
            AND uo.role IN ('admin', 'owner')
        )
    );

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_organization_logos_updated_at
    BEFORE UPDATE ON organization_logos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();