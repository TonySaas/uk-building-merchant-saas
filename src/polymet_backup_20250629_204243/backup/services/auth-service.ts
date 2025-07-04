
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface RegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
  jobTitle: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  async register(data: RegistrationData): Promise<{ success: boolean }> {
    try {
      console.log("=== REGISTRATION PROCESS STARTED ===");
      console.log("Registration data being sent:", {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        companyName: data.companyName,
        jobTitle: data.jobTitle
      });
      
      // Register with Supabase authentication
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            company_name: data.companyName,
            job_title: data.jobTitle,
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
        
        // Wait for the trigger to execute and create the profile
        console.log("Waiting for database trigger to create user profile...");
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Check if profile was created by trigger
        const { data: profileData, error: profileCheckError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();
        
        console.log("Profile check result:", { profileData, profileCheckError });
        
        // If profile doesn't exist, create it manually
        if (!profileData && profileCheckError) {
          console.log("Profile not found, creating manually...");
          const { data: newProfileData, error: profileError } = await supabase
            .from('user_profiles')
            .insert([
              {
                id: authData.user.id,
                email: data.email,
                first_name: data.firstName,
                last_name: data.lastName,
                company_name: data.companyName,
                job_title: data.jobTitle
              }
            ])
            .select()
            .single();
          
          if (profileError) {
            console.error("Manual profile creation error:", profileError);
            toast.error("Profile creation failed. Please contact support.");
          } else {
            console.log("Profile created manually:", newProfileData);
          }
        } else if (profileData) {
          console.log("Profile created by trigger successfully:", profileData);
        }
        
        // Create default user role as 'merchant'
        console.log("Creating user role...");
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .insert([
            {
              user_id: authData.user.id,
              role: 'merchant',
              status: 'active'
            }
          ])
          .select()
          .single();
        
        if (roleError) {
          console.error("Role assignment error:", roleError);
          toast.error("Role assignment failed. Please contact support.");
        } else {
          console.log("User role assigned successfully:", roleData);
        }
        
        console.log("=== REGISTRATION PROCESS COMPLETED ===");
      }
      
      toast.success("Registration successful! Please check your email to verify your account.");
      return { success: true };
      
    } catch (err) {
      console.error("Unexpected error during registration:", err);
      toast.error("An unexpected error occurred during registration");
      return { success: false };
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
      
      console.log("Login successful for user:", authData.user?.id);
      toast.success("Login successful!");
      return { success: true };
      
    } catch (err) {
      console.error("Unexpected error during login:", err);
      toast.error("An unexpected error occurred during login");
      return { success: false };
    }
  }
};
