import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoginForm from "./login-form";
import RoleBasedRegistrationForm from "./role-based-registration-form";
import { authService } from "@/lib/auth";
import { toast } from "sonner";

export default function AuthSection() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('register');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (loginData: any) => {
    console.log('Login attempt:', loginData);
    setIsLoading(true);
    
    try {
      const result = await authService.login(loginData);
      
      if (result.success) {
        toast.success('Login successful!');
        // The auth context will handle the redirect
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (registrationData: any) => {
    console.log('🚀 Registration attempt:', registrationData);
    setIsLoading(true);
    
    try {
      // Convert detailed role names to simple ones
      let simpleRole: 'supplier' | 'merchant' | 'consumer' = 'consumer';
      if (registrationData.role.includes('supplier')) {
        simpleRole = 'supplier';
      } else if (registrationData.role.includes('merchant')) {
        simpleRole = 'merchant';
      }

      console.log('📝 Role mapping:', registrationData.role, '→', simpleRole);

      // Build registration data for the auth service
      const authRegistrationData = {
        email: registrationData.personalInfo.email,
        password: registrationData.password,
        firstName: registrationData.personalInfo.firstName,
        lastName: registrationData.personalInfo.lastName,
        phone: registrationData.personalInfo.phone,
        role: simpleRole,
        companyName: registrationData.companyInfo?.companyName,
        jobTitle: registrationData.personalInfo.jobTitle,
        organizationIds: registrationData.organizations?.length > 0 ? 
          registrationData.organizations.map(org => org.id) : 
          ['550e8400-e29b-41d4-a716-446655440001'] // Default to Toolbank
      };

      console.log('📤 Calling authService.register with:', authRegistrationData);

      const result = await authService.register(authRegistrationData);

      if (result.success) {
        console.log('✅ Registration successful!');
        if (result.requiresEmailVerification) {
          toast.success('Registration successful! Please check your email for verification.');
        } else {
          toast.success('Registration successful! Welcome to BuildConnect!');
        }
      } else {
        console.error('❌ Registration failed:', result.error);
        toast.error(result.error || 'Registration failed');
      }

    } catch (error) {
      console.error('💥 Registration error:', error);
      toast.error('An unexpected error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast.info('Forgot password functionality would be implemented here');
  };

  const handleSocialLogin = (provider: 'google' | 'microsoft' | 'github') => {
    console.log('Social login attempt:', provider);
    toast.info(`${provider} social login would be implemented here`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tab Headers */}
      <div className="flex mb-8">
        <button
          onClick={() => setActiveTab('login')}
          className={`flex-1 py-3 px-6 text-center font-medium rounded-l-lg transition-all ${
            activeTab === 'login'
              ? 'bg-gray-800 text-white border-b-2 border-blue-500'
              : 'bg-gray-900 text-gray-400 hover:text-gray-300'
          }`}
        >
          Login / Register
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`flex-1 py-3 px-6 text-center font-medium rounded-r-lg transition-all ${
            activeTab === 'register'
              ? 'bg-gray-800 text-white border-b-2 border-blue-500'
              : 'bg-gray-900 text-gray-400 hover:text-gray-300'
          }`}
        >
          🔥 ENHANCED Registration (FIXED!)
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-gray-800 rounded-lg p-8">
        {activeTab === 'login' ? (
          <LoginForm
            onSubmit={handleLogin}
            onForgotPassword={handleForgotPassword}
            onSocialLogin={handleSocialLogin}
            isLoading={isLoading}
          />
        ) : (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">🔥 FIXED Registration Flow</h3>
              <p className="text-green-400 mb-2">
                ✅ Now saves ALL data: job_title, company_name, phone, etc.
              </p>
              <p className="text-green-400 mb-2">
                ✅ Automatically assigns roles: Consumer, Supplier Admin, Merchant Admin
              </p>
              <p className="text-gray-400">
                Check your browser console for detailed logs during registration
              </p>
            </div>
            
            <RoleBasedRegistrationForm
              onSubmit={handleRegister}
              loading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
}
