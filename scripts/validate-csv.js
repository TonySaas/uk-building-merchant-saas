#!/usr/bin/env node

import { readFileSync } from 'fs';

// CSV file path
const csvFilePath = '/Users/tonyboyle/Library/CloudStorage/Dropbox/MERCHANT DEALS Folder Dropbox/MERCHANT DEALS DATA/NMBS Merchants and Suppliers/NMBS_merchants_FINAL_COMPLETE.csv';

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
  return { headers, data };
}

function validateData(data) {
  console.log('🔍 Validating CSV data...\n');
  
  const issues = [];
  const stats = {
    total: data.length,
    withEmail: 0,
    withPhone: 0,
    withWebsite: 0,
    withLatLng: 0,
    emptyNames: 0,
    emptyAddresses: 0,
    categories: new Set(),
    counties: new Set()
  };
  
  data.forEach((record, index) => {
    const row = index + 2; // +2 because index starts at 0 and we skip header
    
    // Check required fields
    if (!record.merchant_name || record.merchant_name.trim() === '') {
      issues.push(`Row ${row}: Missing merchant name`);
      stats.emptyNames++;
    }
    
    if (!record.merchant_address_1 || record.merchant_address_1.trim() === '') {
      issues.push(`Row ${row}: Missing address line 1`);
      stats.emptyAddresses++;
    }
    
    // Count optional fields
    if (record.merchant_email && record.merchant_email.trim() !== '') {
      stats.withEmail++;
    }
    
    if (record.merchant_phone && record.merchant_phone.trim() !== '') {
      stats.withPhone++;
    }
    
    if (record.merchant_website_url && record.merchant_website_url.trim() !== '') {
      stats.withWebsite++;
    }
    
    if (record.merchant_latitude && record.merchant_longitude && 
        record.merchant_latitude.trim() !== '' && record.merchant_longitude.trim() !== '') {
      stats.withLatLng++;
    }
    
    // Collect categories and counties
    if (record.merchant_category && record.merchant_category.trim() !== '') {
      stats.categories.add(record.merchant_category.trim());
    }
    
    if (record.merchant_address_4 && record.merchant_address_4.trim() !== '') {
      stats.counties.add(record.merchant_address_4.trim());
    }
    
    // Validate coordinates if present
    if (record.merchant_latitude && record.merchant_latitude.trim() !== '') {
      const lat = parseFloat(record.merchant_latitude);
      if (isNaN(lat) || lat < -90 || lat > 90) {
        issues.push(`Row ${row}: Invalid latitude: ${record.merchant_latitude}`);
      }
    }
    
    if (record.merchant_longitude && record.merchant_longitude.trim() !== '') {
      const lng = parseFloat(record.merchant_longitude);
      if (isNaN(lng) || lng < -180 || lng > 180) {
        issues.push(`Row ${row}: Invalid longitude: ${record.merchant_longitude}`);
      }
    }
    
    // Validate email format (basic)
    if (record.merchant_email && record.merchant_email.trim() !== '') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(record.merchant_email.trim())) {
        issues.push(`Row ${row}: Invalid email format: ${record.merchant_email}`);
      }
    }
  });
  
  return { issues, stats };
}

function displayResults(headers, data, validation) {
  console.log('📊 CSV File Analysis Results\n');
  console.log('='.repeat(50));
  
  // File info
  console.log('\n📁 File Information:');
  console.log(`   File: ${csvFilePath.split('/').pop()}`);
  console.log(`   Total Records: ${validation.stats.total}`);
  console.log(`   Columns: ${headers.length}`);
  
  // Column info
  console.log('\n📋 Available Columns:');
  headers.forEach((header, index) => {
    console.log(`   ${index + 1}. ${header}`);
  });
  
  // Data quality stats
  console.log('\n📈 Data Quality Statistics:');
  console.log(`   Records with Email: ${validation.stats.withEmail} (${((validation.stats.withEmail / validation.stats.total) * 100).toFixed(1)}%)`);
  console.log(`   Records with Phone: ${validation.stats.withPhone} (${((validation.stats.withPhone / validation.stats.total) * 100).toFixed(1)}%)`);
  console.log(`   Records with Website: ${validation.stats.withWebsite} (${((validation.stats.withWebsite / validation.stats.total) * 100).toFixed(1)}%)`);
  console.log(`   Records with Geo-coordinates: ${validation.stats.withLatLng} (${((validation.stats.withLatLng / validation.stats.total) * 100).toFixed(1)}%)`);
  
  // Categories
  console.log(`\n🏷️ Merchant Categories (${validation.stats.categories.size} unique):`);
  Array.from(validation.stats.categories).sort().forEach(category => {
    const count = data.filter(record => record.merchant_category === category).length;
    console.log(`   ${category}: ${count} merchants`);
  });
  
  // Counties
  console.log(`\n🗺️ Counties/Regions (${validation.stats.counties.size} unique):`);
  Array.from(validation.stats.counties).sort().slice(0, 10).forEach(county => {
    const count = data.filter(record => record.merchant_address_4 === county).length;
    console.log(`   ${county}: ${count} merchants`);
  });
  if (validation.stats.counties.size > 10) {
    console.log(`   ... and ${validation.stats.counties.size - 10} more`);
  }
  
  // Sample data
  console.log('\n📝 Sample Records:');
  data.slice(0, 3).forEach((record, index) => {
    console.log(`\n   Record ${index + 1}:`);
    console.log(`     Name: ${record.merchant_name}`);
    console.log(`     Address: ${record.merchant_address_1}${record.merchant_address_2 ? ', ' + record.merchant_address_2 : ''}`);
    console.log(`     City: ${record.merchant_address_3}`);
    console.log(`     County: ${record.merchant_address_4 || 'N/A'}`);
    console.log(`     Postcode: ${record.merchant_postcode}`);
    console.log(`     Email: ${record.merchant_email || 'N/A'}`);
    console.log(`     Phone: ${record.merchant_phone || 'N/A'}`);
    console.log(`     Coordinates: ${record.merchant_latitude && record.merchant_longitude ? 
      `${record.merchant_latitude}, ${record.merchant_longitude}` : 'N/A'}`);
  });
  
  // Issues
  if (validation.issues.length > 0) {
    console.log('\n⚠️ Data Issues Found:');
    validation.issues.slice(0, 20).forEach(issue => {
      console.log(`   ${issue}`);
    });
    if (validation.issues.length > 20) {
      console.log(`   ... and ${validation.issues.length - 20} more issues`);
    }
  } else {
    console.log('\n✅ No data quality issues found!');
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📋 Import Summary:');
  if (validation.issues.length === 0) {
    console.log('✅ CSV file is ready for import');
    console.log(`✅ ${validation.stats.total} merchants will be imported`);
    console.log(`✅ ${validation.stats.withLatLng} merchants have geo-coordinates`);
    console.log('✅ All merchants will be affiliated with NMBS organization');
  } else {
    console.log(`⚠️ Found ${validation.issues.length} data quality issues`);
    console.log('❗ Review issues before proceeding with import');
    console.log('💡 Import will continue but problematic records may fail');
  }
  
  console.log('\n🚀 To proceed with import, run:');
  console.log('   node scripts/backup-and-replace-merchants.js');
  console.log('\n🔄 To rollback if needed, run:');
  console.log('   node scripts/rollback-merchants.js');
}

// Main execution
async function main() {
  console.log('🔍 CSV File Validation Tool\n');
  
  try {
    // Check if file exists
    console.log(`📂 Reading CSV file: ${csvFilePath.split('/').pop()}`);
    const csvText = readFileSync(csvFilePath, 'utf-8');
    
    // Parse CSV
    console.log('📊 Parsing CSV data...');
    const { headers, data } = parseCSV(csvText);
    
    // Validate data
    const validation = validateData(data);
    
    // Display results
    displayResults(headers, data, validation);
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('❌ CSV file not found at:', csvFilePath);
      console.error('💡 Please ensure the file exists and the path is correct');
    } else {
      console.error('❌ Error reading or parsing CSV file:', error.message);
    }
    process.exit(1);
  }
}

// Run the script
main();
