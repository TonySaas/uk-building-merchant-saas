/**
 * TypeScript interfaces for the Intelligent Search component
 * Supports both merchant and supplier search with organization filtering
 */

export interface BaseSearchResult {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MerchantSearchResult extends BaseSearchResult {
  merchant_name: string;
  merchant_email?: string;
  merchant_phone?: string;
  merchant_category?: string;
  merchant_website_url?: string;
  verification_status: 'pending' | 'verified' | 'rejected';
  locations?: MerchantLocation[];
  organizationAffiliations?: OrganizationAffiliation[];
}

export interface SupplierSearchResult extends BaseSearchResult {
  supplier_name?: string;
  company_name?: string;
  slug?: string;
  website?: string;
  country?: string;
  organizationAffiliations?: OrganizationAffiliation[];
}

export interface MerchantLocation {
  id: string;
  name: string;
  city?: string;
  county?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
}

export interface OrganizationAffiliation {
  id: string;
  organizationId: string;
  affiliationStatus: 'active' | 'pending' | 'suspended';
  membershipLevel?: string;
  organization: {
    id: string;
    name: string;
    type: string;
    logo_url?: string;
  };
}

export interface SearchMatch {
  text: string;
  isHighlighted: boolean;
}

export interface IntelligentSearchProps {
  searchType: 'merchant' | 'supplier';
  placeholder?: string;
  onSelect: (selectedItem: MerchantSearchResult | SupplierSearchResult | null) => void;
  selectedValue?: MerchantSearchResult | SupplierSearchResult | null;
  organizationFilter?: string[]; // Filter by specific organizations
  className?: string;
  disabled?: boolean;
  minSearchLength?: number;
  maxResults?: number;
  debounceMs?: number;
  showOrganizations?: boolean;
  showLocations?: boolean;
}

export interface SearchOptions {
  query: string;
  type: 'merchant' | 'supplier';
  organizationFilter?: string[];
  limit?: number;
  offset?: number;
}

export interface SearchResponse<T> {
  results: T[];
  totalCount: number;
  hasMore: boolean;
  searchTime: number;
}

export interface SearchState {
  query: string;
  results: (MerchantSearchResult | SupplierSearchResult)[];
  loading: boolean;
  error: string | null;
  isOpen: boolean;
  selectedIndex: number;
  hasSearched: boolean;
}

export interface HighlightedText {
  segments: SearchMatch[];
  originalText: string;
}