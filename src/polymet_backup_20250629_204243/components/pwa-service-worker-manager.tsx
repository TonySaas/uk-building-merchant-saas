import { useEffect, useState } from "react";
import { ToastNotification } from "@/polymet/components/toast-notification";
import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";

interface PWAServiceWorkerManagerProps {
  children: React.ReactNode;
  swPath?: string;
  enableOffline?: boolean;
  cacheVersion?: string;
}

export default function PWAServiceWorkerManager({
  children,
  swPath = "/service-worker.js",
  enableOffline = true,
  cacheVersion = "v1",
}: PWAServiceWorkerManagerProps) {
  const [newWorker, setNewWorker] = useState<ServiceWorker | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const [installationStatus, setInstallationStatus] = useState<string>("");

  useEffect(() => {
    // Check if service workers are supported
    if ("serviceWorker" in navigator) {
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      // Register the service worker
      const reg = await navigator.serviceWorker.register(swPath, {
        scope: "/",
      });
      setRegistration(reg);
      setInstallationStatus("Service worker registered successfully");

      // Handle service worker updates
      reg.addEventListener("updatefound", () => {
        const newSW = reg.installing;
        setNewWorker(newSW);

        if (newSW) {
          newSW.addEventListener("statechange", () => {
            if (
              newSW.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // New service worker is installed but waiting to activate
              setUpdateAvailable(true);
              setInstallationStatus("New version available");
            }
          });
        }
      });

      // Handle controller change (when a new service worker takes over)
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!navigator.serviceWorker.controller) return;

        // If we have a new controller, it means the page has been updated
        setInstallationStatus("Page updated with new service worker");
      });

      // Check if we already have a waiting service worker
      if (reg.waiting) {
        setNewWorker(reg.waiting);
        setUpdateAvailable(true);
        setInstallationStatus("Update ready to be installed");
      }

      // Set up messaging with the service worker
      setupMessaging();

      // Check if we're already controlled (app is already working offline)
      if (navigator.serviceWorker.controller) {
        setOfflineReady(true);
      }

      // Configure offline caching if enabled
      if (enableOffline) {
        configureOfflineCaching(cacheVersion);
      }
    } catch (error) {
      console.error("Service worker registration failed:", error);
      setInstallationStatus("Service worker registration failed");
    }
  };

  const setupMessaging = () => {
    // Set up message listener for service worker communication
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data && event.data.type === "CACHE_UPDATED") {
        setInstallationStatus(`Cache updated: ${event.data.url}`);
      }

      if (event.data && event.data.type === "OFFLINE_READY") {
        setOfflineReady(true);
        setInstallationStatus("App ready for offline use");
      }
    });
  };

  const configureOfflineCaching = (version: string) => {
    // Send message to service worker to configure caching
    if (registration && registration.active) {
      registration.active.postMessage({
        type: "CONFIGURE_CACHE",
        cacheVersion: version,
        urlsToCache: [
          "/",
          "/index.html",
          "/offline.html",
          "/static/css/main.css",
          "/static/js/main.js",
          // Add other critical assets here
        ],
      });
    }
  };

  const updateServiceWorker = () => {
    if (newWorker) {
      // Send message to the waiting service worker to skip waiting
      newWorker.postMessage({ type: "SKIP_WAITING" });
      setUpdateAvailable(false);

      // Reload the page to activate the new service worker
      console.warn(
        "Prevented function call: `window.location.reload()`"
      ) /*TODO: Do not use window.location for navigation. Use react-router instead.*/;
    }
  };

  return (
    <>
      {children}

      {/* Update notification */}
      {updateAvailable && (
        <ToastNotification
          variant="info"
          title="Update Available"
          description="A new version of the app is available."
          action={
            <Button
              size="sm"
              onClick={updateServiceWorker}
              className="flex items-center gap-2"
            >
              <RefreshCwIcon className="h-4 w-4" />
              Update Now
            </Button>
          }
          duration={0} // Don't auto-dismiss
          position="bottom"
        />
      )}

      {/* Offline ready notification - only shown once */}
      {offlineReady && (
        <div className="sr-only" aria-live="polite">
          App is ready for offline use
        </div>
      )}
    </>
  );
}
