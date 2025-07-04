"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import SavedOffersCarousel from "@/polymet/components/saved-offers-carousel";
import NearbyMerchantsSection from "@/polymet/components/nearby-merchants-section";
import OfflineIndicator from "@/polymet/components/offline-indicator";
import {
  WifiOffIcon,
  RefreshCwIcon,
  ClockIcon,
  TagIcon,
  BuildingIcon,
  HomeIcon,
  LightbulbIcon,
  CheckIcon,
  XIcon,
  DatabaseIcon,
  TrashIcon,
  DownloadIcon,
} from "lucide-react";

export default function OfflineModePage() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState<
    "synced" | "syncing" | "failed" | "pending"
  >("synced");
  const [lastSynced, setLastSynced] = useState<Date | null>(
    new Date(Date.now() - 3600000)
  ); // 1 hour ago
  const [storageUsage, setStorageUsage] = useState({ used: 0, total: 100 });
  const [activeTab, setActiveTab] = useState("offers");
  const [isClearing, setIsClearing] = useState(false);

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

  // Mock cached merchants data
  const [cachedMerchants, setCachedMerchants] = useState([
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
  ]);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Simulate storage usage calculation
  useEffect(() => {
    // In a real app, you would calculate actual storage usage
    const calculateStorageUsage = async () => {
      try {
        if ("storage" in navigator && "estimate" in navigator.storage) {
          const estimate = await navigator.storage.estimate();
          const used = estimate.usage || 0;
          const total = estimate.quota || 100000000;
          setStorageUsage({
            used: Math.round(used / 1000000), // Convert to MB
            total: Math.round(total / 1000000), // Convert to MB
          });
        } else {
          // Fallback for browsers that don't support the Storage API
          setStorageUsage({
            used: Math.floor(Math.random() * 20) + 5,
            total: 100,
          });
        }
      } catch (error) {
        console.error("Error calculating storage usage:", error);
        setStorageUsage({ used: 10, total: 100 });
      }
    };

    calculateStorageUsage();
  }, []);

  // Handle retry when offline
  const handleRetry = async () => {
    if (!isOnline) {
      // Can't sync when offline
      setSyncStatus("failed");
      return;
    }

    setSyncStatus("syncing");

    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSyncStatus("synced");
    setLastSynced(new Date());
  };

  // Handle offer removal
  const handleRemoveOffer = (offerId: string) => {
    setSavedOffers(savedOffers.filter((offer) => offer.id !== offerId));
  };

  // Handle clear cache
  const handleClearCache = async () => {
    setIsClearing(true);

    // Simulate clearing cache
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Reset storage usage
    setStorageUsage({
      used: 0,
      total: storageUsage.total,
    });

    setIsClearing(false);
  };

  // Format time since last sync
  const formatTimeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  // Offline tips
  const offlineTips = [
    "Save offers before going offline to access them later",
    "Downloaded merchant information remains available offline",
    "Your saved offers won't expire when you're offline",
    "Sync your data when you're back online to get the latest offers",
    "Clear unused cached data to free up storage space",
  ];

  return (
    <div className="flex flex-col gap-4 px-4 pb-6">
      {/* Offline Status */}
      <div className="mt-2">
        <OfflineIndicator
          onRetry={handleRetry}
          syncStatus={syncStatus}
          lastSynced={lastSynced}
          showDismiss={false}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <WifiOffIcon className="h-6 w-6 text-primary" />
          Offline Mode
        </h1>
        {isOnline && (
          <Button variant="outline" size="sm" onClick={handleRetry}>
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Sync Now
          </Button>
        )}
      </div>

      {/* Last Synced Info */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-muted-foreground" />

              <span className="text-sm">
                Last synced:{" "}
                {lastSynced ? formatTimeSince(lastSynced) : "Never"}
              </span>
            </div>
            <Badge variant={isOnline ? "outline" : "secondary"}>
              {isOnline ? "Online" : "Offline"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Storage Usage */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md flex items-center gap-2">
            <DatabaseIcon className="h-5 w-5 text-primary" />
            Storage Usage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>
              {storageUsage.used} MB used of {storageUsage.total} MB
            </span>
            <span className="text-muted-foreground">
              {Math.round((storageUsage.used / storageUsage.total) * 100)}%
            </span>
          </div>
          <Progress
            value={(storageUsage.used / storageUsage.total) * 100}
            className="h-2"
          />

          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-destructive hover:text-destructive"
              onClick={handleClearCache}
              disabled={isClearing || storageUsage.used === 0}
            >
              {isClearing ? (
                <>
                  <RefreshCwIcon className="h-3 w-3 mr-1 animate-spin" />
                  Clearing...
                </>
              ) : (
                <>
                  <TrashIcon className="h-3 w-3 mr-1" />
                  Clear Cache
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cached Content Tabs */}
      <Tabs
        defaultValue="offers"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="offers" className="flex items-center gap-2">
            <TagIcon className="h-4 w-4" />
            Saved Offers
            <Badge variant="secondary" className="ml-1">
              {savedOffers.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="merchants" className="flex items-center gap-2">
            <BuildingIcon className="h-4 w-4" />
            Merchants
            <Badge variant="secondary" className="ml-1">
              {cachedMerchants.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="offers" className="mt-4">
          {savedOffers.length > 0 ? (
            <SavedOffersCarousel
              offers={savedOffers}
              onOfferClick={(offer) => console.log("Clicked offer:", offer)}
              onRemoveOffer={handleRemoveOffer}
              title="Your Saved Offers"
              emptyStateMessage="No saved offers available offline"
            />
          ) : (
            <Card className="bg-muted/30">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <TagIcon className="h-10 w-10 text-muted-foreground mb-3" />

                <p className="text-muted-foreground">
                  No saved offers available offline
                </p>
                <Button className="mt-4" asChild>
                  <Link to="/offers">
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Browse & Save Offers
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="merchants" className="mt-4">
          {cachedMerchants.length > 0 ? (
            <NearbyMerchantsSection
              merchants={cachedMerchants}
              userLocation={null}
              onMerchantClick={(merchant) =>
                console.log("Clicked merchant:", merchant)
              }
              title="Cached Merchants"
              emptyStateMessage="No merchants available offline"
            />
          ) : (
            <Card className="bg-muted/30">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <BuildingIcon className="h-10 w-10 text-muted-foreground mb-3" />

                <p className="text-muted-foreground">
                  No merchants available offline
                </p>
                <Button className="mt-4" asChild>
                  <Link to="/map">
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Browse & Cache Merchants
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Offline Tips */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md flex items-center gap-2">
            <LightbulbIcon className="h-5 w-5 text-amber-500" />
            Offline Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[180px] pr-4">
            <div className="space-y-3">
              {offlineTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckIcon className="h-4 w-4 text-green-500 mt-1" />

                  <p className="text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Return to Home */}
      <div className="mt-2">
        <Button variant="outline" className="w-full" asChild>
          <Link to="/">
            <HomeIcon className="h-4 w-4 mr-2" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
