import { useState, useEffect } from "react";
import { Search, Building2, MapPin, Users, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Supplier {
  id: string;
  name: string;
  description: string;
  location: string;
  employee_count: number;
  website: string;
  organization_memberships: {
    organization: {
      name: string;
      type: string;
    };
  }[];
}

interface SupplierSearchProps {
  onSelect: (supplier: Supplier | null, subscribeToBMN?: boolean) => void;
  selectedSupplier?: Supplier | null;
  subscribeToBMN?: boolean;
}

export default function SupplierSearch({ 
  onSelect, 
  selectedSupplier, 
  subscribeToBMN = false 
}: SupplierSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [bmn, setBmn] = useState(subscribeToBMN);

  const searchSuppliers = async (query: string) => {
    if (!query.trim()) {
      setSuppliers([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .select(`
          id,
          name,
          description,
          location,
          employee_count,
          website,
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
        console.error('Error searching suppliers:', error);
        toast.error('Failed to search suppliers');
        return;
      }

      setSuppliers(data || []);
      setHasSearched(true);
    } catch (error) {
      console.error('Error searching suppliers:', error);
      toast.error('Failed to search suppliers');
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchSuppliers(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleSupplierSelect = (supplier: Supplier) => {
    onSelect(supplier, bmn);
  };

  const handleBMNChange = (checked: boolean) => {
    setBmn(checked);
    if (selectedSupplier) {
      onSelect(selectedSupplier, checked);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-muted-foreground">
          Search for your company to pre-populate your registration details:
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search for your supplier company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 text-base"
        />
      </div>

      {/* Search Results */}
      {isSearching && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-2">Searching suppliers...</p>
        </div>
      )}

      {hasSearched && !isSearching && suppliers.length === 0 && (
        <div className="text-center py-8">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No suppliers found matching "{searchTerm}"</p>
          <p className="text-sm text-muted-foreground mt-2">
            Try a different search term or proceed without selecting a company
          </p>
        </div>
      )}

      {suppliers.length > 0 && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {suppliers.map((supplier) => (
            <Card 
              key={supplier.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedSupplier?.id === supplier.id 
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
                        <h3 className="font-semibold text-lg">{supplier.name}</h3>
                        {supplier.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {supplier.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      {supplier.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{supplier.location}</span>
                        </div>
                      )}
                      {supplier.employee_count && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{supplier.employee_count} employees</span>
                        </div>
                      )}
                    </div>

                    {/* Organization Memberships */}
                    {supplier.organization_memberships?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {supplier.organization_memberships.map((membership, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {membership.organization.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedSupplier?.id === supplier.id && (
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
            Continue without selecting a company
          </Button>
        </div>
      )}
    </div>
  );
}