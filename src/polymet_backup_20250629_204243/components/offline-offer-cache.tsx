import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useCachedData } from "@/polymet/components/cached-data-manager";
import { ToastNotification } from "@/polymet/components/toast-notification";
import { Button } from "@/components/ui/button";
import {
  RefreshCwIcon,
  WifiOffIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
} from "lucide-react";
import { ORGANIZATIONS } from "@/polymet/data/organization-data";
import { MERCHANT_OFFERS } from "@/polymet/data/merchant-offers-data";

// Types
export interface OfferData {
  id: string;
  title: string;
  description: string;
  originalPrice?: number;
  discountedPrice: number;
  discountPercentage?: number;
  image?: string;
  startDate?: string;
  endDate?: string;
  organization: {
    id: string;
    name: string;
    logo: string;
  };
  category: string;
  sku: string;
  stockStatus: "in-stock" | "low-stock" | "out-of-stock";
  stockQuantity?: number;
  lastUpdated?: number;
}

interface OfferCacheState {
  offers: OfferData[];
  lastSynced: number | null;
  isSyncing: boolean;
  syncError: string | null;
}

interface OfferCacheContextType {
  offers: OfferData[];
  filteredOffers: OfferData[];
  isSyncing: boolean;
  lastSynced: number | null;
  syncError: string | null;
  isOfflineMode: boolean;
  syncOffers: () => Promise<boolean>;
  getOfferById: (id: string) => OfferData | undefined;
  filterOffers: (options: OfferFilterOptions) => OfferData[];
  getOffersForOrganization: (organizationId: string) => OfferData[];
  getCachedOrganizations: () => string[];
  getLastUpdatedTime: (offerId?: string) => number | null;
}

interface OfferCacheProviderProps {
  children: ReactNode;
  organizationId?: string;
  autoSync?: boolean;
  syncInterval?: number; // in milliseconds
}

interface OfferFilterOptions {
  organizationId?: string;
  category?: string;
  stockStatus?: "in-stock" | "low-stock" | "out-of-stock" | "any";
  minDiscount?: number;
  searchTerm?: string;
}

// Create context
const OfferCacheContext = createContext<OfferCacheContextType | null>(null);

// Cache keys
const OFFERS_CACHE_KEY = "offers";
const LAST_SYNCED_KEY = "offers-last-synced";

// Default sync interval: 30 minutes
const DEFAULT_SYNC_INTERVAL = 30 * 60 * 1000;

export function OfferCacheProvider({
  children,
  organizationId,
  autoSync = true,
  syncInterval = DEFAULT_SYNC_INTERVAL,
}: OfferCacheProviderProps) {
  const { isOnline, getCachedData, setCachedData, lastSyncTime } =
    useCachedData();

  const [state, setState] = useState<OfferCacheState>({
    offers: [],
    lastSynced: null,
    isSyncing: false,
    syncError: null,
  });

  // Initialize cache from localStorage
  useEffect(() => {
    const cachedOffers = getCachedData<OfferData[]>(OFFERS_CACHE_KEY) || [];
    const lastSynced = getCachedData<number>(LAST_SYNCED_KEY) || null;

    setState((prev) => ({
      ...prev,
      offers: cachedOffers,
      lastSynced,
    }));

    // If we're online and autoSync is enabled, sync on mount
    if (
      isOnline &&
      autoSync &&
      (!lastSynced || Date.now() - lastSynced > syncInterval)
    ) {
      syncOffers();
    }
  }, []);

  // Set up auto sync interval
  useEffect(() => {
    if (!autoSync) return;

    const intervalId = setInterval(() => {
      if (isOnline) {
        syncOffers();
      }
    }, syncInterval);

    return () => clearInterval(intervalId);
  }, [isOnline, autoSync, syncInterval]);

  // Sync offers with server
  const syncOffers = async (): Promise<boolean> => {
    if (!isOnline) {
      setState((prev) => ({
        ...prev,
        syncError: "Cannot sync while offline",
      }));
      return false;
    }

    setState((prev) => ({
      ...prev,
      isSyncing: true,
      syncError: null,
    }));

    try {
      // In a real app, this would be an API call to fetch offers
      // For this example, we'll simulate an API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate fetching offers from an API
      // In a real app, this would be something like:
      // const response = await fetch('/api/offers');
      // const data = await response.json();
      const fetchedOffers = MERCHANT_OFFERS.map((offer) => ({
        ...offer,
        lastUpdated: Date.now(),
      }));

      // Update cache
      setCachedData(OFFERS_CACHE_KEY, fetchedOffers, {
        organizationId: organizationId,
      });
      setCachedData(LAST_SYNCED_KEY, Date.now());

      setState((prev) => ({
        ...prev,
        offers: fetchedOffers,
        lastSynced: Date.now(),
        isSyncing: false,
      }));

      return true;
    } catch (error) {
      console.error("Error syncing offers:", error);
      setState((prev) => ({
        ...prev,
        isSyncing: false,
        syncError: "Failed to sync offers. Please try again.",
      }));
      return false;
    }
  };

  // Get offer by ID
  const getOfferById = (id: string): OfferData | undefined => {
    return state.offers.find((offer) => offer.id === id);
  };

  // Filter offers based on criteria
  const filterOffers = (options: OfferFilterOptions): OfferData[] => {
    return state.offers.filter((offer) => {
      // Filter by organization
      if (
        options.organizationId &&
        offer.organization.id !== options.organizationId
      ) {
        return false;
      }

      // Filter by category
      if (options.category && offer.category !== options.category) {
        return false;
      }

      // Filter by stock status
      if (
        options.stockStatus &&
        options.stockStatus !== "any" &&
        offer.stockStatus !== options.stockStatus
      ) {
        return false;
      }

      // Filter by minimum discount
      if (
        options.minDiscount &&
        (!offer.discountPercentage ||
          offer.discountPercentage < options.minDiscount)
      ) {
        return false;
      }

      // Filter by search term
      if (options.searchTerm) {
        const searchLower = options.searchTerm.toLowerCase();
        return (
          offer.title.toLowerCase().includes(searchLower) ||
          offer.description.toLowerCase().includes(searchLower) ||
          offer.category.toLowerCase().includes(searchLower) ||
          offer.sku.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  };

  // Get offers for a specific organization
  const getOffersForOrganization = (orgId: string): OfferData[] => {
    return state.offers.filter((offer) => offer.organization.id === orgId);
  };

  // Get list of organizations that have cached offers
  const getCachedOrganizations = (): string[] => {
    const orgIds = new Set<string>();
    state.offers.forEach((offer) => {
      orgIds.add(offer.organization.id);
    });
    return Array.from(orgIds);
  };

  // Get last updated time for an offer or all offers
  const getLastUpdatedTime = (offerId?: string): number | null => {
    if (offerId) {
      const offer = getOfferById(offerId);
      return offer?.lastUpdated || null;
    }
    return state.lastSynced;
  };

  // Get filtered offers based on current organizationId
  const filteredOffers = organizationId
    ? state.offers.filter((offer) => offer.organization.id === organizationId)
    : state.offers;

  // Context value
  const contextValue: OfferCacheContextType = {
    offers: state.offers,
    filteredOffers,
    isSyncing: state.isSyncing,
    lastSynced: state.lastSynced,
    syncError: state.syncError,
    isOfflineMode: !isOnline,
    syncOffers,
    getOfferById,
    filterOffers,
    getOffersForOrganization,
    getCachedOrganizations,
    getLastUpdatedTime,
  };

  return (
    <OfferCacheContext.Provider value={contextValue}>
      {children}

      {/* Sync Error Toast */}
      {state.syncError && (
        <ToastNotification
          variant="error"
          title="Sync Failed"
          description={state.syncError}
          onClose={() => setState((prev) => ({ ...prev, syncError: null }))}
        />
      )}
    </OfferCacheContext.Provider>
  );
}

// Custom hook to use offer cache
export function useOfferCache() {
  const context = useContext(OfferCacheContext);
  if (!context) {
    throw new Error("useOfferCache must be used within an OfferCacheProvider");
  }
  return context;
}

// Offer Cache Status Component
interface OfferCacheStatusProps {
  organizationId?: string;
  compact?: boolean;
}

export function OfferCacheStatus({
  organizationId,
  compact = false,
}: OfferCacheStatusProps) {
  const { lastSynced, isSyncing, isOfflineMode, syncOffers, filteredOffers } =
    useOfferCache();

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

  // Get organization name if organizationId is provided
  const organizationName = organizationId
    ? ORGANIZATIONS.find((org) => org.id === organizationId)?.name ||
      organizationId
    : "All organizations";

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <div
          className={`w-2 h-2 rounded-full ${isOfflineMode ? "bg-amber-500" : "bg-green-500"}`}
        ></div>
        <span className="text-muted-foreground">
          {isOfflineMode ? "Offline" : "Online"}
          {lastSynced &&
            !isOfflineMode &&
            ` • Updated ${formatTimeAgo(lastSynced)}`}
        </span>
        {!isOfflineMode && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => syncOffers()}
            disabled={isSyncing}
          >
            <RefreshCwIcon
              className={`h-3 w-3 ${isSyncing ? "animate-spin" : ""}`}
            />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-background border rounded-md p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">Offer Cache Status</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => syncOffers()}
          disabled={isSyncing || isOfflineMode}
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

      <div className="space-y-3">
        <div className="flex items-center">
          {isOfflineMode ? (
            <WifiOffIcon className="h-5 w-5 text-amber-500 mr-2" />
          ) : (
            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
          )}
          <span>
            {isOfflineMode
              ? "Offline Mode - Using cached offers"
              : "Online Mode - Live offers"}
          </span>
        </div>

        <div className="flex items-center">
          <ClockIcon className="h-5 w-5 text-muted-foreground mr-2" />

          <span>
            {lastSynced
              ? `Last updated ${formatTimeAgo(lastSynced)}`
              : "Never synced"}
          </span>
        </div>

        <div className="flex items-center">
          <div className="flex-1">
            <span className="text-sm text-muted-foreground">
              {filteredOffers.length} offers cached for {organizationName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Offer Cache Display Component
interface OfferCacheDisplayProps {
  organizationId?: string;
  limit?: number;
  showSyncStatus?: boolean;
  onSelectOffer?: (offer: OfferData) => void;
}

export function OfferCacheDisplay({
  organizationId,
  limit,
  showSyncStatus = true,
  onSelectOffer,
}: OfferCacheDisplayProps) {
  const { filteredOffers, isOfflineMode } = useOfferCache();

  // Apply limit if specified
  const displayOffers = limit ? filteredOffers.slice(0, limit) : filteredOffers;

  return (
    <div className="space-y-4">
      {showSyncStatus && (
        <OfferCacheStatus organizationId={organizationId} compact />
      )}

      {isOfflineMode && displayOffers.length === 0 && (
        <div className="p-8 text-center border border-dashed rounded-md">
          <WifiOffIcon className="mx-auto h-10 w-10 text-muted-foreground mb-2" />

          <h3 className="font-medium text-lg mb-1">No Cached Offers</h3>
          <p className="text-muted-foreground">
            You're offline and no offers have been cached for this organization.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayOffers.map((offer) => (
          <div
            key={offer.id}
            className="border rounded-md overflow-hidden bg-background hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectOffer && onSelectOffer(offer)}
          >
            {offer.image && (
              <div className="aspect-video relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />

                {offer.discountPercentage && offer.discountPercentage > 0 && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {offer.discountPercentage}% OFF
                  </div>
                )}
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center mb-2">
                <img
                  src={offer.organization.logo}
                  alt={offer.organization.name}
                  className="h-5 w-5 mr-2 rounded-sm"
                />

                <span className="text-xs text-muted-foreground">
                  {offer.organization.name}
                </span>
              </div>
              <h3 className="font-medium line-clamp-2 mb-1">{offer.title}</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-bold">
                  £{offer.discountedPrice.toFixed(2)}
                </span>
                {offer.originalPrice &&
                  offer.originalPrice > offer.discountedPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      £{offer.originalPrice.toFixed(2)}
                    </span>
                  )}
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="bg-muted px-2 py-1 rounded">
                  {offer.category}
                </span>
                <span
                  className={`px-2 py-1 rounded ${
                    offer.stockStatus === "in-stock"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                      : offer.stockStatus === "low-stock"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                  }`}
                >
                  {offer.stockStatus === "in-stock"
                    ? "In Stock"
                    : offer.stockStatus === "low-stock"
                      ? "Low Stock"
                      : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferCacheProvider;
