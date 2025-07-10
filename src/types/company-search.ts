// Company Search Type Definitions
// Enhanced types for the registration wizard company search functionality

export interface CompanySearchFilters {
  organizationId?: string;
  location?: {
    latitude?: number;
    longitude?: number;
    radius?: number; // in kilometers
  };
  category?: string;
  sizeRange?: {
    employeeCountBand?: string;
    annualTurnoverBand?: string;
  };
  isActive?: boolean;
}

export interface SupplierSearchResult {
  id: string;
  supplier_name: string;
  slug: string;
  supplier_description?: string;
  supplier_website?: string;
  country: string;
  is_active: boolean;
  organization_affiliations?: {
    id: string;
    organization: {
      id: string;
      name: string;
      type: string;
      logo_url?: string;
    };
    affiliation_type: string;
    status: string;
  }[];
  created_at: string;
  updated_at: string;
}

export interface MerchantSearchResult {
  id: string;
  merchant_name: string;
  description?: string;
  merchant_website_url?: string;
  merchant_email?: string;
  merchant_phone?: string;
  logo_url?: string;
  business_registration_number?: string;
  vat_number?: string;
  trading_since?: string;
  annual_turnover_band?: string;
  employee_count_band?: string;
  merchant_category?: string;
  merchant_address_1?: string;
  merchant_address_2?: string;
  merchant_address_3?: string;
  merchant_address_4?: string;
  merchant_postcode?: string;
  merchant_latitude?: number;
  merchant_longitude?: number;
  is_active: boolean;
  verification_status: string;
  organization_affiliations?: {
    id: string;
    organization: {
      id: string;
      name: string;
      type: string;
      logo_url?: string;
    };
    affiliation_status: string;
    membership_level: string;
  }[];
  merchant_locations?: {
    id: string;
    name: string;
    city: string;
    county: string;
    postal_code: string;
  }[];
  distance?: number; // calculated distance in km for geographic searches
  created_at: string;
  updated_at: string;
}

export type CompanySearchResult = SupplierSearchResult | MerchantSearchResult;

export interface CompanySearchState {
  searchTerm: string;
  filters: CompanySearchFilters;
  results: CompanySearchResult[];
  loading: boolean;
  error: string | null;
  selectedCompany: CompanySearchResult | null;
  hasSearched: boolean;
  totalResults: number;
  recentSearches: string[];
  suggestions: string[];
}

export interface CompanySearchResponse {
  results: CompanySearchResult[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface OrganizationSuggestion {
  id: string;
  name: string;
  type: string;
  logo_url?: string;
  primary_color: string;
  secondary_color: string;
  suggested: boolean; // true if suggested based on company affiliation
  affiliationType?: string;
  membershipLevel?: string;
}

export interface CompanyDetails {
  id: string;
  name: string;
  type: 'supplier' | 'merchant';
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: {
    line1?: string;
    line2?: string;
    line3?: string;
    line4?: string;
    postcode?: string;
    latitude?: number;
    longitude?: number;
  };
  businessInfo?: {
    registrationNumber?: string;
    vatNumber?: string;
    tradingSince?: string;
    annualTurnoverBand?: string;
    employeeCountBand?: string;
    category?: string;
  };
  organizationAffiliations: OrganizationSuggestion[];
  locations?: {
    id: string;
    name: string;
    city: string;
    county: string;
    postal_code: string;
  }[];
  verificationStatus?: string;
  isActive: boolean;
}

export interface SearchAnalytics {
  searchTerm: string;
  userType: 'supplier' | 'merchant' | 'consumer';
  resultsCount: number;
  selectedResult?: string;
  timestamp: Date;
  filters?: CompanySearchFilters;
}

export interface CompanySearchHookProps {
  userType: 'supplier' | 'merchant';
  initialFilters?: CompanySearchFilters;
  onCompanySelect?: (company: CompanySearchResult) => void;
  onError?: (error: string) => void;
}

export interface CompanySearchServiceOptions {
  query: string;
  type: 'supplier' | 'merchant';
  filters?: CompanySearchFilters;
  page?: number;
  limit?: number;
}

export interface GeographicSearchOptions {
  latitude: number;
  longitude: number;
  radius: number; // in kilometers
  limit?: number;
}

export interface AutocompleteOptions {
  query: string;
  type: 'supplier' | 'merchant';
  limit?: number;
}

export interface AutocompleteResult {
  text: string;
  type: 'company' | 'location' | 'category';
  count: number;
}

// Registration wizard integration types
export interface RegistrationFormData {
  userType: 'supplier' | 'merchant' | 'consumer';
  selectedCompany?: CompanySearchResult;
  suggestedOrganizations: OrganizationSuggestion[];
  selectedOrganizations: string[];
  selectedRole: string;
  subscribeToBMN: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName: string;
  jobTitle: string;
  phone: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

export interface EnhancedRegistrationState extends RegistrationFormData {
  currentStep: number;
  companySearchState: CompanySearchState;
  isSubmitting: boolean;
  errors: Record<string, string>;
}