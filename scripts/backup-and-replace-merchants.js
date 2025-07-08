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
      values.push(currentValue.trim()); // Push the last value
      
      const record = {};
      headers.forEach((header, index) => {
        record[header] = values[index] || null;
      });
      data.push(record);
    }
  }
  return data;
}

async function backupExistingData() {
  console.log('📦 Creating backup of existing merchant data...');
  
  try {
    // Backup merchants
    const { data: merchants, error: merchantsError } = await supabase
      .from('merchants')
      .select('*');
    
    if (merchantsError) throw merchantsError;
    
    // Backup merchant locations
    const { data: locations, error: locationsError } = await supabase
      .from('merchant_locations')
      .select('*');
    
    if (locationsError) throw locationsError;
    
    // Backup merchant organization affiliations
    const { data: affiliations, error: affiliationsError } = await supabase
      .from('merchant_organization_affiliations')
      .select('*');
    
    if (affiliationsError) throw affiliationsError;
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    // Save backups
    writeFileSync(
      path.join(backupDir, `merchants_backup_${timestamp}.json`),
      JSON.stringify(merchants, null, 2)
    );
    
    writeFileSync(
      path.join(backupDir, `merchant_locations_backup_${timestamp}.json`),
      JSON.stringify(locations, null, 2)
    );
    
    writeFileSync(
      path.join(backupDir, `merchant_affiliations_backup_${timestamp}.json`),
      JSON.stringify(affiliations, null, 2)
    );
    
    console.log(`✅ Backup completed: ${merchants.length} merchants, ${locations.length} locations, ${affiliations.length} affiliations`);
    return { merchants: merchants.length, locations: locations.length, affiliations: affiliations.length };
    
  } catch (error) {
    console.error('❌ Error creating backup:', error);
    throw error;
  }
}

async function getOrCreateNMBSOrganization() {
  // Get or create NMBS organization
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

async function clearExistingData() {
  console.log('🗑️ Clearing existing merchant data...');
  
  try {
    // Delete in reverse order of dependencies
    await supabase.from('merchant_organization_affiliations').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('merchant_locations').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('merchants').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    console.log('✅ Existing data cleared');
  } catch (error) {
    console.error('❌ Error clearing data:', error);
    throw error;
  }
}

async function importNewData(organizationId) {
  console.log('📥 Importing new merchant data...');
  
  try {
    const csvText = readFileSync(csvFilePath, 'utf-8');
    const merchants = parseCSV(csvText);
    
    console.log(`📊 Found ${merchants.length} merchants in CSV`);
    
    let successCount = 0;
    let errorCount = 0;
    
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
          .select('id')
          .single();
        
        if (merchantError) {
          console.error(`❌ Error creating merchant ${merchantData.merchant_name}:`, merchantError);
          errorCount++;
          continue;
        }
        
        // Create merchant location with fallback for missing address data
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
    return { successCount, errorCount };
    
  } catch (error) {
    console.error('❌ Error importing data:', error);
    throw error;
  }
}

async function verifyImport() {
  console.log('🔍 Verifying import...');
  
  try {
    const { data: merchants, error: merchantsError } = await supabase
      .from('merchants')
      .select('id');
    
    const { data: locations, error: locationsError } = await supabase
      .from('merchant_locations')
      .select('id');
    
    const { data: affiliations, error: affiliationsError } = await supabase
      .from('merchant_organization_affiliations')
      .select('id');
    
    if (merchantsError || locationsError || affiliationsError) {
      throw new Error('Error verifying import');
    }
    
    console.log(`✅ Verification complete:`);
    console.log(`   - Merchants: ${merchants.length}`);
    console.log(`   - Locations: ${locations.length}`);
    console.log(`   - Affiliations: ${affiliations.length}`);
    
    return {
      merchants: merchants.length,
      locations: locations.length,
      affiliations: affiliations.length
    };
    
  } catch (error) {
    console.error('❌ Error verifying import:', error);
    throw error;
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting merchant data replacement process...\n');
  
  try {
    // Step 1: Backup existing data
    const backupStats = await backupExistingData();
    console.log('');
    
    // Step 2: Get or create NMBS organization
    const organizationId = await getOrCreateNMBSOrganization();
    console.log('');
    
    // Step 3: Clear existing data
    await clearExistingData();
    console.log('');
    
    // Step 4: Import new data
    const importStats = await importNewData(organizationId);
    console.log('');
    
    // Step 5: Verify import
    const verifyStats = await verifyImport();
    console.log('');
    
    console.log('🎉 Merchant data replacement completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - Backup: ${backupStats.merchants} merchants`);
    console.log(`   - Import: ${importStats.successCount} successful, ${importStats.errorCount} errors`);
    console.log(`   - Final: ${verifyStats.merchants} merchants in database`);
    
  } catch (error) {
    console.error('💥 Process failed:', error);
    console.log('\n🔄 You can restore from backup files in:', backupDir);
    process.exit(1);
  }
}

// Run the script
main();
