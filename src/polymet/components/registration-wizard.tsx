import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "lucide-react";
import UserTypeSelector from "@/polymet/components/user-type-selector";
import SupplierSearch from "@/polymet/components/supplier-search";
import MerchantSearch from "@/polymet/components/merchant-search";
import MultiOrganizationSelector from "@/polymet/components/multi-organization-selector";
import RoleSelector from "@/polymet/components/role-selector";
import RegistrationForm from "@/polymet/components/registration-form";
import RegistrationSuccess from "@/polymet/components/registration-success";
import { RegistrationService } from "@/services/registration-service";
import { toast } from "sonner";

interface RegistrationWizardProps {
  onComplete?: (data: any) => void;
}

export default function RegistrationWizard({
  onComplete,
}: RegistrationWizardProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    userType: "",
    selectedSupplier: null as any,
    selectedMerchant: null as any,
    subscribeToBMN: false,
    organizationIds: [] as string[],
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

  const handleSupplierSelect = (supplier: any, subscribeToBMN?: boolean) => {
    updateFormData({ 
      selectedSupplier: supplier,
      subscribeToBMN: subscribeToBMN || false,
      // Pre-populate form data if supplier is selected
      ...(supplier && {
        companyName: supplier.name,
        email: "", // Keep empty for user to fill
        // We could pre-populate more fields if the supplier data includes them
      })
    });
  };

  const handleMerchantSelect = (merchant: any, subscribeToBMN?: boolean) => {
    updateFormData({ 
      selectedMerchant: merchant,
      subscribeToBMN: subscribeToBMN || false,
      // Pre-populate form data if merchant is selected
      ...(merchant && {
        companyName: merchant.name,
        email: "", // Keep empty for user to fill
        // Pre-populate organization IDs based on merchant memberships
        organizationIds: merchant.organization_memberships?.map((membership: any) => 
          membership.organization.id
        ) || []
      })
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      console.log('🎯 WIZARD: Submit button clicked');
      console.log('📊 Current form data:', formData);
      
      // Ensure organizationIds is always an array
      const safeOrganizationIds = Array.isArray(formData.organizationIds) 
        ? formData.organizationIds 
        : [];
      
      const registrationData = {
        userType: formData.userType as 'supplier' | 'merchant' | 'consumer',
        organizationIds: safeOrganizationIds,
        role: formData.role || formData.userType, // fallback to userType if no role
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
        companyName: formData.companyName || undefined,
        jobTitle: formData.jobTitle || undefined,
        termsAccepted: formData.termsAccepted,
        privacyAccepted: formData.privacyAccepted,
        // Include additional data
        selectedSupplierId: formData.selectedSupplier?.id,
        selectedMerchantId: formData.selectedMerchant?.id,
        subscribeToBMN: formData.subscribeToBMN,
      };
      
      const result = await RegistrationService.registerUser(registrationData);
      
      console.log('📥 Registration result:', result);
      
      if (result.success) {
        console.log('🎉 Registration successful, moving to success step');
        
        toast.success(
          formData.userType === 'consumer' 
            ? 'Account created successfully! You can now start browsing offers.'
            : 'Registration submitted successfully! You will receive an email once your account is approved.'
        );
        
        if (onComplete) {
          onComplete(result.user);
        }
        
        setStep(isConsumer ? 3 : getLastStep());
      } else {
        console.error('❌ Registration failed:', result.error);
        toast.error(`Registration failed: ${result.error}`);
      }
    } catch (error) {
      console.error('💥 Registration exception:', error);
      toast.error('An unexpected error occurred during registration');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isConsumer = formData.userType === "consumer";
  const isSupplier = formData.userType === "supplier";
  const isMerchant = formData.userType === "merchant";
  
  // Calculate total steps based on user type
  const getTotalSteps = () => {
    if (isConsumer) return 3; // 1: User Type, 2: Registration Form, 3: Success
    if (isSupplier) return 6; // 1: User Type, 2: Supplier Search, 3: Organizations, 4: Role, 5: Registration Form, 6: Success
    if (isMerchant) return 6; // 1: User Type, 2: Merchant Search, 3: Organizations, 4: Role, 5: Registration Form, 6: Success
    return 6;
  };

  const getLastStep = () => {
    return getTotalSteps();
  };

  const totalSteps = getTotalSteps();
  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Select User Type";
      case 2:
        if (isConsumer) return "Complete Registration";
        if (isSupplier) return "Search for Supplier";
        if (isMerchant) return "Search for Merchant";
        return "Search for Company";
      case 3:
        if (isConsumer) return "Registration Complete";
        return "Select Organizations";
      case 4:
        return "Select Role";
      case 5:
        return "Complete Registration";
      case 6:
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
        if (isConsumer) {
          return (
            <RegistrationForm
              formData={formData}
              onChange={updateFormData}
              userType="consumer"
            />
          );
        } else if (isSupplier) {
          return (
            <SupplierSearch
              onSelect={handleSupplierSelect}
              selectedSupplier={formData.selectedSupplier}
              subscribeToBMN={formData.subscribeToBMN}
            />
          );
        } else if (isMerchant) {
          return (
            <MerchantSearch
              onSelect={handleMerchantSelect}
              selectedMerchant={formData.selectedMerchant}
              subscribeToBMN={formData.subscribeToBMN}
            />
          );
        }
        return null;

      case 3:
        if (isConsumer) {
          return <RegistrationSuccess userType="consumer" />;
        }
        return (
          <MultiOrganizationSelector
            organizations={[
              {
                id: "550e8400-e29b-41d4-a716-446655440001",
                name: "Toolbank",
                description: "UK's leading tool wholesaler - Keeping the Tool Trade Local",
                logo: "https://assets.polymet.ai/legal-white-266853",
              },
              {
                id: "f8a29478-b71b-4f9e-9d54-dc372f37e748",
                name: "NMBS",
                description: "National Merchant Buying Society - 1,250+ merchant members",
                logo: "https://assets.polymet.ai/polite-lavender-543133",
              },
              {
                id: "e54f041a-2afe-40df-906b-58ad958df5cb",
                name: "BMN",
                description: "Builders' Merchants News",
                logo: "https://picsum.photos/seed/ibc/200/200",
              },
              {
                id: "91c294be-5f50-488c-b7b2-ead47bb0eaa7",
                name: "BMF",
                description: "Builders Merchants Federation - Trade association",
                logo: "https://picsum.photos/seed/bmf/200/200",
              },
            ]}
            selectedOrganizationIds={formData.organizationIds}
            onSelect={(orgIds) => updateFormData({ organizationIds: orgIds })}
          />
        );

      case 4:
        return (
          <RoleSelector
            userType={formData.userType}
            selectedRole={formData.role}
            onSelect={(role) => updateFormData({ role })}
          />
        );

      case 5:
        return (
          <RegistrationForm
            formData={formData}
            onChange={updateFormData}
            userType={formData.userType as "supplier" | "merchant"}
            role={formData.role}
          />
        );

      case 6:
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
        // For supplier/merchant search, allow proceeding regardless of selection
        return true;
      case 3:
        if (isConsumer) return true;
        return Array.isArray(formData.organizationIds) && formData.organizationIds.length > 0;
      case 4:
        return !!formData.role;
      case 5:
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

  const isLastStep = (isConsumer && step === 2) || (!isConsumer && step === 5);
  const isSuccessStep = (isConsumer && step === 3) || (!isConsumer && step === 6);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">{getStepTitle()}</CardTitle>
        {!isSuccessStep && <Progress value={progress} className="h-2 mt-2" />}
      </CardHeader>
      <CardContent className="pt-4 pb-6">{renderStep()}</CardContent>
      {!isSuccessStep && (
        <CardFooter className="flex justify-between border-t p-4 bg-muted/20">
          {step > 1 ? (
            <Button 
              variant="outline" 
              onClick={handleBack} 
              disabled={isSubmitting}
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div></div>
          )}
          {isLastStep ? (
            <Button 
              onClick={handleSubmit} 
              disabled={!canProceed() || isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Complete Registration"}
              <CheckIcon className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleNext} 
              disabled={!canProceed() || isSubmitting}
            >
              Continue
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}