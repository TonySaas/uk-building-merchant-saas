import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface UserSession {
  session_token: string;
  user_id: string;
  device_info?: {
    user_agent?: string;
    platform?: string;
    vendor?: string;
  };
  location_data?: {
    ip_address?: string;
    city?: string;
    region?: string;
    country?: string;
    timezone?: string;
  };
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface RegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  companyName?: string;
  jobTitle?: string;
  phone?: string;
  organizationId?: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  marketingOptIn?: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  async register(data: RegistrationData): Promise<{ success: boolean }> {
    try {
      console.log("=== ENHANCED REGISTRATION PROCESS STARTED ===");
      console.log("Registration data being sent:", {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        phone: data.phone,
        organizationId: data.organizationId,
        termsAccepted: data.termsAccepted,
        privacyAccepted: data.privacyAccepted,
        marketingOptIn: data.marketingOptIn
      });
      
      // Register with Supabase authentication with ALL metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            // Pass ALL registration data in metadata for the database trigger
            first_name: data.firstName,
            last_name: data.lastName,
            role: data.role,
            job_title: data.jobTitle,
            company_name: data.companyName,
            phone: data.phone,
            organization_id: data.organizationId,
            terms_accepted: data.termsAccepted,
            privacy_accepted: data.privacyAccepted,
            marketing_opt_in: data.marketingOptIn
          }
        }
      });
      
      console.log("Supabase auth response:", { authData, authError });
      
      if (authError) {
        console.error("Authentication error:", authError);
        toast.error(`Registration failed: ${authError.message}`);
        return { success: false };
      }

      if (authData.user) {
        console.log("User created successfully:", {
          id: authData.user.id,
          email: authData.user.email,
          created_at: authData.user.created_at
        });
        
        // Wait for the database trigger to execute and create the complete profile
        console.log("Waiting for database trigger to create complete user profile and assign roles...");
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Verify the complete profile was created with all data
        const { data: profileData, error: profileCheckError } = await supabase
          .from('user_profiles')
          .select(`
            *,
            user_organization_roles (
              organization_id,
              role_id,
              is_active,
              organization_roles (
                name,
                permissions
              ),
              organizations (
                name,
                type
              )
            )
          `)
          .eq('id', authData.user.id)
          .single();
        
        console.log("Complete profile check result:", { profileData, profileCheckError });
        
        if (profileData) {
          console.log("✅ Complete profile created successfully:");
          console.log("- Personal data:", {
            first_name: profileData.first_name,
            last_name: profileData.last_name,
            job_title: profileData.job_title,
            company_name: profileData.company_name,
            phone: profileData.phone,
            role: profileData.role
          });
          console.log("- Organization roles:", profileData.user_organization_roles);
          
          // Verify essential fields were saved
          if (!profileData.first_name || !profileData.last_name) {
            console.warn("⚠️ Some personal data is missing from profile");
          }
          
          if (!profileData.user_organization_roles || profileData.user_organization_roles.length === 0) {
            console.warn("⚠️ No organization roles assigned");
          } else {
            console.log("✅ User roles assigned successfully");
          }
          
        } else if (profileCheckError) {
          console.error("❌ Profile verification failed:", profileCheckError);
          toast.error("Profile creation failed. Please contact support.");
          return { success: false };
        }
        
        console.log("=== ENHANCED REGISTRATION PROCESS COMPLETED ===");
      }
      
      toast.success("Registration successful! Please check your email to verify your account.");
      return { success: true };
      
    } catch (err) {
      console.error("Unexpected error during registration:", err);
      toast.error("An unexpected error occurred during registration");
      return { success: false };
    }
  },

  async createUserSession(userId: string, sessionToken: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Gather device and location information
      const deviceInfo = {
        user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
        platform: typeof window !== 'undefined' ? window.navigator.platform : '',
        vendor: typeof window !== 'undefined' ? window.navigator.vendor : ''
      };

      // Note: In a production environment, you would want to get the actual IP and location
      // This is a simplified example that would be enhanced with a server-side API
      const locationData = {
        // These would be populated by a server-side API or a service like ipinfo.io
        // For now, we'll leave them empty
      };

      // Set session to expire in 7 days
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      const { error } = await supabase
        .from('user_sessions')
        .insert({
          session_token: sessionToken,
          user_id: userId,
          device_info: deviceInfo,
          location_data: locationData,
          expires_at: expiresAt.toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error creating user session:', error);
        return { success: false, error: error.message };
      }

      console.log('User session created successfully');
      return { success: true };
    } catch (error) {
      console.error('Unexpected error creating user session:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error creating session' 
      };
    }
  },

  async cleanupExpiredSessions(): Promise<{ success: boolean; count?: number; error?: string }> {
    try {
      const { data, error } = await supabase
        .rpc('delete_expired_sessions');

      if (error) {
        console.error('Error cleaning up expired sessions:', error);
        return { success: false, error: error.message };
      }

      console.log(`Cleaned up ${data} expired sessions`);
      return { success: true, count: data };
    } catch (error) {
      console.error('Unexpected error cleaning up sessions:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error cleaning up sessions' 
      };
    }
  },

  async login(data: LoginData): Promise<{ success: boolean }> {
    try {
      console.log("=== LOGIN PROCESS STARTED ===");
      console.log("Login attempt for email:", data.email);
      
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });
      
      console.log("Login response:", { authData, error });
      
      if (error) {
        console.error("Login error:", error);
        toast.error(`Login failed: ${error.message}`);
        return { success: false };
      }
      
      if (authData.session && authData.user) {
        // Create a new session record
        const sessionToken = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const sessionResult = await this.createUserSession(authData.user.id, sessionToken);
        
        if (!sessionResult.success) {
          console.warn("Failed to create session record:", sessionResult.error);
          // Continue with login even if session tracking fails
        }
        
        // Store the session token in local storage for future requests
        if (typeof window !== 'undefined') {
          localStorage.setItem('session_token', sessionToken);
        }
      }
      
      console.log("Login successful for user:", authData.user?.id);
      toast.success("Login successful!");
      return { success: true };
      
    } catch (err) {
      console.error("Unexpected error during login:", err);
      toast.error("An unexpected error occurred during login");
      return { success: false };
    }
  },
  
  async logout(): Promise<{ success: boolean }> {
    try {
      // Get the current session token
      const sessionToken = typeof window !== 'undefined' 
        ? localStorage.getItem('session_token') 
        : null;
      
      // Clear the session token from local storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('session_token');
      }
      
      // If we have a session token, mark it as expired
      if (sessionToken) {
        const { error } = await supabase
          .from('user_sessions')
          .update({ 
            expires_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('session_token', sessionToken);
          
        if (error) {
          console.error('Error expiring session:', error);
        }
      }
      
      // Sign out from Supabase auth
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Error during logout:', error);
        return { success: false };
      }
      
      return { success: true };
    } catch (error) {
      console.error('Unexpected error during logout:', error);
      return { success: false };
    }
  }
};
