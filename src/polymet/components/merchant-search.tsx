import { useState, useEffect } from "react";
import { Search, Store, MapPin, Users, Check, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Merchant {
  id: string;
  name: string;
  description: string;
  website: string;
  merchant_locations: {
    id: string;
    name: string;
    city: string;
    county: string;
    postal_code: string;
  }[];
  organization_memberships: {
    organization: {
      name: string;
      type: string;
    };
  }[];
}

interface MerchantSearchProps {
  onSelect: (merchant: Merchant | null, subscribeToBMN?: boolean) => void;
  selectedMerchant?: Merchant | null;
  subscribeToBMN?: boolean;
}

export default function MerchantSearch({ 
  onSelect, 
  selectedMerchant, 
  subscribeToBMN = false 
}: MerchantSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [bmn, setBmn] = useState(subscribeToBMN);

  const searchMerchants = async (query: string) => {
    if (!query.trim()) {
      setMerchants([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from('merchants')
        .select(`
          id,
          name,
          description,
          website,
          merchant_locations (
            id,
            name,
            city,
            county,
            postal_code
          ),
          organization_memberships!inner (
            organization:organizations (
              name,
              type
            )
          )
        `)
        .ilike('name', `%${query}%`)
        .eq('is_active', true)
        .limit(10);

      if (error) {
        console.error('Error searching merchants:', error);
        toast.error('Failed to search merchants');
        return;
      }

      setMerchants(data || []);
      setHasSearched(true);
    } catch (error) {
      console.error('Error searching merchants:', error);
      toast.error('Failed to search merchants');
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchMerchants(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleMerchantSelect = (merchant: Merchant) => {
    onSelect(merchant, bmn);
  };

  const handleBMNChange = (checked: boolean) => {
    setBmn(checked);
    if (selectedMerchant) {
      onSelect(selectedMerchant, checked);
    }
  };

  const getLocationText = (merchant: Merchant) => {
    if (!merchant.merchant_locations || merchant.merchant_locations.length === 0) {
      return null;
    }
    
    const firstLocation = merchant.merchant_locations[0];
    const locationCount = merchant.merchant_locations.length;
    
    if (locationCount === 1) {
      return `${firstLocation.city}, ${firstLocation.county}`;
    } else {
      return `${firstLocation.city}, ${firstLocation.county} (+${locationCount - 1} more)`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-muted-foreground">
          Search for your merchant business to pre-populate your registration details:
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search for your merchant business..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 text-base"
        />
      </div>

      {/* Search Results */}
      {isSearching && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-2">Searching merchants...</p>
        </div>
      )}

      {hasSearched && !isSearching && merchants.length === 0 && (
        <div className="text-center py-8">
          <Store className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No merchants found matching "{searchTerm}"</p>
          <p className="text-sm text-muted-foreground mt-2">
            Try a different search term or proceed without selecting a business
          </p>
        </div>
      )}

      {merchants.length > 0 && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {merchants.map((merchant) => (
            <Card 
              key={merchant.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedMerchant?.id === merchant.id 
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
                        <h3 className="font-semibold text-lg">{merchant.name}</h3>
                        {merchant.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {merchant.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      {getLocationText(merchant) && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{getLocationText(merchant)}</span>
                        </div>
                      )}
                      {merchant.merchant_locations && merchant.merchant_locations.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>
                            {merchant.merchant_locations.length} 
                            {merchant.merchant_locations.length === 1 ? ' location' : ' locations'}
                          </span>
                        </div>
                      )}
                      {merchant.website && (
                        <div className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          <span className="truncate max-w-32">{merchant.website}</span>
                        </div>
                      )}
                    </div>

                    {/* Organization Memberships */}
                    {merchant.organization_memberships?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {merchant.organization_memberships.map((membership, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {membership.organization.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedMerchant?.id === merchant.id && (
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
            Continue without selecting a business
          </Button>
        </div>
      )}
    </div>
  );
}