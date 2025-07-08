# BuildConnect Component Reference for Claudia

## 🔒 SACRED COMPONENTS - DO NOT MODIFY

All components in `src/polymet/` are **SACRED** and must never be modified directly.
Instead, extend them through composition or create new variants.

## Component Categories

### Layouts
- `main-layout` - Main application layout with header and footer
- `auth-layout` - Two-column authentication layout

### Form Components  
- `input-base` - Foundation for all input types
- `text-input` - Text input with floating labels
- `number-input` - Number input with increment/decrement
- `textarea-input` - Multi-line text input
- `password-input` - Password input with show/hide toggle
- `email-input` - Email input with validation
- `phone-input` - Phone input with country code
- `auth-section` - Tabbed authentication component

### Selection Components
- `select` - Comprehensive select component system
- `radio-group` - Flexible radio group component
- `checkbox-group` - Checkbox group with select-all
- `toggle-switch` - Toggle switch component
- `segmented-control` - Modern segmented control
- `organization-selector` - Grid of organization cards
- `merchant-selector` - Grid of merchant cards  
- `supplier-selector` - Grid of supplier cards
- `category-selector` - Hierarchical category selector

### Date and Time Components
- `date-picker` - Calendar interface for date selection
- `time-picker` - Time selection interface
- `date-range-picker` - Date range selection
- `date-time-picker` - Combined date and time
- `mini-calendar` - Compact calendar
- `relative-date-selector` - Natural language dates
- `schedule-builder` - Comprehensive schedule builder

### UI Components
- `style-guide` - Design system documentation
- `user-type-cards` - User type representation cards

### Section Components
- `hero-section` - Visually striking hero section
- `feature-highlights` - Grid of feature cards
- `testimonial-section` - User reviews section

### Navigation Components
- `header` - Responsive header with navigation
- `footer` - Comprehensive footer

### Data Components
- `supplier-data` - Mock data for suppliers/merchants
- `organization-data` - Mock data for organizations

## Component Dependencies

### Core Dependencies
```
build-connect-app
├── main-layout
│   ├── header
│   ├── home-page
│   │   ├── hero-section
│   │   ├── feature-highlights
│   │   ├── testimonial-section
│   │   ├── user-type-cards
│   │   ├── organization-selector
│   │   ├── supplier-selector
│   │   └── merchant-selector
│   └── footer
└── auth-layout
    └── login-page
        └── auth-section
```

### Form Component Hierarchy
```
input-showcase
├── text-input (extends input-base)
├── number-input (extends input-base)
├── textarea-input
├── password-input (extends input-base)
├── email-input (extends input-base)
└── phone-input (extends input-base)
```

### Selection Component Relationships
```
category-selector
└── checkbox-group

organization-merchant-selector
├── supplier-data
└── organization-data

merchant-selector
└── supplier-data

supplier-selector
└── supplier-data
```

### Date Component Relationships
```
schedule-builder
├── date-picker
└── time-picker

date-time-picker
├── date-picker
└── time-picker

date-range-picker
└── date-picker

relative-date-selector
├── date-picker
└── date-range-picker
```

## Usage Guidelines

### Extending Components
Instead of modifying existing components, create new ones:

```typescript
// ✅ CORRECT: Extend by composition
import { TextInput } from '@/polymet/components/text-input';

const OrganizationAwareInput: React.FC<Props> = ({ organizationId, ...props }) => {
  return (
    <div className="organization-input-wrapper">
      <TextInput {...props} />
      {organizationId && <OrganizationLabel id={organizationId} />}
    </div>
  );
};

// ❌ WRONG: Modifying existing component
// Don't edit src/polymet/components/text-input.tsx
```

### Component Naming Conventions
- Use kebab-case for file names (`organization-selector.tsx`)
- Use PascalCase for component names (`OrganizationSelector`)
- Follow the established ID pattern (`select-01`, `form-02`, etc.)

### Import Patterns
```typescript
// Import components using the established pattern
import { OrganizationSelector } from '@/polymet/components/organization-selector';
import { MainLayout } from '@/polymet/layouts/main-layout';
import { HomePage } from '@/polymet/pages/home-page';
import { SupplierData } from '@/polymet/data/supplier-data';
```

### Multi-Organization Support
All new components must support the multi-organization architecture:

```typescript
interface OrganizationAwareProps {
  organizationId?: string;
  organizationContext?: OrganizationContext;
  // ... other props
}
```

### Styling Guidelines
- Use existing Tailwind classes from the components
- Maintain dark/light mode compatibility
- Follow the established spacing and color patterns
- Ensure mobile-first responsive design

### Component Best Practices
1. **Single Responsibility**: Each component should have one clear purpose
2. **Proper Types**: Always use TypeScript with proper prop definitions
3. **Error Handling**: Implement appropriate error states
4. **Loading States**: Provide loading indicators where needed
5. **Accessibility**: Ensure WCAG compliance
6. **Performance**: Optimize for mobile and use React.memo where appropriate

## Integration with Project Features

### Multi-Organization Components
When creating new components that need organization awareness:
- Always include organization context in props
- Respect organization-specific branding
- Implement proper data isolation
- Support cross-organization functionality where appropriate

### Supabase Integration
Components that interact with data should:
- Use the established service layer patterns
- Implement proper error handling
- Support real-time updates where appropriate
- Maintain proper authentication context

### PWA Considerations
All components should:
- Work offline where possible
- Be touch-friendly on mobile
- Support various screen sizes
- Load quickly and efficiently

Remember: The Polymet component library is the foundation of the application's design system. By respecting and extending it properly, we maintain consistency while adding the specific functionality needed for the UK Building Merchant SaaS platform.