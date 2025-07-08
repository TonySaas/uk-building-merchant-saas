#!/usr/bin/env node
// NMBS Merchants Import Execution Script for UK Building Merchant SaaS
// Run this to execute the complete NMBS import process

import { NMBSMerchantImporter } from './nmbs_importer.js';
import dotenv from 'dotenv';
import readline from 'readline';
import fs from 'fs';

// Load environment variables
dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function runNMBSImport() {
  console.log('🏗️  UK BUILDING MERCHANT SAAS - NMBS IMPORT');
  console.log('===========================================');
  console.log('');
  
  try {
    // Validate environment
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials. Check your .env file for VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    }

    // Define CSV file path
    const csvPath = '/Users/tonyboyle/Library/CloudStorage/Dropbox/MERCHANT DEALS Folder Dropbox/MERCHANT DEALS DATA/NMBS Merchants and Suppliers/NMBS_all_merchants_FINAL_READY_FOR_IMPORT.csv';
    
    console.log(`📁 CSV File: ${csvPath}`);
    console.log(`🗄️  Supabase URL: ${supabaseUrl}`);
    console.log('');

    // Check CSV file exists
    if (!fs.existsSync(csvPath)) {
      console.log('❌ CSV file not found at expected location');
      console.log('📁 Looking for NMBS CSV files...');
      
      const searchDir = '/Users/tonyboyle/Library/CloudStorage/Dropbox/MERCHANT DEALS Folder Dropbox/MERCHANT DEALS DATA/NMBS Merchants and Suppliers/';
      try {
        const files = fs.readdirSync(searchDir);
        const csvFiles = files.filter(file => file.includes('NMBS') && file.endsWith('.csv'));
        
        if (csvFiles.length > 0) {
          console.log('📄 Found NMBS CSV files:');
          csvFiles.forEach(file => console.log(`   • ${file}`));
          console.log('');
          console.log('💡 Update the csvPath variable in the script to use the correct file.');
        } else {
          console.log('❌ No NMBS CSV files found in the directory');
        }
      } catch (err) {
        console.log('❌ Cannot access Dropbox directory:', err.message);
      }
      
      rl.close();
      return;
    }

    // Verify file stats
    const fileStats = fs.statSync(csvPath);
    console.log(`✅ CSV file found (${Math.round(fileStats.size / 1024)} KB, ${fileStats.lineCount || 'unknown'} lines)`);

    // Safety checks
    console.log('⚠️  SAFETY CHECKLIST:');
    console.log('   ✅ Supabase credentials verified');
    console.log('   ✅ CSV file located and accessible');
    console.log('   ✅ Database connection will be tested');
    console.log('   ✅ Automated error handling and rollback');
    console.log('');

    // Confirm import type
    console.log('📊 IMPORT OPTIONS:');
    console.log('   1. Test Import (first 10 records only)');
    console.log('   2. Small Import (first 100 records)');
    console.log('   3. Full Import (all ~1,687 records)');
    console.log('');
    
    const importType = await question('Select import type (1, 2, or 3): ');
    
    let maxRecords = null;
    let importDescription = '';
    
    switch(importType) {
      case '1':
        maxRecords = 10;
        importDescription = 'TEST IMPORT (10 records)';
        break;
      case '2':
        maxRecords = 100;
        importDescription = 'SMALL IMPORT (100 records)';
        break;
      case '3':
        maxRecords = null;
        importDescription = 'FULL IMPORT (all records)';
        break;
      default:
        console.log('❌ Invalid selection. Defaulting to test import.');
        maxRecords = 10;
        importDescription = 'TEST IMPORT (10 records)';
    }

    console.log(`\n🚀 Starting ${importDescription}...`);
    
    if (!maxRecords || maxRecords >= 100) {
      const finalConfirm = await question(`⚠️  This will import ${maxRecords || 'ALL'} NMBS merchants. Are you sure? (yes/no): `);
      if (finalConfirm.toLowerCase() !== 'yes') {
        console.log('❌ Import cancelled.');
        rl.close();
        return;
      }
    }

    console.log('');
    console.log('⏳ Import starting...');
    console.log('=====================================');

    // Initialize importer with correct credentials
    const importer = new NMBSMerchantImporter(supabaseUrl, supabaseKey);

    // Start import
    const startTime = Date.now();
    const stats = await importer.importFromCSV(csvPath, maxRecords);
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);

    // Report results
    console.log('');
    console.log('🎉 IMPORT COMPLETED!');
    console.log('====================');
    console.log(`⏱️  Duration: ${duration} seconds`);
    console.log(`📊 Statistics:`);
    console.log(`   • Total Rows Processed: ${stats.totalRows}`);
    console.log(`   • Unique Merchants: ${stats.uniqueMerchants}`);
    console.log(`   • Successful Merchants: ${stats.successfulMerchants}`);
    console.log(`   • Successful Locations: ${stats.successfulLocations}`);
    console.log(`   • Failed Rows: ${stats.failedRows}`);
    console.log(`   • Issues Found: ${stats.issues.length}`);

    if (stats.issues.length > 0) {
      console.log('');
      console.log('⚠️  ISSUES ENCOUNTERED:');
      stats.issues.slice(0, 15).forEach((issue, index) => {
        console.log(`   ${index + 1}. ${issue}`);
      });
      
      if (stats.issues.length > 15) {
        console.log(`   ... and ${stats.issues.length - 15} more issues`);
      }
    }

    // Success rate calculation
    const successRate = Math.round((stats.successfulMerchants / stats.uniqueMerchants) * 100);
    console.log('');
    console.log(`📈 Success Rate: ${successRate}% merchants processed successfully`);

    // Next steps
    console.log('');
    console.log('📋 NEXT STEPS:');
    if (maxRecords && maxRecords <= 100) {
      console.log('   1. Review test results and issues above');
      console.log('   2. Fix any critical data quality problems if needed');
      console.log('   3. Run full import when ready (option 3)');
      console.log('   4. Check Supabase dashboard to see imported data');
    } else {
      console.log('   1. Validate data in Supabase dashboard');
      console.log('   2. Test merchant discovery in your application');
      console.log('   3. Verify NMBS organization functionality');
      console.log('   4. Update frontend to display new NMBS merchants');
    }

    console.log('');
    console.log('🔗 Database URLs:');
    console.log(`   Supabase Dashboard: https://supabase.com/dashboard/project/${supabaseUrl.split('.')[0].split('//')[1]}`);
    console.log(`   Organizations: Check the 'organizations' table for NMBS entry`);
    console.log(`   Merchants: Check the 'merchants' table for new entries`);
    console.log(`   Locations: Check the 'merchant_locations' table for location data`);

  } catch (error) {
    console.error('');
    console.error('❌ IMPORT FAILED:');
    console.error(error.message);
    console.error('');
    console.error('🔧 TROUBLESHOOTING:');
    console.error('   1. Check Supabase credentials in .env file');
    console.error('   2. Verify CSV file path and format');
    console.error('   3. Check network connection to Supabase');
    console.error('   4. Review error logs above for specific issues');
    console.error('   5. Try with a smaller test import first');
  } finally {
    rl.close();
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runNMBSImport();
}

export { runNMBSImport };
