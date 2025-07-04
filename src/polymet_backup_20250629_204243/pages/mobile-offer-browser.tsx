"use client";

import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import InfiniteScrollOffers from "@/polymet/components/infinite-scroll-offers";
import LocationBasedOfferFilter from "@/polymet/components/location-based-offer-filter";
import {
  FilterIcon,
  SlidersIcon,
  MapPinIcon,
  TagIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  XIcon,
  CheckIcon,
  RefreshCwIcon,
} from "lucide-react";

export default function MobileOfferBrowser() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [savedOffers, setSavedOffers] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLocationFilterOpen, setIsLocationFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterSettings, setFilterSettings] = useState({
    distance: 10,
    onlyOpen: false,
    categories: [] as string[],
    organizations: [] as string[],
    minDiscount: 0,
  });

  // Check for location permission on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.permissions
        .query({ name: "geolocation" as PermissionName })
        .then((status) => {
          if (status.state === "granted") {
            navigator.geolocation.getCurrentPosition((position) => {
              setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            });
          }
        });
    }
  }, []);

  // Parse search params on mount
  useEffect(() => {
    const sort = searchParams.get("sort") || "newest";
    setSortOrder(sort);

    const distance = searchParams.get("distance");
    const onlyOpen = searchParams.get("onlyOpen");
    const categories = searchParams.getAll("category");
    const organizations = searchParams.getAll("org");
    const minDiscount = searchParams.get("minDiscount");

    setFilterSettings({
      distance: distance ? parseInt(distance) : 10,
      onlyOpen: onlyOpen === "true",
      categories: categories || [],
      organizations: organizations || [],
      minDiscount: minDiscount ? parseInt(minDiscount) : 0,
    });
  }, [searchParams]);

  // Mock categories
  const categories = [
    { id: "tools", name: "Tools" },
    { id: "materials", name: "Materials" },
    { id: "safety", name: "Safety Gear" },
    { id: "paint", name: "Paint & Supplies" },
    { id: "electrical", name: "Electrical" },
    { id: "plumbing", name: "Plumbing" },
  ];

  // Mock organizations
  const organizations = [
    { id: "BuildersNet", name: "BuildersNet", color: "bg-blue-500" },
    { id: "ConstructPro", name: "ConstructPro", color: "bg-green-500" },
    { id: "TimberCraft", name: "TimberCraft", color: "bg-red-500" },
  ];

  // Mock fetch function for infinite scroll
  const fetchOffers = async (page: number, limit: number) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate mock offers
    return Array.from({ length: limit }, (_, i) => {
      const id = `offer-${page}-${i + 1}`;
      const isFeatured = Math.random() > 0.8;
      const orgIndex = Math.floor(Math.random() * organizations.length);
      const organization = organizations[orgIndex];
      const categoryIndex = Math.floor(Math.random() * categories.length);
      const category = categories[categoryIndex];
      const discount = Math.floor(Math.random() * 40) + 10;
      const distance = parseFloat((Math.random() * 10).toFixed(1));

      // Apply filters
      if (
        (filterSettings.categories.length > 0 &&
          !filterSettings.categories.includes(category.id)) ||
        (filterSettings.organizations.length > 0 &&
          !filterSettings.organizations.includes(organization.id)) ||
        distance > filterSettings.distance ||
        discount < filterSettings.minDiscount
      ) {
        // Return null for filtered out offers
        return null;
      }

      return {
        id,
        title: `${discount}% Off ${category.name}`,
        description: `Limited time offer on our entire range of professional ${category.name.toLowerCase()}. Perfect for your next project!`,
        discount: `${discount}% OFF`,
        code: `SAVE${Math.floor(Math.random() * 1000)}`,
        validUntil: new Date(
          Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
        ).toISOString(),
        merchantName: [
          "City Building Supplies",
          "Metro Hardware",
          "London Timber & Tools",
          "Construction Corner",
        ][Math.floor(Math.random() * 4)],
        merchantId: `m${Math.floor(Math.random() * 10) + 1}`,
        distance,
        category: category.id,
        image:
          Math.random() > 0.3
            ? `https://picsum.photos/seed/offer${page}${i}/800/400`
            : undefined,
        organizationId: organization.id,
        organizationColor: organization.color,
        isFeatured,
        isSaved: savedOffers.includes(id),
      };
    }).filter(Boolean); // Remove null items (filtered out)
  };

  // Handle save offer
  const handleSaveOffer = (offer: any, isSaved: boolean) => {
    if (isSaved) {
      setSavedOffers((prev) => [...prev, offer.id]);
    } else {
      setSavedOffers((prev) => prev.filter((id) => id !== offer.id));
    }
  };

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams();
    params.set("sort", sortOrder);
    params.set("distance", filterSettings.distance.toString());

    if (filterSettings.onlyOpen) {
      params.set("onlyOpen", "true");
    }

    filterSettings.categories.forEach((category) => {
      params.append("category", category);
    });

    filterSettings.organizations.forEach((org) => {
      params.append("org", org);
    });

    if (filterSettings.minDiscount > 0) {
      params.set("minDiscount", filterSettings.minDiscount.toString());
    }

    setSearchParams(params);
    setIsFilterOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterSettings({
      distance: 10,
      onlyOpen: false,
      categories: [],
      organizations: [],
      minDiscount: 0,
    });
  };

  // Toggle category selection
  const toggleCategory = (categoryId: string) => {
    setFilterSettings((prev) => {
      if (prev.categories.includes(categoryId)) {
        return {
          ...prev,
          categories: prev.categories.filter((id) => id !== categoryId),
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, categoryId],
        };
      }
    });
  };

  // Toggle organization selection
  const toggleOrganization = (orgId: string) => {
    setFilterSettings((prev) => {
      if (prev.organizations.includes(orgId)) {
        return {
          ...prev,
          organizations: prev.organizations.filter((id) => id !== orgId),
        };
      } else {
        return {
          ...prev,
          organizations: [...prev.organizations, orgId],
        };
      }
    });
  };

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (filterSettings.onlyOpen) count++;
    if (filterSettings.categories.length) count++;
    if (filterSettings.organizations.length) count++;
    if (filterSettings.minDiscount > 0) count++;
    if (filterSettings.distance < 10) count++;
    return count;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with filters */}
      <div className="sticky top-16 z-10 bg-background border-b px-4 py-3 flex items-center justify-between gap-2">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <TagIcon className="h-5 w-5 text-primary" />
          Offers
        </h1>

        <div className="flex items-center gap-2">
          {/* Sort Order Selector */}
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">
                <div className="flex items-center gap-2">
                  <ArrowDownIcon className="h-4 w-4" />
                  Newest
                </div>
              </SelectItem>
              <SelectItem value="oldest">
                <div className="flex items-center gap-2">
                  <ArrowUpIcon className="h-4 w-4" />
                  Oldest
                </div>
              </SelectItem>
              <SelectItem value="discount">
                <div className="flex items-center gap-2">
                  <ArrowDownIcon className="h-4 w-4" />
                  Highest Discount
                </div>
              </SelectItem>
              <SelectItem value="distance">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4" />
                  Nearest
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Filter Button */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <FilterIcon className="h-5 w-5" />

                {getActiveFilterCount() > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {getActiveFilterCount()}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Filter Offers</SheetTitle>
              </SheetHeader>

              <div className="py-4 space-y-6">
                {/* Distance Filter */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Distance</Label>
                    <span className="text-sm">
                      {filterSettings.distance} km
                    </span>
                  </div>
                  <Slider
                    value={[filterSettings.distance]}
                    min={1}
                    max={20}
                    step={1}
                    onValueChange={(value) =>
                      setFilterSettings({
                        ...filterSettings,
                        distance: value[0],
                      })
                    }
                  />
                </div>

                <Separator />

                {/* Only Open Merchants */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="only-open">Only Open Merchants</Label>
                  <Switch
                    id="only-open"
                    checked={filterSettings.onlyOpen}
                    onCheckedChange={(checked) =>
                      setFilterSettings({
                        ...filterSettings,
                        onlyOpen: checked,
                      })
                    }
                  />
                </div>

                <Separator />

                {/* Categories */}
                <div className="space-y-2">
                  <Label>Categories</Label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category.id}
                        variant={
                          filterSettings.categories.includes(category.id)
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => toggleCategory(category.id)}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Organizations */}
                <div className="space-y-2">
                  <Label>Organizations</Label>
                  <div className="flex flex-wrap gap-2">
                    {organizations.map((org) => (
                      <Badge
                        key={org.id}
                        variant={
                          filterSettings.organizations.includes(org.id)
                            ? "default"
                            : "outline"
                        }
                        className={`cursor-pointer ${
                          filterSettings.organizations.includes(org.id)
                            ? org.color + " text-white"
                            : ""
                        }`}
                        onClick={() => toggleOrganization(org.id)}
                      >
                        {org.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Minimum Discount */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Minimum Discount</Label>
                    <span className="text-sm">
                      {filterSettings.minDiscount}%
                    </span>
                  </div>
                  <Slider
                    value={[filterSettings.minDiscount]}
                    min={0}
                    max={50}
                    step={5}
                    onValueChange={(value) =>
                      setFilterSettings({
                        ...filterSettings,
                        minDiscount: value[0],
                      })
                    }
                  />
                </div>
              </div>

              <SheetFooter className="flex flex-row gap-2 sm:justify-between">
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="flex-1"
                >
                  <XIcon className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button onClick={applyFilters} className="flex-1">
                  <CheckIcon className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Location Filter Button */}
          <Sheet
            open={isLocationFilterOpen}
            onOpenChange={setIsLocationFilterOpen}
          >
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MapPinIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Location Filter</SheetTitle>
              </SheetHeader>

              <div className="py-4">
                <LocationBasedOfferFilter
                  userLocation={userLocation}
                  onOfferSelect={(offer) =>
                    console.log("Selected offer:", offer)
                  }
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Active Filters */}
      {getActiveFilterCount() > 0 && (
        <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto">
          {filterSettings.distance < 10 && (
            <Badge variant="secondary" className="whitespace-nowrap">
              <MapPinIcon className="h-3 w-3 mr-1" />
              {filterSettings.distance} km
            </Badge>
          )}

          {filterSettings.onlyOpen && (
            <Badge variant="secondary" className="whitespace-nowrap">
              Open Now
            </Badge>
          )}

          {filterSettings.categories.map((catId) => {
            const category = categories.find((c) => c.id === catId);
            return category ? (
              <Badge
                key={catId}
                variant="secondary"
                className="whitespace-nowrap"
              >
                {category.name}
              </Badge>
            ) : null;
          })}

          {filterSettings.organizations.map((orgId) => {
            const org = organizations.find((o) => o.id === orgId);
            return org ? (
              <Badge
                key={orgId}
                variant="secondary"
                className={`whitespace-nowrap ${org.color} text-white`}
              >
                {org.name}
              </Badge>
            ) : null;
          })}

          {filterSettings.minDiscount > 0 && (
            <Badge variant="secondary" className="whitespace-nowrap">
              Min {filterSettings.minDiscount}% Off
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={resetFilters}
          >
            <XIcon className="h-3 w-3 mr-1" />
            Clear All
          </Button>
        </div>
      )}

      {/* Offers List */}
      <div className="flex-1">
        <InfiniteScrollOffers
          fetchOffers={fetchOffers}
          onOfferClick={(offer) => console.log("Clicked offer:", offer)}
          onSaveOffer={handleSaveOffer}
          onCopyCode={(code) => {
            navigator.clipboard.writeText(code);
            console.log("Copied code:", code);
          }}
          onFilterClick={() => setIsFilterOpen(true)}
          onScrollTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          itemsPerPage={5}
        />
      </div>

      {/* Offline Mode Link */}
      <div className="px-4 py-3 bg-muted/30 border-t">
        <Link to="/offline" className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCwIcon className="h-5 w-5 text-muted-foreground" />

            <span className="text-sm font-medium">
              View Saved Offers Offline
            </span>
          </div>
          <Badge variant="outline" className="text-xs">
            {savedOffers.length} Saved
          </Badge>
        </Link>
      </div>
    </div>
  );
}
