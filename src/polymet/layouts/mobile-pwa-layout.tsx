"use client";

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PwaHeader from "@/polymet/components/pwa-header";
import PwaBottomNavigation from "@/polymet/components/pwa-bottom-navigation";
import OfflineIndicator from "@/polymet/components/offline-indicator";
import {
  HomeIcon,
  TagIcon,
  MapPinIcon,
  UserIcon,
  SearchIcon,
} from "lucide-react";

interface MobilePwaLayoutProps {
  children: React.ReactNode;
}

export default function MobilePwaLayout({ children }: MobilePwaLayoutProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState<
    "synced" | "syncing" | "failed" | "pending"
  >("synced");
  const [lastSynced, setLastSynced] = useState<Date | null>(new Date());
  const [showReconnected, setShowReconnected] = useState(false);
  const location = useLocation();

  // Navigation items for bottom navigation
  const navigationItems = [
    {
      name: "Home",
      path: "/",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      name: "Offers",
      path: "/offers",
      icon: <TagIcon className="h-5 w-5" />,

      badge: 3,
    },
    {
      name: "Map",
      path: "/map",
      icon: <MapPinIcon className="h-5 w-5" />,
    },
    {
      name: "Search",
      path: "/search",
      icon: <SearchIcon className="h-5 w-5" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <UserIcon className="h-5 w-5" />,
    },
  ];

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      setSyncStatus("syncing");

      // Simulate sync completion after 2 seconds
      setTimeout(() => {
        setSyncStatus("synced");
        setLastSynced(new Date());

        // Auto-hide after 5 seconds
        setTimeout(() => {
          setShowReconnected(false);
        }, 5000);
      }, 2000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Handle retry when offline
  const handleRetry = async () => {
    setSyncStatus("syncing");

    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (navigator.onLine) {
      setSyncStatus("synced");
      setIsOnline(true);
      setShowReconnected(true);
      setLastSynced(new Date());

      // Auto-hide after 5 seconds
      setTimeout(() => {
        setShowReconnected(false);
      }, 5000);
    } else {
      setSyncStatus("failed");
    }
  };

  // Check if current page is the offline page
  const isOfflinePage = location.pathname === "/offline";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <PwaHeader
        userName="Alex Johnson"
        userAvatar="https://github.com/yusufhilmi.png"
        organizationName="BuildersNet"
        organizationLogo="https://github.com/polymet-ai.png"
        organizationColor="bg-blue-500"
        notificationCount={3}
        onNotificationsClick={() => console.log("Notifications clicked")}
        onMenuClick={() => console.log("Menu clicked")}
        onSearchClick={() => console.log("Search clicked")}
      />

      {/* Offline Indicator - only show if not on the offline page */}
      {!isOfflinePage && (
        <div className="pt-16 px-4">
          <OfflineIndicator
            onRetry={handleRetry}
            syncStatus={syncStatus}
            lastSynced={lastSynced}
            showDismiss={true}
            autoDismissDelay={5000}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-20 overflow-x-hidden">{children}</main>

      {/* Bottom Navigation */}
      <PwaBottomNavigation
        items={navigationItems}
        enableHapticFeedback={true}
      />
    </div>
  );
}
