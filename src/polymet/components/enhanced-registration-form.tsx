import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, CheckIcon, XIcon, LoaderIcon } from "lucide-react";
import { userInfoSchema, passwordSchema, type UserInfo, type PasswordData } from "@/lib/validations/registration";
import { RegistrationService } from "@/services/registration-service";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface EnhancedRegistrationFormProps {
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
  onValidationChange?: (isValid: boolean) => void;
}

type FormData = UserInfo & PasswordData & {
  confirmPassword: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  companyName?: string;
  jobTitle?: string;
}

export default function EnhancedRegistrationForm({
  formData,
  onChange,
  userType,
  role,
  onValidationChange,
}: EnhancedRegistrationFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailCheckStatus, setEmailCheckStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [isBusinessUser, setIsBusinessUser] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
    setValue,
    trigger,
    clearErrors
  } = useForm<FormData>({
    resolver: zodResolver(
      userInfoSchema
        .merge(passwordSchema)
        .extend({
          confirmPassword: passwordSchema.shape.password,
          termsAccepted: userInfoSchema.shape.firstName.transform(() => true),
          privacyAccepted: userInfoSchema.shape.firstName.transform(() => true),
          companyName: userInfoSchema.shape.firstName.optional(),
          jobTitle: userInfoSchema.shape.firstName.optional(),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords don't match",
          path: ["confirmPassword"]
        })
        .refine((data) => data.termsAccepted === true, {
          message: "You must accept the terms and conditions",
          path: ["termsAccepted"]
        })
        .refine((data) => data.privacyAccepted === true, {
          message: "You must accept the privacy policy",
          path: ["privacyAccepted"]
        })
    ),
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPassword: '',
      phone: formData.phone,
      termsAccepted: formData.termsAccepted,
      privacyAccepted: formData.privacyAccepted,
      companyName: formData.companyName,
      jobTitle: formData.jobTitle,
    },
    mode: 'onChange'
  });

  const watchedEmail = watch('email');
  const watchedPassword = watch('password');

  // Determine if user is business type
  useEffect(() => {
    setIsBusinessUser(userType === 'supplier' || userType === 'merchant');
  }, [userType]);

  // Notify parent of validation status
  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(isValid && isDirty);
    }
  }, [isValid, isDirty, onValidationChange]);

  // Email availability check
  useEffect(() => {
    const checkEmailAvailability = async () => {
      if (watchedEmail && watchedEmail.length > 5 && !errors.email) {
        setEmailCheckStatus('checking');
        try {
          const result = await RegistrationService.checkEmailAvailability(watchedEmail);
          setEmailCheckStatus(result.available ? 'available' : 'taken');
          
          if (!result.available) {
            // This will be handled by the form validation
            toast.error('This email is already registered');
          }
        } catch (error) {
          console.error('Email check failed:', error);
          setEmailCheckStatus('idle');
        }
      } else {
        setEmailCheckStatus('idle');
      }
    };

    const timeoutId = setTimeout(checkEmailAvailability, 500);
    return () => clearTimeout(timeoutId);
  }, [watchedEmail, errors.email]);

  const handleFieldChange = (field: string, value: any) => {
    setValue(field as keyof FormData, value, { shouldValidate: true, shouldDirty: true });
    onChange({ [field]: value });
  };

  const getEmailStatusIcon = () => {
    switch (emailCheckStatus) {
      case 'checking':
        return <LoaderIcon className="h-4 w-4 animate-spin text-blue-500" />;
      case 'available':
        return <CheckIcon className="h-4 w-4 text-green-500" />;
      case 'taken':
        return <XIcon className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(watchedPassword || '');

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-semibold">Complete Registration</h2>
        <p className="text-muted-foreground">
          Fill out your details to create your MerchantDeals.ai account
        </p>
      </div>

      <form className="space-y-4">
        {/* Personal Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              {...register('firstName')}
              onChange={(e) => handleFieldChange('firstName', e.target.value)}
              placeholder="Enter your first name"
              className={cn(errors.firstName && "border-red-500")}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              {...register('lastName')}
              onChange={(e) => handleFieldChange('lastName', e.target.value)}
              placeholder="Enter your last name"
              className={cn(errors.lastName && "border-red-500")}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              {...register('email')}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              placeholder="Enter your email address"
              className={cn(
                errors.email && "border-red-500",
                emailCheckStatus === 'taken' && "border-red-500",
                emailCheckStatus === 'available' && "border-green-500",
                "pr-10"
              )}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {getEmailStatusIcon()}
            </div>
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
          {emailCheckStatus === 'taken' && (
            <p className="text-sm text-red-500">This email is already registered</p>
          )}
          {emailCheckStatus === 'available' && (
            <p className="text-sm text-green-500">Email is available</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register('password')}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              placeholder="Create a secure password"
              className={cn(errors.password && "border-red-500", "pr-10")}
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
          
          {/* Password strength indicator */}
          {watchedPassword && (
            <div className="space-y-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded",
                      i < passwordStrength 
                        ? passwordStrength <= 2 
                          ? "bg-red-500" 
                          : passwordStrength <= 3 
                          ? "bg-yellow-500" 
                          : "bg-green-500"
                        : "bg-gray-200"
                    )}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Password strength: {
                  passwordStrength <= 2 ? 'Weak' : 
                  passwordStrength <= 3 ? 'Medium' : 
                  passwordStrength <= 4 ? 'Strong' : 'Very Strong'
                }
              </p>
            </div>
          )}
          
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register('confirmPassword')}
              placeholder="Confirm your password"
              className={cn(errors.confirmPassword && "border-red-500", "pr-10")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Phone (Optional) */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            placeholder="Enter your phone number (optional)"
            className={cn(errors.phone && "border-red-500")}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Business Information */}
        {isBusinessUser && (
          <>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                {...register('companyName')}
                onChange={(e) => handleFieldChange('companyName', e.target.value)}
                placeholder="Enter your company name"
                className={cn(errors.companyName && "border-red-500")}
              />
              {errors.companyName && (
                <p className="text-sm text-red-500">{errors.companyName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                {...register('jobTitle')}
                onChange={(e) => handleFieldChange('jobTitle', e.target.value)}
                placeholder="Enter your job title (optional)"
                className={cn(errors.jobTitle && "border-red-500")}
              />
              {errors.jobTitle && (
                <p className="text-sm text-red-500">{errors.jobTitle.message}</p>
              )}
            </div>
          </>
        )}

        {/* Terms and Privacy */}
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="termsAccepted"
              checked={formData.termsAccepted}
              onCheckedChange={(checked) => {
                handleFieldChange('termsAccepted', checked);
                setValue('termsAccepted', !!checked, { shouldValidate: true });
              }}
            />
            <Label
              htmlFor="termsAccepted"
              className="text-sm leading-relaxed cursor-pointer"
            >
              I agree to the{" "}
              <a
                href="/terms"
                target="_blank"
                className="text-primary hover:underline"
              >
                Terms and Conditions
              </a>{" "}
              *
            </Label>
          </div>
          {errors.termsAccepted && (
            <p className="text-sm text-red-500 ml-6">{errors.termsAccepted.message}</p>
          )}

          <div className="flex items-start space-x-2">
            <Checkbox
              id="privacyAccepted"
              checked={formData.privacyAccepted}
              onCheckedChange={(checked) => {
                handleFieldChange('privacyAccepted', checked);
                setValue('privacyAccepted', !!checked, { shouldValidate: true });
              }}
            />
            <Label
              htmlFor="privacyAccepted"
              className="text-sm leading-relaxed cursor-pointer"
            >
              I agree to the{" "}
              <a
                href="/privacy"
                target="_blank"
                className="text-primary hover:underline"
              >
                Privacy Policy
              </a>{" "}
              *
            </Label>
          </div>
          {errors.privacyAccepted && (
            <p className="text-sm text-red-500 ml-6">{errors.privacyAccepted.message}</p>
          )}
        </div>
      </form>
    </div>
  );
}