import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { ToastNotification } from "@/polymet/components/toast-notification";
import { AlertBanner } from "@/polymet/components/alert-banner";
import { Button } from "@/components/ui/button";
import {
  DatabaseIcon,
  TrashIcon,
  RefreshCwIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  WifiOffIcon,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Define types for cached data
export interface CachedItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
  organizationId?: string;
}

export interface CacheStats {
  totalItems: number;
  totalSize: number; // in bytes
  oldestItem: number; // timestamp
  newestItem: number; // timestamp
  cacheHealth: "good" | "warning" | "critical";
}

interface CachedDataContextType {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncTime: number | null;
  cacheStats: CacheStats | null;
  getCachedData: <T>(key: string) => T | null;
  setCachedData: <T>(key: string, data: T, options?: CacheOptions) => void;
  removeCachedData: (key: string) => void;
  clearAllCachedData: () => Promise<void>;
  syncWithServer: () => Promise<boolean>;
  getCacheStatus: () => CacheStatus;
}

interface CacheOptions {
  expiresIn?: number; // milliseconds
  organizationId?: string;
}

export type CacheStatus = "fresh" | "stale" | "expired" | "empty";

// Create context
const CachedDataContext = createContext<CachedDataContextType | null>(null);

// Default cache settings
const DEFAULT_CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
const MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB
const CACHE_WARNING_THRESHOLD = 0.8; // 80% of max size
const CACHE_CRITICAL_THRESHOLD = 0.95; // 95% of max size

interface CachedDataProviderProps {
  children: ReactNode;
  storagePrefix?: string;
  maxCacheSize?: number;
  defaultExpiry?: number;
}

export function CachedDataProvider({
  children,
  storagePrefix = "buildconnect-cache",
  maxCacheSize = MAX_CACHE_SIZE,
  defaultExpiry = DEFAULT_CACHE_EXPIRY,
}: CachedDataProviderProps) {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<number | null>(null);
  const [cacheStats, setCacheStats] = useState<CacheStats | null>(null);
  const [showSyncAlert, setShowSyncAlert] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Initialize and monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // When coming back online, show sync alert
      setShowSyncAlert(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial cache stats calculation
    calculateCacheStats();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Calculate cache statistics
  const calculateCacheStats = (): void => {
    try {
      let totalSize = 0;
      let oldestTimestamp = Date.now();
      let newestTimestamp = 0;
      let itemCount = 0;

      // Iterate through localStorage to find cache items
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(storagePrefix)) {
          const item = localStorage.getItem(key);
          if (item) {
            totalSize += item.length * 2; // Approximate size in bytes (UTF-16)
            itemCount++;

            try {
              const cachedItem = JSON.parse(item);
              if (cachedItem.timestamp) {
                oldestTimestamp = Math.min(
                  oldestTimestamp,
                  cachedItem.timestamp
                );
                newestTimestamp = Math.max(
                  newestTimestamp,
                  cachedItem.timestamp
                );
              }
            } catch (e) {
              console.error("Error parsing cached item:", e);
            }
          }
        }
      }

      // Determine cache health
      let cacheHealth: "good" | "warning" | "critical" = "good";
      const cachePercentage = totalSize / maxCacheSize;

      if (cachePercentage > CACHE_CRITICAL_THRESHOLD) {
        cacheHealth = "critical";
      } else if (cachePercentage > CACHE_WARNING_THRESHOLD) {
        cacheHealth = "warning";
      }

      const stats: CacheStats = {
        totalItems: itemCount,
        totalSize,
        oldestItem: oldestTimestamp,
        newestItem: newestTimestamp || Date.now(),
        cacheHealth,
      };

      setCacheStats(stats);
    } catch (error) {
      console.error("Error calculating cache stats:", error);
    }
  };

  // Get cached data
  const getCachedData = <T,>(key: string): T | null => {
    try {
      const cacheKey = `${storagePrefix}-${key}`;
      const cachedItemJson = localStorage.getItem(cacheKey);

      if (!cachedItemJson) return null;

      const cachedItem: CachedItem<T> = JSON.parse(cachedItemJson);

      // Check if item has expired
      if (cachedItem.expiresAt < Date.now()) {
        // Item expired, remove it
        localStorage.removeItem(cacheKey);
        return null;
      }

      return cachedItem.data;
    } catch (error) {
      console.error(`Error retrieving cached data for key ${key}:`, error);
      return null;
    }
  };

  // Set cached data
  const setCachedData = <T,>(
    key: string,
    data: T,
    options: CacheOptions = {}
  ): void => {
    try {
      const cacheKey = `${storagePrefix}-${key}`;
      const now = Date.now();

      const cachedItem: CachedItem<T> = {
        data,
        timestamp: now,
        expiresAt: now + (options.expiresIn || defaultExpiry),
        organizationId: options.organizationId,
      };

      localStorage.setItem(cacheKey, JSON.stringify(cachedItem));

      // Update cache stats after adding new item
      calculateCacheStats();

      // If cache is critical, clean up old items
      if (cacheStats?.cacheHealth === "critical") {
        cleanupOldCache();
      }
    } catch (error) {
      console.error(`Error caching data for key ${key}:`, error);

      // Handle storage quota exceeded error
      if (
        error instanceof DOMException &&
        error.name === "QuotaExceededError"
      ) {
        cleanupOldCache();
        // Try again after cleanup
        try {
          setCachedData(key, data, options);
        } catch (retryError) {
          console.error("Failed to cache data even after cleanup:", retryError);
        }
      }
    }
  };

  // Remove specific cached data
  const removeCachedData = (key: string): void => {
    try {
      const cacheKey = `${storagePrefix}-${key}`;
      localStorage.removeItem(cacheKey);
      calculateCacheStats();
    } catch (error) {
      console.error(`Error removing cached data for key ${key}:`, error);
    }
  };

  // Clear all cached data
  const clearAllCachedData = async (): Promise<void> => {
    try {
      const keysToRemove: string[] = [];

      // Collect all cache keys
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(storagePrefix)) {
          keysToRemove.push(key);
        }
      }

      // Remove all cache items
      keysToRemove.forEach((key) => localStorage.removeItem(key));

      // Update cache stats
      calculateCacheStats();
    } catch (error) {
      console.error("Error clearing cache:", error);
      throw error;
    }
  };

  // Clean up old cache items
  const cleanupOldCache = (): void => {
    try {
      const cacheItems: { key: string; timestamp: number }[] = [];

      // Collect all cache items with their timestamps
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(storagePrefix)) {
          const item = localStorage.getItem(key);
          if (item) {
            try {
              const parsedItem = JSON.parse(item);
              cacheItems.push({
                key,
                timestamp: parsedItem.timestamp || 0,
              });
            } catch (e) {
              // If we can't parse it, it's a good candidate for removal
              cacheItems.push({ key, timestamp: 0 });
            }
          }
        }
      }

      // Sort by timestamp (oldest first)
      cacheItems.sort((a, b) => a.timestamp - b.timestamp);

      // Remove oldest 20% of items
      const itemsToRemove = Math.ceil(cacheItems.length * 0.2);
      for (let i = 0; i < itemsToRemove; i++) {
        if (cacheItems[i]) {
          localStorage.removeItem(cacheItems[i].key);
        }
      }

      // Update cache stats
      calculateCacheStats();
    } catch (error) {
      console.error("Error cleaning up cache:", error);
    }
  };

  // Sync with server
  const syncWithServer = async (): Promise<boolean> => {
    if (!isOnline) {
      return false;
    }

    setIsSyncing(true);
    setSyncError(null);

    try {
      // This would be replaced with actual sync logic
      // For now, we'll simulate a sync process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update last sync time
      const now = Date.now();
      setLastSyncTime(now);
      localStorage.setItem(`${storagePrefix}-last-sync`, now.toString());

      setIsSyncing(false);
      setShowSyncAlert(false);
      return true;
    } catch (error) {
      console.error("Error syncing with server:", error);
      setSyncError("Failed to sync with server. Please try again.");
      setIsSyncing(false);
      return false;
    }
  };

  // Get cache status
  const getCacheStatus = (): CacheStatus => {
    if (!cacheStats || cacheStats.totalItems === 0) {
      return "empty";
    }

    const now = Date.now();
    const lastSync = lastSyncTime || 0;

    // If last sync was more than 24 hours ago, consider cache expired
    if (now - lastSync > 24 * 60 * 60 * 1000) {
      return "expired";
    }

    // If last sync was more than 1 hour ago, consider cache stale
    if (now - lastSync > 60 * 60 * 1000) {
      return "stale";
    }

    return "fresh";
  };

  // Context value
  const contextValue: CachedDataContextType = {
    isOnline,
    isSyncing,
    lastSyncTime,
    cacheStats,
    getCachedData,
    setCachedData,
    removeCachedData,
    clearAllCachedData,
    syncWithServer,
    getCacheStatus,
  };

  return (
    <CachedDataContext.Provider value={contextValue}>
      {children}

      {/* Sync Alert */}
      {showSyncAlert && isOnline && (
        <AlertBanner
          variant="info"
          title="Connection Restored"
          description="Would you like to sync your data with the server?"
          dismissible
          onDismiss={() => setShowSyncAlert(false)}
          action={
            <Button
              size="sm"
              onClick={() => syncWithServer()}
              disabled={isSyncing}
            >
              {isSyncing ? (
                <>
                  <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCwIcon className="mr-2 h-4 w-4" />
                  Sync Now
                </>
              )}
            </Button>
          }
        />
      )}

      {/* Sync Error Toast */}
      {syncError && (
        <ToastNotification
          variant="error"
          title="Sync Failed"
          description={syncError}
          onClose={() => setSyncError(null)}
        />
      )}
    </CachedDataContext.Provider>
  );
}

// Custom hook to use cached data
export function useCachedData() {
  const context = useContext(CachedDataContext);
  if (!context) {
    throw new Error("useCachedData must be used within a CachedDataProvider");
  }
  return context;
}

// Cache Management UI Component
interface CacheManagementUIProps {
  onClose?: () => void;
}

export function CacheManagementUI({ onClose }: CacheManagementUIProps) {
  const {
    cacheStats,
    lastSyncTime,
    isOnline,
    isSyncing,
    syncWithServer,
    clearAllCachedData,
    getCacheStatus,
  } = useCachedData();

  const [isClearing, setIsClearing] = useState(false);

  const handleClearCache = async () => {
    setIsClearing(true);
    try {
      await clearAllCachedData();
    } finally {
      setIsClearing(false);
    }
  };

  const cacheStatus = getCacheStatus();
  const cacheStatusColors = {
    fresh: "text-green-500 dark:text-green-400",
    stale: "text-amber-500 dark:text-amber-400",
    expired: "text-red-500 dark:text-red-400",
    empty: "text-gray-500 dark:text-gray-400",
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="p-4 bg-background border rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <DatabaseIcon className="mr-2 h-5 w-5" />
          Offline Data Management
        </h3>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <XIcon className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
          <div className="flex items-center">
            {isOnline ? (
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <WifiOffIcon className="h-5 w-5 text-amber-500 mr-2" />
            )}
            <span>{isOnline ? "Online" : "Offline"} Mode</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => syncWithServer()}
            disabled={!isOnline || isSyncing}
          >
            {isSyncing ? (
              <>
                <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCwIcon className="mr-2 h-4 w-4" />
                Sync Now
              </>
            )}
          </Button>
        </div>

        {/* Cache Stats */}
        {cacheStats && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Cache Status:</span>
              <span className={`font-medium ${cacheStatusColors[cacheStatus]}`}>
                {cacheStatus.charAt(0).toUpperCase() + cacheStatus.slice(1)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Last Synced:</span>
              <span className="font-medium">
                {lastSyncTime ? formatDate(lastSyncTime) : "Never"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Cached Items:</span>
              <span className="font-medium">{cacheStats.totalItems}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Cache Size:</span>
              <span className="font-medium">
                {formatBytes(cacheStats.totalSize)}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span>Storage Usage:</span>
                <span>
                  {Math.round((cacheStats.totalSize / MAX_CACHE_SIZE) * 100)}%
                </span>
              </div>
              <Progress
                value={(cacheStats.totalSize / MAX_CACHE_SIZE) * 100}
                className={`h-2 ${
                  cacheStats.cacheHealth === "critical"
                    ? "bg-red-100 dark:bg-red-900"
                    : cacheStats.cacheHealth === "warning"
                      ? "bg-amber-100 dark:bg-amber-900"
                      : "bg-blue-100 dark:bg-blue-900"
                }`}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end pt-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleClearCache}
            disabled={isClearing || !cacheStats || cacheStats.totalItems === 0}
            className="flex items-center"
          >
            {isClearing ? (
              <>
                <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                Clearing...
              </>
            ) : (
              <>
                <TrashIcon className="mr-2 h-4 w-4" />
                Clear Cache
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CachedDataProvider;
