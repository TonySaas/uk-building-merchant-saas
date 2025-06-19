
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TextInput } from "@/polymet/components/text-input";
import { EmailInput } from "@/polymet/components/email-input";
import { PasswordInput } from "@/polymet/components/password-input";
import { Checkbox } from "@/polymet/components/checkbox-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrganizationSelector from "@/polymet/components/organization-selector";
import { ORGANIZATIONS } from "@/polymet/data/organization-data";
import { CheckIcon, ArrowRightIcon, ArrowLeftIcon } from "lucide-react";

interface MultiStepRegistrationProps {
  onSubmit?: (data: any) => void;
  loading?: boolean;
}

type UserRole = "supplier" | "merchant" | "consumer" | "";

export default function MultiStepRegistration({
  onSubmit,
  loading = false,
}: MultiStepRegistrationProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "" as UserRole,
    organizationId: "",
    companyName: "",
    jobTitle: "",
    phone: "",
    website: "",
    acceptTerms: false,
    acceptMarketing: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    } else if (currentStep === 2) {
      if (!formData.role) newErrors.role = "Please select a role";
      if (!formData.organizationId)
        newErrors.organizationId = "Please select an organization";
    } else if (currentStep === 3) {
      if (formData.role === "supplier" || formData.role === "merchant") {
        if (!formData.companyName.trim())
          newErrors.companyName = "Company name is required";
      }

      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (!formData.acceptTerms) {
        newErrors.acceptTerms = "You must accept the terms and conditions";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateStep(step) && onSubmit) {
      onSubmit(formData);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Personal Information";
      case 2:
        return "Organization & Role";
      case 3:
        return "Account Setup";
      case 4:
        return "Registration Complete";
      default:
        return "";
    }
  };

  const stepItems = [
    { number: 1, label: "Account" },
    { number: 2, label: "Profile & Role" },
    { number: 3, label: "Organizations" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl text-white mb-6">{getStepTitle()}</CardTitle>
            
            {/* Step Progress Indicator */}
            <div className="flex items-center justify-between">
              {stepItems.map((stepItem, index) => (
                <div key={stepItem.number} className="flex items-center flex-1">
                  {/* Step Circle */}
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      step >= stepItem.number
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-slate-700 border-slate-600 text-slate-400"
                    }`}
                  >
                    {step > stepItem.number ? (
                      <CheckIcon className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{stepItem.number}</span>
                    )}
                  </div>
                  
                  {/* Connection Line */}
                  {index < stepItems.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 transition-colors ${
                        step > stepItem.number ? "bg-blue-600" : "bg-slate-600"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            
            {/* Step Labels */}
            <div className="flex justify-between mt-3">
              {stepItems.map((stepItem) => (
                <div key={stepItem.number} className="text-center" style={{ width: '33.33%' }}>
                  <p
                    className={`text-sm font-medium ${
                      step >= stepItem.number ? "text-white" : "text-slate-400"
                    }`}
                  >
                    {stepItem.label}
                  </p>
                </div>
              ))}
            </div>
          </CardHeader>
          
          <CardContent className="text-white">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <TextInput
                      label="First Name"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      error={errors.firstName}
                      required
                    />

                    <TextInput
                      label="Last Name"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      error={errors.lastName}
                      required
                    />
                  </div>
                  <EmailInput
                    label="Email Address"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    error={errors.email}
                    required
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-white">I am a</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) => updateFormData("role", value)}
                    >
                      <SelectTrigger
                        id="role"
                        className={`bg-slate-700 border-slate-600 text-white ${errors.role ? "border-destructive" : ""}`}
                      >
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="supplier" className="text-white hover:bg-slate-600">Supplier</SelectItem>
                        <SelectItem value="merchant" className="text-white hover:bg-slate-600">Merchant</SelectItem>
                        <SelectItem value="consumer" className="text-white hover:bg-slate-600">Consumer</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <p className="text-sm font-medium text-destructive">
                        {errors.role}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Organization Affiliation</Label>
                    <OrganizationSelector
                      organizations={ORGANIZATIONS}
                      onSelect={(org) => updateFormData("organizationId", org.id)}
                    />

                    {errors.organizationId && (
                      <p className="text-sm font-medium text-destructive">
                        {errors.organizationId}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  {(formData.role === "supplier" ||
                    formData.role === "merchant") && (
                    <div className="space-y-4">
                      <TextInput
                        label="Company Name"
                        value={formData.companyName}
                        onChange={(e) =>
                          updateFormData("companyName", e.target.value)
                        }
                        error={errors.companyName}
                        required={
                          formData.role === "supplier" ||
                          formData.role === "merchant"
                        }
                      />

                      <TextInput
                        label="Job Title"
                        value={formData.jobTitle}
                        onChange={(e) => updateFormData("jobTitle", e.target.value)}
                      />
                    </div>
                  )}

                  <PasswordInput
                    label="Password"
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                    error={errors.password}
                    strengthIndicator
                    required
                  />

                  <PasswordInput
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      updateFormData("confirmPassword", e.target.value)
                    }
                    error={errors.confirmPassword}
                    required
                  />

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) =>
                          updateFormData("acceptTerms", !!checked)
                        }
                      />

                      <Label
                        htmlFor="terms"
                        className={`text-sm ${errors.acceptTerms ? "text-destructive" : "text-white"}`}
                      >
                        I accept the{" "}
                        <a
                          href="#"
                          className="text-blue-400 underline hover:text-blue-300"
                        >
                          terms and conditions
                        </a>
                      </Label>
                    </div>
                    {errors.acceptTerms && (
                      <p className="text-sm font-medium text-destructive">
                        {errors.acceptTerms}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={formData.acceptMarketing}
                      onCheckedChange={(checked) =>
                        updateFormData("acceptMarketing", !!checked)
                      }
                    />

                    <Label htmlFor="marketing" className="text-sm text-white">
                      I would like to receive marketing communications
                    </Label>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="py-8 text-center space-y-4">
                  <div className="mx-auto bg-blue-600/20 rounded-full p-3 w-16 h-16 flex items-center justify-center">
                    <CheckIcon className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Registration Successful!
                  </h3>
                  <p className="text-slate-300">
                    Your account has been created successfully. You can now sign in
                    with your credentials.
                  </p>
                </div>
              )}
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            {step > 1 && step < 4 && (
              <Button type="button" variant="outline" onClick={handleBack} className="border-slate-600 text-white hover:bg-slate-700">
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
            {step === 1 && <div />}

            {step < 3 && (
              <Button type="button" onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                Next
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            )}

            {step === 3 && (
              <Button type="submit" onClick={handleSubmit} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            )}

            {step === 4 && (
              <Button type="button" className="w-full bg-blue-600 hover:bg-blue-700">
                Sign In
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
