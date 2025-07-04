import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "lucide-react";
import UserTypeSelector from "@/polymet/components/user-type-selector";
import OrganizationSelector from "@/polymet/components/organization-selector";
import RoleSelector from "@/polymet/components/role-selector";
import RegistrationForm from "@/polymet/components/registration-form";
import RegistrationSuccess from "@/polymet/components/registration-success";

interface RegistrationWizardProps {
  onComplete?: (data: any) => void;
}

export default function RegistrationWizard({
  onComplete,
}: RegistrationWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: "",
    organizationId: "",
    role: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    companyName: "",
    jobTitle: "",
    phone: "",
    termsAccepted: false,
    privacyAccepted: false,
  });

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (onComplete) {
      onComplete(formData);
    }
    // Move to success step
    setStep(5);
  };

  const isConsumer = formData.userType === "consumer";  const totalSteps = isConsumer ? 3 : 5;
  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Select User Type";
      case 2:
        return isConsumer ? "Complete Registration" : "Select Organization";
      case 3:
        return isConsumer ? "Registration Complete" : "Select Role";
      case 4:
        return "Complete Registration";
      case 5:
        return "Registration Complete";
      default:
        return "";
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <UserTypeSelector
            selectedType={formData.userType}
            onSelect={(type) => updateFormData({ userType: type })}
          />
        );

      case 2:
        return isConsumer ? (
          <RegistrationForm
            formData={formData}
            onChange={updateFormData}
            userType="consumer"
          />
        ) : (
          <OrganizationSelector
            selectedOrganizationId={formData.organizationId}
            onSelect={(orgId) => updateFormData({ organizationId: orgId })}
          />
        );

      case 3:
        return isConsumer ? (
          <RegistrationSuccess userType="consumer" />
        ) : (
          <RoleSelector
            userType={formData.userType}
            selectedRole={formData.role}
            onSelect={(role) => updateFormData({ role })}
          />
        );

      case 4:
        return (
          <RegistrationForm
            formData={formData}
            onChange={updateFormData}
            userType={formData.userType as "supplier" | "merchant"}
            role={formData.role}
          />
        );
      case 5:
        return (
          <RegistrationSuccess
            userType={formData.userType as "supplier" | "merchant"}
          />
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!formData.userType;
      case 2:
        if (isConsumer) {
          return (
            !!formData.firstName &&
            !!formData.lastName &&
            !!formData.email &&
            !!formData.password &&
            formData.termsAccepted &&
            formData.privacyAccepted
          );
        }
        return !!formData.organizationId;
      case 3:
        if (isConsumer) return true; // Success screen
        return !!formData.role;
      case 4:
        return (
          !!formData.firstName &&
          !!formData.lastName &&
          !!formData.email &&
          !!formData.password &&
          !!formData.companyName &&
          formData.termsAccepted &&
          formData.privacyAccepted
        );

      default:
        return false;
    }
  };

  const isLastStep = (isConsumer && step === 2) || (!isConsumer && step === 4);
  const isSuccessStep =
    (isConsumer && step === 3) || (!isConsumer && step === 5);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">{getStepTitle()}</CardTitle>
        {!isSuccessStep && <Progress value={progress} className="h-2 mt-2" />}
      </CardHeader>
      <CardContent className="pt-4 pb-6">{renderStep()}</CardContent>
      {!isSuccessStep && (        <CardFooter className="flex justify-between border-t p-4 bg-muted/20">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div></div>
          )}
          {isLastStep ? (
            <Button onClick={handleSubmit} disabled={!canProceed()}>
              Complete Registration
              <CheckIcon className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={!canProceed()}>
              Continue
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}