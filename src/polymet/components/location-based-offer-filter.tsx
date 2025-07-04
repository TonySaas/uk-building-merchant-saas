"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPinIcon,
  FilterIcon,
  TagIcon,
  PercentIcon,
  BuildingIcon,
  ShoppingBagIcon,
  CheckIcon,
  XIcon,
  ArrowRightIcon,
} from "lucide-react";

// Mock data for offers
const OFFERS = [
  {
    id: "o1",
    title: "20% Off All Power Tools",
    description: "Valid on all power tools from top brands",
    discount: "20%",
    code: "TOOLS20",
    validUntil: "2023-12-31",
    merchantId: "m1",
    merchantName: "City Building Supplies",
    merchantAddress: "123 Main St, London",
    distance: 1.2,
    category: "tools",
  },
  {
    id: "o2",
    title: "Buy 2 Get 1 Free on Paint",
    description: "Mix and match any paint colors",
    discount: "33%",
    code: "PAINT3FOR2",
    validUntil: "2023-11-15",
    merchantId: "m2",
    merchantName: "Metro Hardware",
    merchantAddress: "456 High St, London",
    distance: 2.5,
    category: "paint",
  },
  {
    id: "o3",
    title: "£50 Off Orders Over £250",
    description: "Applies to all products in store",
    discount: "£50",
    code: "SAVE50",
    validUntil: "2023-12-01",
    merchantId: "m3",
    merchantName: "London Timber & Tools",
    merchantAddress: "789 Park Lane, London",
    distance: 3.1,
    category: "general",
  },
  {
    id: "o4",
    title: "15% Off Plumbing Supplies",
    description: "Discount on all pipes, fittings, and fixtures",
    discount: "15%",
    code: "PLUMB15",
    validUntil: "2023-11-30",
    merchantId: "m4",
    merchantName: "Construction Corner",
    merchantAddress: "101 Bridge Rd, London",
    distance: 0.8,
    category: "plumbing",
  },
  {
    id: "o5",
    title: "Free Delivery on Orders Over £100",
    description: "Same-day delivery within 10 miles",
    discount: "Free Delivery",
    code: "FREEDEL",
    validUntil: "2023-12-15",
    merchantId: "m5",
    merchantName: "Builder's Warehouse",
    merchantAddress: "202 Station Rd, London",
    distance: 1.5,
    category: "delivery",
  },
  {
    id: "o6",
    title: "10% Off Timber Products",
    description: "All timber and wood products included",
    discount: "10%",
    code: "TIMBER10",
    validUntil: "2023-12-10",
    merchantId: "m3",
    merchantName: "London Timber & Tools",
    merchantAddress: "789 Park Lane, London",
    distance: 3.1,
    category: "timber",
  },
  {
    id: "o7",
    title: "25% Off Safety Equipment",
    description: "Helmets, gloves, boots, and more",
    discount: "25%",
    code: "SAFETY25",
    validUntil: "2023-11-20",
    merchantId: "m1",
    merchantName: "City Building Supplies",
    merchantAddress: "123 Main St, London",
    distance: 1.2,
    category: "safety",
  },
  {
    id: "o8",
    title: "Buy One Get One Half Price on Adhesives",
    description: "Mix and match across all brands",
    discount: "50% off second item",
    code: "GLUE50",
    validUntil: "2023-12-05",
    merchantId: "m2",
    merchantName: "Metro Hardware",
    merchantAddress: "456 High St, London",
    distance: 2.5,
    category: "adhesives",
  },
];

// Categories for filtering
const CATEGORIES = [
  { id: "all", name: "All Categories" },
  { id: "tools", name: "Tools" },
  { id: "paint", name: "Paint" },
  { id: "timber", name: "Timber" },
  { id: "plumbing", name: "Plumbing" },
  { id: "safety", name: "Safety" },
  { id: "adhesives", name: "Adhesives" },
  { id: "delivery", name: "Delivery" },
  { id: "general", name: "General" },
];

export interface LocationBasedOfferFilterProps {
  userLocation?: { lat: number; lng: number } | null;
  initialRadius?: number;
  onOfferSelect?: (offer: any) => void;
  className?: string;
}

export default function LocationBasedOfferFilter({
  userLocation = null,
  initialRadius = 5,
  onOfferSelect,
  className,
}: LocationBasedOfferFilterProps) {
  const [maxDistance, setMaxDistance] = useState(initialRadius);
  const [filteredOffers, setFilteredOffers] = useState(OFFERS);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [locationFilterEnabled, setLocationFilterEnabled] =
    useState(!!userLocation);
  const [sortBy, setSortBy] = useState<"distance" | "discount">("distance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter and sort offers based on current filters
  useEffect(() => {
    let filtered = [...OFFERS];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (offer) => offer.category === selectedCategory
      );
    }

    // Filter by distance if location filter is enabled
    if (locationFilterEnabled && userLocation) {
      filtered = filtered.filter((offer) => offer.distance <= maxDistance);
    }

    // Sort offers
    if (sortBy === "distance" && userLocation) {
      filtered.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === "discount") {
      filtered.sort((a, b) => {
        // Simple sorting logic - could be improved for different discount formats
        const aValue = a.discount.includes("%")
          ? parseInt(a.discount)
          : a.discount.includes("£")
            ? parseInt(a.discount.replace("£", ""))
            : 0;
        const bValue = b.discount.includes("%")
          ? parseInt(b.discount)
          : b.discount.includes("£")
            ? parseInt(b.discount.replace("£", ""))
            : 0;
        return bValue - aValue;
      });
    }

    setFilteredOffers(filtered);
  }, [
    maxDistance,
    selectedCategory,
    locationFilterEnabled,
    sortBy,
    userLocation,
  ]);

  // Handle offer selection
  const handleOfferSelect = (offer: any) => {
    if (onOfferSelect) {
      onOfferSelect(offer);
    }
  };

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Check if an offer is expiring soon (within 7 days)
  const isExpiringSoon = (dateString: string) => {
    const today = new Date();
    const expiryDate = new Date(dateString);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TagIcon className="h-5 w-5 text-primary" />
            Special Offers
          </CardTitle>
          <div className="flex items-center gap-2">
            <Tabs
              value={viewMode}
              onValueChange={(v) => setViewMode(v as "grid" | "list")}
              className="hidden sm:block"
            >
              <TabsList className="h-8">
                <TabsTrigger value="grid" className="px-2 h-7">
                  Grid
                </TabsTrigger>
                <TabsTrigger value="list" className="px-2 h-7">
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FilterIcon className="h-4 w-4 text-muted-foreground" />

                  <span className="font-medium text-sm">Filters</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => {
                    setSelectedCategory("all");
                    setMaxDistance(initialRadius);
                    setSortBy("distance");
                  }}
                >
                  Reset
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="location-filter"
                    className="text-sm flex items-center gap-1.5"
                  >
                    <MapPinIcon className="h-3.5 w-3.5" />
                    Location-based filtering
                  </Label>
                  <Switch
                    id="location-filter"
                    checked={locationFilterEnabled}
                    onCheckedChange={setLocationFilterEnabled}
                    disabled={!userLocation}
                  />
                </div>

                {locationFilterEnabled && userLocation && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Distance: {maxDistance} km</span>
                      <div className="flex gap-1">
                        {[1, 5, 10, 20].map((value) => (
                          <Button
                            key={value}
                            variant={
                              maxDistance === value ? "default" : "outline"
                            }
                            size="sm"
                            className="h-6 px-2 text-xs"
                            onClick={() => setMaxDistance(value)}
                          >
                            {value}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <Slider
                      value={[maxDistance]}
                      min={1}
                      max={20}
                      step={1}
                      onValueChange={(values) => setMaxDistance(values[0])}
                    />
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-sm flex items-center gap-1.5">
                  <BuildingIcon className="h-3.5 w-3.5" />
                  Categories
                </Label>
                <ScrollArea className="h-10 whitespace-nowrap pb-1">
                  <div className="flex gap-1.5">
                    {CATEGORIES.map((category) => (
                      <Button
                        key={category.id}
                        variant={
                          selectedCategory === category.id
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        className="h-7 px-2.5 text-xs"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-sm flex items-center gap-1.5">
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                  Sort by
                </Label>
                <div className="flex gap-2">
                  <Button
                    variant={sortBy === "distance" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setSortBy("distance")}
                    disabled={!userLocation}
                  >
                    <MapPinIcon className="h-3.5 w-3.5 mr-1.5" />
                    Distance
                  </Button>
                  <Button
                    variant={sortBy === "discount" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setSortBy("discount")}
                  >
                    <PercentIcon className="h-3.5 w-3.5 mr-1.5" />
                    Best Discount
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {filteredOffers.length} offers found
            </Badge>
            {userLocation && locationFilterEnabled && (
              <span className="text-xs text-muted-foreground">
                Within {maxDistance} km of your location
              </span>
            )}
          </div>

          <ScrollArea className="h-[400px]">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredOffers.map((offer) => (
                  <Card
                    key={offer.id}
                    className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleOfferSelect(offer)}
                  >
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-medium text-sm">{offer.title}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {offer.description}
                          </p>
                        </div>
                        <Badge className="bg-primary/90 hover:bg-primary text-white">
                          {offer.discount}
                        </Badge>
                      </div>

                      <div className="flex items-center text-xs text-muted-foreground gap-1">
                        <BuildingIcon className="h-3 w-3" />

                        <span className="font-medium">
                          {offer.merchantName}
                        </span>
                        {userLocation && (
                          <Badge
                            variant="outline"
                            className="ml-auto text-[10px] h-4 px-1"
                          >
                            {offer.distance} km
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <span>Code: </span>
                          <Badge variant="secondary" className="font-mono">
                            {offer.code}
                          </Badge>
                        </div>
                        <div
                          className={`${
                            isExpiringSoon(offer.validUntil)
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-muted-foreground"
                          }`}
                        >
                          Expires: {formatDate(offer.validUntil)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
                    onClick={() => handleOfferSelect(offer)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-primary/90 hover:bg-primary text-white">
                          {offer.discount}
                        </Badge>
                        <h3 className="font-medium text-sm truncate">
                          {offer.title}
                        </h3>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <BuildingIcon className="h-3 w-3 mr-1" />

                        <span>{offer.merchantName}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 ml-2">
                      {userLocation && (
                        <Badge variant="outline" className="text-[10px]">
                          {offer.distance} km
                        </Badge>
                      )}
                      <span
                        className={`text-xs ${
                          isExpiringSoon(offer.validUntil)
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-muted-foreground"
                        }`}
                      >
                        Expires: {formatDate(offer.validUntil)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredOffers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <ShoppingBagIcon className="h-12 w-12 mb-3" />

                <p>No offers found</p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            )}
          </ScrollArea>
        </div>
      </CardContent>

      {!userLocation && (
        <CardFooter className="bg-muted/50 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 text-muted-foreground" />

            <span className="text-sm">Enable location for nearby offers</span>
          </div>
          <Button size="sm" variant="outline">
            Enable
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
