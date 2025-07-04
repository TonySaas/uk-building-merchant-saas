# Supabase Setup Guide - UK Building Merchant SaaS

## Overview

This guide walks you through setting up the complete Supabase backend for your UK Building Merchant SaaS platform. The database supports multi-organization architecture with Toolbank, NMBS, BMN, and BMF organizations.

## Database Architecture Summary

### Core Features
- **Multi-organization support** with data isolation
- **Role-based access control (RBAC)** for each organization
- **Complete product catalog** with categories and media
- **Offers system** with cross-organization approval workflows
- **Merchant management** with locations and affiliations
- **Analytics and user interactions** tracking
- **Reviews and ratings** system
- **Notifications** with preferences
- **Secure media storage** with organized buckets

### Key Tables Created
- Organizations & settings (4 tables)
- User management & roles (4 tables)
- Products & categories (4 tables)
- Offers & approvals (4 tables)
- Merchants & locations (4 tables)
- Analytics & interactions (8 tables)
- Reviews & notifications (4 tables)

## Step-by-Step Setup

### Step 1: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Set up your project:
   - **Project name**: "UK Building Merchant SaaS"
   - **Database password**: Generate strong password (save it!)
   - **Region**: Europe West (London)
   - **Pricing plan**: Choose appropriate plan

4. Wait for project creation (2-3 minutes)

5. Copy your project credentials:
   - **Project URL**: `https://[your-project-ref].supabase.co`
   - **Anon key**: `eyJ...` (public API key)
   - **Service role key**: `eyJ...` (secret key - keep secure!)

### Step 2: Database Schema Deployment

**Option A: Automated Deployment (Recommended)**
1. Go to your Supabase Dashboard → SQL Editor
2. Create a new query
3. Copy and paste the contents of `/database/deploy.sql`
4. Run the query to create core schema

**Option B: Step-by-Step Deployment**
Run each migration file in order:

1. **Core Schema**: `/database/migrations/001_initial_schema.sql`
2. **Products & Offers**: `/database/migrations/002_products_and_offers.sql`
3. **Analytics**: `/database/migrations/003_analytics_and_interactions.sql`
4. **Auth Functions**: `/database/functions/auth_functions.sql`
5. **RLS Policies**: `/database/policies/rls_policies.sql`

### Step 3: Setup Default Organization Roles

Run this in SQL Editor to create default roles for all organizations:

```sql
SELECT setup_default_organization_roles();
```

### Step 4: Configure Authentication

1. Go to **Authentication** → **Settings**
2. Configure email settings:
   - **Enable email confirmations**: ON
   - **Enable email change confirmations**: ON
   - **Secure email change**: ON

3. Set up email templates:
   - **Confirm signup**: Customize with your branding
   - **Magic link**: Customize with your branding
   - **Change email address**: Customize with your branding

4. **Site URL**: Set to your domain (e.g., `https://yourdomain.com`)
5. **Redirect URLs**: Add your allowed domains

### Step 5: Create Storage Buckets

**Option A: SQL Method (Recommended)**
```sql
-- Run the complete storage setup
-- Paste contents of /database/storage/storage_setup.sql
```

**Option B: Dashboard Method**
1. Go to **Storage** in Supabase Dashboard
2. Create these buckets:

| Bucket Name | Public | File Size Limit | Allowed Types |
|-------------|--------|-----------------|---------------|
| `product-images` | ✅ Public | 10MB | Images (JPEG, PNG, WebP, SVG) |
| `offer-media` | ✅ Public | 50MB | Images, Videos, PDFs |
| `organization-logos` | ✅ Public | 2MB | Images |
| `merchant-logos` | ✅ Public | 2MB | Images |
| `user-avatars` | ✅ Public | 1MB | Images |
| `documents` | ❌ Private | 100MB | Documents (PDF, DOC) |

### Step 6: Update Environment Variables

Update your `.env.local` file:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://[your-project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=eyJ[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=eyJ[your-service-role-key]

# Project Configuration
VITE_APP_NAME="UK Building Merchant SaaS"
VITE_APP_VERSION="1.0.0"
```

### Step 7: Generate TypeScript Types

Run in your project directory:

```bash
# Install Supabase CLI if not already installed
npm install -g @supabase/cli

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref [your-project-ref]

# Generate types
supabase gen types typescript --linked > src/types/supabase.ts
```

### Step 8: Test Database Connection

Create a test file to verify everything works:

```typescript
// test-supabase.ts
import { supabase } from './src/lib/supabase'

async function testConnection() {
  try {
    // Test basic connection
    const { data: organizations } = await supabase
      .from('organizations')
      .select('*')
    
    console.log('✅ Database connected!')
    console.log('Organizations:', organizations)
    
    // Test auth functions
    const { data: regOrgs } = await supabase
      .rpc('get_registration_organizations')
    
    console.log('✅ Functions working!')
    console.log('Registration orgs:', regOrgs)
    
  } catch (error) {
    console.error('❌ Connection failed:', error)
  }
}

testConnection()
```

## Verification Checklist

Run these queries in SQL Editor to verify setup:

```sql
-- ✅ Check organizations are created
SELECT name, type, is_active FROM organizations;

-- ✅ Check roles are set up
SELECT o.name as org_name, r.name as role_name, COUNT(p.permission_name) as permissions
FROM organizations o
JOIN organization_roles r ON o.id = r.organization_id
LEFT JOIN organization_role_permissions p ON r.id = p.role_id
GROUP BY o.name, r.name
ORDER BY o.name, r.name;

-- ✅ Check product categories
SELECT name, slug, parent_category_id FROM product_categories ORDER BY sort_order;

-- ✅ Test functions
SELECT * FROM get_registration_organizations();

-- ✅ Check RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND rowsecurity = true;
```

## Expected Results

### Organizations Table
You should see 4 organizations with unique branding:
- **Toolbank**: Blue theme, "Keeping the Tool Trade Local"
- **NMBS**: Green theme, "Empowering Independent Merchants"
- **BMN**: Purple theme, "Builders' Merchants News"
- **BMF**: Orange theme, "Representing the Building Materials Industry"

### Roles & Permissions
Each organization should have 4 roles:
- **Supplier**: Can create/manage offers and products
- **Merchant**: Can select offers and manage locations
- **Consumer**: Can view offers and make reservations
- **Admin**: Full organization permissions

### Product Categories
8 main categories with subcategories:
- Power Tools (Drills, Saws, Sanders)
- Hand Tools (Hammers, Screwdrivers, Wrenches)
- Fasteners, Building Materials, Safety Equipment, etc.

## Troubleshooting

### Common Issues

1. **RLS Policies Too Restrictive**
   - Check user has proper organization roles
   - Verify auth.uid() returns correct user ID

2. **Storage Upload Fails**
   - Check bucket permissions and RLS policies
   - Verify file path structure matches policy expectations

3. **Functions Not Working**
   - Ensure `SET search_path = public` is included
   - Check for typos in function names

4. **Type Generation Fails**
   - Make sure Supabase CLI is latest version
   - Check project linking with `supabase status`

### Getting Help

- Check Supabase Dashboard → Logs for error details
- Use Supabase Dashboard → API Docs to test endpoints
- Review RLS policies if data access issues occur

## Next Steps

After successful setup:

1. **Update Frontend**: Update your React app's Supabase client configuration
2. **Test Registration**: Try creating test users and assigning to organizations
3. **Test Offers**: Create sample suppliers and offers
4. **Test Merchants**: Set up test merchants and locations
5. **Deploy**: Deploy to your preferred hosting platform

## Security Notes

- Keep your `service_role_key` secure (server-side only)
- Review RLS policies before production deployment
- Set up proper CORS origins in Supabase Dashboard
- Enable 2FA on your Supabase account
- Regularly backup your database

## File Structure Summary

```
database/
├── deploy.sql                          # Complete deployment script
├── migrations/
│   ├── 001_initial_schema.sql         # Core organizations & users
│   ├── 002_products_and_offers.sql    # Product catalog & offers
│   └── 003_analytics_and_interactions.sql # Analytics & user features
├── functions/
│   └── auth_functions.sql             # Authentication & registration functions
├── policies/
│   └── rls_policies.sql              # Row Level Security policies
└── storage/
    └── storage_setup.sql             # Storage buckets & policies
```

---

**Ready to proceed?** Once you've created your Supabase project and have the credentials, we can continue with the deployment and testing!