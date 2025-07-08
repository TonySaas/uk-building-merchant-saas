#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkTableStructure() {
  try {
    console.log('🔍 Checking current merchants table structure...');
    
    // Get current structure
    const { data, error } = await supabase
      .from('merchants')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Error accessing merchants table:', error);
      return;
    }
    
    if (!data || data.length === 0) {
      console.log('📋 Table exists but is empty. Checking column structure...');
      
      // Try to get structure another way by attempting to select specific columns
      const testColumns = [
        'id', 'merchant_name', 'name', 'email', 'merchant_email', 
        'phone', 'merchant_phone', 'website_url', 'merchant_website_url',
        'category', 'merchant_category', 'merchant_address_1', 'merchant_postcode',
        'merchant_latitude', 'merchant_longitude'
      ];
      
      const existingColumns = [];
      
      for (const col of testColumns) {
        try {
          const { error: colError } = await supabase
            .from('merchants')
            .select(col)
            .limit(1);
          
          if (!colError) {
            existingColumns.push(col);
          }
        } catch (e) {
          // Column doesn't exist
        }
      }
      
      console.log('✅ Existing columns found:', existingColumns);
      generateMigrationCommands(existingColumns);
      
    } else {
      console.log('✅ Table accessible with data');
      const currentColumns = Object.keys(data[0]);
      console.log('📋 Current columns:', currentColumns);
      
      generateMigrationCommands(currentColumns);
    }
    
  } catch (error) {
    console.error('❌ Error checking table structure:', error);
  }
}

function generateMigrationCommands(existingColumns) {
  console.log('\n🔧 RECOMMENDED SQL COMMANDS:');
  console.log('=====================================');
  
  // Required columns for NMBS CSV
  const requiredColumns = [
    'merchant_name',
    'merchant_category', 
    'merchant_address_1',
    'merchant_address_2',
    'merchant_address_3', 
    'merchant_address_4',
    'merchant_postcode',
    'merchant_website_url',
    'merchant_email',
    'merchant_phone',
    'merchant_latitude',
    'merchant_longitude'
  ];
  
  // Check what needs to be added
  const missingColumns = requiredColumns.filter(col => !existingColumns.includes(col));
  
  console.log('\n📦 STEP 1: Add missing columns');
  console.log('Copy these commands to Supabase SQL Editor:');
  console.log('');
  
  if (missingColumns.length > 0) {
    missingColumns.forEach(col => {
      const dataType = col.includes('latitude') || col.includes('longitude') 
        ? 'DECIMAL(10, 8)' 
        : 'TEXT';
      console.log(`ALTER TABLE merchants ADD COLUMN IF NOT EXISTS ${col} ${dataType};`);
    });
  } else {
    console.log('✅ All required columns already exist!');
  }
  
  console.log('\n🔄 STEP 2: Rename existing columns (if needed)');
  console.log('Only run these if the OLD column exists:');
  console.log('');
  
  // Check for columns that need renaming
  const renameMap = {
    'name': 'merchant_name',
    'email': 'merchant_email', 
    'phone': 'merchant_phone',
    'website_url': 'merchant_website_url',
    'category': 'merchant_category'
  };
  
  let hasRenames = false;
  Object.entries(renameMap).forEach(([oldCol, newCol]) => {
    if (existingColumns.includes(oldCol) && !existingColumns.includes(newCol)) {
      console.log(`ALTER TABLE merchants RENAME COLUMN ${oldCol} TO ${newCol};`);
      hasRenames = true;
    }
  });
  
  if (!hasRenames) {
    console.log('✅ No column renames needed!');
  }
  
  console.log('\n📊 STEP 3: Add indexes');
  console.log('');
  console.log('CREATE INDEX IF NOT EXISTS idx_merchants_address ON merchants(merchant_postcode);');
  console.log('CREATE INDEX IF NOT EXISTS idx_merchants_coords ON merchants(merchant_latitude, merchant_longitude);');
  console.log('CREATE INDEX IF NOT EXISTS idx_merchants_category ON merchants(merchant_category);');
  
  console.log('\n🎯 FINAL CHECK:');
  console.log('After running the above commands, verify with:');
  console.log("SELECT column_name FROM information_schema.columns WHERE table_name = 'merchants' ORDER BY ordinal_position;");
  
  // Check if ready for CSV import
  const readyForImport = requiredColumns.every(col => 
    existingColumns.includes(col) || missingColumns.includes(col)
  );
  
  console.log('\n' + (readyForImport ? '🎉' : '⚠️ ') + ' CSV IMPORT STATUS:');
  if (readyForImport) {
    console.log('✅ After running the above commands, you can proceed with CSV import!');
    console.log('Run: node scripts/import-nmbs-csv.js');
  } else {
    console.log('❌ Additional work needed before CSV import is possible');
  }
}

// Main execution
async function main() {
  console.log('🏗️  Table Structure Checker');
  console.log('============================');
  
  await checkTableStructure();
}

main().catch(console.error);
