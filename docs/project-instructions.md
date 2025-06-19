 across organizations**
- **MONITOR merchant adoption and usage patterns**
- **ANALYZE consumer behavior and preferences**
- **PROVIDE ROI measurement for promotional activities**
- **ENABLE trend analysis and forecasting**

## 🚀 Deployment and Scaling

### Infrastructure Requirements
- **DEPLOY on cloud-native infrastructure for scalability**
- **IMPLEMENT auto-scaling for traffic variations**
- **PROVIDE 99.9% uptime SLA during business hours**
- **ENSURE geographic distribution for UK market**
- **IMPLEMENT comprehensive monitoring and alerting**

### Testing Standards
- **IMPLEMENT comprehensive unit and integration testing**
- **CONDUCT user acceptance testing with real merchants and suppliers**
- **PERFORM load testing for expected user volumes**
- **ENSURE cross-browser and device compatibility**
- **VALIDATE accessibility compliance**

## 📝 Documentation Requirements

### Code Documentation
- **MAINTAIN comprehensive component documentation**
- **PROVIDE clear API documentation with examples**
- **DOCUMENT all database schema changes**
- **INCLUDE integration guides for third-party services**
- **MAINTAIN up-to-date deployment instructions**

### User Documentation
- **CREATE user guides for each persona type**
- **PROVIDE video tutorials for complex workflows**
- **MAINTAIN troubleshooting guides**
- **DOCUMENT organization onboarding processes**
- **INCLUDE merchant widget implementation guides**

## ⚠️ Common Pitfalls to Avoid

1. **NEVER modify existing Polymet components directly**
2. **DON'T implement features without organization context**
3. **AVOID bypassing Supabase for data operations**
4. **DON'T ignore mobile-first design principles**
5. **NEVER compromise on security or data isolation**
6. **AVOID implementing features that break organizational boundaries**
7. **DON'T overlook accessibility requirements**
8. **NEVER ignore the established component hierarchy**

## 🔄 Change Management

### When Adding New Features
1. **ASSESS impact on existing Polymet components**
2. **ENSURE multi-organization compatibility**
3. **VALIDATE against user persona requirements**
4. **TEST across all supported organizations**
5. **UPDATE documentation accordingly**

### When Modifying Existing Code
1. **PRESERVE existing component interfaces**
2. **MAINTAIN backward compatibility**
3. **TEST thoroughly across organizations**
4. **ENSURE mobile functionality remains intact**
5. **VALIDATE against security requirements**

## 📦 Package and Dependency Management

### Core Dependencies
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for utility-first styling
- **Supabase** for backend services
- **React Query** for data fetching and caching
- **React Router** for navigation
- **Framer Motion** for animations
- **React Hook Form** with Zod validation

### Development Dependencies
- **Vite** for build tooling
- **ESLint** and **Prettier** for code quality
- **Vitest** for testing
- **Husky** for git hooks
- **TypeScript** for type checking

## 🏗️ Project Structure Details

```
uk-building-merchant-saas/
├── docs/                          # Project documentation
│   ├── PRD_UK_Building_Merchant_SaaS.pdf
│   ├── Architecture_UK_Building_Merchant_SaaS.pdf
│   ├── Features_UK_Building_Merchant_SaaS.pdf
│   ├── Actions_UK_Building_Merchant_SaaS.pdf
│   ├── project-instructions.md
│   └── claude-code-rules.md
├── src/
│   ├── polymet/                   # SACRED - Never modify
│   │   ├── components/            # Reusable UI components
│   │   ├── pages/                 # Page components
│   │   ├── layouts/               # Layout templates
│   │   ├── data/                  # Mock data and types
│   │   └── prototypes/            # Application prototypes
│   ├── components/                # New components (extend Polymet)
│   ├── pages/                     # New pages
│   ├── hooks/                     # Custom React hooks
│   ├── lib/                       # Utility libraries
│   ├── services/                  # API and external services
│   ├── types/                     # TypeScript type definitions
│   └── utils/                     # Helper functions
├── database/
│   ├── migrations/                # Database schema migrations
│   ├── functions/                 # Supabase functions
│   └── seed/                      # Initial data
├── public/                        # Static assets
│   ├── manifest.json             # PWA manifest
│   └── icons/                    # App icons
├── tests/                         # Test files
└── docs/                         # Project documentation
```

## 🔧 Environment Configuration

### Required Environment Variables
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Organization Configuration
VITE_DEFAULT_ORGANIZATION=toolbank
VITE_SUPPORTED_ORGANIZATIONS=toolbank,nmbs,ibc,bmf

# Application Configuration
VITE_APP_NAME="UK Building Merchant SaaS"
VITE_APP_VERSION=0.1.0
VITE_API_BASE_URL=http://localhost:5173

# PWA Configuration
VITE_PWA_NAME="BuildConnect"
VITE_PWA_SHORT_NAME="BuildConnect"
VITE_PWA_DESCRIPTION="UK Building Merchant Promotional Platform"

# Analytics and Monitoring
VITE_ANALYTICS_ID=your_analytics_id
VITE_SENTRY_DSN=your_sentry_dsn

# External Services
VITE_GOOGLE_MAPS_API_KEY=your_maps_api_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

## 🎯 Key Business Rules

### Organization Management
- **Toolbank**: "Keeping the Tool Trade Local" ethos, wholesale distribution model
- **NMBS**: 1,250+ merchant members, empowering independent merchants
- **IBC**: 220+ merchants, UK's largest builders' merchant buying group
- **BMF**: Trade association representing 1,020+ companies

### User Role Definitions
- **Supplier**: Creates and manages special offers across organizations
- **Merchant**: Selects offers, manages inventory, integrates with websites
- **Consumer**: Discovers offers, finds local merchants, makes purchases
- **Organization Admin**: Manages organization settings and approvals

### Data Sharing Rules
- **Organization-specific data**: Isolated by default
- **Cross-organization sharing**: Configurable per organization
- **User data**: Shared based on user consent and organization agreements
- **Analytics data**: Anonymized and aggregated for benchmarking

## 🔒 Security Implementation

### Authentication Flow
1. User registers with email/password or OAuth
2. Email verification required
3. Organization affiliation must be verified
4. Role assignment based on organization membership
5. Multi-factor authentication for sensitive operations

### Authorization Matrix
```
| Role              | Create Offers | Approve Offers | View Analytics | Manage Users |
|-------------------|---------------|----------------|----------------|--------------|
| Supplier          | ✅             | ❌              | ✅ (own)       | ❌            |
| Merchant          | ❌             | ❌              | ✅ (local)     | ❌            |
| Consumer          | ❌             | ❌              | ❌              | ❌            |
| Org Admin         | ✅             | ✅              | ✅ (org)       | ✅            |
| Platform Admin    | ✅             | ✅              | ✅ (all)       | ✅            |
```

## 📊 Performance Benchmarks

### Core Web Vitals Targets
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **First Input Delay (FID)**: < 100 milliseconds
- **Cumulative Layout Shift (CLS)**: < 0.1

### API Performance Targets
- **Database queries**: < 100ms for 95% of requests
- **API endpoints**: < 500ms response time
- **Image loading**: < 1 second for optimized images
- **PWA installation**: < 3 seconds on 3G

## 🧪 Testing Strategy

### Unit Testing
- All business logic functions
- Component rendering and behavior
- Utility functions and helpers
- Service layer functionality

### Integration Testing
- API endpoint functionality
- Database operations
- Authentication flows
- Organization context switching

### End-to-End Testing
- Complete user journeys for each persona
- Cross-organization workflows
- Mobile and desktop experiences
- PWA installation and offline functionality

### Performance Testing
- Load testing for expected user volumes
- Stress testing for peak usage
- Database performance under load
- CDN and caching effectiveness

## 🔄 Continuous Integration/Deployment

### Pre-deployment Checklist
- [ ] All tests passing
- [ ] Code quality checks passed
- [ ] Security scan completed
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Database migrations tested
- [ ] Environment variables configured
- [ ] Monitoring alerts configured

### Deployment Strategy
1. **Development**: Feature development and testing
2. **Staging**: Integration testing with real data
3. **Production**: Live environment with monitoring

### Rollback Procedures
- Database migration rollback scripts
- Application version rollback capability
- CDN cache invalidation procedures
- User notification systems

---

Remember: This platform serves as the digital backbone for the UK Building Merchant sector, digitizing traditional promotional models while preserving the unique value propositions of each participating organization. Every implementation decision should enhance rather than disrupt existing business relationships and workflows.