## 🎯 Document Overview

### Product Requirements Document (PRD)
**Purpose**: Defines the complete product vision, user personas, business objectives, and success metrics.

**Key Sections**:
- Executive Summary with target market analysis
- User personas for Supplier Marketing Managers, Merchant Owners, Trade Professionals, and Buying Group Directors
- Core features and functionality specifications
- Technical requirements and implementation roadmap
- Success criteria and evaluation metrics

### Architecture Document
**Purpose**: Technical architecture and system design for the multi-organization SaaS platform.

**Key Sections**:
- Multi-organization configuration system
- Supplier offer creation portal
- Merchant interface and website widgets
- Consumer-facing Progressive Web App
- Analytics and reporting infrastructure
- Integration capabilities and API ecosystem

### Features Document
**Purpose**: Detailed technical specifications for all platform features.

**Key Sections**:
- Database schema design
- API endpoint specifications
- Component relationships and dependencies
- Integration requirements
- Security and compliance specifications

### Actions Document
**Purpose**: Step-by-step implementation plan with task breakdowns.

**Key Sections**:
- Project setup and infrastructure
- Multi-organization core functionality
- Offer creation and management system
- Merchant experience implementation
- Consumer-facing PWA development
- Analytics and reporting system
- Testing, optimization, and deployment

## 🚨 Critical Information for Developers

### Multi-Organization Support
The platform must support:
- **Toolbank**: "Keeping the Tool Trade Local" ethos
- **NMBS**: 1,250+ merchant members
- **BMN**: Builders' Merchants News
- **BMF**: 1,020+ merchant, supplier and service companies

### User Personas
1. **Supplier Marketing Manager** (30-50 years, moderate tech skills)
2. **Independent Merchant Owner** (35-60 years, basic-moderate tech skills)  
3. **Trade Professional/DIY Consumer** (25-65 years, digital-savvy)
4. **Buying Group Marketing Director** (35-55 years, high tech skills)

### Technical Stack
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **PWA**: Vite + PWA Plugin
- **Components**: Polymet.ai component system (NEVER MODIFY)

### Key Features
- Multi-organization configuration with custom branding
- Supplier portal for special offer creation
- Merchant dashboard with website integration
- Consumer PWA for offer discovery
- Location-based merchant finder
- Comprehensive analytics and reporting

## 📞 Usage Instructions

### For Development Teams
1. Read the PRD to understand business requirements
2. Review the Architecture document for technical approach
3. Use the Features document for implementation details
4. Follow the Actions document for step-by-step development
5. Adhere to the claude-code-rules.md for development standards

### For Project Management
1. Use the Actions document for project planning
2. Reference the PRD for stakeholder communication
3. Track progress against defined success metrics
4. Ensure multi-organization requirements are met

### For Quality Assurance
1. Test against all four organization contexts
2. Validate user personas and workflows
3. Ensure mobile-first responsive design
4. Verify accessibility compliance (WCAG)

## 🔄 Document Updates

These documents should be updated when:
- New organizations are added to the platform
- User personas evolve based on feedback
- Technical architecture changes
- New features are added or modified
- Security requirements change

## 📋 Quick Reference

### Organizations Supported
- Toolbank (Wholesaler)
- NMBS (Buying Group) 
- BMN (News Organization)
- BMF (Trade Association)

### Core User Flows
1. Supplier creates multi-organization offers
2. Merchant selects and promotes offers
3. Consumer discovers offers and finds local merchants
4. Organization admins manage approval workflows

### Success Metrics
- Supplier engagement rate across organizations
- Merchant adoption of website widgets
- Consumer app installation and usage
- Cross-organization participation rates

---

**Important**: All development must preserve existing Polymet components while adding sophisticated multi-organization functionality for the UK Building Merchant sector.