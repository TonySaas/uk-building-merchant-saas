"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TagIcon,
  StarIcon,
  ClockIcon,
  BuildingIcon,
  ChevronRightIcon,
  BookmarkIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

export interface Offer {
  id: string;
  title: string;
  discount: string;
  merchantName: string;
  validUntil: string;
  isFeatured?: boolean;
  organizationId?: string;
  organizationColor?: string;
}

export interface SavedOffersCarouselProps {
  offers: Offer[];
  title?: string;
  viewAllLink?: string;
  emptyStateMessage?: string;
  onOfferClick?: (offer: Offer) => void;
  onRemoveOffer?: (offerId: string) => void;
  className?: string;
}

export default function SavedOffersCarousel({
  offers,
  title = "Saved Offers",
  viewAllLink = "/offers/saved",
  emptyStateMessage = "No saved offers yet",
  onOfferClick,
  onRemoveOffer,
  className,
}: SavedOffersCarouselProps) {
  const [removingId, setRemovingId] = useState<string | null>(null);

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
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

  // Handle offer removal with animation
  const handleRemove = (offerId: string) => {
    setRemovingId(offerId);

    // Trigger haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Delay actual removal to allow animation to complete
    setTimeout(() => {
      if (onRemoveOffer) {
        onRemoveOffer(offerId);
      }
      setRemovingId(null);
    }, 300);
  };

  // Handle offer click
  const handleOfferClick = (offer: Offer) => {
    if (onOfferClick) {
      onOfferClick(offer);
    }

    // Trigger haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <BookmarkIcon className="h-5 w-5 text-primary" />

          {title}
        </h2>
        {offers.length > 0 && (
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

      {offers.length > 0 ? (
        <ScrollArea className="pb-4" orientation="horizontal">
          <div className="flex gap-3">
            {offers.map((offer) => (
              <Card
                key={offer.id}
                className={`w-[260px] flex-shrink-0 cursor-pointer hover:shadow-md transition-all ${
                  removingId === offer.id
                    ? "opacity-0 scale-95 translate-y-4"
                    : "opacity-100 scale-100"
                }`}
                onClick={() => handleOfferClick(offer)}
              >
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">
                        {offer.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                        <BuildingIcon className="h-3 w-3" />

                        <span className="truncate">{offer.merchantName}</span>
                      </div>
                    </div>
                    <Badge className="bg-primary/90 hover:bg-primary text-white whitespace-nowrap">
                      {offer.discount}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div
                      className={`flex items-center gap-1 ${
                        isExpiringSoon(offer.validUntil)
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-muted-foreground"
                      }`}
                    >
                      <ClockIcon className="h-3 w-3" />

                      <span>Exp: {formatDate(offer.validUntil)}</span>
                    </div>

                    {offer.isFeatured && (
                      <Badge
                        variant="outline"
                        className="border-amber-500 text-amber-600 dark:text-amber-400 gap-1"
                      >
                        <StarIcon className="h-3 w-3 fill-amber-500" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {offer.organizationId && (
                      <div className="flex items-center gap-1.5 text-xs">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            offer.organizationColor || "bg-primary"
                          }`}
                        />

                        <span className="text-muted-foreground">
                          {offer.organizationId}
                        </span>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs hover:text-red-500 ml-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(offer.id);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <Card className="w-full bg-muted/30">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <TagIcon className="h-10 w-10 text-muted-foreground mb-3" />

            <p className="text-muted-foreground">{emptyStateMessage}</p>
            <Button className="mt-4" asChild>
              <Link to="/offers">Browse Offers</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
