import React, { useState, useEffect } from "react";
import { ToastNotification } from "@/polymet/components/toast-notification";
import { ORGANIZATIONS } from "@/polymet/data/organization-data";
import { Bell, Tag, MapPin, Clock, ShoppingBag } from "lucide-react";

export interface NotificationData {
  id: string;
  title: string;
  description: string;
  type: "offer" | "expiration" | "proximity" | "update" | "welcome";
  image?: string;
  organizationId?: string;
  link?: string;
  createdAt: Date | string;
  read?: boolean;
  actionLabel?: string;
}

export interface NotificationDisplayProps {
  notification?: NotificationData;
  onClose?: () => void;
  onAction?: (notification: NotificationData) => void;
  autoClose?: boolean;
  duration?: number;
}

export function NotificationDisplay({
  notification,
  onClose,
  onAction,
  autoClose = true,
  duration = 6000,
}: NotificationDisplayProps) {
  const [visible, setVisible] = useState(!!notification);

  useEffect(() => {
    setVisible(!!notification);
  }, [notification]);

  if (!notification) return null;

  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      setTimeout(() => {
        onClose();
      }, 300); // Wait for exit animation
    }
  };

  const handleAction = () => {
    if (onAction && notification) {
      onAction(notification);
    }
    handleClose();
  };

  // Get organization details if available
  const organization = notification.organizationId
    ? ORGANIZATIONS.find((org) => org.id === notification.organizationId)
    : undefined;

  // Determine notification icon based on type
  const getNotificationIcon = () => {
    switch (notification.type) {
      case "offer":
        return <Tag className="h-5 w-5" />;

      case "expiration":
        return <Clock className="h-5 w-5" />;

      case "proximity":
        return <MapPin className="h-5 w-5" />;

      case "update":
        return <ShoppingBag className="h-5 w-5" />;

      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  // Determine notification variant based on type
  const getNotificationVariant = () => {
    switch (notification.type) {
      case "offer":
        return "info";
      case "expiration":
        return "warning";
      case "proximity":
        return "success";
      case "update":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <ToastNotification
      title={notification.title}
      description={notification.description}
      variant={getNotificationVariant()}
      icon={getNotificationIcon()}
      duration={autoClose ? duration : 0}
      onClose={handleClose}
      action={
        notification.actionLabel ? (
          <button
            onClick={handleAction}
            className="text-sm font-medium underline hover:no-underline"
          >
            {notification.actionLabel}
          </button>
        ) : undefined
      }
    />
  );
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [currentNotification, setCurrentNotification] = useState<
    NotificationData | undefined
  >(undefined);

  // Mock function to add a notification (in a real app, this would be triggered by push events)
  const addNotification = (notification: NotificationData) => {
    setNotifications((prev) => [notification, ...prev]);
    setCurrentNotification(notification);
  };

  const handleCloseNotification = () => {
    setCurrentNotification(undefined);
    // Mark notification as read in the list
    if (currentNotification) {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === currentNotification.id ? { ...n, read: true } : n
        )
      );
    }
  };

  const handleActionClick = (notification: NotificationData) => {
    console.log("Action clicked for notification:", notification);
    // Handle navigation or other actions based on notification type
    if (notification.link) {
      console.warn(
        "Prevented assignment: `window.location.href = notification.link`"
      ) /*TODO: Do not use window.location for navigation. Use react-router instead.*/;
    }
  };

  // Demo function to show different notification types
  const showDemoNotification = (type: NotificationData["type"]) => {
    const demoNotifications: Record<
      string,
      Omit<NotificationData, "id" | "createdAt">
    > = {
      offer: {
        title: "New Special Offer",
        description: "DeWalt 18V XR Brushless Combi Drill now 25% off!",
        type: "offer",
        image: "https://picsum.photos/seed/dewalt/200/200",
        organizationId: "toolbank",
        actionLabel: "View Offer",
        link: "/offer-discovery",
      },
      expiration: {
        title: "Offer Expiring Soon",
        description: "The Stanley Hammer Set offer expires in 24 hours.",
        type: "expiration",
        organizationId: "nmbs",
        actionLabel: "View Details",
        link: "/offer-discovery",
      },
      proximity: {
        title: "Nearby Merchant",
        description: "Toolstation Bristol has 5 special offers available.",
        type: "proximity",
        actionLabel: "Get Directions",
        link: "/merchant-map",
      },
      update: {
        title: "Order Update",
        description:
          "Your order #12345 has been shipped and will arrive tomorrow.",
        type: "update",
        actionLabel: "Track Order",
      },
      welcome: {
        title: "Welcome to BuildConnect",
        description: "Discover special offers from top building merchants.",
        type: "welcome",
        actionLabel: "Get Started",
      },
    };

    const notification: NotificationData = {
      id: `notification-${Date.now()}`,
      createdAt: new Date(),
      ...demoNotifications[type],
    };

    addNotification(notification);
  };

  return (
    <>
      {currentNotification && (
        <NotificationDisplay
          notification={currentNotification}
          onClose={handleCloseNotification}
          onAction={handleActionClick}
        />
      )}
      <div className="hidden">
        {/* This div is just for the demo render, not part of the actual component */}
        <button onClick={() => showDemoNotification("offer")}>
          Show Offer Notification
        </button>
        <button onClick={() => showDemoNotification("expiration")}>
          Show Expiration Notification
        </button>
        <button onClick={() => showDemoNotification("proximity")}>
          Show Proximity Notification
        </button>
      </div>
    </>
  );
}
