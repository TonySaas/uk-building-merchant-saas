# Claude Code Development Rules for UK Building Merchant SaaS

## 🚨 CRITICAL RULES - NEVER VIOLATE

### 1. POLYMET COMPONENTS ARE SACRED - ABSOLUTE PROHIBITION
```
❌ NEVER modify files in /src/polymet/components/
❌ NEVER alter existing component styling or structure  
❌ NEVER change Tailwind classes in existing components
❌ NEVER modify component props or interfaces
❌ NEVER delete or rename existing Polymet components
```

### 2. REQUIRED APPROACH FOR UI DEVELOPMENT
```
✅ ALWAYS use existing Polymet components as building blocks
✅ CREATE new components by COMPOSING existing ones
✅ EXTEND functionality through PROPS and CHILDREN
✅ ADD new variants by creating NEW component files
✅ PRESERVE all existing styling and UX patterns
```

### 3. MULTI-ORGANIZATION ARCHITECTURE - NON-NEGOTIABLE
```
✅ ALWAYS implement organization context in new features
✅ ENSURE data isolation between organizations
✅ SUPPORT Toolbank, NMBS, IBC, BMF branding
✅ MAINTAIN organization-specific business rules
✅ IMPLEMENT proper role-based access control
```

## 📋 MANDATORY DEVELOPMENT PATTERNS

### Component Development Rules
1. **Extend, Don't Modify**: Create wrapper components around Polymet components
2. **Composition Over Inheritance**: Use React composition patterns
3. **Props Forwarding**: Always forward props to underlying Polymet components
4. **Style Preservation**: Never override existing Tailwind classes
5. **Type Safety**: Maintain TypeScript definitions for all components

### Example: Correct Way to Extend Polymet Components
```typescript
// ❌ WRONG - Don't modify existing component
// /src/polymet/components/text-input.tsx

// ✅ CORRECT - Create new component that wraps existing
// /src/components/OrganizationAwareTextInput.tsx
import { TextInput } from '@/polymet/components/text-input'
import { useOrganization } from '@/hooks/useOrganization'

export function OrganizationAwareTextInput(props) {
  const { organization } = useOrganization()
  
  return (
    <TextInput 
      {...props}
      className={`${props.className} ${organization.theme.input}`}
    />
  )
}
```

### Database Integration Rules
```
✅ ALWAYS use Supabase for data operations
✅ IMPLEMENT proper RLS policies for multi-tenancy
✅ USE the fixed PostgreSQL functions (search_path = public)
✅ MAINTAIN organization_id foreign keys in all relevant tables
✅ IMPLEMENT proper error handling for database operations
```

### Authentication & Authorization Rules
```
✅ IMPLEMENT role-based access with organization context
✅ USE Supabase Auth for user management
✅ ENFORCE organization-specific permissions
✅ MAINTAIN audit logs for sensitive operations
✅ IMPLEMENT proper session management
```

## 🎯 FEATURE IMPLEMENTATION GUIDELINES

### When Adding New Features:
1. **Check Polymet Components First**: Review existing components before creating new ones
2. **Organization Context**: Ensure feature works across all organizations
3. **Mobile First**: Design for mobile, enhance for desktop
4. **Accessibility**: Follow WCAG guidelines
5. **Performance**: Optimize for < 2 second load times

### Required Imports and Patterns:
```typescript
// Always import from polymet when using existing components
import { ComponentName } from '@/polymet/components/component-name'
import { PageName } from '@/polymet/pages/page-name'
import { LayoutName } from '@/polymet/layouts/layout-name'

// Use organization context in all features
import { useOrganization } from '@/hooks/useOrganization'
import { useOrganizationPermissions } from '@/hooks/useOrganizationPermissions'

// Supabase integration
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/supabase'
```

## 🔧 TECHNICAL REQUIREMENTS

### File Structure Rules:
```
✅ Keep Polymet structure intact: /src/polymet/
✅ New features go in: /src/components/, /src/pages/, /src/services/
✅ Business logic in: /src/services/
✅ Types in: /src/types/
✅ Database code in: /database/
```

### Styling Rules:
```
✅ Use existing Tailwind classes from Polymet components
✅ Follow the established color system
✅ Maintain responsive design patterns
✅ Preserve dark/light mode compatibility
✅ Use consistent spacing and typography
```

### State Management Rules:
```
✅ Use React Query for server state
✅ Use React hooks for local state
✅ Implement organization context providers
✅ Maintain proper loading and error states
✅ Cache data appropriately for performance
```

## 📱 PROGRESSIVE WEB APP REQUIREMENTS

### PWA Implementation Rules:
```
✅ Maintain offline functionality for critical features
✅ Implement proper service worker caching
✅ Support push notifications for offer updates
✅ Ensure installable PWA experience
✅ Optimize for mobile performance
```

### Performance Requirements:
```
✅ Page load times < 2 seconds
✅ Optimize images and media delivery
✅ Implement lazy loading for components
✅ Use efficient caching strategies
✅ Minimize bundle size
```

## 🔐 SECURITY REQUIREMENTS

### Data Protection Rules:
```
✅ Implement proper RLS policies in Supabase
✅ Validate all user inputs
✅ Sanitize data before database operations
✅ Implement proper CORS policies
✅ Use environment variables for secrets
```

### Organization Data Isolation:
```
✅ Ensure users only see data from their organizations
✅ Implement organization-aware queries
✅ Validate organization permissions on all operations
✅ Maintain audit trails for data access
✅ Implement proper session management
```

## 📊 TESTING REQUIREMENTS

### Required Tests:
```
✅ Unit tests for all business logic
✅ Integration tests for API endpoints
✅ Component tests for UI functionality
✅ E2E tests for critical user flows
✅ Performance tests for key metrics
```

### Testing Patterns:
```typescript
// Test organization-aware functionality
describe('OrganizationAwareComponent', () => {
  it('should display correct branding for Toolbank', () => {
    // Test implementation
  })
  
  it('should enforce organization permissions', () => {
    // Test implementation
  })
})
```

## 🚀 DEPLOYMENT RULES

### Environment Configuration:
```
✅ Use proper environment variables
✅ Configure Supabase connections correctly
✅ Set up proper CORS policies
✅ Implement proper error logging
✅ Configure monitoring and alerts
```

### Performance Monitoring:
```
✅ Implement analytics tracking
✅ Monitor Core Web Vitals
✅ Track user engagement metrics
✅ Monitor API performance
✅ Set up error tracking
```

## ⚠️ COMMON MISTAKES TO AVOID

### UI/UX Mistakes:
1. ❌ Modifying existing Polymet component files
2. ❌ Creating inconsistent styling patterns
3. ❌ Breaking responsive design
4. ❌ Ignoring accessibility requirements
5. ❌ Not preserving dark mode compatibility

### Architecture Mistakes:
1. ❌ Bypassing organization context
2. ❌ Implementing features without multi-org support
3. ❌ Not using Supabase for data operations
4. ❌ Ignoring role-based permissions
5. ❌ Creating security vulnerabilities

### Performance Mistakes:
1. ❌ Not optimizing for mobile
2. ❌ Ignoring bundle size optimization
3. ❌ Not implementing proper caching
4. ❌ Causing layout shifts
5. ❌ Not using proper loading states

## 📋 CHECKLIST FOR EVERY FEATURE

Before implementing any feature, ensure:

- [ ] Reviewed existing Polymet components for reusability
- [ ] Designed with organization context in mind
- [ ] Planned for mobile-first responsive design
- [ ] Considered accessibility requirements
- [ ] Designed proper error and loading states
- [ ] Planned for proper testing coverage
- [ ] Considered performance implications
- [ ] Reviewed security requirements
- [ ] Planned for proper documentation

## 🔄 CODE REVIEW REQUIREMENTS

Every code change must:
- [ ] Preserve all existing Polymet functionality
- [ ] Support multi-organization architecture
- [ ] Include proper TypeScript types
- [ ] Follow established coding patterns
- [ ] Include appropriate tests
- [ ] Meet performance requirements
- [ ] Follow security best practices
- [ ] Include proper documentation

---

## 📞 WHEN IN DOUBT

If you're unsure about any implementation detail:
1. Check the existing Polymet components first
2. Review the documentation in `/docs/`
3. Follow the patterns established in similar features
4. Preserve existing functionality over adding new features
5. Ask for clarification rather than making assumptions

**Remember**: The goal is to build on the solid foundation provided by the Polymet components while adding the sophisticated multi-organization functionality required for the UK Building Merchant sector.