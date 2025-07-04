import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginCard from "@/polymet/components/login-card";
import RegistrationCard from "@/polymet/components/registration-card";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleLogin = (data: {
    email: string;
    password: string;
    rememberMe: boolean;
    organizationId?: string;
  }) => {
    setIsLoading(true);
    setError(undefined);

    // Simulate API call
    setTimeout(() => {
      console.log("Login data:", data);
      setIsLoading(false);
      // For demo purposes, show an error sometimes
      if (Math.random() > 0.7) {
        setError("Invalid email or password. Please try again.");
      }
    }, 1500);
  };

  const handleRegistrationComplete = (data: any) => {
    console.log("Registration data:", data);
    // In a real app, this would handle the registration submission
    // and redirect to a success page or login page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Welcome to BuildConnect</h1>
          <p className="text-muted-foreground mt-2">
            Sign in or create an account to get started
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginCard
              onLogin={handleLogin}
              isLoading={isLoading}
              error={error}
              hasMultipleOrganizations={true}
            />
          </TabsContent>
          <TabsContent value="register">
            <RegistrationCard onComplete={handleRegistrationComplete} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
