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
            user_id: authData.user.id,
            email_param: data.email,
            first_name_param: data.firstName,
            last_name_param: data.lastName,
            role_param: data.role,
            company_name_param: data.companyName,
            phone_param: data.phone,
            address_line_1_param: data.address?.line1,
            address_line_2_param: data.address?.line2,
            city_param: data.address?.city,
            county_param: data.address?.county,
            postal_code_param: data.address?.postalCode,
            organization_ids: data.organizationIds
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
