import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, ShoppingCart, User, Users, Eye, EyeOff, Mail, Phone, MapPin, Globe } from "lucide-react";
import { organizationService } from "@/lib/auth";

interface RoleBasedRegistrationFormProps {
  onSubmit?: (data: any) => void;
  loading?: boolean;
}

type UserRole = 'supplier_admin' | 'supplier_user' | 'merchant_admin' | 'merchant_user' | 'consumer' | '';

interface Organization {
  id: string;
  name: string;
  description: string;
  type: string;
  tagline?: string;
}

interface RegistrationData {
  role: UserRole;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    jobTitle?: string;
  };
  companyInfo?: {
    companyName: string;
    website?: string;
    address: string;
    city: string;
    postcode: string;
    country: string;
    vatNumber?: string;
    description?: string;
  };
  organizations: Organization[];
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  marketingConsent: boolean;
}

const organizations = [
  { id: 'toolbank', name: 'Toolbank', description: 'Keeping the Tool Trade Local' },
  { id: 'nmbs', name: 'NMBS', description: 'National Merchant Buying Society' },
  { id: 'ibc', name: 'BMN', description: 'Independent Builders Merchant' },
  { id: 'bmf', name: 'BMF', description: 'Builders Merchants Federation' },
];

const userRoles = [
  {
    id: 'supplier_admin',
    title: 'Supplier Admin',
    icon: Building2,
    description: 'Manage company offers and team members',
    features: ['Create & manage offers', 'Team management', 'Analytics access']
  },
  {
    id: 'supplier_user',
    title: 'Supplier User',
    icon: Building2,
    description: 'Create and manage product offers',
    features: ['Create offers', 'View analytics', 'Collaborate with team']
  },
  {
    id: 'merchant_admin',
    title: 'Merchant Admin',
    icon: ShoppingCart,
    description: 'Manage store promotions and team',
    features: ['Manage all offers', 'Team management', 'Website integration']
  },
  {
    id: 'merchant_user',
    title: 'Merchant User',
    icon: ShoppingCart,
    description: 'Select and promote offers in store',
    features: ['Select offers', 'Stock management', 'QR code generation']
  },
  {
    id: 'consumer',
    title: 'Consumer',
    icon: User,
    description: 'Find special offers and local merchants',
    features: ['Browse offers', 'Find merchants', 'Save favorites']
  }
];

export default function RoleBasedRegistrationForm({ onSubmit, loading = false }: RoleBasedRegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<RegistrationData>({
    role: '',
    personalInfo: { firstName: '', lastName: '', email: '', phone: '', jobTitle: '' },
    companyInfo: { companyName: '', website: '', address: '', city: '', postcode: '', country: 'United Kingdom', vatNumber: '', description: '' },
    organizationAffiliations: [],
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    marketingConsent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const isBusinessRole = formData.role.includes('supplier') || formData.role.includes('merchant');
  const totalSteps = isBusinessRole ? 5 : 3;

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1 && !formData.role) newErrors.role = 'Please select your role';
    if (step === 2) {
      if (!formData.personalInfo.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.personalInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.personalInfo.email.trim()) newErrors.email = 'Email is required';
      if (!formData.personalInfo.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep) && onSubmit) {
      onSubmit(formData);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => {
      const keys = field.split('.');
      if (keys.length === 2) {
        return {
          ...prev,
          [keys[0]]: { ...prev[keys[0] as keyof RegistrationData], [keys[1]]: value }
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  isCompleted ? 'bg-blue-600 text-white' : isActive ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
                }`}>
                {stepNumber}
              </div>
              {stepNumber < totalSteps && (
                <div className={`w-12 h-0.5 mx-2 transition-all ${isCompleted ? 'bg-blue-600' : 'bg-gray-600'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderRoleSelection = () => (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">Create your account</h2>
      <p className="text-gray-400 mb-6">Choose your role to get started</p>
      
      <div className="mb-6">
        <Label className="text-sm font-medium text-gray-300 mb-4 block">I am a</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userRoles.map((role) => {
            const Icon = role.icon;
            const isSelected = formData.role === role.id;
            
            return (
              <div
                key={role.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:scale-[1.02] ${
                  isSelected ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'
                }`}
                onClick={() => updateFormData('role', role.id)}
              >
                <div className="flex items-start space-x-3">
                  <Icon className={`w-6 h-6 mt-1 ${isSelected ? 'text-blue-400' : 'text-gray-400'}`} />
                  <div className="flex-1">
                    <h3 className={`font-medium ${isSelected ? 'text-blue-400' : 'text-white'}`}>
                      {role.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{role.description}</p>
                    <ul className="text-xs text-gray-500 mt-2 space-y-1">
                      {role.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {errors.role && <p className="text-red-400 text-sm mt-2">{errors.role}</p>}
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">First Name</Label>
          <input
            type="text"
            value={formData.personalInfo.firstName}
            onChange={(e) => updateFormData('personalInfo.firstName', e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">Last Name</Label>
          <input
            type="text"
            value={formData.personalInfo.lastName}
            onChange={(e) => updateFormData('personalInfo.lastName', e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div className="mb-4">
        <Label className="text-sm font-medium text-gray-300 mb-2 block">Email Address</Label>
        <div className="relative">
          <input
            type="email"
            value={formData.personalInfo.email}
            onChange={(e) => updateFormData('personalInfo.email', e.target.value)}
            className="w-full px-3 py-2 pl-10 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter your email address"
          />
          <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
        </div>
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <Label className="text-sm font-medium text-gray-300 mb-2 block">Phone Number</Label>
        <div className="relative">
          <input
            type="tel"
            value={formData.personalInfo.phone}
            onChange={(e) => updateFormData('personalInfo.phone', e.target.value)}
            className="w-full px-3 py-2 pl-10 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter your phone number"
          />
          <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
        </div>
        {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
      </div>

      {isBusinessRole && (
        <div className="mb-4">
          <Label className="text-sm font-medium text-gray-300 mb-2 block">Job Title</Label>
          <input
            type="text"
            value={formData.personalInfo.jobTitle || ''}
            onChange={(e) => updateFormData('personalInfo.jobTitle', e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter your job title"
          />
        </div>
      )}
    </div>
  );

  const renderPasswordAndTerms = () => (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Security & Terms</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">Password</Label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => updateFormData('password', e.target.value)}
              className="w-full px-3 py-2 pr-10 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">Confirm Password</Label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => updateFormData('confirmPassword', e.target.value)}
              className="w-full px-3 py-2 pr-10 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="acceptTerms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked) => updateFormData('acceptTerms', checked)}
            className="mt-1"
          />
          <Label htmlFor="acceptTerms" className="text-sm text-gray-300">
            I accept the{' '}
            <a href="/terms" className="text-blue-400 hover:text-blue-300 underline">
              terms and conditions
            </a>
          </Label>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox
            id="marketingConsent"
            checked={formData.marketingConsent}
            onCheckedChange={(checked) => updateFormData('marketingConsent', checked)}
            className="mt-1"
          />
          <Label htmlFor="marketingConsent" className="text-sm text-gray-300">
            I would like to receive marketing communications about new features and special offers
          </Label>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderRoleSelection();
      case 2: return renderPersonalInfo();
      case 3: return renderPasswordAndTerms();
      default: return renderRoleSelection();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {renderStepIndicator()}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderCurrentStep()}
        
        <div className="flex justify-between pt-6">
          {currentStep > 1 && (
            <Button
              type="button"
              onClick={handlePrevious}
              variant="outline"
              className="px-6 py-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Previous
            </Button>
          )}
          
          <div className="flex-1" />
          
          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}