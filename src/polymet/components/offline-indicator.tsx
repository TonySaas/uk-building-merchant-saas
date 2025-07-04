"use client";

import React, { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  WifiOffIcon,
  WifiIcon,
  RefreshCwIcon,
  CheckIcon,
  XIcon,
} from "lucide-react";

export interface OfflineIndicatorProps {
  onRetry?: () => Promise<void>;
  onDismiss?: () => void;
  syncStatus?: "synced" | "syncing" | "failed" | "pending";
  lastSynced?: Date | null;
  className?: string;
  showDismiss?: boolean;
  autoDismissDelay?: number;
}

export default function OfflineIndicator({
  onRetry,
  onDismiss,
  syncStatus = "synced",
  lastSynced = null,
  className,
  showDismiss = true,
  autoDismissDelay = 5000,
}: OfflineIndicatorProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isVisible, setIsVisible] = useState(true);
  const [syncProgress, setSyncProgress] = useState(0);
  const [dismissCountdown, setDismissCountdown] = useState(0);
  const [showReconnected, setShowReconnected] = useState(false);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);

      // Auto-hide the reconnected message
      const timer = setTimeout(() => {
        setShowReconnected(false);
      }, autoDismissDelay);

      return () => clearTimeout(timer);
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
  }, [autoDismissDelay]);

  // Handle sync progress animation
  useEffect(() => {
    if (syncStatus === "syncing") {
      const interval = setInterval(() => {
        setSyncProgress((prev) => {
          const next = prev + 10;
          return next > 90 ? 90 : next; // Cap at 90% until actually complete
        });
      }, 300);

      return () => clearInterval(interval);
    } else if (syncStatus === "synced") {
      setSyncProgress(100);
    } else {
      setSyncProgress(0);
    }
  }, [syncStatus]);

  // Auto-dismiss countdown for reconnected message
  useEffect(() => {
    if (showReconnected && autoDismissDelay > 0) {
      setDismissCountdown(autoDismissDelay / 1000);

      const interval = setInterval(() => {
        setDismissCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showReconnected, autoDismissDelay]);

  // Format time since last sync
  const formatTimeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  // Handle retry button click
  const handleRetry = async () => {
    if (onRetry) {
      try {
        setSyncProgress(10); // Start progress animation
        await onRetry();
      } catch (error) {
        console.error("Retry failed:", error);
      }
    }
  };

  // Handle dismiss button click
  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  // Don't render if online and not showing reconnected message
  if (isOnline && !showReconnected) {
    return null;
  }

  // Don't render if explicitly hidden
  if (!isVisible) {
    return null;
  }

  return (
    <div className={className}>
      {!isOnline ? (
        <Alert variant="destructive" className="flex flex-col gap-2">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <WifiOffIcon className="h-4 w-4" />

              <AlertTitle>You're offline</AlertTitle>
            </div>
            {showDismiss && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleDismiss}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
          <AlertDescription>
            <div className="space-y-2">
              <p>
                You're currently viewing cached content. Some features may be
                limited until your connection is restored.
              </p>

              {lastSynced && (
                <div className="text-xs flex items-center gap-1">
                  <span>Last synced: {formatTimeSince(lastSynced)}</span>
                </div>
              )}

              <div className="flex items-center gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-8"
                  onClick={handleRetry}
                >
                  <RefreshCwIcon className="h-3 w-3 mr-1" />
                  Try Again
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      ) : showReconnected ? (
        <Alert variant="success" className="flex flex-col gap-2">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <WifiIcon className="h-4 w-4" />

              <AlertTitle>You're back online</AlertTitle>
            </div>
            {showDismiss && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleDismiss}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
          <AlertDescription>
            <div className="space-y-2">
              <p>Your connection has been restored. Syncing your data...</p>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>
                    {syncStatus === "syncing"
                      ? "Syncing..."
                      : syncStatus === "synced"
                        ? "All data synced"
                        : syncStatus === "failed"
                          ? "Sync failed"
                          : "Waiting to sync"}
                  </span>
                  {dismissCountdown > 0 && (
                    <span>Closing in {dismissCountdown}s</span>
                  )}
                </div>
                <Progress value={syncProgress} className="h-1" />
              </div>
            </div>
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
}
