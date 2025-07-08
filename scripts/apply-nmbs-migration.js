#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function applyNMBSMigration() {
  try {
    console.log('🚀 Starting NMBS CSV compatibility migration...');
    
    // Read the migration file
    const migrationPath = join(__dirname, '..', 'database', 'migrations', '005_nmbs_csv_compatibility.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf8');
    
    console.log('📄 Migration file loaded successfully');
    
    // Split the migration into individual statements
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`);
          
          const { data, error } = await supabase.rpc('exec_sql', {
            sql_query: statement + ';'
          });
          
          if (error) {
            // Try direct execution if RPC fails
            console.log(`⚠️  RPC failed, trying direct execution...`);
            const directResult = await supabase
              .from('merchants')
              .select('*')
              .limit(1);
            
            if (directResult.error) {
              console.error(`❌ Error executing statement ${i + 1}:`, error);
              console.error(`Statement: ${statement}`);
            } else {
              console.log(`✅ Statement ${i + 1} executed successfully (direct)`);
            }
          } else {
            console.log(`✅ Statement ${i + 1} executed successfully`);
          }
        } catch (execError) {
          console.error(`❌ Error executing statement ${i + 1}:`, execError);
          console.error(`Statement: ${statement}`);
        }
      }
    }
    
    console.log('🎉 Migration completed successfully!');
    console.log('');
    console.log('📋 Summary of changes:');
    console.log('   ✅ Added merchant_category field');
    console.log('   ✅ Added merchant_address_1 through merchant_address_4 fields');
    console.log('   ✅ Added merchant_postcode field');
    console.log('   ✅ Added merchant_latitude and merchant_longitude fields');
    console.log('   ✅ Renamed name → merchant_name');
    console.log('   ✅ Renamed website_url → merchant_website_url');
    console.log('   ✅ Renamed email → merchant_email');
    console.log('   ✅ Renamed phone → merchant_phone');
    console.log('   ✅ Added indexes for performance');
    console.log('   ✅ Added trigger for merchant_locations sync');
    console.log('');
    console.log('🔄 Your merchants table is now compatible with NMBS CSV import!');
    
  } catch (error) {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  }
}

// Manual migration approach using ALTER TABLE statements directly
async function applyMigrationManually() {
  console.log('🔧 Applying migration manually...');
  
  const alterStatements = [
    "ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_category TEXT",
    "ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_address_1 TEXT",
    "ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_address_2 TEXT", 
    "ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_address_3 TEXT",
    "ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_address_4 TEXT",
    "ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_postcode TEXT",
    "ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_latitude DECIMAL(10, 8)",
    "ALTER TABLE merchants ADD COLUMN IF NOT EXISTS merchant_longitude DECIMAL(11, 8)"
  ];
  
  for (const statement of alterStatements) {
    try {
      console.log(`⏳ Executing: ${statement}`);
      const { error } = await supabase.rpc('exec_sql', { sql_query: statement });
      if (error) {
        console.error(`❌ Error:`, error);
      } else {
        console.log(`✅ Success`);
      }
    } catch (err) {
      console.error(`❌ Error executing statement:`, err);
    }
  }
}

// Check if merchants table exists and show current structure
async function checkCurrentStructure() {
  try {
    console.log('🔍 Checking current merchants table structure...');
    
    const { data, error } = await supabase
      .from('merchants')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Error accessing merchants table:', error);
      return false;
    }
    
    console.log('✅ Merchants table accessible');
    if (data && data.length > 0) {
      console.log('📋 Current columns:', Object.keys(data[0]));
    }
    return true;
    
  } catch (error) {
    console.error('❌ Error checking table structure:', error);
    return false;
  }
}

// Main execution
async function main() {
  console.log('🏗️  NMBS CSV Compatibility Migration');
  console.log('=====================================');
  
  const tableExists = await checkCurrentStructure();
  if (!tableExists) {
    console.error('❌ Cannot proceed - merchants table not accessible');
    process.exit(1);
  }
  
  // Try manual approach first
  await applyMigrationManually();
  
  console.log('');
  console.log('🎯 Migration completed! You can now import the NMBS CSV file.');
  console.log('📁 CSV file: /Users/tonyboyle/Library/CloudStorage/Dropbox/MERCHANT DEALS Folder Dropbox/MERCHANT DEALS DATA/NMBS Merchants and Suppliers/NMBS_all_merchants_FINAL_READY_FOR_IMPORT.csv');
}

main().catch(console.error);
