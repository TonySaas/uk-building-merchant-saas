import { ReactNode } from "react";
import { Link } from "react-router-dom";
import AuthCard from "@/polymet/components/auth-card";
import LoginForm from "@/polymet/components/login-form";

interface LoginCardProps {
  onLogin: (data: {
    email: string;
    password: string;
    rememberMe: boolean;
    organizationId?: string;
  }) => void;
  isLoading?: boolean;
  error?: string;
  hasMultipleOrganizations?: boolean;
}

export default function LoginCard({
  onLogin,
  isLoading = false,
  error,
  hasMultipleOrganizations = false,
}: LoginCardProps) {
  return (
    <AuthCard
      header={
        <div>
          <h2 className="text-2xl font-semibold">Sign in</h2>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
      }
    >
      <LoginForm
        onLogin={onLogin}
        isLoading={isLoading}
        error={error}
        hasMultipleOrganizations={hasMultipleOrganizations}
      />
    </AuthCard>
  );
}
