import React, { useState, useEffect } from 'react';
import { useRegistration } from '@/hooks/useRegistration';
import { UserRegistrationData } from '@/services/registration';

interface EnhancedRegistrationFormProps {
  onSuccess?: (userData: any) => void;
  onError?: (error: string) => void;
}

export default function EnhancedRegistrationForm({
  onSuccess,
  onError
}: EnhancedRegistrationFormProps) {
  console.log('EnhancedRegistrationForm mounting...');
  
  const {
    isLoading,
    isSubmitting,
    error,
    success,
    organizations,
    emailAvailable,
    currentStep,
    updateFormData,
    setCurrentStep,
    loadOrganizations,
    checkEmail,
    submitRegistration,
    clearError
  } = useRegistration();

  console.log('Hook data loaded, currentStep:', currentStep);

  // Local form state that matches your existing UI exactly
  const [localFormData, setLocalFormData] = useState({
    userType: '',
    selectedOrganizations: [] as string[],
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    companyName: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    privacyAccepted: false
  });

  // Load organizations on component mount
  useEffect(() => {
    loadOrganizations();
  }, [loadOrganizations]);

  // Handle form field changes
  const handleFieldChange = (field: string, value: any) => {
    setLocalFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Check email availability when email changes
    if (field === 'email' && value && value.includes('@')) {
      checkEmail(value);
    }
  };

  // Handle user type selection (matches your screenshot exactly)
  const handleUserTypeSelect = (userType: string) => {
    const role = userType === 'supplier' ? 'supplier_user' : 
                 userType === 'merchant' ? 'merchant_user' : 'consumer_user';
    
    handleFieldChange('userType', userType);
    handleFieldChange('role', role);
    setCurrentStep(2);
  };

  // Handle organization selection (matches your screenshot exactly)
  const handleOrganizationToggle = (orgId: string) => {
    const current = localFormData.selectedOrganizations;
    const updated = current.includes(orgId)
      ? current.filter(id => id !== orgId)
      : [...current, orgId];
    
    handleFieldChange('selectedOrganizations', updated);
  };

  // Handle role selection (matches your screenshot exactly)
  const handleRoleSelect = (role: string) => {
    handleFieldChange('role', role);
    setCurrentStep(4); // Skip to form details
  };

  // Handle email availability check
  const checkEmailAvailability = () => {
    if (localFormData.email) {
      checkEmail(localFormData.email);
    }
  };

  // Navigation functions
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Validate current step
  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return !!localFormData.userType;
      case 2:
        return localFormData.selectedOrganizations.length > 0;
      case 3:
        return !!localFormData.role;
      case 4:
        return (
          localFormData.firstName &&
          localFormData.lastName &&
          localFormData.email &&
          localFormData.companyName &&
          localFormData.password &&
          localFormData.password === localFormData.confirmPassword &&
          localFormData.termsAccepted &&
          localFormData.privacyAccepted &&
          emailAvailable !== false
        );
      default:
        return false;
    }
  };
  // Handle form submission
  const handleSubmit = async () => {
    if (!validateStep()) return;

    const registrationData: UserRegistrationData = {
      userType: localFormData.userType as 'supplier' | 'merchant' | 'consumer',
      organizations: localFormData.selectedOrganizations,
      role: localFormData.role as any,
      personalInfo: {
        firstName: localFormData.firstName,
        lastName: localFormData.lastName,
        email: localFormData.email,
        phone: localFormData.phone,
        jobTitle: localFormData.jobTitle
      },
      companyInfo: {
        companyName: localFormData.companyName
      },
      password: localFormData.password,
      termsAccepted: localFormData.termsAccepted,
      privacyAccepted: localFormData.privacyAccepted
    };

    try {
      const result = await submitRegistration(registrationData);
      if (result.success) {
        if (result.data?.needsEmailConfirmation) {
          // Show email confirmation message
          console.log('Registration successful, email confirmation required');
          setCurrentStep(5); // Show email confirmation step
        } else {
          // Registration completed immediately
          onSuccess?.(result.data);
        }
      } else {
        onError?.(result.error || 'Registration failed');
      }
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Registration failed');
    }
  };

  // STEP 1: User Type Selection (exactly matches your screenshot)
  const renderUserTypeStep = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select User Type</h1>
          <div className="h-2 bg-gray-200 rounded-full mb-6">
            <div className="h-2 bg-black rounded-full w-1/4"></div>
          </div>
          <p className="text-gray-600">Select the option that best describes you:</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Consumer */}
          <button
            onClick={() => handleUserTypeSelect('consumer')}
            className={`p-8 border-2 rounded-2xl text-center transition-all hover:shadow-lg ${
              localFormData.userType === 'consumer'
                ? 'border-gray-900 bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="w-16 h-16 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Consumer</h3>
            <p className="text-gray-600">I'm looking for deals and offers</p>
          </button>

          {/* Supplier */}
          <button
            onClick={() => handleUserTypeSelect('supplier')}
            className={`p-8 border-2 rounded-2xl text-center transition-all hover:shadow-lg relative ${
              localFormData.userType === 'supplier'
                ? 'border-gray-900 bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="w-16 h-16 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Supplier</h3>
            <p className="text-gray-600">I want to create and promote offers</p>
            {localFormData.userType === 'supplier' && (
              <div className="absolute top-4 right-4 text-black font-semibold bg-white px-3 py-1 rounded-full text-sm border">
                Selected
              </div>
            )}
          </button>

          {/* Merchant */}
          <button
            onClick={() => handleUserTypeSelect('merchant')}
            className={`p-8 border-2 rounded-2xl text-center transition-all hover:shadow-lg ${
              localFormData.userType === 'merchant'
                ? 'border-gray-900 bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="w-16 h-16 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Merchant</h3>
            <p className="text-gray-600">I want to select offers for my store</p>
          </button>
        </div>

        {localFormData.userType && (
          <div className="flex justify-end">
            <button
              onClick={nextStep}
              className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2 font-medium"
            >
              Continue
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
  // STEP 2: Organization Selection (exactly matches your screenshot)
  const renderOrganizationStep = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Organizations</h1>
          <div className="h-2 bg-gray-200 rounded-full mb-6">
            <div className="h-2 bg-black rounded-full w-1/2"></div>
          </div>
          <p className="text-gray-600">Select the organizations you're affiliated with:</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading organizations...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {organizations.map((org) => (
              <button
                key={org.id}
                onClick={() => handleOrganizationToggle(org.id)}
                className={`p-6 border-2 rounded-2xl text-left transition-all hover:shadow-lg ${
                  localFormData.selectedOrganizations.includes(org.id)
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-500 font-bold text-lg">{org.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-xl">{org.name}</h3>
                      {localFormData.selectedOrganizations.includes(org.id) && (
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{org.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {localFormData.selectedOrganizations.length > 0 && (
          <div className="mb-6 text-sm text-gray-600">
            Selected: {localFormData.selectedOrganizations.length} organization{localFormData.selectedOrganizations.length !== 1 ? 's' : ''}
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={previousStep}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          {localFormData.selectedOrganizations.length > 0 && (
            <button
              onClick={nextStep}
              className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2 font-medium"
            >
              Continue
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // STEP 3: Role Selection (exactly matches your screenshot)
  const renderRoleStep = () => {
    if (localFormData.userType !== 'supplier') {
      // Auto-advance for non-suppliers
      React.useEffect(() => {
        setCurrentStep(4);
      }, []);
      return null;
    }

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm border">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Role</h1>
            <div className="h-2 bg-gray-200 rounded-full mb-6">
              <div className="h-2 bg-black rounded-full w-3/4"></div>
            </div>
            <p className="text-gray-600">Select your role in the organization:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Supplier Admin */}
            <button
              onClick={() => handleRoleSelect('supplier_admin')}
              className={`p-6 border-2 rounded-2xl text-left transition-all hover:shadow-lg ${
                localFormData.role === 'supplier_admin'
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-0.257-0.257A6 6 0 1118 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Supplier Admin</h3>
                  <p className="text-gray-600 text-sm mb-4">Manage company settings, users, and all offers</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="font-medium text-sm mb-2">Permissions:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Manage company profile</li>
                  <li>• Invite team members</li>
                  <li>• Create and manage all offers</li>
                  <li>• Access analytics</li>
                </ul>
              </div>
            </button>

            {/* Supplier User */}
            <button
              onClick={() => handleRoleSelect('supplier_user')}
              className={`p-6 border-2 rounded-2xl text-left transition-all hover:shadow-lg ${
                localFormData.role === 'supplier_user'
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Supplier User</h3>
                  <p className="text-gray-600 text-sm mb-4">Create and manage offers for your company</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="font-medium text-sm mb-2">Permissions:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Create and manage your offers</li>
                  <li>• View company offers</li>
                  <li>• Access basic analytics</li>
                </ul>
              </div>
            </button>
          </div>

          <div className="flex justify-between">
            <button
              onClick={previousStep}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            
            {localFormData.role && (
              <button
                onClick={() => setCurrentStep(4)}
                className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2 font-medium"
              >
                Continue
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderFormStep = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Personal Details</h2>
        <div className="h-2 bg-gray-200 rounded-full mb-6">
          <div className="h-2 bg-black rounded-full w-full"></div>
        </div>
        <p className="text-gray-600">Complete your profile information:</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
          <input
            type="text"
            value={localFormData.firstName || ''}
            onChange={(e) => handleFieldChange('firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
          <input
            type="text"
            value={localFormData.lastName || ''}
            onChange={(e) => handleFieldChange('lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={localFormData.phone || ''}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {(localFormData.userType === 'supplier' || localFormData.userType === 'merchant') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input
              type="text"
              value={localFormData.jobTitle || ''}
              onChange={(e) => handleFieldChange('jobTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            value={localFormData.email || ''}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            onBlur={checkEmailAvailability}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {emailAvailable === false && (
            <p className="text-red-600 text-sm mt-1">This email is already registered</p>
          )}
          {emailAvailable === true && (
            <p className="text-green-600 text-sm mt-1">Email is available</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
          <input
            type="text"
            value={localFormData.companyName || ''}
            onChange={(e) => handleFieldChange('companyName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
          <input
            type="password"
            value={localFormData.password || ''}
            onChange={(e) => handleFieldChange('password', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            minLength={8}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
          <input
            type="password"
            value={localFormData.confirmPassword || ''}
            onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              localFormData.password && localFormData.confirmPassword && 
              localFormData.password !== localFormData.confirmPassword
                ? 'border-red-300'
                : 'border-gray-300'
            }`}
            required
          />
          {localFormData.password && localFormData.confirmPassword && 
           localFormData.password !== localFormData.confirmPassword && (
            <p className="text-red-600 text-xs mt-1">Passwords do not match</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={localFormData.termsAccepted || false}
              onChange={(e) => handleFieldChange('termsAccepted', e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
            <span className="text-sm text-gray-700">
              I accept the{' '}
              <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> *
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={localFormData.privacyAccepted || false}
              onChange={(e) => handleFieldChange('privacyAccepted', e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
            <span className="text-sm text-gray-700">
              I accept the{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> *
            </span>
          </label>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Registration Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={previousStep}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <button
            type="submit"
            disabled={!validateStep() || isSubmitting}
            className={`px-8 py-3 rounded-lg flex items-center gap-2 font-medium ${
              validateStep() && !isSubmitting
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              <>
                Complete Registration
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );

  // Email confirmation step
  const renderEmailConfirmationStep = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-6">
          <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
        <p className="text-gray-600 mb-6">
          We've sent a verification email to <strong>{localFormData.email}</strong>.
          Please click the link in the email to verify your account.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-blue-800">
            Your registration will be completed automatically after email verification.
            All your profile information and organization affiliations will be set up once you verify your email.
          </p>
        </div>
        <p className="text-sm text-gray-500">
          Didn't receive the email? Check your spam folder or contact support.
        </p>
      </div>
    </div>
  );

  // Success step
  const renderSuccessStep = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-6">
          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
        <p className="text-gray-600 mb-6">Your account has been created successfully.</p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            Your organization affiliation{localFormData.selectedOrganizations.length > 1 ? 's are' : ' is'} pending approval.
          </p>
        </div>
      </div>
    </div>
  );

  // Main render - exactly matches your screenshot flow
  return (
    <div className="min-h-screen bg-gray-50">
      {success ? renderSuccessStep() : (
        <>
          {currentStep === 1 && renderUserTypeStep()}
          {currentStep === 2 && renderOrganizationStep()}
          {currentStep === 3 && renderRoleStep()}
          {currentStep === 4 && renderFormStep()}
          {currentStep === 5 && renderEmailConfirmationStep()}
        </>
      )}
    </div>
  );
}
