import { Link } from "react-router-dom";
import RegistrationCard from "@/polymet/components/registration-card";
import { ShieldCheckIcon } from "lucide-react";
import { RegistrationService } from "@/services/registration-service";
import { supabase } from "@/integrations/supabase/client";

export default function RegisterPage() {
  // Test function to quickly test registration
  const testRegistrationNow = async () => {
    const testEmail = `test${Date.now()}@example.com`;
    const testPassword = 'Test123!';
    
    console.log('🧪 Testing registration with:', testEmail);
    
    const result = await RegistrationService.registerUser({
      userType: 'consumer',
      organizationIds: [],
      role: 'consumer',
      firstName: 'Test',
      lastName: 'User',
      email: testEmail,
      password: testPassword,
      termsAccepted: true,
      privacyAccepted: true
    });
    
    console.log('🧪 Test result:', result);
  };
  
  const testLoginNow = async (email: string, password: string) => {
    console.log('🧪 Testing login with:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    console.log('🧪 Login result:', { data, error });
  };
  
  // Make functions available in console for testing
  if (typeof window !== 'undefined') {
    (window as any).testRegistrationNow = testRegistrationNow;
    (window as any).testLoginNow = testLoginNow;
    console.log('🧪 Test functions available: testRegistrationNow() and testLoginNow(email, password)');
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="container relative min-h-screen flex flex-col items-center justify-center py-8">
        <div className="mx-auto w-full max-w-4xl space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">
              Join BuildConnect
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Connect suppliers, merchants, and consumers in the UK Building Merchant sector
            </p>
          </div>

          {/* Registration Card */}
          <div className="flex justify-center">
            <RegistrationCard />
          </div>

          {/* Footer Links */}
          <div className="flex flex-col space-y-4 text-center text-sm">
            <div className="flex justify-center">
              <div className="flex items-center text-gray-400">
                <ShieldCheckIcon className="h-4 w-4 mr-2 text-green-400" />
                <span>Secure Registration Process</span>
              </div>
            </div>
            
            <div className="text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
              >
                Sign in
              </Link>
            </div>
            
            <div className="text-xs text-gray-500">
              Need help?{" "}
              <Link
                to="#"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
              >
                Contact support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}