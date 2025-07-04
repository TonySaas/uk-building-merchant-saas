
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/polymet/components/login-form";

interface AuthLoginCardProps {
  title?: string;
  description?: string;
  onSubmit?: (data: any) => void;
  loading?: boolean;
  showForgotPassword?: boolean;
}

export default function AuthLoginCard({
  title = "Welcome back",
  description = "Enter your credentials to access your account",
  onSubmit,
  loading = false,
  showForgotPassword = true,
}: AuthLoginCardProps) {
  return (
    <>
      <CardHeader className="space-y-1 pt-6">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm 
          onSubmit={onSubmit} 
          loading={loading} 
          showForgotPassword={showForgotPassword} 
        />
      </CardContent>
    </>
  );
}
