import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/polymet/components/page-header";
import RegistrationBenefits from "@/polymet/components/registration-benefits";
import TrustedOrganizations from "@/polymet/components/trusted-organizations";
import EnhancedRegistrationForm from "@/components/EnhancedRegistrationForm";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function RegisterPage() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSuccess = (message: string) => {
    setError("");
    setSuccess(message);
    
    // Redirect to login page after successful registration
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  const handleError = (errorMessage: string) => {
    setSuccess("");
    setError(errorMessage);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <PageHeader
        logoSrc="https://assets.polymet.ai/legal-white-266853"
        logoAlt="BuildConnect Logo"
        appName="BuildConnect"
      />

      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Join the UK Building Merchant Ecosystem
        </h1>
        <p className="text-muted-foreground mb-6 text-center">
          Create an account to access exclusive promotions, connect with
          suppliers, and streamline your building materials procurement
          process.
        </p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-8">
          <RegistrationBenefits />
          <TrustedOrganizations />
        </div>
        
        <div>
          <EnhancedRegistrationForm 
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>
      </div>
    </div>
  );
}