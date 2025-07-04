# CLAUDE.md

***This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multi-organization SaaS platform for the UK Building Merchant sector, digitizing special offer promotions across suppliers, merchants, and consumers. It serves multiple organizations (Toolbank, NMBS, BMN, BMF) while preserving their unique identities and business rules.

## Key Architecture Principles

### Multi-Organization Architecture
- All features must support organization-specific branding and business rules
- Data isolation with configurable cross-organization sharing
- Organization context is required for all user operations
- Support for Toolbank, NMBS, BMN, and BMF with unique value propositions

### Polymet Component System - CRITICAL RULES
**NEVER modify existing Polymet components in `/src/polymet/`**
- These components are the foundation UI system and must remain untouched
- Extend functionality by creating NEW components that wrap or compose existing ones
- Preserve all existing styling, UX patterns, and component structure
- Use the existing design system and Tailwind classes

## Common Commands

### Development
```bash
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build
npm run type-check      # Run TypeScript type checking
```

### Code Quality
```bash
npm run lint            # Run ESLint
npm run format          # Format code with Prettier
npm run format:check    # Check code formatting
```

### Testing
```bash
npm run test            # Run unit tests
npm run test:ui         # Run tests with UI
npm run test:coverage   # Run tests with coverage report
```

### Database Operations
```bash
npm run db:migrate      # Apply database migrations
npm run db:generate-types  # Generate TypeScript types from Supabase
npm run db:reset        # Reset database (development only)
```

## Technology Stack

### Frontend
- React 18 + TypeScript for type safety
- Tailwind CSS for utility-first styling
- Vite for build tooling and PWA capabilities
- React Router for navigation
- React Query for data fetching and caching
- React Hook Form with Zod validation
- Framer Motion for animations

### Backend
- Supabase for authentication, database, and storage
- PostgreSQL with Row Level Security (RLS)
- Real-time subscriptions for live updates

### Key Libraries
- Lucide React for icons
- React Leaflet for maps
- Recharts for analytics visualization
- Sonner for toast notifications

## File Structure & Patterns

### Sacred Directories (DO NOT MODIFY)
- `/src/polymet/` - Complete UI component system, layouts, and prototypes

### Development Directories
- `/src/components/` - New components that extend Polymet components
- `/src/pages/` - Application pages
- `/src/services/` - API services and business logic
- `/src/lib/` - Utility libraries and contexts
- `/src/types/` - TypeScript type definitions
- `/database/` - Supabase migrations and functions

### Importing Patterns
```typescript
// Always import from polymet for existing components
import { ComponentName } from '@/polymet/components/component-name'

// Organization context (required for all features)
import { useOrganization } from '@/lib/contexts/OrganizationContext'

// Supabase integration
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/supabase'
```

## Development Workflows

### Extending Polymet Components
Instead of modifying existing components, create wrapper components:

```typescript
// ❌ WRONG - Don't modify existing Polymet components
// ✅ CORRECT - Create wrapper components
import { Button } from '@/polymet/components/button'
import { useOrganization } from '@/lib/contexts/OrganizationContext'

export function OrganizationButton(props: ButtonProps) {
  const { organization } = useOrganization()
  
  return (
    <Button 
      {...props}
      className={`${props.className} ${organization.theme.button}`}
    />
  )
}
```

### Database Integration
- All database operations use Supabase client
- Implement Row Level Security (RLS) policies for multi-tenancy
- Use organization_id foreign keys for data isolation
- Generate TypeScript types from database schema

### Authentication & Authorization
- Supabase Auth for user management
- Multi-organization role-based access control
- Organization context required for all authenticated operations
- User profiles extend auth.users with organization affiliations

## PWA Configuration

The application is configured as a Progressive Web App with:
- Service worker for offline functionality
- Caching strategies for Supabase API calls
- Installable app experience
- Push notification support

## Environment Variables

Required environment variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Multi-Organization Data Model

### Core Organizations
- **Toolbank**: Wholesale distribution, "Keeping the Tool Trade Local"
- **NMBS**: 1,250+ merchant members, empowering independent merchants  
- **BMN**: Builders' Merchants News
- **BMF**: Trade association representing 1,020+ companies

### User Roles
- **Supplier**: Creates and manages special offers
- **Merchant**: Selects offers, manages inventory, integrates with websites
- **Consumer**: Discovers offers, finds local merchants
- **Organization Admin**: Manages organization settings and approvals

## Security Requirements

- Implement proper RLS policies in Supabase
- Validate all user inputs with Zod schemas
- Maintain organization-specific data isolation
- Use proper CORS policies and environment variables for secrets
- GDPR compliant data handling

## Performance Targets

- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Database queries < 100ms for 95% of requests
- API endpoints < 500ms response time
- Mobile-first responsive design

## Critical Development Rules

1. **Never modify files in `/src/polymet/`**
2. **Always implement organization context in new features**
3. **Use Supabase for all data operations**
4. **Follow mobile-first responsive design**
5. **Implement proper error handling and loading states**
6. **Write comprehensive tests for business logic**
7. **Maintain TypeScript type safety**
8. **Follow established component composition patterns**

## Testing Strategy

- Unit tests for business logic and utilities
- Component tests for UI functionality  
- Integration tests for API endpoints and database operations
- E2E tests for critical user journeys across organizations
- Performance testing for load and responsiveness