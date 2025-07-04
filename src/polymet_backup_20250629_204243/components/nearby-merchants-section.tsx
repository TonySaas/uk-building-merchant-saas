"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BuildingIcon,
  MapPinIcon,
  ChevronRightIcon,
  StarIcon,
  NavigationIcon,
  PhoneIcon,
  ClockIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface Merchant {
  id: string;
  name: string;
  address: string;
  distance: number;
  rating: number;
  image?: string;
  phone?: string;
  hours?: string;
  isOpen?: boolean;
  organizationId?: string;
  organizationColor?: string;
  offerCount?: number;
}

export interface NearbyMerchantsProps {
  merchants: Merchant[];
  title?: string;
  viewAllLink?: string;
  emptyStateMessage?: string;
  onMerchantClick?: (merchant: Merchant) => void;
  onNavigateClick?: (merchant: Merchant) => void;
  className?: string;
  userLocation?: { lat: number; lng: number } | null;
  isLoading?: boolean;
}

export default function NearbyMerchantsSection({
  merchants,
  title = "Nearby Merchants",
  viewAllLink = "/merchants/nearby",
  emptyStateMessage = "No merchants found nearby",
  onMerchantClick,
  onNavigateClick,
  className,
  userLocation = null,
  isLoading = false,
}: NearbyMerchantsProps) {
  const [expandedMerchant, setExpandedMerchant] = useState<string | null>(null);

  // Handle merchant click
  const handleMerchantClick = (merchant: Merchant) => {
    if (expandedMerchant === merchant.id) {
      setExpandedMerchant(null);
    } else {
      setExpandedMerchant(merchant.id);
    }

    if (onMerchantClick) {
      onMerchantClick(merchant);
    }

    // Trigger haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  // Handle navigation click
  const handleNavigateClick = (e: React.MouseEvent, merchant: Merchant) => {
    e.stopPropagation();

    if (onNavigateClick) {
      onNavigateClick(merchant);
    } else if (userLocation) {
      // Default navigation using Google Maps
      const destination = `${merchant.name}, ${merchant.address}`;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        destination
      )}`;
      window.open(url, "_blank");
    }

    // Trigger haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  // Format phone number
  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  };

  // Render star rating
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`h-3 w-3 ${
              star <= rating
                ? "fill-amber-500 text-amber-500"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
    );
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className={className}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BuildingIcon className="h-5 w-5 text-primary" />

            {title}
          </h2>
          <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
        </div>

        <ScrollArea className="pb-4" orientation="horizontal">
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="w-[280px] flex-shrink-0">
                <CardContent className="p-3 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-muted animate-pulse"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                      <div className="h-3 bg-muted rounded w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="h-3 bg-muted rounded w-full animate-pulse"></div>
                  <div className="h-8 bg-muted rounded w-full animate-pulse"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <BuildingIcon className="h-5 w-5 text-primary" />

          {title}
        </h2>
        {merchants.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1 text-primary"
            asChild
          >
            <Link to={viewAllLink}>
              View all
              <ChevronRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>

      {merchants.length > 0 ? (
        <ScrollArea className="pb-4" orientation="horizontal">
          <div className="flex gap-3">
            {merchants.map((merchant) => (
              <Card
                key={merchant.id}
                className={`w-[280px] flex-shrink-0 cursor-pointer hover:shadow-md transition-all ${
                  expandedMerchant === merchant.id ? "shadow-md" : ""
                }`}
                onClick={() => handleMerchantClick(merchant)}
              >
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      {merchant.image ? (
                        <AvatarImage src={merchant.image} alt={merchant.name} />
                      ) : (
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {merchant.name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">
                        {merchant.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={merchant.isOpen ? "outline" : "secondary"}
                          className={`text-xs ${
                            merchant.isOpen
                              ? "border-green-500 text-green-600 dark:text-green-400"
                              : "text-muted-foreground"
                          }`}
                        >
                          {merchant.isOpen ? "Open" : "Closed"}
                        </Badge>
                        {merchant.offerCount && merchant.offerCount > 0 ? (
                          <Badge className="bg-primary/90 hover:bg-primary text-white">
                            {merchant.offerCount} Offers
                          </Badge>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPinIcon className="h-3 w-3" />

                      <span>{merchant.distance} km</span>
                    </div>
                    {renderRating(merchant.rating)}
                  </div>

                  {expandedMerchant === merchant.id && (
                    <div className="pt-2 space-y-2 text-sm animate-fadeIn">
                      <div className="flex items-start gap-2">
                        <MapPinIcon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />

                        <span className="text-muted-foreground">
                          {merchant.address}
                        </span>
                      </div>

                      {merchant.phone && (
                        <div className="flex items-center gap-2">
                          <PhoneIcon className="h-4 w-4 text-muted-foreground" />

                          <span className="text-muted-foreground">
                            {formatPhone(merchant.phone)}
                          </span>
                        </div>
                      )}

                      {merchant.hours && (
                        <div className="flex items-center gap-2">
                          <ClockIcon className="h-4 w-4 text-muted-foreground" />

                          <span className="text-muted-foreground">
                            {merchant.hours}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1">
                        {merchant.organizationId && (
                          <div className="flex items-center gap-1.5 text-xs">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                merchant.organizationColor || "bg-primary"
                              }`}
                            />

                            <span className="text-muted-foreground">
                              {merchant.organizationId}
                            </span>
                          </div>
                        )}
                      </div>

                      <Button
                        className="w-full mt-1 gap-2"
                        onClick={(e) => handleNavigateClick(e, merchant)}
                        disabled={!userLocation}
                      >
                        <NavigationIcon className="h-4 w-4" />
                        Navigate
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <Card className="w-full bg-muted/30">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <MapPinIcon className="h-10 w-10 text-muted-foreground mb-3" />

            <p className="text-muted-foreground">{emptyStateMessage}</p>
            {!userLocation && <Button className="mt-4">Enable Location</Button>}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
