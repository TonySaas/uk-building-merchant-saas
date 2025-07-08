#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// CSV file path
const csvFilePath = '/Users/tonyboyle/Library/CloudStorage/Dropbox/MERCHANT DEALS Folder Dropbox/MERCHANT DEALS DATA/NMBS Merchants and Suppliers/NMBS_all_merchants_FINAL_READY_FOR_IMPORT.csv';

function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
      const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
      const record = {};
      headers.forEach((header, index) => {
        record[header] = values[index] || null;
      });
      data.push(record);
    }
  }
  
  return data;
}

function transformNMBSRecord(csvRecord) {
  return {
    merchant_name: csvRecord.merchant_name,
    merchant_category: csvRecord.merchant_category,
    merchant_address_1: csvRecord.merchant_address_1,
    merchant_address_2: csvRecord.merchant_address_2,
    merchant_address_3: csvRecord.merchant_address_3,
    merchant_address_4: csvRecord.merchant_address_4,
    merchant_postcode: csvRecord.merchant_postcode,
    merchant_website_url: csvRecord.merchant_website_url,
    merchant_email: csvRecord.merchant_email,
    merchant_phone: csvRecord.merchant_phone,
    merchant_latitude: csvRecord.merchant_latitude ? parseFloat(csvRecord.merchant_latitude) : null,
    merchant_longitude: csvRecord.merchant_longitude ? parseFloat(csvRecord.merchant_longitude) : null,
    is_active: true,
    verification_status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    // Add NMBS organization affiliation
    organization_affiliation: 'NMBS'
  };
}

async function importNMBSData() {
  try {
    console.log('🚀 Starting NMBS CSV import...');
    console.log('📁 Reading CSV file:', csvFilePath);
    
    // Read and parse CSV
    const csvText = readFileSync(csvFilePath, 'utf-8');
    const csvData = parseCSV(csvText);
    
    console.log(`📊 Found ${csvData.length} merchants in CSV`);
    
    // Transform data
    const transformedData = csvData.map(transformNMBSRecord);
    
    console.log('🔄 Sample transformed record:');
    console.log(JSON.stringify(transformedData[0], null, 2));
    
    // Get NMBS organization ID
    const { data: organizations, error: orgError } = await supabase
      .from('organizations')
      .select('id')
      .eq('name', 'NMBS')
      .single();
    
    if (orgError) {
      console.error('❌ Error finding NMBS organization:', orgError);
      return;
    }
    
    const nmbs_org_id = organizations.id;
    console.log('🏢 NMBS Organization ID:', nmbs_org_id);
    
    // Batch import in chunks of 50
    const batchSize = 50;
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < transformedData.length; i += batchSize) {
      const batch = transformedData.slice(i, i + batchSize);
      
      console.log(`📦 Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(transformedData.length/batchSize)} (${batch.length} records)`);
      
      const { data, error } = await supabase
        .from('merchants')
        .insert(batch)
        .select('id, merchant_name');
      
      if (error) {
        console.error(`❌ Error in batch ${Math.floor(i/batchSize) + 1}:`, error);
        errorCount += batch.length;
      } else {
        console.log(`✅ Successfully imported ${data.length} merchants in batch ${Math.floor(i/batchSize) + 1}`);
        successCount += data.length;
        
        // Create organization affiliations for successful imports
        const affiliations = data.map(merchant => ({
          merchant_id: merchant.id,
          organization_id: nmbs_org_id,
          affiliation_status: 'active',
          membership_level: 'standard',
          member_since: new Date().toISOString().split('T')[0]
        }));
        
        const { error: affError } = await supabase
          .from('merchant_organization_affiliations')
          .insert(affiliations);
        
        if (affError) {
          console.warn(`⚠️  Warning: Could not create organization affiliations for batch ${Math.floor(i/batchSize) + 1}:`, affError);
        }
      }
      
      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('');
    console.log('🎉 Import completed!');
    console.log(`✅ Successfully imported: ${successCount} merchants`);
    console.log(`❌ Errors: ${errorCount} merchants`);
    console.log(`📊 Total processed: ${transformedData.length} merchants`);
    
    // Show sample of imported data
    const { data: sampleData } = await supabase
      .from('merchants')
      .select('merchant_name, merchant_category, merchant_postcode')
      .limit(5);
    
    console.log('');
    console.log('📋 Sample imported merchants:');
    sampleData?.forEach(merchant => {
      console.log(`   • ${merchant.merchant_name} (${merchant.merchant_category}) - ${merchant.merchant_postcode}`);
    });
    
  } catch (error) {
    console.error('💥 Import failed:', error);
    process.exit(1);
  }
}

// Check database structure first
async function checkDatabaseStructure() {
  console.log('🔍 Checking database structure...');
  
  try {
    const { data, error } = await supabase
      .from('merchants')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Error accessing merchants table:', error);
      return false;
    }
    
    if (data && data.length > 0) {
      const columns = Object.keys(data[0]);
      console.log('📋 Available columns:', columns);
      
      // Check for required CSV columns
      const requiredColumns = [
        'merchant_name', 'merchant_category', 'merchant_address_1', 
        'merchant_postcode', 'merchant_website_url', 'merchant_email', 
        'merchant_phone', 'merchant_latitude', 'merchant_longitude'
      ];
      
      const missingColumns = requiredColumns.filter(col => !columns.includes(col));
      
      if (missingColumns.length > 0) {
        console.warn('⚠️  Missing required columns:', missingColumns);
        console.log('');
        console.log('🔧 Please run the manual migration steps first:');
        console.log('   1. Open Supabase Dashboard > SQL Editor');
        console.log('   2. Execute the commands in MANUAL_MIGRATION_STEPS.sql');
        console.log('   3. Then run this import script again');
        return false;
      }
    }
    
    console.log('✅ Database structure looks good!');
    return true;
    
  } catch (error) {
    console.error('❌ Error checking database structure:', error);
    return false;
  }
}

// Main execution
async function main() {
  console.log('🏗️  NMBS Merchants CSV Import Tool');
  console.log('====================================');
  
  const structureOk = await checkDatabaseStructure();
  if (!structureOk) {
    process.exit(1);
  }
  
  await importNMBSData();
}

main().catch(console.error);
