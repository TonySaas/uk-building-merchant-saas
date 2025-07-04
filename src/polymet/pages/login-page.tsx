import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import LoginCard from "@/polymet/components/login-card";

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleLogin = async (data: {
    email: string;
    password: string;
    rememberMe: boolean;
    organizationId?: string;
  }) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const { error: signInError } = await signIn(data.email, data.password);
      
      if (signInError) {
        throw signInError;
      }
      
      toast.success("Successfully logged in!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError(error instanceof Error ? error.message : "Failed to log in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8 sm:px-6 md:px-8">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center">
            <div className="mr-2 h-10 w-10 rounded-full bg-primary"></div>
            <span className="text-2xl font-bold">MerchantDeals.ai</span>
          </div>
        </div>

        {/* Welcome text */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to access the MerchantDeals.ai platform
          </p>
        </div>

        {/* Login card */}
        <LoginCard
          onLogin={handleLogin}
          isLoading={isLoading}
          error={error}
          hasMultipleOrganizations={true}
        />

        {/* Register link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:underline"
            >
              Register now
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center space-y-4 text-center text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <path d="M20 7L9 18l-5-5" />
            </svg>
            <span>Secure Platform</span>
          </div>
          <p>
            Need help?{" "}
            <Link to="#" className="text-primary hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
