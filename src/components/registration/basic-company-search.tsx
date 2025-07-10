import React, { useState, useEffect } from 'react';
import { Search, Building2, Store, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/lib/supabase';
import { CompanySearchResult } from '@/types/company-search';
import { toast } from 'sonner';

interface BasicCompanySearchProps {
  userType: 'supplier' | 'merchant';
  onSelect: (company: CompanySearchResult | null, subscribeToBMN?: boolean) => void;
  selectedCompany?: CompanySearchResult | null;
  subscribeToBMN?: boolean;
}

interface BasicCompany {
  id: string;
  name: string;
  description?: string;
  organization_affiliations?: Array<{
    id: string;
    organizationId: string;
    affiliationStatus: string;
    membershipLevel: string;
    organization: {
      id: string;
      name: string;
      type: string;
      logo_url?: string;
    };
  }>;
  locations?: Array<{
    id: string;
    name: string;
    city: string;
    county: string;
    postal_code: string;
  }>;
  verification_status?: string;
  website?: string;
  country?: string;
}

export default function BasicCompanySearch({
  userType,
  onSelect,
  selectedCompany,
  subscribeToBMN = false
}: BasicCompanySearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState<BasicCompany[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [bmn, setBmn] = useState(subscribeToBMN);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm.trim()) {
        performSearch(searchTerm);
      } else {
        setCompanies([]);
        setHasSearched(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const performSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setHasSearched(false);
    
    try {
      console.log(`Searching ${userType}s for: "${query}"`);
      
      if (!supabase) {
        console.error('Supabase client not configured');
        toast.error('Search service not available');
        setCompanies([]);
        return;
      }
      
      const tableName = userType === 'supplier' ? 'suppliers' : 'merchants';
      
      // Use correct field names based on database schema
      const selectFields = userType === 'supplier' 
        ? 'id, supplier_name, supplier_description'  // suppliers table uses 'supplier_name'
        : 'id, merchant_name, merchant_category';  // merchants table uses 'merchant_name' and has no 'description'
      
      const searchField = userType === 'supplier' ? 'supplier_name' : 'merchant_name';
      
      console.log(`Query details:`, {
        table: tableName,
        select: selectFields,
        searchField,
        searchValue: `%${query}%`
      });
      
      // Try direct Supabase first, fallback to search server
      let searchResults = [];
      let searchError = null;
      
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select(selectFields)
          .ilike(searchField, `%${query}%`)
          .limit(10);

        if (error) {
          console.warn(`Direct search failed: ${error.message}`);
          searchError = error;
        } else {
          searchResults = (data || []).map(item => ({
            id: item.id,
            name: userType === 'supplier' ? item.supplier_name : item.merchant_name,
            description: userType === 'supplier' ? item.supplier_description : item.merchant_category,
            organization_affiliations: [],
            locations: [],
            verification_status: userType === 'merchant' ? item.verification_status : 'active',
            website: userType === 'supplier' ? item.supplier_website : item.merchant_website_url,
            country: userType === 'supplier' ? item.country : 'United Kingdom'
          }));
        }
      } catch (err) {
        console.warn(`Direct search exception: ${err.message}`);
        searchError = err;
      }

      // If direct search failed, try search server
      if (searchError && searchResults.length === 0) {
        try {
          console.log('Falling back to search server...');
          
          const response = await fetch('http://localhost:3001/api/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query,
              type: userType,
              limit: 10
            })
          });

          if (response.ok) {
            const data = await response.json();
            searchResults = (data.results || []).map(item => ({
              id: item.id,
              name: item.name,
              description: item.description,
              organization_affiliations: item.organization_affiliations || [],
              locations: item.locations || [],
              verification_status: item.verification_status || 'active',
              website: item.website,
              country: item.country || 'United Kingdom'
            }));
            searchError = null;
          } else {
            const errorData = await response.json();
            searchError = new Error(errorData.error || 'Search server failed');
          }
        } catch (err) {
          console.error('Search server error:', err);
          searchError = err;
        }
      }

      if (searchError && searchResults.length === 0) {
        console.error(`Search error:`, searchError);
        toast.error(`Search failed: ${searchError.message}`);
        setCompanies([]);
      } else {
        console.log(`Found ${searchResults.length} ${userType}s`);
        setCompanies(searchResults);
        if (searchResults.length > 0) {
          toast.success(`Found ${searchResults.length} ${userType}${searchResults.length > 1 ? 's' : ''}`);
        }
      }
    } catch (error) {
      console.error('Search exception:', error);
      toast.error('Search failed. Please try again.');
      setCompanies([]);
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  };

  const handleCompanySelect = (company: BasicCompany) => {
    const companyResult: CompanySearchResult = {
      id: company.id,
      [userType === 'supplier' ? 'supplier_name' : 'merchant_name']: company.name,
      [userType === 'supplier' ? 'supplier_description' : 'description']: company.description,
      [userType === 'supplier' ? 'slug' : 'merchant_website_url']: 
        userType === 'supplier' ? company.name.toLowerCase().replace(/\s+/g, '-') : company.website,
      [userType === 'supplier' ? 'country' : 'is_active']: 
        userType === 'supplier' ? (company.country || 'United Kingdom') : true,
      is_active: true,
      organization_affiliations: company.organization_affiliations || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...(userType === 'merchant' && {
        merchant_name: company.name,
        merchant_email: null,
        merchant_phone: null,
        merchant_locations: company.locations || [],
        verification_status: company.verification_status || 'active'
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

  const Icon = userType === 'supplier' ? Building2 : Store;
  const entityName = userType === 'supplier' ? 'supplier' : 'merchant';

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-muted-foreground">
          Search for your {entityName} {userType === 'supplier' ? 'company' : 'business'} to pre-populate your registration details:
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={`Search for your ${entityName} ${userType === 'supplier' ? 'company' : 'business'}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 text-base"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-2">
            Searching {entityName}s...
          </p>
        </div>
      )}

      {/* No Results */}
      {hasSearched && !loading && companies.length === 0 && (
        <div className="text-center py-8">
          <Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            No {entityName}s found matching "{searchTerm}"
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Try a different search term or proceed without selecting a {userType === 'supplier' ? 'company' : 'business'}
          </p>
        </div>
      )}

      {/* Search Results */}
      {companies.length > 0 && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {companies.map((company) => (
            <Card 
              key={company.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCompany?.id === company.id 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : 'hover:bg-muted/50'
              }`}
              onClick={() => handleCompanySelect(company)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg">{company.name}</h3>
                        {company.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {company.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Basic search results
                    </div>
                  </div>

                  {selectedCompany?.id === company.id && (
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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
      {hasSearched && (
        <div className="text-center pt-4 border-t">
          <Button 
            variant="ghost" 
            onClick={() => onSelect(null, bmn)}
            className="text-sm"
          >
            Continue without selecting a {userType === 'supplier' ? 'company' : 'business'}
          </Button>
        </div>
      )}
    </div>
  );
}