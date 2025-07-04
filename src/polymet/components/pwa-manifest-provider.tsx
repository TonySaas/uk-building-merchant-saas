import { useEffect, useState } from "react";
import { ORGANIZATIONS } from "@/polymet/data/organization-data";

interface PWAManifestProviderProps {
  children: React.ReactNode;
  organizationId?: string;
}

export default function PWAManifestProvider({
  children,
  organizationId = "toolbank",
}: PWAManifestProviderProps) {
  const [manifestUpdated, setManifestUpdated] = useState(false);

  useEffect(() => {
    const updateManifest = () => {
      // Find current organization data
      const currentOrg =
        ORGANIZATIONS.find((org) => org.id === organizationId) ||
        ORGANIZATIONS[0];

      // Create dynamic manifest
      const dynamicManifest = {
        name: `${currentOrg.name} BuildConnect`,
        short_name: `${currentOrg.name}`,
        description: `BuildConnect platform for ${currentOrg.name} - Special offers and promotions for building merchants`,
        start_url: "/?source=pwa",
        display: "standalone",
        orientation: "portrait",
        theme_color: getThemeColor(currentOrg.id),
        background_color: "#ffffff",
        icons: [
          {
            src: `${getIconUrl(currentOrg.id, 192)}`,
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: `${getIconUrl(currentOrg.id, 512)}`,
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],

        related_applications: [],
        prefer_related_applications: false,
        shortcuts: [
          {
            name: "View Offers",
            short_name: "Offers",
            description: "View all special offers",
            url: "/offer-discovery",
            icons: [
              { src: `${getIconUrl(currentOrg.id, 96)}`, sizes: "96x96" },
            ],
          },
          {
            name: "Dashboard",
            short_name: "Dashboard",
            description: "Go to your dashboard",
            url: `/${getUserTypeRoute(currentOrg.id)}`,
            icons: [
              { src: `${getIconUrl(currentOrg.id, 96)}`, sizes: "96x96" },
            ],
          },
        ],
      };

      // Create or update the manifest link element
      let link = document.querySelector('link[rel="manifest"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "manifest";
        document.head.appendChild(link);
      }

      // Create a blob URL for the manifest JSON
      const manifestBlob = new Blob([JSON.stringify(dynamicManifest)], {
        type: "application/json",
      });
      const manifestURL = URL.createObjectURL(manifestBlob);

      // Set the href attribute to the blob URL
      link.setAttribute("href", manifestURL);

      // Update theme color meta tag
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (!metaThemeColor) {
        metaThemeColor = document.createElement("meta");
        metaThemeColor.setAttribute("name", "theme-color");
        document.head.appendChild(metaThemeColor);
      }
      metaThemeColor.setAttribute("content", getThemeColor(currentOrg.id));

      // Update apple-touch-icon for iOS
      let appleTouchIcon = document.querySelector(
        'link[rel="apple-touch-icon"]'
      );
      if (!appleTouchIcon) {
        appleTouchIcon = document.createElement("link");
        appleTouchIcon.setAttribute("rel", "apple-touch-icon");
        document.head.appendChild(appleTouchIcon);
      }
      appleTouchIcon.setAttribute("href", getIconUrl(currentOrg.id, 192));

      setManifestUpdated(true);

      // Clean up the blob URL when the component unmounts
      return () => URL.revokeObjectURL(manifestURL);
    };

    updateManifest();
  }, [organizationId]);

  // Helper functions
  function getThemeColor(orgId: string): string {
    const themeColors = {
      toolbank: "#E11D48", // Red
      nmbs: "#1E40AF", // Blue
      ibc: "#047857", // Green
      bmf: "#4F46E5", // Indigo
    };

    return themeColors[orgId as keyof typeof themeColors] || "#1E293B"; // Default slate
  }

  function getIconUrl(orgId: string, size: number): string {
    // In a real implementation, you would have organization-specific icons
    // For this example, we're using placeholder images
    return `https://picsum.photos/seed/${orgId}-icon-${size}/${size}/${size}`;
  }

  function getUserTypeRoute(orgId: string): string {
    // This would be based on user type in a real implementation
    return "supplier-dashboard";
  }

  return (
    <>
      {children}
      {manifestUpdated && (
        <div className="sr-only" aria-live="polite">
          PWA manifest updated for {organizationId}
        </div>
      )}
    </>
  );
}
