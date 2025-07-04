import { supabase } from './supabase';
import { getLogoUrl } from './storage';

export interface Organization {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  campaigns: string[];
}

// Default organization data with fallback logos
const DEFAULT_ORGANIZATIONS: Omit<Organization, 'logo'>[] = [
  {
    id: "toolbank",
    name: "Toolbank",
    description: "Leading tool distributor",
    website: "https://www.toolbank.com",
    campaigns: ["Real Deals for You", "Spring Promotion"],
  },
  {
    id: "nmbs",
    name: "NMBS",
    description: "Merchant buying society",
    website: "https://www.nmbs.co.uk",
    campaigns: ["Building Together", "Trade Pro Offers"],
  },
  {
    id: "ibc",
    name: "BMN",
    description: "Builders' Merchants News",
    website: "https://www.ibcbuying.co.uk",
    campaigns: ["Member Specials", "Seasonal Deals"],
  },
  {
    id: "bmf",
    name: "BMF",
    description: "Builders Merchants Federation",
    website: "https://www.bmf.org.uk",
    campaigns: ["Industry Connect", "Trade Advantage"],
  },
];

// Fallback logo URLs if not found in storage
const FALLBACK_LOGOS: Record<string, string> = {
  toolbank: "https://assets.polymet.ai/legal-white-266853",
  nmbs: "https://assets.polymet.ai/polite-lavender-543133",
  ibc: "https://picsum.photos/seed/ibc/200/200",
  bmf: "https://www.bmf.org.uk/wp-content/uploads/2021/09/BMF_Logo_White_RGB.png",
};

export const getOrganizations = async (): Promise<Organization[]> => {
  try {
    // In a real app, you would fetch this from your database
    // For now, we'll use the default data with logo handling
    return DEFAULT_ORGANIZATIONS.map(org => ({
      ...org,
      logo: FALLBACK_LOGOS[org.id] || ''
    }));
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return [];
  }
};

export const getOrganizationLogo = (organizationId: string, logoPath?: string): string => {
  if (logoPath) {
    return logoPath.startsWith('http') 
      ? logoPath 
      : getLogoUrl(organizationId, logoPath);
  }
  return FALLBACK_LOGOS[organizationId] || '';
};
