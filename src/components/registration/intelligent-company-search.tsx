/**
 * Intelligent Company Search for Registration Wizard
 * Replaces the basic company search with intelligent autocomplete functionality
 */

import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import IntelligentSearch from '@/components/intelligent-search';
import { CompanySearchResult } from '@/types/company-search';
import { MerchantSearchResult, SupplierSearchResult } from '@/types/intelligent-search';

interface IntelligentCompanySearchProps {
  userType: 'supplier' | 'merchant';
  onSelect: (company: CompanySearchResult | null, subscribeToBMN?: boolean) => void;
  selectedCompany?: CompanySearchResult | null;
  subscribeToBMN?: boolean;
}

export default function IntelligentCompanySearch({
  userType,
  onSelect,
  selectedCompany,
  subscribeToBMN = false
}: IntelligentCompanySearchProps) {
  const [bmn, setBmn] = useState(subscribeToBMN);
  const [hasSearched, setHasSearched] = useState(false);

  const handleCompanySelect = (company: MerchantSearchResult | SupplierSearchResult | null) => {
    setHasSearched(true);
    
    if (!company) {
      onSelect(null, bmn);
      return;
    }

    // Convert intelligent search result to CompanySearchResult format
    const companyResult: CompanySearchResult = {
      id: company.id,
      is_active: company.isActive,
      organization_affiliations: company.organizationAffiliations || [],
      created_at: company.createdAt,
      updated_at: company.updatedAt,
      
      // Type-specific fields
      ...(userType === 'supplier' && {
        supplier_name: company.name,
        supplier_description: company.description,
        slug: (company as SupplierSearchResult).slug || company.name.toLowerCase().replace(/\\s+/g, '-'),
        supplier_website: (company as SupplierSearchResult).website,
        country: (company as SupplierSearchResult).country || 'United Kingdom'
      }),
      
      ...(userType === 'merchant' && {
        merchant_name: company.name,
        description: company.description,
        merchant_email: (company as MerchantSearchResult).merchant_email || null,
        merchant_phone: (company as MerchantSearchResult).merchant_phone || null,
        merchant_website_url: (company as MerchantSearchResult).merchant_website_url,
        merchant_locations: (company as MerchantSearchResult).locations || [],
        verification_status: (company as MerchantSearchResult).verification_status || 'active'
      })
    };
    
    onSelect(companyResult, bmn);
  };

  const handleBMNChange = (checked: boolean) => {
    setBmn(checked);
    if (selectedCompany) {
      onSelect(selectedCompany, checked);
    }
  };

  const entityName = userType === 'supplier' ? 'supplier' : 'merchant';
  const entityLabel = userType === 'supplier' ? 'company' : 'business';

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-muted-foreground">
          Search for your {entityName} {entityLabel} to pre-populate your registration details:
        </p>
      </div>

      {/* Intelligent Search Input */}
      <IntelligentSearch
        searchType={userType}
        placeholder={`Search for your ${entityName} ${entityLabel}...`}
        onSelect={handleCompanySelect}
        selectedValue={selectedCompany ? {
          id: selectedCompany.id,
          name: userType === 'supplier' ? selectedCompany.supplier_name || '' : selectedCompany.merchant_name || '',
          description: userType === 'supplier' ? selectedCompany.supplier_description : selectedCompany.description,
          isActive: selectedCompany.is_active,
          createdAt: selectedCompany.created_at,
          updatedAt: selectedCompany.updated_at,
          organizationAffiliations: selectedCompany.organization_affiliations
        } as MerchantSearchResult | SupplierSearchResult : undefined}
        showOrganizations={true}
        showLocations={userType === 'merchant'}
        className="w-full"
      />

      {/* BMN Subscription Question */}
      <div className="border-t pt-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="bmn-subscription" 
              checked={bmn}
              onCheckedChange={handleBMNChange}
              className="mt-1"
            />
            <div className="space-y-1">
              <label 
                htmlFor="bmn-subscription" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Subscribe to Builders Merchant News (BMN)
              </label>
              <p className="text-xs text-muted-foreground">
                Stay updated with the latest industry news, trends, and insights from the UK building merchant sector.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skip Option */}
      <div className="text-center pt-4 border-t">
        <Button 
          variant="ghost" 
          onClick={() => {
            setHasSearched(true);
            onSelect(null, bmn);
          }}
          className="text-sm"
        >
          Continue without selecting a {entityLabel}
        </Button>
      </div>
    </div>
  );
}