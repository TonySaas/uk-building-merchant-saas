
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import AuthTabs from "@/polymet/components/auth-tabs";
import RoleBasedRegistrationForm from "@/polymet/components/role-based-registration-form";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [registrationType, setRegistrationType] = useState<
    "standard" | "role-based"
  >("standard");

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users
  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard-page"); // Updated to match your existing route
    }
  }, [user, loading, navigate]);

  const handleLogin = (data: any) => {
    console.log("Login successful:", data);
    // Navigation will be handled by the useEffect above
  };

  const handleRegister = (data: any) => {
    console.log("Registration successful:", data);
    // Navigation will be handled by the useEffect above
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="auth" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="auth">Login / Register</TabsTrigger>
          <TabsTrigger value="demo">Registration Flows</TabsTrigger>
        </TabsList>

        <TabsContent value="auth">
          <AuthTabs
            onLogin={handleLogin}
            onRegister={handleRegister}
          />

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Need help?{" "}
              <Link to="#" className="text-primary hover:underline">
                Contact support
              </Link>
            </p>
          </div>
        </TabsContent>

        <TabsContent value="demo">
          <Card className="mb-6">
            <div className="p-4 bg-muted/50 rounded-t-lg">
              <h3 className="font-medium">Registration Flow Demos</h3>
              <p className="text-sm text-muted-foreground">
                Explore different registration flows for the BuildConnect
                platform
              </p>
            </div>
            <div className="p-4 grid grid-cols-2 gap-2">
              <button
                className={`p-3 rounded-lg text-sm text-left transition-all ${
                  registrationType === "standard"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
                onClick={() => setRegistrationType("standard")}
              >
                Standard Registration
              </button>
              <button
                className={`p-3 rounded-lg text-sm text-left transition-all ${
                  registrationType === "role-based"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
                onClick={() => setRegistrationType("role-based")}
              >
                Role-based Registration
              </button>
            </div>
          </Card>

          {registrationType === "standard" && (
            <Card>
              <AuthTabs
                defaultTab="register"
                onRegister={handleRegister}
              />
            </Card>
          )}

          {registrationType === "role-based" && (
            <RoleBasedRegistrationForm
              onSubmit={handleRegister}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
