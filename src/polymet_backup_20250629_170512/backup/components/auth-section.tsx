import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoginForm from "./login-form";
import RoleBasedRegistrationForm from "./role-based-registration-form";

export default function AuthSection() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('register');

  const handleLogin = async (loginData: any) => {
    console.log('Login attempt:', loginData);
    // Handle organization context if provided
    if (loginData.organizationContext) {
      localStorage.setItem('organizationContext', loginData.organizationContext);
    }
    // TODO: Implement Supabase authentication
    alert(`Login attempt for ${loginData.email}${loginData.organizationContext ? ` in ${loginData.organizationContext} context` : ''}`);
  };

  const handleRegister = async (registrationData: any) => {
    console.log('Registration attempt:', registrationData);
    // TODO: Implement Supabase registration with multi-organization support
    alert(`Registration would create: ${registrationData.role} account for ${registrationData.personalInfo.firstName} ${registrationData.personalInfo.lastName}`);
  };

  const handleForgotPassword = () => {
    alert('Forgot password functionality would be implemented here');
  };

  const handleSocialLogin = (provider: 'google' | 'microsoft' | 'github') => {
    console.log('Social login attempt:', provider);
    alert(`${provider} social login would be implemented here`);
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
          Registration Flows
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-gray-800 rounded-lg p-8">
        {activeTab === 'login' ? (
          <LoginForm
            onSubmit={handleLogin}
            onForgotPassword={handleForgotPassword}
            onSocialLogin={handleSocialLogin}
            isLoading={false}
          />
        ) : (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Registration Flow Demos</h3>
              <p className="text-gray-400">
                Explore different registration flows for the BuildConnect platform
              </p>
            </div>
            
            <div className="flex space-x-4 mb-6">
              <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors">
                Standard Registration
              </button>
              <button className="px-4 py-2 bg-white text-gray-900 rounded-md hover:bg-gray-100 transition-colors">
                Role-based Registration
              </button>
            </div>
            
            <RoleBasedRegistrationForm
              onSubmit={handleRegister}
              loading={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}