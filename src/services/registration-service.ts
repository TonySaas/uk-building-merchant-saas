// Registration service for handling user registration
import { supabase } from '@/lib/supabase'

type RegistrationData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'supplier' | 'merchant' | 'consumer';
  companyName?: string;
  organizationIds?: string[];
  phone?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    county?: string;
    postalCode?: string;
    country?: string;
  };
};

type RegistrationResult = {
  success: boolean;
  message: string;
  userId?: string;
  error?: any;
};

export class RegistrationService {
  static async registerUser(data: RegistrationData): Promise<RegistrationResult> {
    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            role: data.role,
            company_name: data.companyName,
          }
        }
      });

      if (authError) {
        return {
          success: false,
          message: authError.message,
          error: authError
        };
      }

      if (!authData.user) {
        return {
          success: false,
          message: 'Failed to create user account'
        };
      }

      // Complete user registration with additional data
      if (data.organizationIds && data.organizationIds.length > 0) {
        const { data: completionData, error: completionError } = await supabase
          .rpc('complete_user_registration', {
            p_user_id: authData.user.id,
            p_role: data.role,
            p_organization_ids: data.organizationIds,
            p_first_name: data.firstName,
            p_last_name: data.lastName,
            p_company_name: data.companyName,
            p_phone: data.phone,
            p_address_line_1: data.address?.line1,
            p_address_line_2: data.address?.line2,
            p_city: data.address?.city,
            p_county: data.address?.county,
            p_postal_code: data.address?.postalCode,
            p_country: data.address?.country || 'United Kingdom'
          });

        if (completionError) {
          console.error('Registration completion error:', completionError);
          // User was created but additional data failed - still consider success
        }
      }

      return {
        success: true,
        message: 'Registration successful! Please check your email to verify your account.',
        userId: authData.user.id
      };

    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'An unexpected error occurred during registration',
        error
      };
    }
  }

  static async checkEmailAvailability(email: string): Promise<{ available: boolean; message?: string }> {
    try {
      const { data, error } = await supabase
        .rpc('check_email_availability', { p_email: email });

      if (error) {
        console.error('Email availability check error:', error);
        return { available: false, message: 'Unable to check email availability' };
      }

      return {
        available: data?.available || false,
        message: data?.available ? 'Email is available' : 'Email is already registered'
      };
    } catch (error) {
      console.error('Email availability check error:', error);
      return { available: false, message: 'Unable to check email availability' };
    }
  }

  static async getRegistrationOrganizations() {
    try {
      const { data, error } = await supabase
        .rpc('get_registration_organizations');

      if (error) {
        console.error('Failed to fetch organizations:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
      return [];
    }
  }
}

// Backward compatibility exports
export const registerUser = RegistrationService.registerUser;
export const checkEmailAvailability = RegistrationService.checkEmailAvailability;
