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
    updated_at: new Date().toISOString()
    // REMOVED: organization_affiliation field - this doesn't exist in the table
  };
}

async function importNMBSData() {
  try {
    console.log('🚀 Starting CORRECTED NMBS CSV import...');
    console.log('📁 Reading CSV file:', csvFilePath);
    
    // Read and parse CSV
    const csvText = readFileSync(csvFilePath, 'utf-8');
    const csvData = parseCSV(csvText);
    
    console.log(`📊 Found ${csvData.length} merchants in CSV`);
    
    // Transform data (WITHOUT organization_affiliation field)
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
    const importedMerchantIds = [];
    
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
        
        // Store merchant IDs for organization affiliation
        importedMerchantIds.push(...data.map(m => m.id));
      }
      
      // Small delay between batches to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('');
    console.log('🎉 Merchant import completed!');
    console.log(`✅ Successfully imported: ${successCount} merchants`);
    console.log(`❌ Errors: ${errorCount} merchants`);
    console.log(`📊 Total processed: ${transformedData.length} merchants`);
    
    // Now create organization affiliations for successfully imported merchants
    if (importedMerchantIds.length > 0) {
      console.log('');
      console.log('🔗 Creating NMBS organization affiliations...');
      
      const affiliations = importedMerchantIds.map(merchantId => ({
        merchant_id: merchantId,
        organization_id: nmbs_org_id,
        affiliation_status: 'active',
        membership_level: 'standard',
        member_since: new Date().toISOString().split('T')[0],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
      
      // Batch create affiliations
      const affiliationBatchSize = 100;
      let affiliationSuccessCount = 0;
      
      for (let i = 0; i < affiliations.length; i += affiliationBatchSize) {
        const affBatch = affiliations.slice(i, i + affiliationBatchSize);
        
        console.log(`🔗 Creating affiliations batch ${Math.floor(i/affiliationBatchSize) + 1}/${Math.ceil(affiliations.length/affiliationBatchSize)} (${affBatch.length} records)`);
        
        const { data: affData, error: affError } = await supabase
          .from('merchant_organization_affiliations')
          .insert(affBatch);
        
        if (affError) {
          console.error(`❌ Error creating affiliations batch ${Math.floor(i/affiliationBatchSize) + 1}:`, affError);
        } else {
          console.log(`✅ Created ${affBatch.length} NMBS affiliations in batch ${Math.floor(i/affiliationBatchSize) + 1}`);
          affiliationSuccessCount += affBatch.length;
        }
        
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      console.log('');
      console.log('🎉 Organization affiliations completed!');
      console.log(`✅ Successfully created: ${affiliationSuccessCount} NMBS affiliations`);
    }
    
    // Show sample of imported data
    const { data: sampleData } = await supabase
      .from('merchants')
      .select('merchant_name, merchant_category, merchant_postcode')
      .order('created_at', { ascending: false })
      .limit(10);
    
    console.log('');
    console.log('📋 Sample imported merchants:');
    sampleData?.forEach(merchant => {
      console.log(`   • ${merchant.merchant_name} (${merchant.merchant_category}) - ${merchant.merchant_postcode}`);
    });
    
    // Final count
    const { count } = await supabase
      .from('merchants')
      .select('*', { count: 'exact', head: true });
    
    console.log('');
    console.log(`🏆 FINAL RESULT: ${count} total merchants now in database`);
    console.log(`🎯 NMBS merchants imported with organization affiliations!`);
    
  } catch (error) {
    console.error('💥 Import failed:', error);
    process.exit(1);
  }
}

// Main execution
async function main() {
  console.log('🏗️  CORRECTED NMBS Merchants CSV Import Tool');
  console.log('=============================================');
  
  await importNMBSData();
}

main().catch(console.error);
