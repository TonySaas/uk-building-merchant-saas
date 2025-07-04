import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { TextInput } from "@/polymet/components/text-input";
import { PasswordInput } from "@/polymet/components/password-input";
import { Checkbox } from "@/polymet/components/checkbox-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  GoogleLogo,
  AppleLogo,
  MicrosoftLogo,
  GithubLogo,
} from "@/polymet/components/auth-social-logos";
import AuthRegistrationCard from "@/polymet/components/auth-registration-card";
import { useAuth, LoginData } from "@/hooks/useAuth";

interface AuthTabsProps {
  onLogin?: (data: LoginData) => void;
  onRegister?: (data: any) => void;
  loginLoading?: boolean;
  registerLoading?: boolean;
  defaultTab?: "login" | "register";
}

export default function AuthTabs({
  onLogin,
  onRegister,
  loginLoading: externalLoginLoading = false,
  registerLoading: externalRegisterLoading = false,
  defaultTab = "login",
}: AuthTabsProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);
  const [error, setError] = useState<string | null>(null);
  const [internalLoginLoading, setInternalLoginLoading] = useState(false);

  const { login, resetPassword } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInternalLoginLoading(true);

    const loginData = { email, password, rememberMe };

    try {
      const { error } = await login(loginData);
      
      if (error) {
        setError(error.message);
      } else {
        // Call the external onLogin if provided
        if (onLogin) {
          onLogin(loginData);
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setInternalLoginLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first");
      return;
    }

    try {      const { error } = await resetPassword(email);
      if (error) {
        setError(error.message);
      } else {
        setError(null);
        alert("Password reset email sent! Check your inbox.");
      }
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    }
  };

  const isLoginLoading = externalLoginLoading || internalLoginLoading;

  return (
    <Card className="w-full shadow-lg">
      <Tabs
        defaultValue={defaultTab}
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "login" | "register")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        {/* Login Tab */}
        <TabsContent value="login">
          <form onSubmit={handleLogin}>
            <CardHeader className="space-y-1 pt-6">
              <h2 className="text-2xl font-semibold">Welcome back</h2>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <TextInput
                label="Email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />

                  <Label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none"
                  >
                    Remember me
                  </Label>
                </div>
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm"
                  type="button"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </Button>
              </div>
            </CardContent>            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoginLoading}>
                {isLoginLoading ? "Signing in..." : "Sign in"}
              </Button>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <span className="relative bg-background px-2 text-xs text-muted-foreground">
                  OR CONTINUE WITH
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <Button variant="outline" size="icon" type="button">
                  <GoogleLogo />
                </Button>
                <Button variant="outline" size="icon" type="button">
                  <AppleLogo />
                </Button>
                <Button variant="outline" size="icon" type="button">
                  <MicrosoftLogo />
                </Button>
                <Button variant="outline" size="icon" type="button">
                  <GithubLogo />
                </Button>
              </div>
            </CardFooter>
          </form>
        </TabsContent>

        {/* Register Tab */}
        <TabsContent value="register">
          <AuthRegistrationCard
            onSubmit={onRegister}
            loading={externalRegisterLoading}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
}