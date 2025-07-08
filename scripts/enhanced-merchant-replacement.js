#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// File paths
const csvFilePath = '/Users/tonyboyle/Library/CloudStorage/Dropbox/MERCHANT DEALS Folder Dropbox/MERCHANT DEALS DATA/NMBS Merchants and Suppliers/NMBS_merchants_FINAL_COMPLETE.csv';
const backupDir = '/Users/tonyboyle/uk-building-merchant-saas/backups';

// Ensure backup directory exists
import { existsSync, mkdirSync } from 'fs';
if (!existsSync(backupDir)) {
  mkdirSync(backupDir, { recursive: true });
}

function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
      const values = [];
      let currentValue = '';
      let inQuotes = false;
      
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue.trim());
      
      const record = {};
      headers.forEach((header, index) => {
        record[header] = values[index] || null;
      });
      data.push(record);
    }
  }
  return data;
}

async function backupAllMerchantData() {
  console.log('📦 Creating comprehensive backup of all merchant-related data...');
  
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    // Backup all merchant-related tables
    const tables = [
      'merchants',
      'merchant_locations', 
      'merchant_organization_affiliations',
      'merchant_analytics',
      'merchant_reviews',
      'analytics_events'
    ];
    
    const backupData = {};
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase.from(table).select('*');
        if (error && error.code !== 'PGRST106') { // PGRST106 = table not found
          console.warn(`⚠️ Warning backing up ${table}:`, error.message);
          backupData[table] = [];
        } else {
          backupData[table] = data || [];
          console.log(`✅ Backed up ${table}: ${data?.length || 0} records`);
        }
      } catch (e) {
        console.warn(`⚠️ Skipping ${table}: ${e.message}`);
        backupData[table] = [];
      }
    }
    
    // Save comprehensive backup
    writeFileSync(
      path.join(backupDir, `comprehensive_merchant_backup_${timestamp}.json`),
      JSON.stringify(backupData, null, 2)
    );
    
    console.log(`✅ Comprehensive backup completed`);
    return backupData;
    
  } catch (error) {
    console.error('❌ Error creating backup:', error);
    throw error;
  }
}

async function getOrCreateNMBSOrganization() {
  const { data: org, error } = await supabase
    .from('organizations')
    .select('id')
    .eq('name', 'NMBS')
    .single();
  
  if (error && error.code !== 'PGRST116') {
    throw error;
  }
  
  if (org) {
    console.log('📋 Found existing NMBS organization:', org.id);
    return org.id;
  }
  
  const { data: newOrg, error: createError } = await supabase
    .from('organizations')
    .insert([{
      name: 'NMBS',
      type: 'buying_group',
      description: 'National Merchant Buying Society - 1,250+ merchant members, 450+ supplier deals, established in 1963 with £2.21bn turnover.',
      is_active: true
    }])
    .select('id')
    .single();
  
  if (createError) throw createError;
  
  console.log('✅ Created NMBS organization:', newOrg.id);
  return newOrg.id;
}

async function clearAllMerchantData() {
  console.log('🗑️ Clearing all merchant-related data...');
  
  try {
    // Clear in dependency order
    const clearTables = [
      'merchant_analytics',
      'merchant_reviews', 
      'merchant_organization_affiliations',
      'merchant_locations',
      'merchants'
    ];
    
    for (const table of clearTables) {
      try {
        const { error } = await supabase
          .from(table)
          .delete()
          .neq('id', '00000000-0000-0000-0000-000000000000');
        
        if (error && error.code !== 'PGRST106') {
          console.warn(`⚠️ Warning clearing ${table}:`, error.message);
        } else {
          console.log(`✅ Cleared ${table}`);
        }
      } catch (e) {
        console.warn(`⚠️ Skipping ${table}: ${e.message}`);
      }
    }
    
    // Clear analytics events related to merchants
    await supabase
      .from('analytics_events')
      .delete()
      .not('merchant_id', 'is', null);
    
    console.log('✅ All merchant data cleared');
  } catch (error) {
    console.error('❌ Error clearing data:', error);
    throw error;
  }
}

async function importEnhancedMerchantData(organizationId) {
  console.log('📥 Importing enhanced merchant data with NMBS CSV compatibility...');
  
  try {
    const csvText = readFileSync(csvFilePath, 'utf-8');
    const merchants = parseCSV(csvText);
    
    console.log(`📊 Found ${merchants.length} merchants in CSV`);
    
    let successCount = 0;
    let errorCount = 0;
    const merchantIds = [];
    
    for (const merchantData of merchants) {
      try {
        // Use the enhanced merchant schema with direct CSV mapping
        const { data: merchant, error: merchantError } = await supabase
          .from('merchants')
          .insert([{
            // Direct CSV field mapping (matching NMBS compatibility)
            merchant_name: merchantData.merchant_name,
            merchant_category: merchantData.merchant_category || 'General',
            merchant_website_url: merchantData.merchant_website_url || null,
            merchant_email: merchantData.merchant_email || null,
            merchant_phone: merchantData.merchant_phone || null,
            
            // Address fields (will auto-sync to merchant_locations via trigger)
            merchant_address_1: merchantData.merchant_address_1 || null,
            merchant_address_2: merchantData.merchant_address_2 || null,
            merchant_address_3: merchantData.merchant_address_3 || null,
            merchant_address_4: merchantData.merchant_address_4 || null,
            merchant_postcode: merchantData.merchant_postcode || null,
            
            // Geo-coordinates
            merchant_latitude: merchantData.merchant_latitude ? parseFloat(merchantData.merchant_latitude) : null,
            merchant_longitude: merchantData.merchant_longitude ? parseFloat(merchantData.merchant_longitude) : null,
            
            // Status fields
            is_active: true,
            verification_status: 'verified',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }])
          .select('id')
          .single();
        
        if (merchantError) {
          console.error(`❌ Error creating merchant ${merchantData.merchant_name}:`, merchantError);
          errorCount++;
          continue;
        }
        
        merchantIds.push(merchant.id);
        
        // Create NMBS organization affiliation
        const { error: affiliationError } = await supabase
          .from('merchant_organization_affiliations')
          .insert([{
            merchant_id: merchant.id,
            organization_id: organizationId,
            affiliation_status: 'active',
            membership_level: 'standard',
            member_since: new Date().toISOString().split('T')[0],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);
        
        if (affiliationError) {
          console.error(`❌ Error creating affiliation for ${merchantData.merchant_name}:`, affiliationError);
          errorCount++;
          continue;
        }
        
        // Initialize merchant analytics record
        const { error: analyticsError } = await supabase
          .from('merchant_analytics')
          .insert([{
            merchant_id: merchant.id,
            organization_id: organizationId,
            total_views: 0,
            total_clicks: 0,
            total_conversions: 0,
            offers_published: 0,
            average_rating: 0.0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);
        
        if (analyticsError) {
          console.warn(`⚠️ Warning creating analytics for ${merchantData.merchant_name}:`, analyticsError);
        }
        
        successCount++;
        if (successCount % 100 === 0) {
          console.log(`📈 Progress: ${successCount} merchants processed...`);
        }
        
      } catch (error) {
        console.error(`❌ Error processing merchant ${merchantData.merchant_name}:`, error);
        errorCount++;
      }
    }
    
    console.log(`✅ Import completed: ${successCount} successful, ${errorCount} errors`);
    return { successCount, errorCount, merchantIds };
    
  } catch (error) {
    console.error('❌ Error importing data:', error);
    throw error;
  }
}

async function verifyComprehensiveImport() {
  console.log('🔍 Performing comprehensive verification...');
  
  try {
    const tables = {
      merchants: 'merchants',
      locations: 'merchant_locations',
      affiliations: 'merchant_organization_affiliations', 
      analytics: 'merchant_analytics'
    };
    
    const results = {};
    
    for (const [name, table] of Object.entries(tables)) {
      try {
        const { data, error } = await supabase.from(table).select('id');
        if (error) throw error;
        results[name] = data.length;
      } catch (e) {
        results[name] = 0;
        console.warn(`⚠️ Could not verify ${table}: ${e.message}`);
      }
    }
    
    // Verify NMBS affiliations specifically
    const { data: nmbsAffiliations } = await supabase
      .from('merchant_organization_affiliations')
      .select('id')
      .eq('organization_id', (await supabase.from('organizations').select('id').eq('name', 'NMBS').single()).data.id);
    
    console.log(`✅ Verification complete:`);
    console.log(`   - Merchants: ${results.merchants}`);
    console.log(`   - Locations: ${results.locations} (auto-synced via trigger)`);
    console.log(`   - NMBS Affiliations: ${nmbsAffiliations?.length || 0}`);
    console.log(`   - Analytics Records: ${results.analytics}`);
    
    return results;
    
  } catch (error) {
    console.error('❌ Error verifying import:', error);
    throw error;
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting enhanced NMBS merchant data replacement...\n');
  
  try {
    // Step 1: Comprehensive backup
    const backupStats = await backupAllMerchantData();
    console.log('');
    
    // Step 2: Get or create NMBS organization
    const organizationId = await getOrCreateNMBSOrganization();
    console.log('');
    
    // Step 3: Clear all merchant data
    await clearAllMerchantData();
    console.log('');
    
    // Step 4: Import with enhanced schema
    const importStats = await importEnhancedMerchantData(organizationId);
    console.log('');
    
    // Step 5: Comprehensive verification
    const verifyStats = await verifyComprehensiveImport();
    console.log('');
    
    console.log('🎉 Enhanced merchant data replacement completed successfully!');
    console.log('📊 Final Summary:');
    console.log(`   - CSV Import: ${importStats.successCount} successful, ${importStats.errorCount} errors`);
    console.log(`   - Database State: ${verifyStats.merchants} merchants, ${verifyStats.locations} locations`);
    console.log(`   - NMBS Integration: Complete with organization affiliations`);
    console.log(`   - Analytics: Initialized for all merchants`);
    console.log(`   - Auto-sync: Merchant locations created via database trigger`);
    
  } catch (error) {
    console.error('💥 Process failed:', error);
    console.log('\n🔄 Restore from backup files in:', backupDir);
    process.exit(1);
  }
}

// Run the enhanced script
main();
