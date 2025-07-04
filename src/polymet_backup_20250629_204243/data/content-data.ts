export interface ContentItem {
  id: string;
  title: string;
  type: "image" | "video" | "copy";
  thumbnail: string;
  createdAt: string;
  status: "draft" | "published" | "scheduled" | "archived";
  performance: {
    views: number;
    shares: number;
    clicks: number;
  };
  campaign?: string;
  scheduledDate?: string;
  channels?: string[];
  tags?: string[];
}

export const CONTENT_DATA: ContentItem[] = [
  {
    id: "c1",
    title: "Premium Drill Set Launch",
    type: "image",
    thumbnail: "https://picsum.photos/seed/drill1/800/600",
    createdAt: "2023-06-15",
    status: "published",
    performance: {
      views: 12500,
      shares: 450,
      clicks: 3200,
    },
    campaign: "Summer Tools Collection",
    channels: ["facebook", "instagram", "toolbank"],
  },
  {
    id: "c2",
    title: "How to Choose the Right Saw",
    type: "video",
    thumbnail: "https://picsum.photos/seed/saw1/800/600",
    createdAt: "2023-06-18",
    status: "published",
    performance: {
      views: 8700,
      shares: 320,
      clicks: 1800,
    },
    campaign: "DIY Education Series",
    channels: ["youtube", "facebook", "linkedin"],
  },
  {
    id: "c3",
    title: "10 Essential Tools Every Homeowner Needs",
    type: "copy",
    thumbnail: "https://picsum.photos/seed/tools1/800/600",
    createdAt: "2023-06-20",
    status: "scheduled",
    scheduledDate: "2023-07-05",
    performance: {
      views: 0,
      shares: 0,
      clicks: 0,
    },
    campaign: "Homeowner Essentials",
    channels: ["email", "linkedin", "bmf"],
  },
  {
    id: "c4",
    title: "New Hammer Collection",
    type: "image",
    thumbnail: "https://picsum.photos/seed/hammer1/800/600",
    createdAt: "2023-06-22",
    status: "draft",
    performance: {
      views: 0,
      shares: 0,
      clicks: 0,
    },
    tags: ["hammers", "tools", "new-products"],
  },
  {
    id: "c5",
    title: "Professional Plumbing Tools Showcase",
    type: "video",
    thumbnail: "https://picsum.photos/seed/plumbing1/800/600",
    createdAt: "2023-06-10",
    status: "published",
    performance: {
      views: 15200,
      shares: 780,
      clicks: 4100,
    },
    campaign: "Trade Professional Series",
    channels: ["youtube", "facebook", "nmbs", "ibc"],
  },
  {
    id: "c6",
    title: "Summer Garden Tools Special Offer",
    type: "copy",
    thumbnail: "https://picsum.photos/seed/garden1/800/600",
    createdAt: "2023-06-25",
    status: "scheduled",
    scheduledDate: "2023-07-01",
    performance: {
      views: 0,
      shares: 0,
      clicks: 0,
    },
    campaign: "Summer Garden",
    channels: ["email", "whatsapp", "sms"],
  },
  {
    id: "c7",
    title: "Power Tool Safety Guide",
    type: "copy",
    thumbnail: "https://picsum.photos/seed/safety1/800/600",
    createdAt: "2023-05-28",
    status: "published",
    performance: {
      views: 9300,
      shares: 620,
      clicks: 2700,
    },
    campaign: "Safety First",
    channels: ["email", "linkedin", "building-trade-magazine"],
  },
  {
    id: "c8",
    title: "New Screwdriver Set Unboxing",
    type: "video",
    thumbnail: "https://picsum.photos/seed/screwdriver1/800/600",
    createdAt: "2023-06-05",
    status: "published",
    performance: {
      views: 7400,
      shares: 280,
      clicks: 1500,
    },
    campaign: "Product Showcase",
    channels: ["youtube", "tiktok", "instagram"],
  },
  {
    id: "c9",
    title: "Limited Edition Toolbox",
    type: "image",
    thumbnail: "https://picsum.photos/seed/toolbox1/800/600",
    createdAt: "2023-06-28",
    status: "draft",
    performance: {
      views: 0,
      shares: 0,
      clicks: 0,
    },
    tags: ["toolbox", "limited-edition", "premium"],
  },
  {
    id: "c10",
    title: "Contractor's Guide to Quality Tools",
    type: "copy",
    thumbnail: "https://picsum.photos/seed/contractor1/800/600",
    createdAt: "2023-05-15",
    status: "archived",
    performance: {
      views: 6200,
      shares: 190,
      clicks: 950,
    },
    campaign: "Professional Series",
    channels: ["professional-builder", "construction-news"],
  },
  {
    id: "c11",
    title: "Measuring Tools Comparison",
    type: "image",
    thumbnail: "https://picsum.photos/seed/measuring1/800/600",
    createdAt: "2023-06-12",
    status: "published",
    performance: {
      views: 5800,
      shares: 210,
      clicks: 1200,
    },
    campaign: "Product Education",
    channels: ["facebook", "linkedin", "email"],
  },
  {
    id: "c12",
    title: "Workshop Organization Tips",
    type: "video",
    thumbnail: "https://picsum.photos/seed/workshop1/800/600",
    createdAt: "2023-06-08",
    status: "published",
    performance: {
      views: 11200,
      shares: 540,
      clicks: 2300,
    },
    campaign: "DIY Education Series",
    channels: ["youtube", "facebook", "instagram"],
  },
];

export const CAMPAIGN_DATA = [
  "Summer Tools Collection",
  "DIY Education Series",
  "Homeowner Essentials",
  "Trade Professional Series",
  "Summer Garden",
  "Safety First",
  "Product Showcase",
  "Professional Series",
  "Product Education",
  "New Product Launch",
  "Seasonal Promotion",
  "Trade Show Follow-up",
  "Special Offer",
];

export const CHANNEL_DATA = {
  socialMedia: [
    {
      id: "facebook",
      name: "Facebook Business",
      icon: "https://picsum.photos/seed/fb/32/32",
      connected: true,
    },
    {
      id: "linkedin",
      name: "LinkedIn Company Pages",
      icon: "https://picsum.photos/seed/li/32/32",
      connected: true,
    },
    {
      id: "twitter",
      name: "Twitter/X Business",
      icon: "https://picsum.photos/seed/tw/32/32",
      connected: true,
    },
    {
      id: "instagram",
      name: "Instagram Business",
      icon: "https://picsum.photos/seed/ig/32/32",
      connected: true,
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: "https://picsum.photos/seed/yt/32/32",
      connected: true,
    },
    {
      id: "tiktok",
      name: "TikTok Business",
      icon: "https://picsum.photos/seed/tt/32/32",
      connected: false,
    },
  ],

  buildingMerchant: [
    {
      id: "toolbank",
      name: "Toolbank Partner Network",
      icon: "https://picsum.photos/seed/tb/32/32",
      connected: true,
    },
    {
      id: "nmbs",
      name: "NMBS Member Network",
      icon: "https://picsum.photos/seed/nm/32/32",
      connected: true,
    },
    {
      id: "ibc",
      name: "BMN Partner Channels",
      icon: "https://picsum.photos/seed/ibc/32/32",
      connected: true,
    },
    {
      id: "bmf",
      name: "BMF Member Directory",
      icon: "https://picsum.photos/seed/bmf/32/32",
      connected: false,
    },
    {
      id: "merchant-websites",
      name: "Independent merchant websites",
      icon: "https://picsum.photos/seed/imw/32/32",
      connected: true,
    },
  ],

  directMarketing: [
    {
      id: "email",
      name: "Email newsletter",
      icon: "https://picsum.photos/seed/em/32/32",
      connected: true,
    },
    {
      id: "crm",
      name: "CRM system sync",
      icon: "https://picsum.photos/seed/crm/32/32",
      connected: true,
    },
    {
      id: "whatsapp",
      name: "WhatsApp Business API",
      icon: "https://picsum.photos/seed/wa/32/32",
      connected: false,
    },
    {
      id: "sms",
      name: "SMS marketing platforms",
      icon: "https://picsum.photos/seed/sms/32/32",
      connected: true,
    },
  ],

  tradePublications: [
    {
      id: "building-trade-magazine",
      name: "Building Trade Magazine",
      icon: "https://picsum.photos/seed/btm/32/32",
      connected: true,
    },
    {
      id: "professional-builder",
      name: "Professional Builder",
      icon: "https://picsum.photos/seed/pb/32/32",
      connected: true,
    },
    {
      id: "construction-news",
      name: "Construction News",
      icon: "https://picsum.photos/seed/cn/32/32",
      connected: false,
    },
    {
      id: "trade-newsletters",
      name: "Trade-specific newsletters",
      icon: "https://picsum.photos/seed/tn/32/32",
      connected: true,
    },
  ],
};

export const PERFORMANCE_SUMMARY = {
  bestPerforming: {
    id: "c5",
    title: "Professional Plumbing Tools Showcase",
    type: "video",
    performance: {
      views: 15200,
      shares: 780,
      clicks: 4100,
    },
  },
  topEngagementChannels: [
    { channel: "YouTube", engagement: 42 },
    { channel: "Facebook", engagement: 28 },
    { channel: "Email", engagement: 15 },
    { channel: "LinkedIn", engagement: 10 },
    { channel: "Other", engagement: 5 },
  ],

  merchantClickthroughByRegion: [
    { region: "North", rate: 3.8 },
    { region: "South", rate: 4.2 },
    { region: "East", rate: 2.9 },
    { region: "West", rate: 3.5 },
    { region: "Central", rate: 3.1 },
  ],

  contentTypePerformance: [
    { type: "Video", performance: 68 },
    { type: "Image", performance: 52 },
    { type: "Copy", performance: 37 },
  ],
};
