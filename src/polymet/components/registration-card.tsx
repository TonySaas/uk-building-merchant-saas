import { useState } from "react";
import RegistrationWizard from "@/polymet/components/registration-wizard";

interface RegistrationCardProps {
  onComplete?: (data: any) => void;
}

export default function RegistrationCard({
  onComplete,
}: RegistrationCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = (data: any) => {
    setIsSubmitting(true);
    // The registration wizard handles the actual API call
    // This is just for demo/completion handling
    setTimeout(() => {
      setIsSubmitting(false);
      if (onComplete) {
        onComplete(data);
      }
    }, 100);
  };

  return (
    <div className="w-full max-w-2xl">
      <RegistrationWizard onComplete={handleComplete} />
    </div>
  );
}