# UK Building Merchant SaaS - Project Instructions for Claudia

## 🏗️ Project Overview
This platform digitizes Toolbank's successful "Real Deals for You" promotion model, expanding it to serve the broader UK Building Merchant sector including NMBS, IBC, BMF, and other buying groups. The system connects suppliers, merchants, and consumers through special offers while preserving each organization's unique identity and "Keeping the Tool Trade Local" ethos.

## 🚨 CRITICAL RULES - NEVER VIOLATE

### 1. Polymet Components are SACRED
- **NEVER alter the existing Polymet.ai components** in `src/polymet`
- **PRESERVE all styling, UX/UI patterns, and component structure**
- **EXTEND components only by creating NEW variants or composing existing ones**
- **MAINTAIN the existing design system and Tailwind classes**
- **RESPECT the component hierarchy and dependencies**

### 2. Multi-Organization Architecture is NON-NEGOTIABLE
- **ALWAYS support Toolbank, NMBS, IBC, BMF, and future organizations**
- **MAINTAIN organization-specific branding and business rules**
- **IMPLEMENT proper data isolation with configurable sharing**
- **PRESERVE each organization's unique value propositions**
- **ENABLE cross-organization functionality where appropriate**

### 3. Supabase Integration is MANDATORY
- **USE Supabase for ALL data operations, authentication, and media storage**
- **IMPLEMENT proper RLS (Row Level Security) policies**
- **MAINTAIN proper multi-tenancy at the database level**
- **HANDLE media uploads (images, videos) through Supabase Storage**

## 📋 Technical Architecture Requirements

### Database Schema Compliance
- **FOLLOW the exact schema outlined in the architecture document**
- **IMPLEMENT organization_id foreign keys in relevant tables**
- **MAINTAIN proper relationships between users, organizations, suppliers, merchants**
- **USE the fixed PostgreSQL functions with SET search_path = public**

### Frontend Structure Requirements
- **MAINTAIN the existing file structure under `src/polymet`**
- **USE the documented component relationships and dependencies**
- **PRESERVE the layout system (main-layout, auth-layout)**
- **FOLLOW the routing structure defined in build-connect-app prototype**
- **IMPLEMENT responsive design with mobile-first approach**

### Progressive Web App (PWA) Standards
- **ENSURE installable PWA with offline capabilities**
- **IMPLEMENT service worker for caching strategies**
- **PROVIDE native-like experience on mobile devices**
- **SUPPORT push notifications for offer updates**
- **OPTIMIZE for performance with < 2 second load times**

## 🎯 User Experience Guidelines

### User Personas (from PRD)
1. **Supplier Marketing Manager** (30-50 years, moderate tech skills)
2. **Independent Merchant Owner** (35-60 years, basic-moderate tech skills)
3. **Trade Professional/DIY Consumer** (25-65 years, increasingly digital-savvy)
4. **Buying Group Marketing Director** (35-55 years, moderate-high tech skills)

### UX Principles
- **SIMPLIFY workflows for users with limited technical expertise**
- **PROVIDE clear visual organization indicators throughout the platform**
- **IMPLEMENT intuitive navigation that respects traditional business relationships**
- **ENSURE accessibility compliance (WCAG standards)**
- **MAINTAIN consistent branding application across organizations**

## 🔧 Implementation Standards

### Component Development
- **EXTEND existing Polymet components by composition, not modification**
- **CREATE new components following the established naming conventions**
- **MAINTAIN the documented component hierarchy and relationships**
- **IMPLEMENT proper TypeScript definitions for all props and state**
- **ENSURE dark/light mode compatibility using Tailwind classes**

### API Development
- **IMPLEMENT comprehensive RESTful APIs for all platform functionality**
- **MAINTAIN organization-aware endpoints with proper filtering**
- **PROVIDE webhook support for event-driven integrations**
- **ENSURE rate limiting appropriate to organization size**
- **IMPLEMENT proper error handling and validation**

### Media Handling
- **STORE all product images, videos, and documents in Supabase Storage**
- **IMPLEMENT CDN delivery for optimal performance**
- **SUPPORT multiple image formats and video demonstrations**
- **PROVIDE image optimization and responsive delivery**
- **ENABLE bulk media upload capabilities for suppliers**

## 📊 Feature Implementation Priorities

### Phase 1: Foundation (Current Focus)
1. **Multi-organization configuration system**
2. **Supplier offer creation portal**
3. **Basic merchant interface**
4. **Consumer-facing PWA core**
5. **Essential analytics dashboard**

### Integration Requirements
- **SUPPORT JavaScript widget embedding for merchant websites**
- **IMPLEMENT QR code generation for in-store promotions**
- **PROVIDE social media sharing capabilities**
- **ENABLE third-party service integrations (email marketing, CRM)**
- **SUPPORT API access for large merchants and suppliers**

## 🔐 Security and Compliance

### Authentication & Authorization
- **IMPLEMENT role-based access control with organization context**
- **ENSURE proper user verification and approval workflows**
- **MAINTAIN secure API authentication with OAuth 2.0**
- **PROVIDE multi-factor authentication for administrative access**
- **IMPLEMENT audit logging for all system activities**

### Data Protection
- **ENSURE GDPR compliance for user data protection**
- **IMPLEMENT proper data encryption in transit and at rest**
- **MAINTAIN organization-specific data isolation**
- **PROVIDE data export capabilities for users**
- **IMPLEMENT proper data retention policies**

## 🚀 Getting Started Commands

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

### Database Operations
```bash
# Generate Supabase types
npm run db:generate-types

# Run migrations
npm run db:migrate

# Reset database
npm run db:reset
```

## ⚠️ Common Pitfalls to Avoid

1. **NEVER modify existing Polymet components directly**
2. **DON'T implement features without organization context**
3. **AVOID bypassing Supabase for data operations**
4. **DON'T ignore mobile-first design principles**
5. **NEVER compromise on security or data isolation**
6. **AVOID implementing features that break organizational boundaries**
7. **DON'T overlook accessibility requirements**
8. **NEVER ignore the established component hierarchy**

## 📱 Mobile-First Development

### Performance Requirements
- **ACHIEVE < 2 second page load times on mobile**
- **IMPLEMENT efficient caching strategies**
- **OPTIMIZE images and media for mobile consumption**
- **PROVIDE offline access to critical functionality**
- **ENSURE smooth performance on older devices**

### User Experience
- **DESIGN touch-friendly interfaces with appropriate target sizes**
- **IMPLEMENT swipe gestures where appropriate**
- **PROVIDE clear navigation patterns for mobile users**
- **ENSURE readability on small screens**
- **SUPPORT both portrait and landscape orientations**

---

Remember: This platform serves as the digital backbone for the UK Building Merchant sector, digitizing traditional promotional models while preserving the unique value propositions of each participating organization. Every implementation decision should enhance rather than disrupt existing business relationships and workflows.