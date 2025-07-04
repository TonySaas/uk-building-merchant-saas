import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DownloadIcon,
  XIcon,
  CheckIcon,
  SmartphoneIcon,
  TabletIcon,
  LaptopIcon,
} from "lucide-react";
import { ORGANIZATIONS } from "@/polymet/data/organization-data";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

interface PWAInstallPromptProps {
  organizationId?: string;
  position?: "bottom" | "center" | "top";
  showDelay?: number; // Delay in milliseconds before showing the prompt
  dismissDuration?: number; // Duration in days to remember user's dismiss action
  onInstall?: () => void;
  onDismiss?: () => void;
}

export default function PWAInstallPrompt({
  organizationId = "toolbank",
  position = "bottom",
  showDelay = 3000,
  dismissDuration = 7, // 7 days
  onInstall,
  onDismiss,
}: PWAInstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [installationStatus, setInstallationStatus] = useState<
    "idle" | "installing" | "installed" | "dismissed"
  >("idle");
  const [isVisible, setIsVisible] = useState(false);

  // Get organization data
  const organization =
    ORGANIZATIONS.find((org) => org.id === organizationId) || ORGANIZATIONS[0];

  useEffect(() => {
    // Check if the user has previously dismissed the prompt
    const checkDismissed = () => {
      const dismissedTime = localStorage.getItem(
        "pwa-install-prompt-dismissed"
      );
      if (dismissedTime) {
        const dismissedDate = new Date(parseInt(dismissedTime, 10));
        const now = new Date();
        const daysSinceDismissed =
          (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);

        // If the dismissal period has expired, allow showing the prompt again
        if (daysSinceDismissed < dismissDuration) {
          return true;
        }
      }
      return false;
    };

    // Check if the app is already installed
    const isAppInstalled = () => {
      return (
        window.matchMedia("(display-mode: standalone)").matches ||
        window.matchMedia("(display-mode: fullscreen)").matches ||
        window.matchMedia("(display-mode: minimal-ui)").matches ||
        (window.navigator as any).standalone === true
      );

      // For iOS
    };

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default browser install prompt
      e.preventDefault();

      // Store the event for later use
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Don't show the prompt immediately, wait for the delay
      setTimeout(() => {
        // Only show if not already installed, not dismissed recently, and the prompt is available
        if (!isAppInstalled() && !checkDismissed()) {
          setShowPrompt(true);
          setTimeout(() => setIsVisible(true), 100); // Small delay for animation
        }
      }, showDelay);
    };

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setInstallationStatus("installed");
      setShowPrompt(false);
      localStorage.setItem("pwa-app-installed", "true");

      // Call the onInstall callback if provided
      if (onInstall) {
        onInstall();
      }
    };

    // Add event listeners
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Clean up
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [dismissDuration, onInstall, showDelay]);

  // Handle install button click
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    setInstallationStatus("installing");

    // Show the install prompt
    await deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      setInstallationStatus("installed");
      if (onInstall) onInstall();
    } else {
      setInstallationStatus("dismissed");
      handleDismiss();
    }

    // Clear the deferred prompt
    setDeferredPrompt(null);
  };

  // Handle dismiss button click
  const handleDismiss = () => {
    setIsVisible(false);

    // Wait for exit animation to complete
    setTimeout(() => {
      setShowPrompt(false);

      // Save dismissal time
      localStorage.setItem(
        "pwa-install-prompt-dismissed",
        Date.now().toString()
      );

      // Call the onDismiss callback if provided
      if (onDismiss) {
        onDismiss();
      }
    }, 300);
  };

  // Don't render anything if the prompt shouldn't be shown
  if (!showPrompt) {
    return null;
  }

  // Position classes
  const positionClasses = {
    bottom: "fixed bottom-0 left-0 right-0 mb-4 mx-auto max-w-md px-4",
    center:
      "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md px-4",
    top: "fixed top-0 left-0 right-0 mt-4 mx-auto max-w-md px-4",
  };

  return (
    <div
      className={`${positionClasses[position]} z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <Card className="border shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-md flex items-center justify-center"
                style={{ backgroundColor: getThemeColor(organizationId) }}
              >
                <img
                  src={organization.logo}
                  alt={`${organization.name} logo`}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <CardTitle className="text-lg">
                  {organization.name} BuildConnect
                </CardTitle>
                <CardDescription>
                  Install our app for the best experience
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleDismiss}
            >
              <XIcon className="h-4 w-4" />

              <span className="sr-only">Close</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <SmartphoneIcon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xs">Works offline</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TabletIcon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xs">App-like experience</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <LaptopIcon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xs">Quick access</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Install {organization.name} BuildConnect on your device for faster
            access and a better experience, even when offline.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleDismiss}>
            Maybe Later
          </Button>
          <Button
            onClick={handleInstallClick}
            disabled={installationStatus === "installing"}
            className="gap-2"
          >
            {installationStatus === "installing" ? (
              <>Installing...</>
            ) : (
              <>
                <DownloadIcon className="h-4 w-4" />
                Install App
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Helper function to get theme color based on organization ID
function getThemeColor(orgId: string): string {
  const themeColors = {
    toolbank: "#E11D48", // Red
    nmbs: "#1E40AF", // Blue
    ibc: "#047857", // Green
    bmf: "#4F46E5", // Indigo
  };

  return themeColors[orgId as keyof typeof themeColors] || "#1E293B"; // Default slate
}
