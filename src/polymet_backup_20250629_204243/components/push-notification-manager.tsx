import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { ToastNotification } from "@/polymet/components/toast-notification";
import {
  NotificationDisplay,
  NotificationData,
} from "@/polymet/components/notification-display";
import { Bell, BellOff } from "lucide-react";

// Mock Supabase client for demonstration
const mockSupabase = {
  auth: {
    user: () => ({ id: "user-123" }),
  },
  from: (table: string) => ({
    insert: (data: any) => ({
      select: () => ({
        single: () => Promise.resolve({ data }),
      }),
    }),
    update: (data: any) => ({
      eq: () => Promise.resolve({ data }),
    }),
    select: () => ({
      eq: () => ({
        single: () =>
          Promise.resolve({ data: { endpoint: "https://example.com" } }),
      }),
    }),
  }),
};

interface PushNotificationContextType {
  isSupported: boolean;
  isSubscribed: boolean;
  isPushEnabled: boolean;
  isPermissionGranted: boolean;
  permissionState: NotificationPermission | "default";
  subscription: PushSubscription | null;
  notifications: NotificationData[];
  requestPermission: () => Promise<NotificationPermission>;
  subscribe: () => Promise<boolean>;
  unsubscribe: () => Promise<boolean>;
  sendTestNotification: () => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
}

const PushNotificationContext = createContext<PushNotificationContextType>({
  isSupported: false,
  isSubscribed: false,
  isPushEnabled: false,
  isPermissionGranted: false,
  permissionState: "default",
  subscription: null,
  notifications: [],
  requestPermission: async () => "default",
  subscribe: async () => false,
  unsubscribe: async () => false,
  sendTestNotification: () => {},
  markAsRead: () => {},
  clearAll: () => {},
});

export const usePushNotifications = () => useContext(PushNotificationContext);

interface PushNotificationManagerProps {
  children: React.ReactNode;
  supabase?: any; // Actual Supabase client would be passed here
  vapidPublicKey?: string;
  organizationId?: string;
  onSubscriptionChange?: (subscribed: boolean) => void;
  onPermissionChange?: (permission: NotificationPermission) => void;
  onNotificationReceived?: (notification: NotificationData) => void;
}

export function PushNotificationManager({
  children,
  supabase = mockSupabase,
  vapidPublicKey = "BLVYgWc5ofQNMCh6VGcL3VBkKrCxwkGcdJ6CMTpVXZ3xJJK4_nIYTyEYNHqYD_-0RJIdz3jKJjuBMzeD2YwYXrI",
  organizationId,
  onSubscriptionChange,
  onPermissionChange,
  onNotificationReceived,
}: PushNotificationManagerProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [permissionState, setPermissionState] = useState<
    NotificationPermission | "default"
  >("default");
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [currentNotification, setCurrentNotification] =
    useState<NotificationData | null>(null);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  // Check if push notifications are supported
  useEffect(() => {
    const checkSupport = () => {
      const supported =
        "serviceWorker" in navigator &&
        "PushManager" in window &&
        "Notification" in window;
      setIsSupported(supported);
      return supported;
    };

    const supported = checkSupport();
    if (supported) {
      checkPermission();
      checkSubscription();
    }
  }, []);

  // Check notification permission
  const checkPermission = useCallback(() => {
    if (!isSupported) return;

    const permission = Notification.permission;
    setPermissionState(permission);
    setIsPermissionGranted(permission === "granted");

    return permission;
  }, [isSupported]);

  // Check if already subscribed
  const checkSubscription = useCallback(async () => {
    if (!isSupported) return false;

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      setSubscription(subscription);
      setIsSubscribed(!!subscription);
      setIsPushEnabled(!!subscription);

      if (onSubscriptionChange) {
        onSubscriptionChange(!!subscription);
      }

      return !!subscription;
    } catch (error) {
      console.error("Error checking subscription:", error);
      return false;
    }
  }, [isSupported, onSubscriptionChange]);

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if (!isSupported) return "default" as NotificationPermission;

    try {
      const permission = await Notification.requestPermission();
      setPermissionState(permission);
      setIsPermissionGranted(permission === "granted");

      if (onPermissionChange) {
        onPermissionChange(permission);
      }

      // Show a toast notification based on the permission result
      if (permission === "granted") {
        showPermissionToast("success", "Notification permission granted!");
      } else if (permission === "denied") {
        showPermissionToast(
          "error",
          "Notification permission denied. You won't receive push notifications."
        );
      }

      return permission;
    } catch (error) {
      console.error("Error requesting permission:", error);
      return "default" as NotificationPermission;
    }
  }, [isSupported, onPermissionChange]);

  // Subscribe to push notifications
  const subscribe = useCallback(async () => {
    if (!isSupported) return false;

    try {
      const permission = await requestPermission();
      if (permission !== "granted") return false;

      const registration = await navigator.serviceWorker.ready;

      // Get a new subscription
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });

      // Save subscription to state
      setSubscription(subscription);
      setIsSubscribed(true);
      setIsPushEnabled(true);

      // Save subscription to database
      await saveSubscriptionToDatabase(subscription);

      if (onSubscriptionChange) {
        onSubscriptionChange(true);
      }

      return true;
    } catch (error) {
      console.error("Error subscribing to push notifications:", error);
      showPermissionToast(
        "error",
        "Failed to subscribe to push notifications. Please try again."
      );
      return false;
    }
  }, [isSupported, requestPermission, vapidPublicKey, onSubscriptionChange]);

  // Unsubscribe from push notifications
  const unsubscribe = useCallback(async () => {
    if (!isSupported || !subscription) return false;

    try {
      await subscription.unsubscribe();

      // Update state
      setSubscription(null);
      setIsSubscribed(false);
      setIsPushEnabled(false);

      // Update database
      await removeSubscriptionFromDatabase();

      if (onSubscriptionChange) {
        onSubscriptionChange(false);
      }

      return true;
    } catch (error) {
      console.error("Error unsubscribing from push notifications:", error);
      return false;
    }
  }, [isSupported, subscription, onSubscriptionChange]);

  // Save subscription to database
  const saveSubscriptionToDatabase = async (subscription: PushSubscription) => {
    const user = supabase.auth.user();
    if (!user) return;

    const subscriptionJSON = subscription.toJSON();

    try {
      await supabase
        .from("push_subscriptions")
        .insert({
          user_id: user.id,
          endpoint: subscription.endpoint,
          p256dh: subscriptionJSON.keys?.p256dh,
          auth: subscriptionJSON.keys?.auth,
          organization_id: organizationId,
        })
        .select()
        .single();
    } catch (error) {
      console.error("Error saving subscription to database:", error);
    }
  };

  // Remove subscription from database
  const removeSubscriptionFromDatabase = async () => {
    const user = supabase.auth.user();
    if (!user || !subscription) return;

    try {
      await supabase
        .from("push_subscriptions")
        .update({
          active: false,
        })
        .eq("endpoint", subscription.endpoint);
    } catch (error) {
      console.error("Error removing subscription from database:", error);
    }
  };

  // Send a test notification
  const sendTestNotification = useCallback(() => {
    if (!isSupported || !isPermissionGranted) return;

    const testNotification: NotificationData = {
      id: `notification-${Date.now()}`,
      title: "Test Notification",
      description: "This is a test notification from BuildConnect",
      type: "welcome",
      createdAt: new Date(),
      actionLabel: "Dismiss",
    };

    // Add to notifications list
    setNotifications((prev) => [testNotification, ...prev]);

    // Show the notification
    setCurrentNotification(testNotification);

    if (onNotificationReceived) {
      onNotificationReceived(testNotification);
    }
  }, [isSupported, isPermissionGranted, onNotificationReceived]);

  // Mark notification as read
  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  // Clear all notifications
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Handle notification close
  const handleNotificationClose = () => {
    if (currentNotification) {
      markAsRead(currentNotification.id);
      setCurrentNotification(null);
    }
  };

  // Handle notification action
  const handleNotificationAction = (notification: NotificationData) => {
    markAsRead(notification.id);
    setCurrentNotification(null);

    // Handle deep linking
    if (notification.link) {
      console.warn(
        "Prevented assignment: `window.location.href = notification.link`"
      );
    }
  };

  // Show permission toast
  const [permissionToast, setPermissionToast] = useState<{
    visible: boolean;
    variant: "success" | "error" | "warning";
    message: string;
  }>({
    visible: false,
    variant: "success",
    message: "",
  });

  const showPermissionToast = (
    variant: "success" | "error" | "warning",
    message: string
  ) => {
    setPermissionToast({
      visible: true,
      variant,
      message,
    });

    setTimeout(() => {
      setPermissionToast((prev) => ({ ...prev, visible: false }));
    }, 5000);
  };

  // Register service worker
  useEffect(() => {
    if (!isSupported) return;

    const registerServiceWorker = async () => {
      try {
        await navigator.serviceWorker.register("/service-worker.js");
      } catch (error) {
        console.error("Service worker registration failed:", error);
      }
    };

    registerServiceWorker();
  }, [isSupported]);

  // Listen for push messages
  useEffect(() => {
    if (!isSupported) return;

    const handlePushMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "PUSH_NOTIFICATION") {
        const notificationData: NotificationData = event.data.notification;

        // Add to notifications list
        setNotifications((prev) => [notificationData, ...prev]);

        // Show the notification
        setCurrentNotification(notificationData);

        if (onNotificationReceived) {
          onNotificationReceived(notificationData);
        }
      }
    };

    navigator.serviceWorker.addEventListener("message", handlePushMessage);

    return () => {
      navigator.serviceWorker.removeEventListener("message", handlePushMessage);
    };
  }, [isSupported, onNotificationReceived]);

  // Context value
  const contextValue: PushNotificationContextType = {
    isSupported,
    isSubscribed,
    isPushEnabled,
    isPermissionGranted,
    permissionState,
    subscription,
    notifications,
    requestPermission,
    subscribe,
    unsubscribe,
    sendTestNotification,
    markAsRead,
    clearAll,
  };

  return (
    <PushNotificationContext.Provider value={contextValue}>
      {children}

      {currentNotification && (
        <NotificationDisplay
          notification={currentNotification}
          onClose={handleNotificationClose}
          onAction={handleNotificationAction}
        />
      )}

      {permissionToast.visible && (
        <ToastNotification
          variant={permissionToast.variant}
          title={
            permissionToast.variant === "success"
              ? "Permission Granted"
              : permissionToast.variant === "error"
                ? "Permission Denied"
                : "Permission Required"
          }
          description={permissionToast.message}
          icon={
            permissionToast.variant === "success" ? (
              <Bell className="h-5 w-5" />
            ) : (
              <BellOff className="h-5 w-5" />
            )
          }
          duration={5000}
        />
      )}
    </PushNotificationContext.Provider>
  );
}

// Helper function to convert base64 to Uint8Array
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Demo component to show push notification controls
export function PushNotificationControls() {
  const {
    isSupported,
    isPermissionGranted,
    isSubscribed,
    requestPermission,
    subscribe,
    unsubscribe,
    sendTestNotification,
    notifications,
    clearAll,
  } = usePushNotifications();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Push Notifications</h3>
          <p className="text-sm text-muted-foreground">
            {isSupported
              ? "Push notifications are supported in your browser"
              : "Push notifications are not supported in your browser"}
          </p>
        </div>
        <div className="flex items-center">
          {isSupported && (
            <>
              {!isPermissionGranted ? (
                <button
                  onClick={requestPermission}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
                >
                  Request Permission
                </button>
              ) : !isSubscribed ? (
                <button
                  onClick={subscribe}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
                >
                  Subscribe
                </button>
              ) : (
                <button
                  onClick={unsubscribe}
                  className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md"
                >
                  Unsubscribe
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {isSupported && isPermissionGranted && isSubscribed && (
        <div className="flex justify-between">
          <button
            onClick={sendTestNotification}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md"
          >
            Send Test Notification
          </button>
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-muted text-muted-foreground rounded-md"
            >
              Clear All Notifications
            </button>
          )}
        </div>
      )}

      {notifications.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Recent Notifications</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-md border ${
                  notification.read
                    ? "bg-muted/50 border-muted"
                    : "bg-muted border-muted-foreground/20"
                }`}
              >
                <div className="flex justify-between">
                  <h5 className="font-medium">{notification.title}</h5>
                  <span className="text-xs text-muted-foreground">
                    {new Date(notification.createdAt).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm">{notification.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
