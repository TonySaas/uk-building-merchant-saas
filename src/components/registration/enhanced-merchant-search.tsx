import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Store, 
  MapPin, 
  Users, 
  Check, 
  Globe, 
  Filter, 
  Navigation, 
  Building,
  Phone,
  Mail
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCompanySearch } from '@/hooks/use-company-search';
import { CompanySearchResult, CompanySearchFilters, MerchantSearchResult } from '@/types/company-search';
import { toast } from 'sonner';

interface EnhancedMerchantSearchProps {
  onSelect: (company: CompanySearchResult | null, subscribeToBMN?: boolean) => void;
  selectedCompany?: CompanySearchResult | null;
  subscribeToBMN?: boolean;
}

export default function EnhancedMerchantSearch({
  onSelect,
  selectedCompany,
  subscribeToBMN = false
}: EnhancedMerchantSearchProps) {
  const [bmn, setBmn] = useState(subscribeToBMN);
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState<CompanySearchFilters>({});
  const [useLocation, setUseLocation] = useState(false);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

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
    searchByLocation,
    getAutocompleteSuggestions
  } = useCompanySearch({
    userType: 'merchant',
    initialFilters: localFilters,
    onCompanySelect: (company) => {
      onSelect(company, bmn);
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  // Update filters when local filters change
  useEffect(() => {
    setFilters(localFilters);
  }, [localFilters, setFilters]);

  const handleMerchantSelect = (merchant: CompanySearchResult) => {
    selectCompany(merchant);
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

  const handleLocationSearch = async () => {
    if (!navigator.geolocation) {
      toast.error('Location is not supported by this browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setLocationPermission('granted');
        const { latitude, longitude } = position.coords;
        try {
          await searchByLocation(latitude, longitude, 50); // 50km radius
          toast.success('Found merchants near your location');
        } catch (error) {
          toast.error('Failed to search by location');
        }
      },
      (error) => {
        setLocationPermission('denied');
        toast.error('Location access denied. Please enable location services.');
      }
    );
  };

  const getLocationText = (merchant: MerchantSearchResult) => {
    if (!merchant.merchant_locations || merchant.merchant_locations.length === 0) {
      // Fallback to address fields
      const parts = [
        merchant.merchant_address_1,
        merchant.merchant_address_2,
        merchant.merchant_address_3,
        merchant.merchant_address_4
      ].filter(Boolean);
      
      if (parts.length === 0) return null;
      
      return parts.join(', ');
    }
    
    const firstLocation = merchant.merchant_locations[0];
    const locationCount = merchant.merchant_locations.length;
    
    if (locationCount === 1) {
      return `${firstLocation.city}, ${firstLocation.county}`;
    } else {
      return `${firstLocation.city}, ${firstLocation.county} (+${locationCount - 1} more)`;
    }
  };

  const getBusinessSizeText = (merchant: MerchantSearchResult) => {
    const parts = [];
    
    if (merchant.employee_count_band) {
      parts.push(`${merchant.employee_count_band} employees`);
    }
    
    if (merchant.annual_turnover_band) {
      parts.push(`${merchant.annual_turnover_band} turnover`);
    }
    
    return parts.join(' • ');
  };

  const activeFiltersCount = Object.values(localFilters).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-muted-foreground">
          Search for your merchant business to pre-populate your registration details:
        </p>
      </div>

      {/* Search Input with Filters */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for your merchant business..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleLocationSearch}
            disabled={loading}
            className="h-12 w-12"
            title="Search by location"
          >
            <Navigation className="h-4 w-4" />
          </Button>
          
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

                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={localFilters.category || ''}
                    onValueChange={(value) => handleFilterChange('category', value || undefined)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All categories</SelectItem>
                      <SelectItem value="builders_merchant">Builders Merchant</SelectItem>
                      <SelectItem value="tool_hire">Tool Hire</SelectItem>
                      <SelectItem value="plumbing_heating">Plumbing & Heating</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="roofing">Roofing</SelectItem>
                      <SelectItem value="timber_merchant">Timber Merchant</SelectItem>
                      <SelectItem value="ironmongery">Ironmongery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Business Size Filters */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Employee Count</label>
                  <Select
                    value={localFilters.sizeRange?.employeeCountBand || ''}
                    onValueChange={(value) => handleFilterChange('sizeRange', {
                      ...localFilters.sizeRange,
                      employeeCountBand: value || undefined
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any size</SelectItem>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201+">201+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Annual Turnover</label>
                  <Select
                    value={localFilters.sizeRange?.annualTurnoverBand || ''}
                    onValueChange={(value) => handleFilterChange('sizeRange', {
                      ...localFilters.sizeRange,
                      annualTurnoverBand: value || undefined
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any turnover" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any turnover</SelectItem>
                      <SelectItem value="Under £1M">Under £1M</SelectItem>
                      <SelectItem value="£1M-£5M">£1M-£5M</SelectItem>
                      <SelectItem value="£5M-£25M">£5M-£25M</SelectItem>
                      <SelectItem value="£25M+">£25M+</SelectItem>
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
                    Active merchants only
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
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-2">
            {useLocation ? 'Finding nearby merchants...' : 'Searching merchants...'}
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
      {hasSearched && !loading && !error && results.length === 0 && (
        <div className="text-center py-8">
          <Store className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {searchTerm ? `No merchants found matching "${searchTerm}"` : 'No merchants found'}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your search terms or filters, or proceed without selecting a business
          </p>
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {results.map((merchant) => {
            const merchantResult = merchant as MerchantSearchResult;
            return (
              <Card 
                key={merchant.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedCompany?.id === merchant.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => handleMerchantSelect(merchant)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <Store className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-lg">{merchantResult.merchant_name}</h3>
                          {merchantResult.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {merchantResult.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        {getLocationText(merchantResult) && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{getLocationText(merchantResult)}</span>
                          </div>
                        )}
                        
                        {merchantResult.distance && (
                          <div className="flex items-center gap-1">
                            <Navigation className="h-3 w-3" />
                            <span>{merchantResult.distance.toFixed(1)} km away</span>
                          </div>
                        )}
                        
                        {merchantResult.merchant_locations && merchantResult.merchant_locations.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            <span>
                              {merchantResult.merchant_locations.length} 
                              {merchantResult.merchant_locations.length === 1 ? ' location' : ' locations'}
                            </span>
                          </div>
                        )}
                        
                        {merchantResult.merchant_website_url && (
                          <div className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            <span className="truncate max-w-32">{merchantResult.merchant_website_url}</span>
                          </div>
                        )}
                      </div>

                      {/* Business Info */}
                      {getBusinessSizeText(merchantResult) && (
                        <div className="text-xs text-muted-foreground">
                          {getBusinessSizeText(merchantResult)}
                        </div>
                      )}

                      {/* Contact Info */}
                      {(merchantResult.merchant_email || merchantResult.merchant_phone) && (
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          {merchantResult.merchant_email && (
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <span className="truncate">{merchantResult.merchant_email}</span>
                            </div>
                          )}
                          {merchantResult.merchant_phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{merchantResult.merchant_phone}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Category */}
                      {merchantResult.merchant_category && (
                        <div>
                          <Badge variant="outline" className="text-xs">
                            {merchantResult.merchant_category}
                          </Badge>
                        </div>
                      )}

                      {/* Organization Memberships */}
                      {merchant.organization_affiliations && merchant.organization_affiliations.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {merchant.organization_affiliations.map((affiliation, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {affiliation.organization.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {selectedCompany?.id === merchant.id && (
                      <div className="flex-shrink-0 ml-4">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
            Continue without selecting a business
          </Button>
        </div>
      )}
    </div>
  );
}