import { useState } from "react";
import { Link } from "react-router-dom";
import AuthCard from "@/polymet/components/auth-card";
import RegistrationWizard from "@/polymet/components/registration-wizard";

interface RegistrationCardProps {
  onComplete?: (data: any) => void;
}

export default function RegistrationCard({
  onComplete,
}: RegistrationCardProps) {
  return (
    <AuthCard>
      <RegistrationWizard onComplete={onComplete} />
    </AuthCard>
  );
}
