# Polymet.ai Component Navigation Rules

## 🎯 How to Locate Polymet Exports in UK Building Merchant SaaS

### Rule 1: Always Check Component Documentation First
- **REFERENCE**: `/docs/Components_06.rtf` for complete component library
- **Contains**: Component IDs, names, locations, dependencies, and descriptions
- **Example**: `form-01 | input-base | components | | Base input component serving as foundation for all input types`

### Rule 2: File Location Pattern
```
/src/polymet/
├── components/          # Individual reusable components
├── pages/              # Complete page compositions  
├── layouts/            # Layout templates
├── data/               # Mock/sample data
└── prototypes/         # Complete application prototypes
```

### Rule 3: Import Path Structure
```typescript
// Components
import ComponentName from "@/polymet/components/component-name"

// Pages  
import PageName from "@/polymet/pages/page-name"

// Layouts
import LayoutName from "@/polymet/layouts/layout-name"

// Data
import DataName from "@/polymet/data/data-name"
```

### Rule 4: Avoid Router File Confusion
- **WARNING**: Router files (e.g., `pricing-page_POLYMET.rtf`) are NOT the actual page content
- **LOOK FOR**: Actual `.tsx` files with component implementations
- **EXAMPLE**: Use `pricing-page.tsx` NOT the router configuration

### Rule 5: Check for Rich Components Before Creating Basic Ones
Always verify if enhanced versions exist:

#### Pricing Components Available:
- ✅ `pricing-card.tsx` - Used in basic version
- ✅ `pricing-value-proposition.tsx` - Used in basic version  
- 🆕 `pricing-comparison-table.tsx` - NOT USED (detailed feature comparison)
- 🆕 `pricing-faq.tsx` - NOT USED (comprehensive FAQ section)
- 🆕 `roi-calculator.tsx` - NOT USED (interactive ROI calculator)

#### Other Rich Components:
- `hero-section.tsx` - For section headers
- `stats-card.tsx` - For metrics display
- `testimonial-section.tsx` - For customer testimonials  
- `cta-join-section.tsx` - For call-to-action sections

### Rule 6: Component Discovery Process
1. **Check Documentation**: Review `Components_06.rtf` for existing components
2. **Explore Directories**: Look in both `/pages` and `/components` for functionality
3. **Verify Dependencies**: Check component relationships before implementation
4. **Test Imports**: Ensure proper import paths from `@/polymet/`
5. **Check for Enhanced Versions**: Look for rich variants before using basic ones

### Rule 7: Page Enhancement Strategy
When working with Polymet pages:
1. **Start with existing page** (e.g., basic pricing-page.tsx)
2. **Identify available rich components** from documentation
3. **Replace basic sections** with enhanced Polymet components
4. **Test all interactive features** (sliders, accordions, tooltips)
5. **Verify responsive behavior** across devices

### Rule 8: Component Hierarchy Respect
Follow documented dependencies:
```
input-showcase
├── text-input
│   └── input-base
├── number-input  
│   └── input-base
├── textarea-input
├── password-input
│   └── input-base
├── email-input
│   └── input-base
└── phone-input
    └── input-base
```

### Rule 9: Quality Verification Checklist
Before implementing any Polymet component:
- ✅ All sections render properly
- ✅ Responsive design works on mobile/tablet/desktop  
- ✅ Interactive elements work (sliders, accordions, tooltips)
- ✅ Color scheme matches organization theming
- ✅ Content reflects UK Building Merchant sector requirements

### Rule 10: Troubleshooting Missing Components
If you encounter import errors:
```bash
# Install missing shadcn/ui components
npx shadcn-ui@latest add table
npx shadcn-ui@latest add accordion  
npx shadcn-ui@latest add tooltip
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add select
```

### Rule 11: Future Enhancement Strategy
Consider adding these Polymet components to other pages:
- `testimonial-section.tsx` - Customer success stories
- `stats-card.tsx` - Platform usage statistics
- `organization-selector.tsx` - Multi-organization functionality
- `merchant-card.tsx` - Merchant showcase sections
- `supplier-selector.tsx` - Supplier highlight sections

## 🎯 Quick Reference Commands

### Find All Available Components:
```bash
find /src/polymet/components -name "*.tsx" | sort
```

### Find All Available Pages:
```bash  
find /src/polymet/pages -name "*.tsx" | sort
```

### Check Component Documentation:
```bash
cat /docs/Components_06.rtf | grep -A 5 "component-name"
```

## 🚨 Critical Reminder
**NEVER modify existing Polymet components directly**. Always compose or extend them to maintain the integrity of the design system while adapting for UK Building Merchant SaaS requirements.
