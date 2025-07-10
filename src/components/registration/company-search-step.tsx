import React from 'react';
import { CompanySearchResult } from '@/types/company-search';
import BasicCompanySearch from './basic-company-search';

interface CompanySearchStepProps {
  userType: 'supplier' | 'merchant' | 'consumer';
  onSelect: (company: CompanySearchResult | null, subscribeToBMN?: boolean) => void;
  selectedCompany?: CompanySearchResult | null;
  subscribeToBMN?: boolean;
}

/**
 * Unified company search step component for the registration wizard.
 * Conditionally renders the appropriate search component based on user type.
 * 
 * This component extends the existing Polymet registration wizard pattern
 * while maintaining backward compatibility with the current API.
 */
export default function CompanySearchStep({
  userType,
  onSelect,
  selectedCompany,
  subscribeToBMN = false
}: CompanySearchStepProps) {
  // Consumer users don't need company search
  if (userType === 'consumer') {
    return null;
  }

  // Render appropriate search component based on user type
  if (userType === 'supplier' || userType === 'merchant') {
    return (
      <BasicCompanySearch
        userType={userType}
        onSelect={onSelect}
        selectedCompany={selectedCompany}
        subscribeToBMN={subscribeToBMN}
      />
    );
  }

  // Fallback for unknown user types
  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground">
        Company search is not available for this user type.
      </p>
    </div>
  );
}