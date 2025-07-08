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
    const backupData = {};
    
    // Define all merchant-related tables to backup
    const tables = [
      'merchants',
      'merchant_locations',
      'merchant_organization_affiliations',
      'merchant_analytics',
      'merchant_reviews',
      'merchant_offers',
      'merchant_interactions',
      'user_merchant_interactions'
    ];
    
    let totalRecords = 0;
    
    for (const tableName of tables) {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('*');
        
        if (error && error.code !== '42P01') {
          console.warn(`⚠️  Warning: Could not backup ${tableName}: ${error.message}`);
          backupData[tableName] = [];
        } else if (error && error.code === '42P01') {
          console.log(`ℹ️  Table ${tableName} does not exist, skipping...`);
          backupData[tableName] = [];
        } else {
          backupData[tableName] = data || [];
          totalRecords += data?.length || 0;
          console.log(`✅ Backed up ${tableName}: ${data?.length || 0} records`);
        }
      } catch (e) {
        console.warn(`⚠️  Warning: Could not backup ${tableName}: ${e.message}`);
        backupData[tableName] = [];
      }
    }
    
    // Save comprehensive backup
    const backupFilePath = path.join(backupDir, `comprehensive_merchant_backup_${timestamp}.json`);
    writeFileSync(backupFilePath, JSON.stringify(backupData, null, 2));
    
    console.log(`✅ Comprehensive backup completed: ${totalRecords} total records`);
    console.log(`📁 Backup saved to: ${backupFilePath}`);
    
    return { backupData, totalRecords, backupFilePath };
    
  } catch (error) {
    console.error('❌ Error creating comprehensive backup:', error);
    throw error;
  }
}

async function getOrCreateNMBSOrganization() {
  console.log('🏢 Checking NMBS organization...');
  
  const { data: org, error } = await supabase
    .from('organizations')
    .select('id')
    .eq('name', 'NMBS')
    .single();
  
  if (error && error.code !== 'PGRST116') {
    throw error;
  }
  
  if (org) {
    console.log('✅ Found existing NMBS organization:', org.id);
    return org.id;
  }
  
  // Create NMBS organization if it doesn't exist
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
  console.log('🗑️  Clearing all existing merchant data...');
  
  try {
    // Clear in order of dependencies (children first, parents last)
    const clearOrder = [
      'user_merchant_interactions',
      'merchant_interactions', 
      'merchant_offers',
      'merchant_reviews',
      'merchant_analytics',
      'merchant_organization_affiliations',
      'merchant_locations',
      'merchants'
    ];
    
    for (const tableName of clearOrder) {
      try {
        const { error } = await supabase
          .from(tableName)
          .delete()
          .neq('id', '00000000-0000-0000-0000-000000000000');
        
        if (error && error.code !== '42P01') {
          console.warn(`⚠️  Warning clearing ${tableName}: ${error.message}`);
        } else if (error && error.code === '42P01') {
          console.log(`ℹ️  Table ${tableName} does not exist, skipping...`);
        } else {
          console.log(`✅ Cleared ${tableName}`);
        }
      } catch (e) {
        console.warn(`⚠️  Warning clearing ${tableName}: ${e.message}`);
      }
    }
    
    console.log('✅ All merchant data cleared');
  } catch (error) {
    console.error('❌ Error clearing data:', error);
    throw error;
  }
}

async function importNewMerchantData(organizationId) {
  console.log('📥 Importing new merchant data with full relationships...');
  
  try {
    const csvText = readFileSync(csvFilePath, 'utf-8');
    const merchants = parseCSV(csvText);
    
    console.log(`📊 Found ${merchants.length} merchants in CSV`);
    
    let successCount = 0;
    let errorCount = 0;
    const importedMerchants = [];
    
    for (const merchantData of merchants) {
      try {
        // Create merchant record
        const { data: merchant, error: merchantError } = await supabase
          .from('merchants')
          .insert([{
            name: merchantData.merchant_name,
            website_url: merchantData.merchant_website_url || null,
            email: merchantData.merchant_email || null,
            phone: merchantData.merchant_phone || null,
            is_active: true,
            verification_status: 'verified'
          }])
          .select('id, name')
          .single();
        
        if (merchantError) {
          console.error(`❌ Error creating merchant ${merchantData.merchant_name}:`, merchantError);
          errorCount++;
          continue;
        }
        
        importedMerchants.push(merchant);
        
        // Create merchant location
        const addressLine1 = merchantData.merchant_address_1 || merchantData.merchant_address_2 || 'Address Not Available';
        const city = merchantData.merchant_address_3 || merchantData.merchant_address_4 || 'City Not Available';
        
        const { error: locationError } = await supabase
          .from('merchant_locations')
          .insert([{
            merchant_id: merchant.id,
            name: merchantData.merchant_name,
            is_primary: true,
            address_line_1: addressLine1,
            address_line_2: merchantData.merchant_address_2 || null,
            city: city,
            county: merchantData.merchant_address_4 || null,
            postal_code: merchantData.merchant_postcode || '',
            country: 'United Kingdom',
            latitude: merchantData.merchant_latitude ? parseFloat(merchantData.merchant_latitude) : null,
            longitude: merchantData.merchant_longitude ? parseFloat(merchantData.merchant_longitude) : null,
            phone: merchantData.merchant_phone || null,
            email: merchantData.merchant_email || null,
            is_active: true
          }]);
        
        if (locationError) {
          console.error(`❌ Error creating location for ${merchantData.merchant_name}:`, locationError);
          errorCount++;
          continue;
        }
        
        // Create NMBS organization affiliation
        const { error: affiliationError } = await supabase
          .from('merchant_organization_affiliations')
          .insert([{
            merchant_id: merchant.id,
            organization_id: organizationId,
            affiliation_status: 'active',
            membership_level: 'standard',
            member_since: new Date().toISOString().split('T')[0]
          }]);
        
        if (affiliationError) {
          console.error(`❌ Error creating affiliation for ${merchantData.merchant_name}:`, affiliationError);
          errorCount++;
          continue;
        }
        
        // Create merchant analytics record
        const { error: analyticsError } = await supabase
          .from('merchant_analytics')
          .insert([{
            id: merchant.id,
            name: merchant.name,
            owner_user_id: null,
            total_views: 0,
            unique_viewers: 0,
            total_reviews: 0,
            average_rating: null,
            follower_count: 0,
            selected_offers_count: 0,
            total_reservations: 0
          }]);
        
        if (analyticsError) {
          console.error(`❌ Error creating analytics for ${merchantData.merchant_name}:`, analyticsError);
          errorCount++;
          continue;
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
    return { successCount, errorCount, importedMerchants };
    
  } catch (error) {
    console.error('❌ Error importing data:', error);
    throw error;
  }
}

async function verifyComprehensiveImport() {
  console.log('🔍 Verifying comprehensive import...');
  
  try {
    const verificationResults = {};
    
    const tables = [
      'merchants',
      'merchant_locations',
      'merchant_organization_affiliations', 
      'merchant_analytics'
    ];
    
    for (const tableName of tables) {
      const { data, error } = await supabase
        .from(tableName)
        .select('id', { count: 'exact', head: true });
      
      if (error) {
        verificationResults[tableName] = { count: 0, error: error.message };
      } else {
        verificationResults[tableName] = { count: data?.length || 0 };
      }
    }
    
    console.log('✅ Verification complete:');
    for (const [table, result] of Object.entries(verificationResults)) {
      if (result.error) {
        console.log(`   ❌ ${table}: Error - ${result.error}`);
      } else {
        console.log(`   ✅ ${table}: ${result.count} records`);
      }
    }
    
    return verificationResults;
    
  } catch (error) {
    console.error('❌ Error verifying import:', error);
    throw error;
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting comprehensive merchant data replacement process...\n');
  
  try {
    // Step 1: Backup all existing data
    const backupInfo = await backupAllMerchantData();
    console.log('');
    
    // Step 2: Get or create NMBS organization
    const organizationId = await getOrCreateNMBSOrganization();
    console.log('');
    
    // Step 3: Clear all existing merchant data
    await clearAllMerchantData();
    console.log('');
    
    // Step 4: Import new data with all relationships
    const importStats = await importNewMerchantData(organizationId);
    console.log('');
    
    // Step 5: Verify comprehensive import
    const verifyStats = await verifyComprehensiveImport();
    console.log('');
    
    console.log('🎉 Comprehensive merchant data replacement completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - Backup: ${backupInfo.totalRecords} total records from all tables`);
    console.log(`   - Import: ${importStats.successCount} successful, ${importStats.errorCount} errors`);
    console.log(`   - Final verification:`);
    
    for (const [table, result] of Object.entries(verifyStats)) {
      if (!result.error) {
        console.log(`     • ${table}: ${result.count} records`);
      }
    }
    
    console.log(`\n📁 Complete backup saved to: ${backupInfo.backupFilePath}`);
    
  } catch (error) {
    console.error('💥 Process failed:', error);
    console.log('\n🔄 You can restore from backup files in:', backupDir);
    process.exit(1);
  }
}

// Run the script
main();
