/**
 * Demo component to showcase the Intelligent Search functionality
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import IntelligentSearch from '@/components/intelligent-search';
import { MerchantSearchResult, SupplierSearchResult } from '@/types/intelligent-search';

export default function IntelligentSearchDemo() {
  const [selectedMerchant, setSelectedMerchant] = useState<MerchantSearchResult | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierSearchResult | null>(null);

  const handleMerchantSelect = (merchant: MerchantSearchResult | SupplierSearchResult | null) => {
    setSelectedMerchant(merchant as MerchantSearchResult);
  };

  const handleSupplierSelect = (supplier: MerchantSearchResult | SupplierSearchResult | null) => {
    setSelectedSupplier(supplier as SupplierSearchResult);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Intelligent Search Demo</h1>
        <p className="text-muted-foreground">
          Test the new autocomplete/typeahead search functionality for merchants and suppliers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Merchant Search */}
        <Card>
          <CardHeader>
            <CardTitle>Merchant Search</CardTitle>
            <CardDescription>
              Search for merchants with intelligent matching. Try "Robert Price" or "BM"
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <IntelligentSearch
              searchType="merchant"
              placeholder="Search for merchants..."
              onSelect={handleMerchantSelect}
              selectedValue={selectedMerchant}
              showOrganizations={true}
              showLocations={true}
            />
            
            {selectedMerchant && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Selected Merchant:</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {selectedMerchant.merchant_name}</p>
                  <p><strong>Category:</strong> {selectedMerchant.merchant_category || 'Not specified'}</p>
                  <p><strong>Email:</strong> {selectedMerchant.merchant_email || 'Not provided'}</p>
                  <p><strong>Status:</strong> {selectedMerchant.verification_status}</p>
                  {selectedMerchant.locations && selectedMerchant.locations.length > 0 && (
                    <p><strong>Location:</strong> {selectedMerchant.locations[0].city}, {selectedMerchant.locations[0].county}</p>
                  )}
                  {selectedMerchant.organizationAffiliations && selectedMerchant.organizationAffiliations.length > 0 && (
                    <div>
                      <strong>Organizations:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedMerchant.organizationAffiliations.map(affiliation => (
                          <Badge key={affiliation.id} variant="secondary" className="text-xs">
                            {affiliation.organization.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Supplier Search */}
        <Card>
          <CardHeader>
            <CardTitle>Supplier Search</CardTitle>
            <CardDescription>
              Search for suppliers with intelligent matching
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <IntelligentSearch
              searchType="supplier"
              placeholder="Search for suppliers..."
              onSelect={handleSupplierSelect}
              selectedValue={selectedSupplier}
              showOrganizations={true}
              showLocations={false}
            />
            
            {selectedSupplier && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Selected Supplier:</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {selectedSupplier.name}</p>
                  <p><strong>Description:</strong> {selectedSupplier.description || 'Not provided'}</p>
                  <p><strong>Active:</strong> {selectedSupplier.isActive ? 'Yes' : 'No'}</p>
                  {selectedSupplier.organizationAffiliations && selectedSupplier.organizationAffiliations.length > 0 && (
                    <div>
                      <strong>Organizations:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedSupplier.organizationAffiliations.map(affiliation => (
                          <Badge key={affiliation.id} variant="secondary" className="text-xs">
                            {affiliation.organization.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button 
          onClick={() => {
            setSelectedMerchant(null);
            setSelectedSupplier(null);
          }}
          variant="outline"
        >
          Clear All Selections
        </Button>
      </div>

      {/* Feature Highlights */}
      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Search Intelligence</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Prioritizes results starting with search term</li>
                <li>• Real-time filtering with 300ms debounce</li>
                <li>• Highlighted matching text</li>
                <li>• Minimum 2 characters to search</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">User Experience</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Keyboard navigation (arrow keys, enter, escape)</li>
                <li>• Click outside to close dropdown</li>
                <li>• Loading states and error handling</li>
                <li>• Clear button to reset selection</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Data Integration</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Supabase database integration</li>
                <li>• Organization affiliations</li>
                <li>• Location data for merchants</li>
                <li>• Active status filtering</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Performance</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• 5-minute result caching</li>
                <li>• Aborts previous requests</li>
                <li>• Optimized database queries</li>
                <li>• Maximum 10 results per search</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}