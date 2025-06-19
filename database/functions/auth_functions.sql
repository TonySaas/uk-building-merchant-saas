-- Copy the fixed Supabase functions content from the uploaded document
-- These functions have been fixed to resolve search_path security issues

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