import React, { useState, useEffect } from 'react';
import { Search, Building2, MapPin, Users, Check, Globe, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCompanySearch } from '@/hooks/use-company-search';
import { CompanySearchResult, CompanySearchFilters } from '@/types/company-search';
import { SimpleCompanySearchService, SimpleCompany } from '@/services/simple-company-search';
import { toast } from 'sonner';

interface EnhancedSupplierSearchProps {
  onSelect: (company: CompanySearchResult | null, subscribeToBMN?: boolean) => void;
  selectedCompany?: CompanySearchResult | null;
  subscribeToBMN?: boolean;
}

export default function EnhancedSupplierSearch({
  onSelect,
  selectedCompany,
  subscribeToBMN = false
}: EnhancedSupplierSearchProps) {
  const [bmn, setBmn] = useState(subscribeToBMN);
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState<CompanySearchFilters>({});
  const [fallbackMode, setFallbackMode] = useState(false);
  const [fallbackResults, setFallbackResults] = useState<SimpleCompany[]>([]);
  const [fallbackLoading, setFallbackLoading] = useState(false);

  const {
    searchTerm,
    results,
    loading,
    error,
    hasSearched,
    recentSearches,
    suggestions,
    setSearchTerm,
    setFilters,
    selectCompany,
    retry,
    getAutocompleteSuggestions
  } = useCompanySearch({
    userType: 'supplier',
    initialFilters: localFilters,
    onCompanySelect: (company) => {
      onSelect(company, bmn);
    },
    onError: (error) => {
      toast.error(error);
      // Try fallback search
      if (!fallbackMode && searchTerm) {
        performFallbackSearch(searchTerm);
      }
    }
  });

  const performFallbackSearch = async (query: string) => {
    if (!query.trim()) return;
    
    console.log('Switching to fallback search mode');
    setFallbackMode(true);
    setFallbackLoading(true);
    
    try {
      const results = await SimpleCompanySearchService.searchCompanies(query, 'supplier');
      setFallbackResults(results);
      toast.success('Search completed using basic mode');
    } catch (error) {
      console.error('Fallback search failed:', error);
      toast.error('Search failed completely. Please try again.');
    } finally {
      setFallbackLoading(false);
    }
  };

  // Update filters when local filters change
  useEffect(() => {
    setFilters(localFilters);
  }, [localFilters, setFilters]);

  // Handle search term changes for fallback mode
  useEffect(() => {
    if (fallbackMode && searchTerm) {
      const debounceTimer = setTimeout(() => {
        performFallbackSearch(searchTerm);
      }, 300);
      return () => clearTimeout(debounceTimer);
    }
  }, [searchTerm, fallbackMode]);

  const handleSupplierSelect = (supplier: CompanySearchResult) => {
    selectCompany(supplier);
  };

  const handleFallbackCompanySelect = (company: SimpleCompany) => {
    // Convert SimpleCompany to CompanySearchResult format
    const companyResult: CompanySearchResult = {
      id: company.id,
      supplier_name: company.name,
      slug: company.name.toLowerCase().replace(/\s+/g, '-'),
      supplier_description: company.description,
      supplier_website: undefined,
      country: 'United Kingdom',
      is_active: true,
      organization_affiliations: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    onSelect(companyResult, bmn);
  };

  const handleBMNChange = (checked: boolean) => {
    setBmn(checked);
    if (selectedCompany) {
      onSelect(selectedCompany, checked);
    }
  };

  const handleFilterChange = (key: keyof CompanySearchFilters, value: any) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setLocalFilters({});
    setShowFilters(false);
  };

  const handleRecentSearchClick = (term: string) => {
    setSearchTerm(term);
  };

  const activeFiltersCount = Object.values(localFilters).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-muted-foreground">
          Search for your supplier company to pre-populate your registration details:
        </p>
      </div>

      {/* Search Input with Filters */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for your supplier company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
          
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 relative"
              >
                <Filter className="h-4 w-4" />
                {activeFiltersCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-8 px-2"
                  >
                    Clear all
                  </Button>
                </div>

                {/* Organization Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Organization</label>
                  <Select
                    value={localFilters.organizationId || ''}
                    onValueChange={(value) => handleFilterChange('organizationId', value || undefined)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All organizations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All organizations</SelectItem>
                      <SelectItem value="550e8400-e29b-41d4-a716-446655440001">Toolbank</SelectItem>
                      <SelectItem value="f8a29478-b71b-4f9e-9d54-dc372f37e748">NMBS</SelectItem>
                      <SelectItem value="e54f041a-2afe-40df-906b-58ad958df5cb">BMN</SelectItem>
                      <SelectItem value="91c294be-5f50-488c-b7b2-ead47bb0eaa7">BMF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Active Status Filter */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="active-only"
                    checked={localFilters.isActive !== false}
                    onCheckedChange={(checked) => handleFilterChange('isActive', checked)}
                  />
                  <label htmlFor="active-only" className="text-sm">
                    Active suppliers only
                  </label>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && !searchTerm && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Recent searches:</p>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleRecentSearchClick(term)}
                  className="h-8 text-xs"
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {(loading || fallbackLoading) && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-2">
            {fallbackLoading ? 'Searching suppliers (basic mode)...' : 'Searching suppliers...'}
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8 space-y-4">
          <div className="text-destructive">
            <p className="font-medium">Search failed</p>
            <p className="text-sm">{error}</p>
          </div>
          <Button onClick={retry} variant="outline" size="sm">
            Try again
          </Button>
        </div>
      )}

      {/* No Results */}
      {((hasSearched && !loading && !error && results.length === 0) || 
        (fallbackMode && !fallbackLoading && fallbackResults.length === 0)) && (
        <div className="text-center py-8">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No suppliers found matching "{searchTerm}"</p>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your search terms or filters, or proceed without selecting a company
          </p>
        </div>
      )}

      {/* Search Results */}
      {(results.length > 0 || fallbackResults.length > 0) && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {fallbackMode && fallbackResults.length > 0 ? (
            // Fallback results
            fallbackResults.map((company) => (
              <Card 
                key={company.id}
                className="cursor-pointer transition-all hover:shadow-md hover:bg-muted/50"
                onClick={() => handleFallbackCompanySelect(company)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 text-primary flex-shrink-0" />
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
                        Basic search mode
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            // Normal results
            results.map((supplier) => (
            <Card 
              key={supplier.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCompany?.id === supplier.id 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : 'hover:bg-muted/50'
              }`}
              onClick={() => handleSupplierSelect(supplier)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg">
                          {'supplier_name' in supplier ? supplier.supplier_name : supplier.merchant_name}
                        </h3>
                        {'supplier_description' in supplier && supplier.supplier_description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {supplier.supplier_description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      {('country' in supplier && supplier.country) && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{supplier.country}</span>
                        </div>
                      )}
                      {('supplier_website' in supplier && supplier.supplier_website) && (
                        <div className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          <span className="truncate max-w-32">{supplier.supplier_website}</span>
                        </div>
                      )}
                    </div>

                    {/* Organization Affiliations */}
                    {supplier.organization_affiliations && supplier.organization_affiliations.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {supplier.organization_affiliations.map((affiliation, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {affiliation.organization.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedCompany?.id === supplier.id && (
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
          )}
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
      {(hasSearched || fallbackMode) && (
        <div className="text-center pt-4 border-t">
          <Button 
            variant="ghost" 
            onClick={() => onSelect(null, bmn)}
            className="text-sm"
          >
            Continue without selecting a company
          </Button>
        </div>
      )}
    </div>
  );
}