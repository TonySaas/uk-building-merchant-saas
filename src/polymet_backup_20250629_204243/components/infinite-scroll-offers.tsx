"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TagIcon,
  BuildingIcon,
  ClockIcon,
  CopyIcon,
  CheckIcon,
  StarIcon,
  FilterIcon,
  ArrowUpIcon,
} from "lucide-react";

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  validUntil: string;
  merchantName: string;
  merchantId: string;
  distance?: number;
  category: string;
  image?: string;
  organizationId?: string;
  organizationColor?: string;
  isFeatured?: boolean;
  isSaved?: boolean;
}

export interface InfiniteScrollOffersProps {
  fetchOffers: (page: number, limit: number) => Promise<Offer[]>;
  onOfferClick?: (offer: Offer) => void;
  onSaveOffer?: (offer: Offer, isSaved: boolean) => void;
  onCopyCode?: (code: string) => void;
  onFilterClick?: () => void;
  onScrollTop?: () => void;
  itemsPerPage?: number;
  className?: string;
  isOffline?: boolean;
}

export default function InfiniteScrollOffers({
  fetchOffers,
  onOfferClick,
  onSaveOffer,
  onCopyCode,
  onFilterClick,
  onScrollTop,
  itemsPerPage = 10,
  className,
  isOffline = false,
}: InfiniteScrollOffersProps) {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastOfferElementRef = useRef<HTMLDivElement | null>(null);

  // Load initial offers
  useEffect(() => {
    loadOffers(1);
  }, []);

  // Monitor scroll position for showing scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset copied code after 2 seconds
  useEffect(() => {
    if (copiedCode) {
      const timer = setTimeout(() => {
        setCopiedCode(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedCode]);

  // Load offers function
  const loadOffers = async (pageNum: number) => {
    if (loading || isOffline) return;

    setLoading(true);
    try {
      const newOffers = await fetchOffers(pageNum, itemsPerPage);

      if (pageNum === 1) {
        setOffers(newOffers);
      } else {
        setOffers((prev) => [...prev, ...newOffers]);
      }

      setHasMore(newOffers.length === itemsPerPage);
      setPage(pageNum);
    } catch (error) {
      console.error("Error loading offers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Intersection observer callback for infinite scrolling
  const lastOfferRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadOffers(page + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
        lastOfferElementRef.current = node;
      }
    },
    [loading, hasMore, page]
  );

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

  // Handle save offer
  const handleSaveOffer = (e: React.MouseEvent, offer: Offer) => {
    e.stopPropagation();

    if (onSaveOffer) {
      onSaveOffer(offer, !offer.isSaved);

      // Update local state
      setOffers((prev) =>
        prev.map((o) => (o.id === offer.id ? { ...o, isSaved: !o.isSaved } : o))
      );
    }

    // Trigger haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  // Handle copy code
  const handleCopyCode = (e: React.MouseEvent, code: string) => {
    e.stopPropagation();

    navigator.clipboard.writeText(code);
    setCopiedCode(code);

    if (onCopyCode) {
      onCopyCode(code);
    }

    // Trigger haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  // Handle scroll to top
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (onScrollTop) {
      onScrollTop();
    }
  };

  return (
    <div className={className}>
      {/* Filter Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <TagIcon className="h-5 w-5 text-primary" />
          Browse Offers
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={onFilterClick}
        >
          <FilterIcon className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Offers List */}
      <div className="space-y-4">
        {offers.map((offer, index) => (
          <div
            key={offer.id}
            ref={index === offers.length - 1 ? lastOfferRef : undefined}
          >
            <Card
              className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
              onClick={() => handleOfferClick(offer)}
            >
              <CardContent className="p-0">
                {/* Image Section (if available) */}
                {offer.image && (
                  <div className="relative h-40 bg-muted">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Discount Badge */}
                    <Badge className="absolute top-3 right-3 bg-primary/90 hover:bg-primary text-white px-2 py-1">
                      {offer.discount}
                    </Badge>

                    {/* Featured Badge */}
                    {offer.isFeatured && (
                      <Badge className="absolute top-3 left-3 bg-amber-500/90 hover:bg-amber-500 text-white">
                        <StarIcon className="h-3 w-3 mr-1 fill-white" />
                        Featured
                      </Badge>
                    )}

                    {/* Organization Indicator */}
                    {offer.organizationId && (
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            offer.organizationColor || "bg-primary"
                          }`}
                        />

                        <Badge
                          variant="secondary"
                          className="bg-white/80 backdrop-blur-sm"
                        >
                          {offer.organizationId}
                        </Badge>
                      </div>
                    )}
                  </div>
                )}

                {/* Content Section */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg leading-tight">
                        {offer.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {offer.description}
                      </p>
                    </div>

                    {!offer.image && (
                      <Badge className="bg-primary/90 hover:bg-primary text-white whitespace-nowrap">
                        {offer.discount}
                      </Badge>
                    )}
                  </div>

                  {/* Merchant Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <BuildingIcon className="h-4 w-4" />

                      <span>{offer.merchantName}</span>
                    </div>

                    {offer.distance !== undefined && (
                      <Badge variant="outline" className="text-xs">
                        {offer.distance} km
                      </Badge>
                    )}
                  </div>

                  {/* Expiry Date */}
                  <div
                    className={`flex items-center gap-1.5 text-sm ${
                      isExpiringSoon(offer.validUntil)
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-muted-foreground"
                    }`}
                  >
                    <ClockIcon className="h-4 w-4" />

                    <span>Expires: {formatDate(offer.validUntil)}</span>
                  </div>

                  {/* Promo Code */}
                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      variant="outline"
                      className="flex-1 font-mono"
                      onClick={(e) => handleCopyCode(e, offer.code)}
                    >
                      {copiedCode === offer.code ? (
                        <CheckIcon className="h-4 w-4 mr-2 text-green-500" />
                      ) : (
                        <CopyIcon className="h-4 w-4 mr-2" />
                      )}
                      {offer.code}
                    </Button>
                    <Button
                      variant={offer.isSaved ? "default" : "outline"}
                      className="flex-1"
                      onClick={(e) => handleSaveOffer(e, offer)}
                    >
                      {offer.isSaved ? "Saved" : "Save Offer"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-40 bg-muted animate-pulse" />

                  <div className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4" />

                    <Skeleton className="h-4 w-full" />

                    <Skeleton className="h-4 w-1/2" />

                    <div className="flex gap-2 pt-1">
                      <Skeleton className="h-10 w-full" />

                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No More Offers */}
        {!loading && offers.length > 0 && !hasMore && (
          <div className="text-center py-6 text-muted-foreground">
            <p>You've reached the end of the offers</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && offers.length === 0 && (
          <Card className="overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <TagIcon className="h-12 w-12 text-muted-foreground mb-3" />

              <h3 className="text-lg font-medium">No offers found</h3>
              <p className="text-muted-foreground mt-2">
                {isOffline
                  ? "You're offline. Check your connection and try again."
                  : "Try adjusting your filters or check back later for new offers."}
              </p>
              {!isOffline && (
                <Button className="mt-4" onClick={() => loadOffers(1)}>
                  Refresh Offers
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          variant="secondary"
          size="icon"
          className="fixed bottom-20 right-4 h-10 w-10 rounded-full shadow-lg z-10"
          onClick={handleScrollTop}
        >
          <ArrowUpIcon className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
