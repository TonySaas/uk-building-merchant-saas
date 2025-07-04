-- UK Building Merchant SaaS - Storage Buckets and Policies
-- This script sets up Supabase Storage buckets and RLS policies for media files

-- ========================================
-- CREATE STORAGE BUCKETS
-- ========================================

-- Create product images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'product-images',
    'product-images',
    true,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
) ON CONFLICT (id) DO UPDATE SET
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Create offer media bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'offer-media',
    'offer-media',
    true,
    52428800, -- 50MB limit for videos
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'video/mp4', 'video/webm', 'application/pdf']
) ON CONFLICT (id) DO UPDATE SET
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Create organization logos bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'organization-logos',
    'organization-logos',
    true,
    2097152, -- 2MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
) ON CONFLICT (id) DO UPDATE SET
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Create merchant logos bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'merchant-logos',
    'merchant-logos',
    true,
    2097152, -- 2MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
) ON CONFLICT (id) DO UPDATE SET
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Create user avatars bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'user-avatars',
    'user-avatars',
    true,
    1048576, -- 1MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp']
) ON CONFLICT (id) DO UPDATE SET
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Create documents bucket (for terms, brochures, etc.)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'documents',
    'documents',
    false, -- Private bucket
    104857600, -- 100MB limit
    ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
) ON CONFLICT (id) DO UPDATE SET
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ========================================
-- STORAGE RLS POLICIES
-- ========================================

-- ========================================
-- PRODUCT IMAGES POLICIES
-- ========================================

-- Allow public read access to product images
CREATE POLICY "Product images are publicly viewable"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Allow suppliers to upload product images
CREATE POLICY "Suppliers can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'product-images' AND
    auth.role() = 'authenticated' AND
    -- Check if user is a supplier
    EXISTS (
        SELECT 1 FROM user_profiles up
        WHERE up.id = auth.uid()
        AND up.role = 'supplier'
    )
);

-- Allow suppliers to update their own product images
CREATE POLICY "Suppliers can update their own product images"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'product-images' AND
    auth.role() = 'authenticated' AND
    -- Extract supplier ID from the file path (assuming path structure: supplier_id/product_id/filename)
    (string_to_array(name, '/'))[1]::uuid = auth.uid()
);

-- Allow suppliers to delete their own product images
CREATE POLICY "Suppliers can delete their own product images"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'product-images' AND
    auth.role() = 'authenticated' AND
    (string_to_array(name, '/'))[1]::uuid = auth.uid()
);

-- ========================================
-- OFFER MEDIA POLICIES
-- ========================================

-- Allow public read access to offer media
CREATE POLICY "Offer media is publicly viewable"
ON storage.objects FOR SELECT
USING (bucket_id = 'offer-media');

-- Allow suppliers to upload offer media
CREATE POLICY "Suppliers can upload offer media"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'offer-media' AND
    auth.role() = 'authenticated' AND
    EXISTS (
        SELECT 1 FROM user_profiles up
        WHERE up.id = auth.uid()
        AND up.role = 'supplier'
    )
);

-- Allow suppliers to manage their own offer media
CREATE POLICY "Suppliers can manage their own offer media"
ON storage.objects FOR ALL
USING (
    bucket_id = 'offer-media' AND
    auth.role() = 'authenticated' AND
    (string_to_array(name, '/'))[1]::uuid = auth.uid()
);

-- ========================================
-- ORGANIZATION LOGOS POLICIES
-- ========================================

-- Allow public read access to organization logos
CREATE POLICY "Organization logos are publicly viewable"
ON storage.objects FOR SELECT
USING (bucket_id = 'organization-logos');

-- Allow organization admins to upload logos
CREATE POLICY "Organization admins can upload logos"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'organization-logos' AND
    auth.role() = 'authenticated' AND
    EXISTS (
        SELECT 1 FROM user_organization_roles uor
        JOIN organization_role_permissions orp ON uor.role_id = orp.role_id
        JOIN organizations o ON uor.organization_id = o.id
        WHERE uor.user_id = auth.uid()
        AND orp.permission_name = 'manage_organization'
        AND o.name = (string_to_array(name, '/'))[1] -- Organization name from path
    )
);

-- Allow organization admins to manage their logos
CREATE POLICY "Organization admins can manage their logos"
ON storage.objects FOR ALL
USING (
    bucket_id = 'organization-logos' AND
    auth.role() = 'authenticated' AND
    EXISTS (
        SELECT 1 FROM user_organization_roles uor
        JOIN organization_role_permissions orp ON uor.role_id = orp.role_id
        JOIN organizations o ON uor.organization_id = o.id
        WHERE uor.user_id = auth.uid()
        AND orp.permission_name = 'manage_organization'
        AND o.name = (string_to_array(name, '/'))[1]
    )
);

-- ========================================
-- MERCHANT LOGOS POLICIES
-- ========================================

-- Allow public read access to merchant logos
CREATE POLICY "Merchant logos are publicly viewable"
ON storage.objects FOR SELECT
USING (bucket_id = 'merchant-logos');

-- Allow merchant owners to upload logos
CREATE POLICY "Merchant owners can upload logos"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'merchant-logos' AND
    auth.role() = 'authenticated' AND
    EXISTS (
        SELECT 1 FROM merchants m
        WHERE m.owner_user_id = auth.uid()
        AND m.id::text = (string_to_array(name, '/'))[1] -- Merchant ID from path
    )
);

-- Allow merchant owners to manage their logos
CREATE POLICY "Merchant owners can manage their logos"
ON storage.objects FOR ALL
USING (
    bucket_id = 'merchant-logos' AND
    auth.role() = 'authenticated' AND
    EXISTS (
        SELECT 1 FROM merchants m
        WHERE m.owner_user_id = auth.uid()
        AND m.id::text = (string_to_array(name, '/'))[1]
    )
);

-- ========================================
-- USER AVATARS POLICIES
-- ========================================

-- Allow public read access to user avatars
CREATE POLICY "User avatars are publicly viewable"
ON storage.objects FOR SELECT
USING (bucket_id = 'user-avatars');

-- Allow users to upload their own avatars
CREATE POLICY "Users can upload their own avatars"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'user-avatars' AND
    auth.role() = 'authenticated' AND
    (string_to_array(name, '/'))[1]::uuid = auth.uid()
);

-- Allow users to manage their own avatars
CREATE POLICY "Users can manage their own avatars"
ON storage.objects FOR ALL
USING (
    bucket_id = 'user-avatars' AND
    auth.role() = 'authenticated' AND
    (string_to_array(name, '/'))[1]::uuid = auth.uid()
);

-- ========================================
-- DOCUMENTS POLICIES (Private Bucket)
-- ========================================

-- Allow users to access documents they have permission to see
CREATE POLICY "Users can access authorized documents"
ON storage.objects FOR SELECT
USING (
    bucket_id = 'documents' AND
    auth.role() = 'authenticated' AND
    (
        -- Users can access their own documents
        (string_to_array(name, '/'))[1]::uuid = auth.uid() OR
        -- Or documents from organizations they belong to
        EXISTS (
            SELECT 1 FROM user_organization_roles uor
            JOIN organizations o ON uor.organization_id = o.id
            WHERE uor.user_id = auth.uid()
            AND o.name = (string_to_array(name, '/'))[1]
        )
    )
);

-- Allow suppliers and organization admins to upload documents
CREATE POLICY "Authorized users can upload documents"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'documents' AND
    auth.role() = 'authenticated' AND
    (
        -- Suppliers can upload their own documents
        (EXISTS (
            SELECT 1 FROM user_profiles up
            WHERE up.id = auth.uid()
            AND up.role = 'supplier'
        ) AND (string_to_array(name, '/'))[1]::uuid = auth.uid()) OR
        -- Organization admins can upload organization documents
        EXISTS (
            SELECT 1 FROM user_organization_roles uor
            JOIN organization_role_permissions orp ON uor.role_id = orp.role_id
            JOIN organizations o ON uor.organization_id = o.id
            WHERE uor.user_id = auth.uid()
            AND orp.permission_name = 'manage_organization'
            AND o.name = (string_to_array(name, '/'))[1]
        )
    )
);

-- Allow users to manage their own documents
CREATE POLICY "Users can manage their authorized documents"
ON storage.objects FOR ALL
USING (
    bucket_id = 'documents' AND
    auth.role() = 'authenticated' AND
    (
        (string_to_array(name, '/'))[1]::uuid = auth.uid() OR
        EXISTS (
            SELECT 1 FROM user_organization_roles uor
            JOIN organization_role_permissions orp ON uor.role_id = orp.role_id
            JOIN organizations o ON uor.organization_id = o.id
            WHERE uor.user_id = auth.uid()
            AND orp.permission_name = 'manage_organization'
            AND o.name = (string_to_array(name, '/'))[1]
        )
    )
);

-- ========================================
-- HELPER FUNCTIONS FOR STORAGE
-- ========================================

-- Function to generate organized file paths
CREATE OR REPLACE FUNCTION public.generate_file_path(
    bucket_name text,
    entity_type text, -- 'product', 'offer', 'merchant', 'organization', 'user'
    entity_id uuid,
    filename text
)
RETURNS text
LANGUAGE sql
AS $$
    SELECT 
        CASE 
            WHEN bucket_name = 'product-images' THEN entity_id::text || '/' || filename
            WHEN bucket_name = 'offer-media' THEN entity_id::text || '/' || filename
            WHEN bucket_name = 'merchant-logos' THEN entity_id::text || '/' || filename
            WHEN bucket_name = 'user-avatars' THEN entity_id::text || '/' || filename
            ELSE entity_id::text || '/' || filename
        END;
$$;

-- Function to get file URL
CREATE OR REPLACE FUNCTION public.get_file_url(
    bucket_name text,
    file_path text
)
RETURNS text
LANGUAGE sql
AS $$
    SELECT 
        CASE 
            WHEN bucket_name IN ('product-images', 'offer-media', 'organization-logos', 'merchant-logos', 'user-avatars') THEN
                -- Public buckets
                'https://lpsfnwbkofjpzmlbcztw.supabase.co/storage/v1/object/public/' || bucket_name || '/' || file_path
            ELSE
                -- Private buckets (requires signed URL)
                'https://lpsfnwbkofjpzmlbcztw.supabase.co/storage/v1/object/sign/' || bucket_name || '/' || file_path
        END;
$$;