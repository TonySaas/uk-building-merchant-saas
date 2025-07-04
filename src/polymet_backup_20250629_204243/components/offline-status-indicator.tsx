import { useState, useEffect } from "react";
import { useCachedData } from "@/polymet/components/cached-data-manager";
import { useOfferCache } from "@/polymet/components/offline-offer-cache";
import { Button } from "@/components/ui/button";
import {
  WifiIcon,
  WifiOffIcon,
  RefreshCwIcon,
  ClockIcon,
  DatabaseIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-react";
import { ToastNotification } from "@/polymet/components/toast-notification";
import { ORGANIZATIONS } from "@/polymet/data/organization-data";
import { motion, AnimatePresence } from "framer-motion";

interface OfflineStatusIndicatorProps {
  organizationId?: string;
  variant?: "badge" | "compact" | "detailed";
  showDataFreshness?: boolean;
  showSyncButton?: boolean;
  className?: string;
  onStatusChange?: (isOnline: boolean) => void;
}

export default function OfflineStatusIndicator({
  organizationId,
  variant = "badge",
  showDataFreshness = true,
  showSyncButton = true,
  className = "",
  onStatusChange,
}: OfflineStatusIndicatorProps) {
  const { isOnline, isSyncing, lastSyncTime, syncWithServer } = useCachedData();
  const { lastSynced: offerLastSynced, syncOffers } = useOfferCache();
  const [showToast, setShowToast] = useState(false);
  const [previousOnlineState, setPreviousOnlineState] = useState(isOnline);

  // Get organization-specific theme color
  const getThemeColor = (orgId?: string): string => {
    if (!orgId) return "hsl(var(--primary))";

    const themeColors: Record<string, string> = {
      toolbank: "#E11D48", // Red
      nmbs: "#1E40AF", // Blue
      ibc: "#047857", // Green
      bmf: "#4F46E5", // Indigo
    };

    return themeColors[orgId] || "hsl(var(--primary))";
  };

  // Get organization name
  const getOrganizationName = (orgId?: string): string => {
    if (!orgId) return "BuildConnect";
    return (
      ORGANIZATIONS.find((org) => org.id === orgId)?.name || "BuildConnect"
    );
  };

  // Format time ago
  const formatTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  };

  // Get data freshness status
  const getDataFreshness = (): "fresh" | "stale" | "outdated" => {
    const lastSync = offerLastSynced || lastSyncTime;
    if (!lastSync) return "outdated";

    const now = Date.now();
    const hoursSinceSync = (now - lastSync) / (1000 * 60 * 60);

    if (hoursSinceSync < 1) return "fresh"; // Less than 1 hour
    if (hoursSinceSync < 24) return "stale"; // Less than 24 hours
    return "outdated"; // More than 24 hours
  };

  // Handle sync button click
  const handleSync = async () => {
    await syncWithServer();
    await syncOffers();
  };

  // Monitor online status changes
  useEffect(() => {
    if (isOnline !== previousOnlineState) {
      setPreviousOnlineState(isOnline);

      // Show toast notification when status changes
      setShowToast(true);

      // Call the onStatusChange callback if provided
      if (onStatusChange) {
        onStatusChange(isOnline);
      }
    }
  }, [isOnline, previousOnlineState, onStatusChange]);

  // Get freshness label and color
  const freshness = getDataFreshness();
  const freshnessLabels = {
    fresh: "Data is up to date",
    stale: "Data may be outdated",
    outdated: "Data is outdated",
  };

  const freshnessColors = {
    fresh: "text-green-500 dark:text-green-400",
    stale: "text-amber-500 dark:text-amber-400",
    outdated: "text-red-500 dark:text-red-400",
  };

  // Get the last sync time (from either general sync or offer sync)
  const lastSync = offerLastSynced || lastSyncTime;

  // Render badge variant
  if (variant === "badge") {
    return (
      <>
        <div
          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${className}`}
          style={{
            backgroundColor: isOnline
              ? `${getThemeColor(organizationId)}20` // 20% opacity
              : "hsl(var(--muted))",
            color: isOnline
              ? getThemeColor(organizationId)
              : "hsl(var(--muted-foreground))",
          }}
        >
          <motion.div
            animate={{ scale: isOnline ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.5 }}
          >
            {isOnline ? (
              <WifiIcon className="h-3 w-3" />
            ) : (
              <WifiOffIcon className="h-3 w-3" />
            )}
          </motion.div>
          <span>{isOnline ? "Online" : "Offline"}</span>
        </div>

        {showToast && (
          <ToastNotification
            variant={isOnline ? "success" : "warning"}
            title={isOnline ? "You're back online" : "You're offline"}
            description={
              isOnline
                ? "Connected to the network. Syncing data..."
                : "Using cached data. Some features may be limited."
            }
            onClose={() => setShowToast(false)}
            icon={
              isOnline ? (
                <WifiIcon className="h-4 w-4" />
              ) : (
                <WifiOffIcon className="h-4 w-4" />
              )
            }
            duration={3000}
          />
        )}
      </>
    );
  }

  // Render compact variant
  if (variant === "compact") {
    return (
      <>
        <div className={`flex items-center gap-2 ${className}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isOnline ? "online" : "offline"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${
                isOnline
                  ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                  : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
              }`}
            >
              {isOnline ? (
                <WifiIcon className="h-4 w-4" />
              ) : (
                <WifiOffIcon className="h-4 w-4" />
              )}
              <span className="font-medium text-sm">
                {isOnline ? "Online" : "Offline"}
              </span>
            </motion.div>
          </AnimatePresence>

          {showDataFreshness && lastSync && (
            <div className={`text-xs ${freshnessColors[freshness]}`}>
              <ClockIcon className="inline h-3 w-3 mr-1" />

              {formatTimeAgo(lastSync)}
            </div>
          )}

          {showSyncButton && isOnline && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={handleSync}
              disabled={isSyncing}
            >
              <RefreshCwIcon
                className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`}
              />
            </Button>
          )}
        </div>

        {showToast && (
          <ToastNotification
            variant={isOnline ? "success" : "warning"}
            title={isOnline ? "You're back online" : "You're offline"}
            description={
              isOnline
                ? "Connected to the network. Syncing data..."
                : "Using cached data. Some features may be limited."
            }
            onClose={() => setShowToast(false)}
            icon={
              isOnline ? (
                <WifiIcon className="h-4 w-4" />
              ) : (
                <WifiOffIcon className="h-4 w-4" />
              )
            }
            duration={3000}
          />
        )}
      </>
    );
  }

  // Render detailed variant
  return (
    <>
      <div
        className={`border rounded-lg overflow-hidden ${className}`}
        style={{
          borderColor: isOnline
            ? `${getThemeColor(organizationId)}40` // 40% opacity
            : "hsl(var(--border))",
        }}
      >
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{
            backgroundColor: isOnline
              ? `${getThemeColor(organizationId)}10` // 10% opacity
              : "hsl(var(--muted))",
          }}
        >
          <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={isOnline ? "online" : "offline"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
                className={`p-1.5 rounded-full ${
                  isOnline
                    ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
                }`}
              >
                {isOnline ? (
                  <WifiIcon className="h-5 w-5" />
                ) : (
                  <WifiOffIcon className="h-5 w-5" />
                )}
              </motion.div>
            </AnimatePresence>
            <div>
              <h3 className="font-medium">
                {isOnline ? "Online Mode" : "Offline Mode"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isOnline
                  ? `Connected to ${getOrganizationName(organizationId)}`
                  : "Using cached data"}
              </p>
            </div>
          </div>

          {showSyncButton && isOnline && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSync}
              disabled={isSyncing}
              className="flex items-center gap-1"
            >
              <RefreshCwIcon
                className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`}
              />

              {isSyncing ? "Syncing..." : "Sync Now"}
            </Button>
          )}
        </div>

        {showDataFreshness && (
          <div className="px-4 py-3 bg-background">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {freshness === "fresh" ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                ) : freshness === "stale" ? (
                  <ClockIcon className="h-5 w-5 text-amber-500" />
                ) : (
                  <AlertCircleIcon className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div>
                <p
                  className={`text-sm font-medium ${freshnessColors[freshness]}`}
                >
                  {freshnessLabels[freshness]}
                </p>
                <p className="text-xs text-muted-foreground">
                  {lastSync
                    ? `Last updated ${formatTimeAgo(lastSync)}`
                    : "Data has never been synced"}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <DatabaseIcon className="h-3.5 w-3.5" />

              <span>Using cached data when offline</span>
            </div>
          </div>
        )}
      </div>

      {showToast && (
        <ToastNotification
          variant={isOnline ? "success" : "warning"}
          title={isOnline ? "You're back online" : "You're offline"}
          description={
            isOnline
              ? "Connected to the network. Syncing data..."
              : "Using cached data. Some features may be limited."
          }
          onClose={() => setShowToast(false)}
          icon={
            isOnline ? (
              <WifiIcon className="h-4 w-4" />
            ) : (
              <WifiOffIcon className="h-4 w-4" />
            )
          }
          duration={3000}
        />
      )}
    </>
  );
}
