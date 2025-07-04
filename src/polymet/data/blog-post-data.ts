export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
  author?: string;
  authorAvatar?: string;
  featured?: boolean;
  externalUrl?: string;
  trending?: boolean;
}

export const BLOG_CATEGORIES = [
  "All News",
  "Industry Updates",
  "Digital Transformation",
  "Market Analysis",
  "Member Spotlight",
  "Technology Trends",
  "Regulatory Changes",
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "UK Builders Merchants Report 7.2% Growth in Q2 2023",
    excerpt:
      "Latest figures from the Builders Merchants Building Index (BMBI) reveal a strong performance across the sector despite economic challenges.",
    category: "Market Analysis",
    date: "2023-09-15",
    readTime: "4 min",
    image: "https://picsum.photos/seed/news1/800/500",
    author: "Sarah Thompson",
    authorAvatar: "https://github.com/yusufhilmi.png",
    featured: true,
    externalUrl: "https://www.buildersmerchantsnews.co.uk/article/1",
    trending: true,
  },
  {
    id: "2",
    title: "New Digital Platform Connects Independent Merchants with Suppliers",
    excerpt:
      "BuildConnect launches innovative solution to streamline promotional activities between buying groups, suppliers, and independent merchants.",
    category: "Digital Transformation",
    date: "2023-09-10",
    readTime: "5 min",
    image: "https://picsum.photos/seed/news2/800/500",
    author: "James Wilson",
    authorAvatar: "https://github.com/furkanksl.png",
  },
  {
    id: "3",
    title:
      "Government Announces New Sustainability Standards for Building Materials",
    excerpt:
      "New regulations will require merchants and suppliers to meet stricter environmental criteria starting January 2024.",
    category: "Regulatory Changes",
    date: "2023-09-08",
    readTime: "6 min",
    image: "https://picsum.photos/seed/news3/800/500",
    author: "Michael Roberts",
    authorAvatar: "https://github.com/kdrnp.png",
    externalUrl: "https://www.buildersmerchantsnews.co.uk/article/3",
  },
  {
    id: "4",
    title: "NMBS Conference 2023: Digital Innovation Takes Center Stage",
    excerpt:
      "Annual conference highlights the growing importance of technology adoption in the building merchant sector.",
    category: "Industry Updates",
    date: "2023-09-05",
    readTime: "3 min",
    image: "https://picsum.photos/seed/news4/800/500",
    author: "Emma Davis",
    authorAvatar: "https://github.com/yahyabedirhan.png",
    trending: true,
  },
  {
    id: "5",
    title: "Toolbank Expands Network with Five New Regional Hubs",
    excerpt:
      "Major expansion aims to improve delivery times and product availability for independent merchants across the UK.",
    category: "Member Spotlight",
    date: "2023-09-01",
    readTime: "4 min",
    image: "https://picsum.photos/seed/news5/800/500",
    author: "David Johnson",
    authorAvatar: "https://github.com/denizbuyuktas.png",
    externalUrl: "https://www.buildersmerchantsnews.co.uk/article/5",
  },
  {
    id: "6",
    title: "AI-Powered Inventory Management: The Future for Merchants",
    excerpt:
      "New technologies promise to revolutionize stock control and reduce waste in the building materials supply chain.",
    category: "Technology Trends",
    date: "2023-08-28",
    readTime: "5 min",
    image: "https://picsum.photos/seed/news6/800/500",
    author: "Sarah Thompson",
    authorAvatar: "https://github.com/yusufhilmi.png",
    trending: true,
  },
  {
    id: "7",
    title: "BMF Launches Apprenticeship Initiative to Address Skills Shortage",
    excerpt:
      "New program aims to bring fresh talent into the building merchant industry with specialized training and mentorship.",
    category: "Industry Updates",
    date: "2023-08-25",
    readTime: "4 min",
    image: "https://picsum.photos/seed/news7/800/500",
    author: "James Wilson",
    authorAvatar: "https://github.com/furkanksl.png",
    externalUrl: "https://www.buildersmerchantsnews.co.uk/article/7",
  },
  {
    id: "8",
    title: "Supply Chain Disruptions Ease as Global Shipping Stabilizes",
    excerpt:
      "Building merchants report improved product availability and more predictable lead times after months of uncertainty.",
    category: "Market Analysis",
    date: "2023-08-20",
    readTime: "3 min",
    image: "https://picsum.photos/seed/news8/800/500",
    author: "Michael Roberts",
    authorAvatar: "https://github.com/kdrnp.png",
  },
  {
    id: "9",
    title: "Independent Merchant Group Reports Record Membership Growth",
    excerpt:
      "Smaller merchants increasingly joining buying groups to remain competitive in challenging market conditions.",
    category: "Member Spotlight",
    date: "2023-08-15",
    readTime: "4 min",
    image: "https://picsum.photos/seed/news9/800/500",
    author: "Emma Davis",
    authorAvatar: "https://github.com/yahyabedirhan.png",
    externalUrl: "https://www.buildersmerchantsnews.co.uk/article/9",
  },
  {
    id: "10",
    title: "New Mobile Apps Transforming Customer Experience at Point of Sale",
    excerpt:
      "Building merchants embrace digital tools to streamline purchasing and improve service for trade customers.",
    category: "Digital Transformation",
    date: "2023-08-10",
    readTime: "5 min",
    image: "https://picsum.photos/seed/news10/800/500",
    author: "David Johnson",
    authorAvatar: "https://github.com/denizbuyuktas.png",
  },
  {
    id: "11",
    title: "Sustainable Building Materials Market Set to Double by 2025",
    excerpt:
      "Research indicates rapidly growing demand for eco-friendly products across the UK construction sector.",
    category: "Market Analysis",
    date: "2023-08-05",
    readTime: "6 min",
    image: "https://picsum.photos/seed/news11/800/500",
    author: "Sarah Thompson",
    authorAvatar: "https://github.com/yusufhilmi.png",
    externalUrl: "https://www.buildersmerchantsnews.co.uk/article/11",
  },
  {
    id: "12",
    title: "Building Regulations Update: What Merchants Need to Know",
    excerpt:
      "Comprehensive guide to the latest regulatory changes affecting product specifications and compliance.",
    category: "Regulatory Changes",
    date: "2023-08-01",
    readTime: "7 min",
    image: "https://picsum.photos/seed/news12/800/500",
    author: "James Wilson",
    authorAvatar: "https://github.com/furkanksl.png",
    trending: true,
  },
];

export const UPCOMING_EVENTS = [
  {
    id: "e1",
    title: "UK Construction Week",
    date: "October 3-5, 2023",
    location: "NEC, Birmingham",
    url: "#",
  },
  {
    id: "e2",
    title: "BMF All-Industry Conference",
    date: "November 15-17, 2023",
    location: "London ExCeL",
    url: "#",
  },
  {
    id: "e3",
    title: "Builders' Merchants Awards",
    date: "December 8, 2023",
    location: "Park Plaza Westminster, London",
    url: "#",
  },
  {
    id: "e4",
    title: "National Merchant Buying Society Conference",
    date: "January 25-26, 2024",
    location: "Coventry Building Society Arena",
    url: "#",
  },
];

export const QUICK_LINKS = [
  {
    title: "Builders Merchants Federation",
    url: "#",
  },
  {
    title: "Construction Products Association",
    url: "#",
  },
  {
    title: "Builders Merchants News",
    url: "#",
  },
  {
    title: "Construction Industry Training Board",
    url: "#",
  },
  {
    title: "National Merchant Buying Society",
    url: "#",
  },
];

export const SOCIAL_FEED = [
  {
    id: "s1",
    platform: "Twitter",
    author: "BuildersMerchantNews",
    content:
      "New report shows 15% increase in timber sales across UK merchants in August. Read the full analysis on our website.",
    date: "2 hours ago",
    url: "#",
  },
  {
    id: "s2",
    platform: "LinkedIn",
    author: "Builders Merchants Federation",
    content:
      "Congratulations to our member John Smith Builders Merchants on their 50th anniversary! A true success story in independent merchant growth.",
    date: "1 day ago",
    url: "#",
  },
  {
    id: "s3",
    platform: "Twitter",
    author: "NMBS_UK",
    content:
      "Registration now open for our January 2024 conference. Early bird tickets available until October 31st.",
    date: "2 days ago",
    url: "#",
  },
];
