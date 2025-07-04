# UK Building Merchant SaaS

A comprehensive digital marketing platform for the UK Building Merchant sector, digitizing special offer promotions across suppliers, merchants, and consumers. Inspired by Toolbank's successful "Real Deals for You" promotion and designed to serve multiple organizations (Toolbank, NMBS, BMN, BMF) while preserving their unique identities.

## 🏗️ Project Overview

This platform connects:
- **Suppliers** (Tool and building material manufacturers)
- **Merchants/Retailers** (Local building merchants and trade suppliers)  
- **End Consumers** (Trade professionals and DIY customers)
- **Organizations** (Toolbank, NMBS, BMN, BMF, and other buying groups)

### Key Features
- Multi-organization architecture with custom branding
- Supplier portal for creating special offers
- Merchant dashboard with website integration widgets
- Consumer-facing Progressive Web App
- Location-based merchant discovery
- Comprehensive analytics and reporting
- API ecosystem for third-party integrations

## 📚 Project Documentation

All project documentation is located in the `/docs` folder:

- **`PRD_UK_Building_Merchant_SaaS.pdf`** - Complete Product Requirements Document
- **`Architecture_UK_Building_Merchant_SaaS.pdf`** - Technical architecture and system design
- **`Features_UK_Building_Merchant_SaaS.pdf`** - Detailed feature specifications with API endpoints
- **`Actions_UK_Building_Merchant_SaaS.pdf`** - Step-by-step implementation action plan
- **`project-instructions.md`** - Comprehensive development guidelines and rules
- **`claude-code-rules.md`** - Specific rules for Claude Code development in Windsurf

## 🚨 Critical Development Rules

### Polymet Component System - SACRED RULES
1. **NEVER alter existing Polymet components** in `/src/polymet`
2. **PRESERVE all styling, UX/UI patterns, and component structure**
3. **EXTEND components only by creating NEW variants or composing existing ones**
4. **MAINTAIN the existing design system and Tailwind classes**
5. **RESPECT the component hierarchy documented in Components_06.rtf**

### Multi-Organization Architecture
- Support Toolbank, NMBS, BMN, BMF, and future organizations
- Maintain organization-specific branding and business rules
- Implement proper data isolation with configurable sharing
- Preserve each organization's unique value propositions

### Technology Stack
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **PWA**: Vite + PWA Plugin for offline capabilities
- **Maps**: React Leaflet for location services
- **Charts**: Recharts for analytics visualization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account and project
- Git for version control

### Environment Setup
1. Copy `.env.example` to `.env.local`
2. Add your Supabase project credentials
3. Configure organization-specific settings

### Installation
```bash
npm install
npm run dev
```

### Database Setup
```bash
# Apply database migrations
npm run db:migrate

# Generate TypeScript types from Supabase
npm run db:generate-types
```

## 📁 Project Structure

```
uk-building-merchant-saas/
├── docs/                          # Project documentation
├── src/
│   ├── polymet/                   # SACRED - Do not modify
│   │   ├── components/            # Reusable UI components
│   │   ├── pages/                 # Page components
│   │   ├── layouts/               # Layout templates
│   │   ├── data/                  # Mock data and types
│   │   └── prototypes/            # Application prototypes
│   ├── lib/                       # Utility libraries
│   ├── services/                  # API and external services
│   └── types/                     # TypeScript type definitions
├── database/
│   ├── migrations/                # Database schema migrations
│   └── functions/                 # Supabase functions
├── public/                        # Static assets
└── tests/                         # Test files
```

## 🎯 Development Phases

### Phase 1: Foundation (Current)
- [ ] Multi-organization configuration system
- [ ] Supplier offer creation portal
- [ ] Basic merchant interface
- [ ] Consumer-facing PWA core
- [ ] Essential analytics dashboard

### Phase 2: Enhanced Features
- [ ] Advanced offer management
- [ ] Website widget integration
- [ ] Enhanced merchant tools
- [ ] Cross-organization analytics
- [ ] Social media integration

### Phase 3: Advanced Capabilities
- [ ] Machine learning recommendations
- [ ] Advanced targeting
- [ ] Complete API ecosystem
- [ ] Third-party integrations
- [ ] Performance optimization

## 🔧 Key Technologies

### Frontend Stack
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **React Query** for data fetching and caching
- **React Hook Form** with Zod validation

### Backend Services
- **Supabase** for authentication, database, and storage
- **PostgreSQL** with Row Level Security (RLS)
- **Real-time subscriptions** for live updates
- **Edge Functions** for server-side processing

### Progressive Web App
- **Vite PWA Plugin** for service worker generation
- **Workbox** for caching strategies
- **Push Notifications** for offer updates
- **Offline Support** for critical functionality

## 📊 User Personas

1. **Supplier Marketing Manager** (30-50 years, moderate tech skills)
2. **Independent Merchant Owner** (35-60 years, basic-moderate tech skills)
3. **Trade Professional/DIY Consumer** (25-65 years, digital-savvy)
4. **Buying Group Marketing Director** (35-55 years, high tech skills)

## 🔐 Security & Compliance

- GDPR compliant data handling
- Role-based access control with organization context
- Secure API authentication with OAuth 2.0
- Data encryption in transit and at rest
- Comprehensive audit logging

## 📈 Analytics & Reporting

- Supplier engagement across organizations
- Merchant adoption and performance metrics
- Consumer behavior and preferences
- Cross-organization benchmarking
- ROI measurement for promotional activities

## 🤝 Contributing

Please read the development rules in `/docs/claude-code-rules.md` before contributing. All changes must:
- Preserve existing Polymet component structure
- Support multi-organization architecture
- Follow established coding standards
- Include appropriate tests

## 📞 Support

For questions about development or implementation, reference the comprehensive documentation in the `/docs` folder.

---

**Important**: This platform preserves the traditional business relationships in the UK Building Merchant sector while providing modern digital capabilities. Every implementation decision should enhance rather than disrupt existing workflows and organizational identities.