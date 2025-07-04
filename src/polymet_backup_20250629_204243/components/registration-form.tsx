import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface RegistrationFormProps {
  formData: {
    userType: string;
    organizationIds: string[];
    role: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    companyName: string;
    jobTitle: string;
    phone: string;
    termsAccepted: boolean;
    privacyAccepted: boolean;
  };
  onChange: (data: any) => void;
  userType: string;
  role?: string;
}

export default function RegistrationForm({
  formData,
  onChange,
  userType,
  role,
}: RegistrationFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isConsumer = userType === "consumer";

  const handleChange = (field: string, value: any) => {
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-semibold">Complete Registration</h2>
        <p className="text-muted-foreground">Fill out your details to create your account</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Enter your last name"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="Enter your email address"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Create a secure password"
            className="pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {!isConsumer && (
        <>
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              placeholder="Enter your company name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              placeholder="Enter your job title"
            />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>

      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="termsAccepted"
            checked={formData.termsAccepted}
            onCheckedChange={(checked) => handleChange('termsAccepted', checked)}
          />
          <Label htmlFor="termsAccepted" className="text-sm leading-relaxed">
            I agree to the{" "}
            <a href="#" className="text-blue-600 underline hover:text-blue-800">
              Terms of Service
            </a>{" "}
            *
          </Label>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            id="privacyAccepted"
            checked={formData.privacyAccepted}
            onCheckedChange={(checked) => handleChange('privacyAccepted', checked)}
          />
          <Label htmlFor="privacyAccepted" className="text-sm leading-relaxed">
            I agree to the{" "}
            <a href="#" className="text-blue-600 underline hover:text-blue-800">
              Privacy Policy
            </a>{" "}
            *
          </Label>
        </div>
      </div>
    </div>
  );
}