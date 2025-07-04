-- UK Building Merchant SaaS - Complete Authentication Functions
-- These functions have been fixed to resolve search_path security issues
-- and provide comprehensive user registration and permission management

-- 1. Fix debug_registration_test function
CREATE OR REPLACE FUNCTION public.debug_registration_test()
RETURNS TABLE(result jsonb)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT jsonb_build_object(
        'status', 'success',
        'message', 'Registration test function working',
        'timestamp', now()
    );
END;
$$;

-- 2. Fix handle_email_verification function
CREATE OR REPLACE FUNCTION public.handle_email_verification(
    verification_token text,
    user_email text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_record record;
    result jsonb;
BEGIN
    -- Update user email verification status
    UPDATE auth.users 
    SET email_confirmed_at = now()
    WHERE email = user_email 
    AND email_confirmed_at IS NULL;
    
    -- Update user profile verification status
    UPDATE user_profiles 
    SET email_verified = true, 
        email_verified_at = now(),
        updated_at = now()
    WHERE email = user_email;
    
    IF FOUND THEN
        result := jsonb_build_object(
            'success', true,
            'message', 'Email verified successfully'
        );
    ELSE
        result := jsonb_build_object(
            'success', false,
            'message', 'Verification failed or already verified'
        );
    END IF;
    
    RETURN result;
END;
$$;

-- 3. Fix get_registration_organizations function
CREATE OR REPLACE FUNCTION public.get_registration_organizations()
RETURNS TABLE(
    id uuid,
    name text,
    type text,
    description text,
    logo_url text,
    tagline text,
    is_active boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        o.id,
        o.name,
        o.type::text,
        o.description,
        os.logo_url,
        os.tagline,
        o.is_active
    FROM organizations o
    LEFT JOIN organization_settings os ON o.id = os.organization_id
    WHERE o.is_active = true
    ORDER BY o.name;
END;
$$;

-- 4. Create complete user registration function
CREATE OR REPLACE FUNCTION public.complete_user_registration(
    user_id uuid,
    email_param text,
    first_name_param text,
    last_name_param text,
    role_param text,
    company_name_param text DEFAULT NULL,
    phone_param text DEFAULT NULL,
    address_line_1_param text DEFAULT NULL,
    address_line_2_param text DEFAULT NULL,
    city_param text DEFAULT NULL,
    county_param text DEFAULT NULL,
    postal_code_param text DEFAULT NULL,
    organization_ids uuid[] DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_profile_id uuid;
    org_id uuid;
    default_role_id uuid;
    result jsonb;
BEGIN
    -- Insert or update user profile
    INSERT INTO user_profiles (
        id, email, first_name, last_name, role, company_name, phone,
        address_line_1, address_line_2, city, county, postal_code,
        created_at, updated_at
    ) VALUES (
        user_id, email_param, first_name_param, last_name_param, role_param,
        company_name_param, phone_param, address_line_1_param, address_line_2_param,
        city_param, county_param, postal_code_param, now(), now()
    )
    ON CONFLICT (id) DO UPDATE SET
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        role = EXCLUDED.role,
        company_name = EXCLUDED.company_name,
        phone = EXCLUDED.phone,
        address_line_1 = EXCLUDED.address_line_1,
        address_line_2 = EXCLUDED.address_line_2,
        city = EXCLUDED.city,
        county = EXCLUDED.county,
        postal_code = EXCLUDED.postal_code,
        updated_at = now()
    RETURNING id INTO user_profile_id;

    -- Assign user to organizations with default roles
    IF organization_ids IS NOT NULL THEN
        FOREACH org_id IN ARRAY organization_ids
        LOOP
            -- Get default role for this organization and user type
            SELECT id INTO default_role_id
            FROM organization_roles
            WHERE organization_id = org_id 
            AND name = CASE 
                WHEN role_param = 'supplier' THEN 'Supplier'
                WHEN role_param = 'merchant' THEN 'Merchant'
                WHEN role_param = 'consumer' THEN 'Consumer'
                ELSE 'Consumer'
            END
            LIMIT 1;

            -- Create user organization role assignment
            IF default_role_id IS NOT NULL THEN
                INSERT INTO user_organization_roles (user_id, organization_id, role_id)
                VALUES (user_profile_id, org_id, default_role_id)
                ON CONFLICT (user_id, organization_id, role_id) DO NOTHING;
            END IF;
        END LOOP;
    END IF;

    -- Create default notification preferences
    INSERT INTO notification_preferences (user_id)
    VALUES (user_profile_id)
    ON CONFLICT (user_id) DO NOTHING;

    result := jsonb_build_object(
        'success', true,
        'message', 'User registration completed successfully',
        'user_id', user_profile_id,
        'organizations_assigned', array_length(organization_ids, 1)
    );

    RETURN result;
END;
$$;

-- 5. Create user permission checking function
CREATE OR REPLACE FUNCTION public.user_has_permission(
    user_id_param uuid,
    organization_id_param uuid,
    permission_name_param text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    has_permission boolean := false;
BEGIN
    SELECT EXISTS(
        SELECT 1 
        FROM user_organization_roles uor
        JOIN organization_role_permissions orp ON uor.role_id = orp.role_id
        WHERE uor.user_id = user_id_param
        AND uor.organization_id = organization_id_param
        AND orp.permission_name = permission_name_param
    ) INTO has_permission;

    RETURN has_permission;
END;
$$;

-- 6. Create function to setup default organization roles
CREATE OR REPLACE FUNCTION public.setup_default_organization_roles()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    org_record record;
    supplier_role_id uuid;
    merchant_role_id uuid;
    consumer_role_id uuid;
    admin_role_id uuid;
BEGIN
    -- Loop through all organizations
    FOR org_record IN SELECT id, name FROM organizations
    LOOP
        -- Create Supplier role
        INSERT INTO organization_roles (organization_id, name, description)
        VALUES (org_record.id, 'Supplier', 'Can create and manage offers')
        ON CONFLICT (organization_id, name) DO NOTHING
        RETURNING id INTO supplier_role_id;

        -- Create Merchant role
        INSERT INTO organization_roles (organization_id, name, description)
        VALUES (org_record.id, 'Merchant', 'Can select offers and manage merchant locations')
        ON CONFLICT (organization_id, name) DO NOTHING
        RETURNING id INTO merchant_role_id;

        -- Create Consumer role
        INSERT INTO organization_roles (organization_id, name, description)
        VALUES (org_record.id, 'Consumer', 'Can view offers and make reservations')
        ON CONFLICT (organization_id, name) DO NOTHING
        RETURNING id INTO consumer_role_id;

        -- Create Admin role
        INSERT INTO organization_roles (organization_id, name, description)
        VALUES (org_record.id, 'Admin', 'Full organization management permissions')
        ON CONFLICT (organization_id, name) DO NOTHING
        RETURNING id INTO admin_role_id;

        -- Get the role IDs if they already existed
        SELECT id INTO supplier_role_id FROM organization_roles 
        WHERE organization_id = org_record.id AND name = 'Supplier';
        
        SELECT id INTO merchant_role_id FROM organization_roles 
        WHERE organization_id = org_record.id AND name = 'Merchant';
        
        SELECT id INTO consumer_role_id FROM organization_roles 
        WHERE organization_id = org_record.id AND name = 'Consumer';
        
        SELECT id INTO admin_role_id FROM organization_roles 
        WHERE organization_id = org_record.id AND name = 'Admin';

        -- Assign permissions to Supplier role
        INSERT INTO organization_role_permissions (role_id, permission_name) VALUES
        (supplier_role_id, 'create_offers'),
        (supplier_role_id, 'edit_offers'),
        (supplier_role_id, 'delete_offers'),
        (supplier_role_id, 'view_analytics'),
        (supplier_role_id, 'manage_products')
        ON CONFLICT (role_id, permission_name) DO NOTHING;

        -- Assign permissions to Merchant role
        INSERT INTO organization_role_permissions (role_id, permission_name) VALUES
        (merchant_role_id, 'select_offers'),
        (merchant_role_id, 'manage_merchant_profile'),
        (merchant_role_id, 'manage_locations'),
        (merchant_role_id, 'view_reservations'),
        (merchant_role_id, 'manage_stock_status')
        ON CONFLICT (role_id, permission_name) DO NOTHING;

        -- Assign permissions to Consumer role
        INSERT INTO organization_role_permissions (role_id, permission_name) VALUES
        (consumer_role_id, 'view_offers'),
        (consumer_role_id, 'save_offers'),
        (consumer_role_id, 'make_reservations'),
        (consumer_role_id, 'write_reviews'),
        (consumer_role_id, 'follow_merchants')
        ON CONFLICT (role_id, permission_name) DO NOTHING;

        -- Assign permissions to Admin role (all permissions)
        INSERT INTO organization_role_permissions (role_id, permission_name) VALUES
        (admin_role_id, 'create_offers'),
        (admin_role_id, 'edit_offers'),
        (admin_role_id, 'delete_offers'),
        (admin_role_id, 'approve_offers'),
        (admin_role_id, 'manage_users'),
        (admin_role_id, 'manage_organization'),
        (admin_role_id, 'view_analytics'),
        (admin_role_id, 'manage_products'),
        (admin_role_id, 'select_offers'),
        (admin_role_id, 'manage_merchant_profile'),
        (admin_role_id, 'manage_locations'),
        (admin_role_id, 'view_reservations'),
        (admin_role_id, 'manage_stock_status'),
        (admin_role_id, 'view_offers'),
        (admin_role_id, 'save_offers'),
        (admin_role_id, 'make_reservations'),
        (admin_role_id, 'write_reviews'),
        (admin_role_id, 'follow_merchants')
        ON CONFLICT (role_id, permission_name) DO NOTHING;

    END LOOP;
END;
$$;

-- 7. Create trigger function for new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Create a basic user profile when a new user signs up
    INSERT INTO user_profiles (
        id, 
        email, 
        first_name, 
        last_name, 
        role,
        created_at, 
        updated_at
    ) VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'role', 'consumer'),
        now(),
        now()
    );

    -- Create default notification preferences
    INSERT INTO notification_preferences (user_id)
    VALUES (NEW.id);

    RETURN NEW;
END;
$$;

-- Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_registration();

-- 8. Create email availability checking function
CREATE OR REPLACE FUNCTION public.check_email_availability(
    p_email text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    email_exists boolean := false;
    result jsonb;
BEGIN
    -- Check if email exists in auth.users
    SELECT EXISTS(
        SELECT 1 FROM auth.users WHERE email = p_email
    ) INTO email_exists;
    
    IF email_exists THEN
        result := jsonb_build_object(
            'available', false,
            'message', 'Email is already registered'
        );
    ELSE
        result := jsonb_build_object(
            'available', true,
            'message', 'Email is available'
        );
    END IF;
    
    RETURN result;
END;
$$;

-- 9. Create robust user profile creation function
CREATE OR REPLACE FUNCTION public.create_user_profile_robust(
    user_id uuid,
    email_param text,
    first_name_param text DEFAULT '',
    last_name_param text DEFAULT '',
    role_param text DEFAULT 'consumer'
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result jsonb;
    existing_profile_count integer;
BEGIN
    -- Check if profile already exists
    SELECT COUNT(*) INTO existing_profile_count
    FROM user_profiles
    WHERE id = user_id;

    IF existing_profile_count > 0 THEN
        result := jsonb_build_object(
            'success', false,
            'message', 'User profile already exists',
            'user_id', user_id
        );
        RETURN result;
    END IF;

    -- Create user profile
    INSERT INTO user_profiles (
        id, email, first_name, last_name, role, created_at, updated_at
    ) VALUES (
        user_id, email_param, first_name_param, last_name_param, role_param, now(), now()
    );

    -- Create notification preferences
    INSERT INTO notification_preferences (user_id)
    VALUES (user_id)
    ON CONFLICT (user_id) DO NOTHING;

    result := jsonb_build_object(
        'success', true,
        'message', 'User profile created successfully',
        'user_id', user_id
    );

    RETURN result;
END;
$$;