export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  linkedIn?: string;
}

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "james-wilson",
    name: "James Wilson",
    role: "CEO & Co-Founder",
    bio: "With over 25 years in the UK building merchant industry, James previously led digital transformation at a major buying group. His vision for preserving traditional merchant relationships while embracing digital innovation drives BuildConnect's mission.",
    avatar: "https://github.com/yusufhilmi.png",
    linkedIn: "https://linkedin.com/in/jameswilson",
  },
  {
    id: "sarah-thompson",
    name: "Sarah Thompson",
    role: "COO & Co-Founder",
    bio: "Sarah brings 20 years of operational experience from both supplier and merchant perspectives. Her deep understanding of the supply chain challenges helps BuildConnect create solutions that work for all stakeholders.",
    avatar: "https://github.com/denizbuyuktas.png",
    linkedIn: "https://linkedin.com/in/sarahthompson",
  },
  {
    id: "michael-roberts",
    name: "Michael Roberts",
    role: "CTO",
    bio: "Michael combines technical expertise with industry knowledge, having previously developed digital solutions for several major UK building product manufacturers. He leads our engineering team in creating intuitive, powerful technology.",
    avatar: "https://github.com/furkanksl.png",
    linkedIn: "https://linkedin.com/in/michaelroberts",
  },
  {
    id: "elizabeth-parker",
    name: "Elizabeth Parker",
    role: "Head of Partnerships",
    bio: "Elizabeth has spent 15 years building relationships across the UK construction industry. She works closely with organizations, suppliers, and merchants to ensure BuildConnect meets the needs of all stakeholders.",
    avatar: "https://github.com/yahyabedirhan.png",
    linkedIn: "https://linkedin.com/in/elizabethparker",
  },
];

export const COMPANY_VALUES: CompanyValue[] = [
  {
    id: "local-first",
    title: "Local First",
    description:
      "We believe in the power of local, independent merchants and their vital role in communities across the UK.",
    icon: "HomeIcon",
  },
  {
    id: "industry-expertise",
    title: "Industry Expertise",
    description:
      "Our team brings decades of experience in the building merchant sector, ensuring solutions that address real industry needs.",
    icon: "BuildingIcon",
  },
  {
    id: "digital-innovation",
    title: "Digital Innovation",
    description:
      "We harness technology to solve traditional challenges while respecting established industry relationships and practices.",
    icon: "ZapIcon",
  },
  {
    id: "collaborative-growth",
    title: "Collaborative Growth",
    description:
      "We succeed when our partners succeed, creating value for organizations, suppliers, merchants, and consumers alike.",
    icon: "UsersIcon",
  },
];
