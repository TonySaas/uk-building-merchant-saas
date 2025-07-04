
// Placeholder components to fix build errors

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// KanbanOfferBoard component
export function KanbanOfferBoard({ isLoading }: { isLoading?: boolean }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array(3).fill(0).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-24 mb-4" />
                <div className="space-y-2">
                  {Array(3).fill(0).map((_, j) => (
                    <Skeleton key={j} className="h-16 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <h3 className="text-lg font-medium">Kanban Board</h3>
      <p className="text-muted-foreground">Kanban view coming soon</p>
    </div>
  );
}

// PromotionCalendar component
export function PromotionCalendar({ isLoading }: { isLoading?: boolean }) {
  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <div className="text-center py-8">
      <h3 className="text-lg font-medium">Promotion Calendar</h3>
      <p className="text-muted-foreground">Calendar view coming soon</p>
    </div>
  );
}

// MerchantTreeView component
export interface MerchantTreeViewProps {
  isLoading?: boolean;
}

export function MerchantTreeView({ isLoading }: MerchantTreeViewProps) {
  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <div className="text-center py-8">
      <h3 className="text-lg font-medium">Merchant Tree View</h3>
      <p className="text-muted-foreground">Tree view coming soon</p>
    </div>
  );
}

// FilterPanel component
export function FilterPanel({ onFilterChange }: { onFilterChange?: () => void }) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium mb-4">Filters</h3>
        <p className="text-sm text-muted-foreground">Filter panel coming soon</p>
      </CardContent>
    </Card>
  );
}

// SearchResultsDisplay component
export function SearchResultsDisplay({ 
  query, 
  isLoading 
}: { 
  query: string; 
  isLoading?: boolean; 
}) {
  if (isLoading) {
    return <Skeleton className="h-48 w-full" />;
  }

  return (
    <div className="text-center py-8">
      <h3 className="text-lg font-medium">Search Results for "{query}"</h3>
      <p className="text-muted-foreground">Search functionality coming soon</p>
    </div>
  );
}

// ViewToggleDisplay component
export function ViewToggleDisplay({ isLoading }: { isLoading?: boolean }) {
  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <div className="text-center py-8">
      <h3 className="text-lg font-medium">Grid/List View</h3>
      <p className="text-muted-foreground">Grid and list views coming soon</p>
    </div>
  );
}

// Organization selector placeholder
export interface OrganizationSelectorProps {
  organizations: Array<{
    id: string;
    name: string;
    logo: string;
    description: string;
    website: string;
    campaigns: string[];
  }>;
  onSelect: (org: any) => void;
  selectedOrgId?: string;
}

export function OrganizationSelector({ 
  organizations, 
  onSelect, 
  selectedOrgId 
}: OrganizationSelectorProps) {
  return (
    <div className="text-center py-8">
      <h3 className="text-lg font-medium">Organization Selector</h3>
      <p className="text-muted-foreground">Organization selector coming soon</p>
    </div>
  );
}

// Category selector placeholder
export interface CategorySelectorProps {
  categories: Array<{
    id: string;
    name: string;
    description?: string;
  }>;
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

export function CategorySelector({ 
  categories, 
  selectedCategories, 
  onChange 
}: CategorySelectorProps) {
  return (
    <div className="text-center py-8">
      <h3 className="text-lg font-medium">Category Selector</h3>
      <p className="text-muted-foreground">Category selector coming soon</p>
    </div>
  );
}

// Organization merchant selector
export interface OrganizationMerchantItem {
  id: string;
  name: string;
  logo: string;
  value: string;
  description?: string;
}

export interface OrganizationMerchantSelectorProps {
  merchants: OrganizationMerchantItem[];
  selectedMerchant: string;
  onSelect: (value: string) => void;
}

export function OrganizationMerchantSelector({ 
  merchants, 
  selectedMerchant, 
  onSelect 
}: OrganizationMerchantSelectorProps) {
  return (
    <div className="text-center py-8">
      <h3 className="text-lg font-medium">Merchant Selector</h3>
      <p className="text-muted-foreground">Merchant selector coming soon</p>
    </div>
  );
}

// Merchant offer card
export interface MerchantOfferCardProps {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  image: string;
  startDate: string;
  endDate: string;
  organization: {
    id: string;
    name: string;
    logo: string;
  };
  category: string;
  sku: string;
  stockStatus: "in-stock" | "low-stock" | "out-of-stock";
  stockQuantity: number;
}

export function MerchantOfferCard(props: MerchantOfferCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium">{props.title}</h3>
        <p className="text-sm text-muted-foreground">{props.description}</p>
      </CardContent>
    </Card>
  );
}

// View type for view toggle
export type ViewType = "grid" | "list" | "kanban";

// Offer type
export interface Offer {
  id: string;
  name: string;
  merchant: string;
  status: "active" | "scheduled" | "ended" | "draft";
  startDate: string;
  endDate: string;
  discount: number;
  views: number;
  conversions: number;
}
