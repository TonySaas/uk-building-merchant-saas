export interface NavigationItem {
  id: string;
  title: string;
  icon: string;
  path?: string;
  badge?: number;
  children?: NavigationItem[];
}

export type UserRole = "Organization Admin" | "Supplier" | "Merchant";

export interface Organization {
  id: string;
  name: string;
  type: "Wholesaler" | "Buying Group" | "Trade Association";
  logo?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  company?: string;
}

export const ORGANIZATIONS: Organization[] = [
  {
    id: "org1",
    name: "BuildConnect Ltd",
    type: "Wholesaler",
    logo: "https://github.com/polymet-ai.png",
  },
  {
    id: "org2",
    name: "UK Builders Group",
    type: "Buying Group",
    logo: "https://picsum.photos/seed/ukbuilders/200/200",
  },
  {
    id: "org3",
    name: "National Trade Association",
    type: "Trade Association",
    logo: "https://picsum.photos/seed/nta/200/200",
  },
  {
    id: "org4",
    name: "City Merchants",
    type: "Wholesaler",
    logo: "https://picsum.photos/seed/citymerch/200/200",
  },
];

export const CURRENT_USER: User = {
  id: "user1",
  name: "Alex Johnson",
  email: "alex@buildconnect.co.uk",
  avatar: "https://github.com/yusufhilmi.png",
  role: "Organization Admin",
  company: "BuildConnect Ltd",
};

export const NAVIGATION_ITEMS: Record<UserRole, NavigationItem[]> = {
  "Organization Admin": [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: "LayoutDashboard",
      path: "/dashboard",
    },
    {
      id: "offer-management",
      title: "Offer Management",
      icon: "Target",
      badge: 5,
      children: [
        {
          id: "approval-queue",
          title: "Approval Queue",
          icon: "CheckSquare",
          path: "/offers/approval",
          badge: 5,
        },
        {
          id: "published-offers",
          title: "Published Offers",
          icon: "FileCheck",
          path: "/offers/published",
        },
        {
          id: "performance-analytics",
          title: "Performance Analytics",
          icon: "BarChart",
          path: "/offers/analytics",
        },
      ],
    },
    {
      id: "user-management",
      title: "User Management",
      icon: "Users",
      children: [
        {
          id: "members",
          title: "Members",
          icon: "User",
          path: "/users/members",
        },
        {
          id: "roles-permissions",
          title: "Roles & Permissions",
          icon: "Lock",
          path: "/users/roles",
        },
        {
          id: "invitations",
          title: "Invitations",
          icon: "UserPlus",
          path: "/users/invitations",
          badge: 2,
        },
      ],
    },
    {
      id: "organization-settings",
      title: "Organization Settings",
      icon: "Building",
      children: [
        {
          id: "profile-branding",
          title: "Profile & Branding",
          icon: "Pencil",
          path: "/settings/profile",
        },
        {
          id: "business-rules",
          title: "Business Rules",
          icon: "FileText",
          path: "/settings/rules",
        },
        {
          id: "integrations",
          title: "Integrations",
          icon: "Link",
          path: "/settings/integrations",
        },
      ],
    },
    {
      id: "merchants",
      title: "Merchants",
      icon: "Store",
      path: "/merchants",
    },
    {
      id: "suppliers",
      title: "Suppliers",
      icon: "Package",
      path: "/suppliers",
    },
    {
      id: "analytics-reports",
      title: "Analytics & Reports",
      icon: "LineChart",
      path: "/analytics",
    },
  ],

  Supplier: [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: "LayoutDashboard",
      path: "/dashboard",
    },
    {
      id: "create-offer",
      title: "Create Offer",
      icon: "Plus",
      path: "/offers/create",
    },
    {
      id: "manage-offers",
      title: "Manage Offers",
      icon: "FileText",
      children: [
        {
          id: "active-offers",
          title: "Active Offers",
          icon: "CheckCircle",
          path: "/offers/active",
          badge: 3,
        },
        {
          id: "scheduled-offers",
          title: "Scheduled Offers",
          icon: "Calendar",
          path: "/offers/scheduled",
        },
        {
          id: "draft-offers",
          title: "Draft Offers",
          icon: "Save",
          path: "/offers/drafts",
          badge: 2,
        },
      ],
    },
    {
      id: "analytics",
      title: "Analytics",
      icon: "BarChart",
      children: [
        {
          id: "offer-performance",
          title: "Offer Performance",
          icon: "TrendingUp",
          path: "/analytics/performance",
        },
        {
          id: "organization-breakdown",
          title: "Organization Breakdown",
          icon: "PieChart",
          path: "/analytics/organizations",
        },
      ],
    },
    {
      id: "organizations",
      title: "Organizations",
      icon: "Building",
      path: "/organizations",
    },
    {
      id: "media-library",
      title: "Media Library",
      icon: "Image",
      path: "/media",
    },
  ],

  Merchant: [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: "LayoutDashboard",
      path: "/dashboard",
    },
    {
      id: "browse-offers",
      title: "Browse Offers",
      icon: "ShoppingBag",
      path: "/offers",
      badge: 8,
    },
    {
      id: "my-promotions",
      title: "My Promotions",
      icon: "Target",
      children: [
        {
          id: "active-promotions",
          title: "Active",
          icon: "CheckCircle",
          path: "/promotions/active",
        },
        {
          id: "scheduled-promotions",
          title: "Scheduled",
          icon: "Calendar",
          path: "/promotions/scheduled",
          badge: 2,
        },
      ],
    },
    {
      id: "website-integration",
      title: "Website Integration",
      icon: "Link",
      children: [
        {
          id: "widget-setup",
          title: "Widget Setup",
          icon: "Code",
          path: "/integration/widget",
        },
        {
          id: "qr-codes",
          title: "QR Codes",
          icon: "QrCode",
          path: "/integration/qr",
        },
      ],
    },
    {
      id: "store-management",
      title: "Store Management",
      icon: "Store",
      children: [
        {
          id: "locations",
          title: "Locations",
          icon: "MapPin",
          path: "/stores/locations",
        },
        {
          id: "inventory",
          title: "Inventory",
          icon: "Package",
          path: "/stores/inventory",
        },
      ],
    },
    {
      id: "customer-analytics",
      title: "Customer Analytics",
      icon: "Users",
      path: "/customers",
    },
  ],
};
