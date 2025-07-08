#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const backupDir = '/Users/tonyboyle/uk-building-merchant-saas/backups';

async function listBackups() {
  try {
    const files = readdirSync(backupDir);
    const backupSets = {};
    
    files.forEach(file => {
      const match = file.match(/^(merchants|merchant_locations|merchant_affiliations)_backup_(.+)\.json$/);
      if (match) {
        const [, type, timestamp] = match;
        if (!backupSets[timestamp]) {
          backupSets[timestamp] = {};
        }
        backupSets[timestamp][type] = file;
      }
    });
    
    return Object.keys(backupSets)
      .sort((a, b) => b.localeCompare(a)) // Most recent first
      .map(timestamp => ({
        timestamp,
        files: backupSets[timestamp]
      }));
  } catch (error) {
    console.error('Error listing backups:', error);
    return [];
  }
}

async function clearCurrentData() {
  console.log('🗑️ Clearing current merchant data...');
  
  try {
    // Delete in reverse order of dependencies
    await supabase.from('merchant_organization_affiliations').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('merchant_locations').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('merchants').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    console.log('✅ Current data cleared');
  } catch (error) {
    console.error('❌ Error clearing data:', error);
    throw error;
  }
}

async function restoreFromBackup(backupSet) {
  console.log(`📥 Restoring from backup: ${backupSet.timestamp}`);
  
  try {
    // Restore merchants first
    if (backupSet.files.merchants) {
      const merchantsData = JSON.parse(readFileSync(path.join(backupDir, backupSet.files.merchants), 'utf-8'));
      
      if (merchantsData.length > 0) {
        console.log(`📋 Restoring ${merchantsData.length} merchants...`);
        
        // Insert in batches to avoid payload size limits
        const batchSize = 100;
        for (let i = 0; i < merchantsData.length; i += batchSize) {
          const batch = merchantsData.slice(i, i + batchSize);
          const { error } = await supabase
            .from('merchants')
            .insert(batch);
          
          if (error) throw error;
          console.log(`   ✅ Restored merchants ${i + 1}-${Math.min(i + batchSize, merchantsData.length)}`);
        }
      }
    }
    
    // Restore merchant locations
    if (backupSet.files.merchant_locations) {
      const locationsData = JSON.parse(readFileSync(path.join(backupDir, backupSet.files.merchant_locations), 'utf-8'));
      
      if (locationsData.length > 0) {
        console.log(`📍 Restoring ${locationsData.length} merchant locations...`);
        
        const batchSize = 100;
        for (let i = 0; i < locationsData.length; i += batchSize) {
          const batch = locationsData.slice(i, i + batchSize);
          const { error } = await supabase
            .from('merchant_locations')
            .insert(batch);
          
          if (error) throw error;
          console.log(`   ✅ Restored locations ${i + 1}-${Math.min(i + batchSize, locationsData.length)}`);
        }
      }
    }
    
    // Restore merchant affiliations
    if (backupSet.files.merchant_affiliations) {
      const affiliationsData = JSON.parse(readFileSync(path.join(backupDir, backupSet.files.merchant_affiliations), 'utf-8'));
      
      if (affiliationsData.length > 0) {
        console.log(`🔗 Restoring ${affiliationsData.length} merchant affiliations...`);
        
        const batchSize = 100;
        for (let i = 0; i < affiliationsData.length; i += batchSize) {
          const batch = affiliationsData.slice(i, i + batchSize);
          const { error } = await supabase
            .from('merchant_organization_affiliations')
            .insert(batch);
          
          if (error) throw error;
          console.log(`   ✅ Restored affiliations ${i + 1}-${Math.min(i + batchSize, affiliationsData.length)}`);
        }
      }
    }
    
    console.log('✅ Backup restoration completed successfully!');
    
  } catch (error) {
    console.error('❌ Error restoring from backup:', error);
    throw error;
  }
}

async function verifyRestoration() {
  console.log('🔍 Verifying restoration...');
  
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
      throw new Error('Error verifying restoration');
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
    console.error('❌ Error verifying restoration:', error);
    throw error;
  }
}

// Main execution
async function main() {
  console.log('🔄 Starting merchant data rollback process...\n');
  
  try {
    // List available backups
    const backups = await listBackups();
    
    if (backups.length === 0) {
      console.error('❌ No backups found in:', backupDir);
      process.exit(1);
    }
    
    console.log('📂 Available backups:');
    backups.forEach((backup, index) => {
      console.log(`   ${index + 1}. ${backup.timestamp}`);
      console.log(`      Files: ${Object.keys(backup.files).join(', ')}`);
    });
    
    // For script execution, use the most recent backup
    const selectedBackup = backups[0];
    console.log(`\n🎯 Using most recent backup: ${selectedBackup.timestamp}\n`);
    
    // Verify backup has all required files
    const requiredFiles = ['merchants', 'merchant_locations', 'merchant_affiliations'];
    const missingFiles = requiredFiles.filter(file => !selectedBackup.files[file]);
    
    if (missingFiles.length > 0) {
      console.error(`❌ Backup incomplete. Missing files: ${missingFiles.join(', ')}`);
      process.exit(1);
    }
    
    // Clear current data
    await clearCurrentData();
    console.log('');
    
    // Restore from backup
    await restoreFromBackup(selectedBackup);
    console.log('');
    
    // Verify restoration
    const verifyStats = await verifyRestoration();
    console.log('');
    
    console.log('🎉 Merchant data rollback completed successfully!');
    console.log('📊 Restored:');
    console.log(`   - Merchants: ${verifyStats.merchants}`);
    console.log(`   - Locations: ${verifyStats.locations}`);
    console.log(`   - Affiliations: ${verifyStats.affiliations}`);
    
  } catch (error) {
    console.error('💥 Rollback failed:', error);
    process.exit(1);
  }
}

// Run the script
main();
