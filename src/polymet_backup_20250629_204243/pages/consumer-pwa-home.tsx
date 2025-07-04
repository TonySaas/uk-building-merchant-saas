"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LocationPermissionManager from "@/polymet/components/location-permission-manager";
import SavedOffersCarousel from "@/polymet/components/saved-offers-carousel";
import NearbyMerchantsSection from "@/polymet/components/nearby-merchants-section";
import FeaturedContentCard from "@/polymet/components/featured-content-card";
import { MapPinIcon, ArrowRightIcon, BellIcon } from "lucide-react";

export default function ConsumerPwaHome() {
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(
    null
  );
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus | null>(null);
  const [locationAccuracy, setLocationAccuracy] = useState<
    "precise" | "approximate"
  >("precise");
  const [isLoading, setIsLoading] = useState(true);

  // Mock saved offers data
  const [savedOffers, setSavedOffers] = useState([
    {
      id: "o1",
      title: "20% Off All Power Tools",
      discount: "20% OFF",
      merchantName: "City Building Supplies",
      validUntil: "2023-12-31",
      isFeatured: true,
      organizationId: "BuildersNet",
      organizationColor: "bg-blue-500",
    },
    {
      id: "o2",
      title: "Buy 2 Get 1 Free on Paint",
      discount: "3 FOR 2",
      merchantName: "Metro Hardware",
      validUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      organizationId: "ConstructPro",
      organizationColor: "bg-green-500",
    },
    {
      id: "o3",
      title: "£50 Off Orders Over £250",
      discount: "£50 OFF",
      merchantName: "London Timber & Tools",
      validUntil: "2023-12-01",
      organizationId: "TimberCraft",
      organizationColor: "bg-red-500",
    },
  ]);

  // Mock nearby merchants data
  const [nearbyMerchants, setNearbyMerchants] = useState([
    {
      id: "m1",
      name: "City Building Supplies",
      address: "123 Main St, London",
      distance: 1.2,
      rating: 4.5,
      image: "https://picsum.photos/seed/merchant1/200/200",
      phone: "2071234567",
      hours: "8:00 AM - 6:00 PM",
      isOpen: true,
      organizationId: "BuildersNet",
      organizationColor: "bg-blue-500",
      offerCount: 3,
    },
    {
      id: "m2",
      name: "Metro Hardware",
      address: "456 High St, London",
      distance: 2.5,
      rating: 4.2,
      image: "https://picsum.photos/seed/merchant2/200/200",
      phone: "2072345678",
      hours: "7:30 AM - 5:30 PM",
      isOpen: true,
      organizationId: "ConstructPro",
      organizationColor: "bg-green-500",
      offerCount: 1,
    },
    {
      id: "m3",
      name: "London Timber & Tools",
      address: "789 Park Lane, London",
      distance: 3.1,
      rating: 4.7,
      image: "https://picsum.photos/seed/merchant3/200/200",
      phone: "2073456789",
      hours: "8:00 AM - 7:00 PM",
      isOpen: false,
      organizationId: "TimberCraft",
      organizationColor: "bg-red-500",
      offerCount: 0,
    },
  ]);

  // Mock featured content
  const featuredContent = [
    {
      id: "fc1",
      type: "offer",
      title: "Summer Sale: 30% Off All Power Tools",
      description:
        "Limited time offer on our entire range of professional power tools. Perfect for your next project!",
      image: "https://picsum.photos/seed/tools/800/400",
      ctaLabel: "Claim Offer",
      ctaLink: "/offers/summer-sale",
      discount: "30% OFF",
      merchantName: "City Building Supplies",
      organizationId: "BuildersNet",
      organizationColor: "bg-blue-500",
    },
    {
      id: "fc2",
      type: "event",
      title: "DIY Workshop: Home Renovation Basics",
      description:
        "Join our expert team for a hands-on workshop covering essential home renovation techniques and tips.",
      image: "https://picsum.photos/seed/workshop/800/400",
      ctaLabel: "Register Now",
      ctaLink: "/events/diy-workshop",
      date: "2023-12-15",
      location: "London Exhibition Center",
      organizationId: "ConstructPro",
      organizationColor: "bg-green-500",
    },
  ];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle location permission changes
  const handlePermissionChange = (status: PermissionStatus | null) => {
    setPermissionStatus(status);
  };

  // Handle location updates
  const handleLocationUpdate = (position: GeolocationPosition | null) => {
    setUserLocation(position);
  };

  // Handle accuracy changes
  const handleAccuracyChange = (accuracy: "precise" | "approximate") => {
    setLocationAccuracy(accuracy);
  };

  // Handle offer removal
  const handleRemoveOffer = (offerId: string) => {
    setSavedOffers(savedOffers.filter((offer) => offer.id !== offerId));
  };

  // Handle merchant navigation
  const handleNavigateToMerchant = (merchant: any) => {
    if (userLocation) {
      // Default navigation using Google Maps
      const destination = `${merchant.name}, ${merchant.address}`;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        destination
      )}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="flex flex-col gap-6 px-4 pb-6">
      {/* Location Permission Manager */}
      {!userLocation && (
        <LocationPermissionManager
          onPermissionChange={handlePermissionChange}
          onLocationUpdate={handleLocationUpdate}
          onAccuracyChange={handleAccuracyChange}
          className="mb-2"
        />
      )}

      {/* Welcome Section */}
      <section className="mt-2">
        <h1 className="text-2xl font-bold">Welcome, Alex</h1>
        <p className="text-muted-foreground">
          Discover offers and merchants near you
        </p>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-2 gap-3">
        <Link to="/offers" className="block">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Badge className="h-6 w-6 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </div>
              <span className="text-sm font-medium">New Offers</span>
            </CardContent>
          </Card>
        </Link>
        <Link to="/map" className="block">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <MapPinIcon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium">Nearby Merchants</span>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Saved Offers Carousel */}
      <section>
        <SavedOffersCarousel
          offers={savedOffers}
          onOfferClick={(offer) => console.log("Clicked offer:", offer)}
          onRemoveOffer={handleRemoveOffer}
          title="Your Saved Offers"
          viewAllLink="/offers/saved"
        />
      </section>

      {/* Nearby Merchants Section */}
      <section>
        <NearbyMerchantsSection
          merchants={nearbyMerchants}
          userLocation={
            userLocation
              ? {
                  lat: userLocation.coords.latitude,
                  lng: userLocation.coords.longitude,
                }
              : null
          }
          onMerchantClick={(merchant) =>
            console.log("Clicked merchant:", merchant)
          }
          onNavigateClick={handleNavigateToMerchant}
          isLoading={isLoading && !userLocation}
          title="Merchants Near You"
          viewAllLink="/merchants/nearby"
        />
      </section>

      {/* Featured Content */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BellIcon className="h-5 w-5 text-primary" />
            Featured
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1 text-primary"
            asChild
          >
            <Link to="/featured">
              View all
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="space-y-4">
          {featuredContent.map((content) => (
            <FeaturedContentCard
              key={content.id}
              content={content}
              onClick={(content) => console.log("Clicked content:", content)}
            />
          ))}
        </div>
      </section>

      {/* Offline Mode Access */}
      <section className="mt-2">
        <Link to="/offline">
          <Card className="bg-muted/50 hover:bg-muted/70 transition-colors">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium">Offline Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Access saved content when offline
                </p>
              </div>
              <ArrowRightIcon className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      </section>
    </div>
  );
}
