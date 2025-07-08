# UK Building Merchant SaaS - Database Import Best Practices

## 📊 Current Situation Analysis

Based on the duplicate analysis performed on NMBS (1,687 merchants) vs Toolbank (910 retailers) data:

### Duplicate Analysis Results
- **Exact duplicates found**: 462 merchants
- **Potential duplicates found**: 13,969 combinations
- **Risk Level**: HIGH RISK due to exact duplicates

### Key Findings
1. **Many merchants operate in both networks**: Large chains like Huws Gray Limited appear in both NMBS and Toolbank networks
2. **Name variations**: "Ltd" vs "Limited", different address formats, but same businesses
3. **Multiple locations**: Same company with different postcodes in both datasets

## 🎯 Recommended Import Strategy

### Phase 1: Pre-Import Preparation ✅ COMPLETED
1. **Duplicate Analysis**: Completed - identified 462 exact matches
2. **Data Quality Assessment**: Both datasets have good data quality
3. **Schema Validation**: Database schema supports multi-organization architecture

### Phase 2: Safe Import Process (RECOMMENDED)

#### 2.1 Handle Exact Duplicates First
For the 462 exact duplicates, we recommend:

**Option A: Merge Strategy (RECOMMENDED)**
- Keep the existing NMBS merchant record
- Add Toolbank affiliation to `merchant_organization_affiliations` table
- Consolidate location data if different addresses exist
- Preserve both organization relationships

**Option B: Create Variants**
- Create separate merchant entries with organization-specific names
- Link via a master merchant relationship table
- Maintain separate identities for business rule differences

#### 2.2 Import Non-Duplicates
- Import remaining 448 Toolbank retailers (910 - 462 = 448) as new merchants
- Create corresponding `merchant_organization_affiliations` records
- Generate `merchant_locations` entries

## 📋 Implementation Steps

### Step 1: Install Dependencies
```bash
cd /Users/tonyboyle/uk-building-merchant-saas
npm install @supabase/supabase-js dotenv
```

### Step 2: Run Import Script
```bash
# Dry run validation first
node import-toolbank-retailers.js --validate

# Run the actual import
node import-toolbank-retailers.js
```

### Step 3: Post-Import Validation
```bash
# Validate results
node import-toolbank-retailers.js --validate
```

## 🔧 Database Best Practices Applied

### 1. Multi-Organization Data Integrity
- **Foreign Key Constraints**: All organization relationships properly enforced
- **RLS Policies**: Row-level security maintains data isolation where needed
- **Organization Context**: Every merchant can belong to multiple organizations

### 2. Duplicate Prevention Strategy
```sql
-- Example query to check for duplicates before import
SELECT 
    name,
    COUNT(*) as count,
    ARRAY_AGG(id) as merchant_ids
FROM merchants 
GROUP BY LOWER(REGEXP_REPLACE(name, '(ltd|limited|llp|plc)', '', 'gi'))
HAVING COUNT(*) > 1;
```

### 3. Data Normalization
- **Merchant Base Data**: Core merchant info in `merchants` table
- **Location Data**: Separate `merchant_locations` table for multiple addresses
- **Organization Relationships**: `merchant_organization_affiliations` for many-to-many

### 4. Performance Optimization
- **Indexes**: Proper indexes on name, postcode, organization_id
- **Batch Processing**: Import script processes in batches of 50
- **Error Handling**: Graceful error handling with detailed logging

## 🗃️ Database Schema Validation

### Core Tables Structure
```sql
-- Merchants table (primary entity)
merchants:
  - id (UUID, PK)
  - name (TEXT, NOT NULL)
  - description (TEXT)
  - website_url (TEXT)
  - email (TEXT)
  - phone (TEXT)
  - is_active (BOOLEAN, DEFAULT true)
  - verification_status (TEXT)
  - created_at (TIMESTAMPTZ)
  - updated_at (TIMESTAMPTZ)

-- Merchant locations (one-to-many)
merchant_locations:
  - id (UUID, PK)
  - merchant_id (UUID, FK)
  - name (TEXT)
  - address_line_1 (TEXT)
  - address_line_2 (TEXT)
  - city (TEXT)
  - county (TEXT)
  - postal_code (TEXT)
  - country (TEXT)
  - latitude (NUMERIC)
  - longitude (NUMERIC)
  - created_at (TIMESTAMPTZ)
  - updated_at (TIMESTAMPTZ)

-- Organization affiliations (many-to-many)
merchant_organization_affiliations:
  - id (UUID, PK)
  - merchant_id (UUID, FK)
  - organization_id (UUID, FK)
  - affiliation_status (TEXT)
  - membership_level (TEXT)
  - member_since (DATE)
  - created_at (TIMESTAMPTZ)
  - updated_at (TIMESTAMPTZ)
```

## 🚨 Risk Mitigation

### 1. Backup Strategy
```sql
-- Create backup before import
CREATE TABLE merchants_backup AS SELECT * FROM merchants;
CREATE TABLE merchant_locations_backup AS SELECT * FROM merchant_locations;
CREATE TABLE merchant_organization_affiliations_backup AS SELECT * FROM merchant_organization_affiliations;
```

### 2. Rollback Plan
- Import script creates detailed logs with merchant IDs
- Can reverse import using the results JSON file
- Backup tables allow complete restoration if needed

### 3. Data Validation Queries
```sql
-- Check for orphaned records
SELECT COUNT(*) FROM merchant_locations ml
LEFT JOIN merchants m ON ml.merchant_id = m.id
WHERE m.id IS NULL;

-- Validate organization affiliations
SELECT 
    o.name as organization,
    COUNT(moa.merchant_id) as affiliated_merchants
FROM organizations o
LEFT JOIN merchant_organization_affiliations moa ON o.id = moa.organization_id
GROUP BY o.name;

-- Check for duplicate affiliations
SELECT 
    merchant_id, 
    organization_id, 
    COUNT(*) 
FROM merchant_organization_affiliations 
GROUP BY merchant_id, organization_id 
HAVING COUNT(*) > 1;
```

## 📈 Expected Results After Import

### Merchant Count Projections
- **Current NMBS merchants**: 1,687
- **New Toolbank merchants (non-duplicates)**: ~448
- **Total unique merchants**: ~2,135
- **Toolbank affiliations**: 910 (includes duplicates with dual affiliations)

### Organization Coverage
- **NMBS**: 1,687 affiliations
- **Toolbank**: 910 affiliations  
- **Dual affiliations**: 462 merchants
- **Total affiliations**: 2,597

## 🔍 Post-Import Monitoring

### 1. Data Quality Checks
```sql
-- Merchants without locations
SELECT m.id, m.name 
FROM merchants m 
LEFT JOIN merchant_locations ml ON m.id = ml.merchant_id 
WHERE ml.id IS NULL;

-- Merchants without organization affiliations
SELECT m.id, m.name 
FROM merchants m 
LEFT JOIN merchant_organization_affiliations moa ON m.id = moa.merchant_id 
WHERE moa.id IS NULL;
```

### 2. Business Intelligence Queries
```sql
-- Geographic distribution
SELECT 
    ml.county,
    COUNT(DISTINCT m.id) as merchant_count,
    COUNT(DISTINCT moa.organization_id) as organization_count
FROM merchants m
JOIN merchant_locations ml ON m.id = ml.merchant_id
JOIN merchant_organization_affiliations moa ON m.id = moa.merchant_id
GROUP BY ml.county
ORDER BY merchant_count DESC;

-- Organization overlap analysis
SELECT 
    m.name as merchant_name,
    ARRAY_AGG(o.name) as organizations
FROM merchants m
JOIN merchant_organization_affiliations moa ON m.id = moa.merchant_id
JOIN organizations o ON moa.organization_id = o.id
GROUP BY m.id, m.name
HAVING COUNT(DISTINCT o.id) > 1;
```

## ⚡ Performance Considerations

### 1. Index Strategy
```sql
-- Recommended indexes for performance
CREATE INDEX idx_merchants_name_gin ON merchants USING gin(to_tsvector('english', name));
CREATE INDEX idx_merchant_locations_postcode ON merchant_locations(postal_code);
CREATE INDEX idx_merchant_locations_coords ON merchant_locations(latitude, longitude);
CREATE INDEX idx_merchant_org_affiliations_merchant ON merchant_organization_affiliations(merchant_id);
CREATE INDEX idx_merchant_org_affiliations_org ON merchant_organization_affiliations(organization_id);
```

### 2. Query Optimization
- Use prepared statements for bulk operations
- Batch insert operations in groups of 100-500 records
- Implement connection pooling for concurrent imports

## 🎯 Success Criteria

### Technical Success
- [ ] All 910 Toolbank retailers processed
- [ ] 462 dual affiliations created for existing merchants
- [ ] 448 new merchants created
- [ ] All merchant locations populated
- [ ] No data integrity violations
- [ ] Import completes in < 30 minutes

### Business Success  
- [ ] Multi-organization architecture validated
- [ ] Duplicate merchants properly merged
- [ ] Geographic coverage maintained
- [ ] Organization-specific data preserved
- [ ] Ready for offer management features

## 🚀 Ready to Import

Based on this analysis, **we are ready to proceed with the Toolbank retailers import** using the merge strategy for duplicates. The import script handles:

1. ✅ **Duplicate Detection**: Identifies exact matches automatically
2. ✅ **Safe Merge Strategy**: Adds Toolbank affiliations to existing NMBS merchants
3. ✅ **New Merchant Creation**: Imports unique Toolbank retailers
4. ✅ **Location Management**: Creates proper merchant location records
5. ✅ **Organization Affiliations**: Establishes Toolbank relationships
6. ✅ **Error Handling**: Comprehensive logging and rollback capability
7. ✅ **Validation**: Post-import verification checks

The script prioritizes data integrity and provides detailed logging for audit trails. All operations are reversible and the database maintains referential integrity throughout the process.
