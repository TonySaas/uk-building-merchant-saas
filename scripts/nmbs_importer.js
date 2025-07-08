import { createClient } from '@supabase/supabase-js';
import Papa from 'papaparse';
import fs from 'fs';

export class NMBSMerchantImporter {
  constructor(supabaseUrl, supabaseKey) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
    this.batchSize = 25; // Process in smaller batches for reliability
    this.importStats = {
      totalRows: 0,
      uniqueMerchants: 0,
      totalLocations: 0,
      successfulMerchants: 0,
      successfulLocations: 0,
      failedRows: 0,
      issues: []
    };
  }

  async testConnection() {
    try {
      const { data, error } = await this.supabase
        .from('organizations')
        .select('count', { count: 'exact', head: true });
      
      if (error) {
        console.error('❌ Supabase connection failed:', error.message);
        return false;
      }
      
      console.log('✅ Supabase connection successful');
      return true;
    } catch (err) {
      console.error('❌ Supabase connection error:', err.message);
      return false;
    }
  }

  async ensureNMBSOrganization() {
    console.log('🔧 Ensuring NMBS organization exists...');
    
    try {
      // Check if NMBS organization exists
      const { data: existingNMBS, error: checkError } = await this.supabase
        .from('organizations')
        .select('id, name')
        .eq('name', 'NMBS')
        .maybeSingle();

      if (!existingNMBS) {
        console.log('📝 Creating NMBS organization...');
        const { data: newNMBS, error: createError } = await this.supabase
          .from('organizations')
          .insert({
            name: 'NMBS',
            type: 'buying_group',
            description: 'National Merchant Buying Society - 1,250+ merchant members, 450+ supplier deals, established in 1963 with £2.21bn turnover',
            is_active: true
          })
          .select()
          .single();

        if (createError) {
          console.error('❌ Failed to create NMBS organization:', createError);
          return null;
        }
        console.log('✅ NMBS organization created:', newNMBS.id);
        return newNMBS;
      } else {
        console.log('✅ NMBS organization already exists:', existingNMBS.id);
        return existingNMBS;
      }
    } catch (error) {
      console.error('❌ NMBS organization setup failed:', error.message);
      return null;
    }
  }

  async importFromCSV(csvFilePath, maxRecords = null) {
    const batchId = `nmbs_import_${Date.now()}`;
    const importType = maxRecords ? `TEST (${maxRecords} records)` : 'FULL';
    console.log(`🚀 Starting NMBS ${importType} import batch: ${batchId}`);

    try {
      // 0. Test connection
      const connected = await this.testConnection();
      if (!connected) {
        throw new Error('Cannot connect to Supabase. Check your credentials.');
      }

      // 0.5. Ensure NMBS organization exists
      const nmbs = await this.ensureNMBSOrganization();
      if (!nmbs) {
        throw new Error('Failed to setup NMBS organization');
      }

      // 1. Read and parse CSV
      let csvData = await this.parseCSV(csvFilePath);
      
      // Limit records for test import
      if (maxRecords && csvData.length > maxRecords) {
        console.log(`📝 Limiting to first ${maxRecords} records for test import`);
        csvData = csvData.slice(0, maxRecords);
      }
      
      this.importStats.totalRows = csvData.length;

      // 2. Start import log
      await this.logImportStart(batchId);

      // 3. Group merchants by name (handle multiple locations)
      const merchantGroups = this.groupMerchantsByName(csvData);
      this.importStats.uniqueMerchants = merchantGroups.size;

      // 4. Process merchants in batches
      let processedCount = 0;
      const merchantEntries = Array.from(merchantGroups.entries());

      for (let i = 0; i < merchantEntries.length; i += this.batchSize) {
        const batch = merchantEntries.slice(i, i + this.batchSize);
        await this.processMerchantBatch(batch, nmbs.id);
        processedCount += batch.length;
        
        console.log(`📊 Processed ${processedCount}/${merchantEntries.length} merchants`);
        
        // Add small delay between batches to avoid overwhelming the database
        if (i + this.batchSize < merchantEntries.length) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      // 5. Complete import log
      await this.logImportComplete(batchId);
      
      console.log('✅ NMBS Import completed successfully!');
      this.printFinalStats();
      
      return this.importStats;

    } catch (error) {
      console.error('❌ Import failed:', error);
      await this.logImportError(batchId, error);
      throw error;
    }
  }

  printFinalStats() {
    console.log('\n📊 FINAL IMPORT STATISTICS:');
    console.log('==========================');
    console.log(`📝 Total CSV Rows: ${this.importStats.totalRows}`);
    console.log(`🏪 Unique Merchants: ${this.importStats.uniqueMerchants}`);
    console.log(`✅ Successful Merchants: ${this.importStats.successfulMerchants}`);
    console.log(`📍 Successful Locations: ${this.importStats.successfulLocations}`);
    console.log(`❌ Failed Rows: ${this.importStats.failedRows}`);
    console.log(`⚠️ Issues Found: ${this.importStats.issues.length}`);
    
    if (this.importStats.issues.length > 0) {
      console.log('\n⚠️ ISSUES ENCOUNTERED:');
      this.importStats.issues.slice(0, 10).forEach((issue, index) => {
        console.log(`   ${index + 1}. ${issue}`);
      });
      
      if (this.importStats.issues.length > 10) {
        console.log(`   ... and ${this.importStats.issues.length - 10} more issues`);
      }
    }
  }

  async parseCSV(csvFilePath) {
    if (!fs.existsSync(csvFilePath)) {
      throw new Error(`CSV file not found: ${csvFilePath}`);
    }

    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    
    // Remove BOM if present
    const cleanContent = csvContent.replace(/^\uFEFF/, '');
    
    const result = Papa.parse(cleanContent, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim()
    });

    if (result.errors.length > 0) {
      console.warn('⚠️ CSV parsing warnings:', result.errors);
    }

    console.log(`📄 Parsed ${result.data.length} rows from CSV`);
    return result.data;
  }

  groupMerchantsByName(csvData) {
    const groups = new Map();

    csvData.forEach((row, index) => {
      const merchantName = row.merchant_name?.trim();
      if (!merchantName) {
        this.importStats.issues.push(`Row ${index + 1}: Missing merchant name`);
        this.importStats.failedRows++;
        return;
      }

      if (!groups.has(merchantName)) {
        groups.set(merchantName, []);
      }
      
      groups.get(merchantName).push({ ...row, originalRowIndex: index + 1 });
    });

    console.log(`🏪 Grouped into ${groups.size} unique merchants`);
    return groups;
  }

  async processMerchantBatch(merchantBatch, nmbsOrgId) {
    for (const [merchantName, locations] of merchantBatch) {
      try {
        // Process each merchant and their locations
        await this.processMerchantWithLocations(merchantName, locations, nmbsOrgId);
        this.importStats.successfulMerchants++;
      } catch (error) {
        console.error(`❌ Failed to process merchant ${merchantName}:`, error);
        this.importStats.issues.push(`Merchant ${merchantName}: ${error.message}`);
        this.importStats.failedRows += locations.length;
      }
    }
  }

  async processMerchantWithLocations(merchantName, locations, nmbsOrgId) {
    // Get first location for merchant-level data
    const primaryLocation = locations[0];
    
    // Create merchant record
    const merchantData = {
      name: merchantName,
      category: primaryLocation.merchant_category || 'General',
      website_url: this.cleanUrl(primaryLocation.merchant_website_url),
      is_active: true
    };

    // Try to find existing merchant first
    let { data: existingMerchant } = await this.supabase
      .from('merchants')
      .select('id')
      .eq('name', merchantName)
      .maybeSingle();

    let merchantId;
    
    if (existingMerchant) {
      merchantId = existingMerchant.id;
      // Update existing merchant
      await this.supabase
        .from('merchants')
        .update({
          category: merchantData.category,
          website_url: merchantData.website_url
        })
        .eq('id', merchantId);
    } else {
      // Create new merchant
      const { data: newMerchant, error: merchantError } = await this.supabase
        .from('merchants')
        .insert(merchantData)
        .select()
        .single();

      if (merchantError) {
        throw new Error(`Failed to create merchant: ${merchantError.message}`);
      }
      
      merchantId = newMerchant.id;
    }

    // Create organization affiliation
    await this.createOrganizationAffiliation(merchantId, nmbsOrgId);

    // Process all locations for this merchant
    for (const location of locations) {
      try {
        await this.createMerchantLocation(merchantId, location);
        this.importStats.successfulLocations++;
      } catch (error) {
        console.error(`❌ Failed to create location for ${merchantName}:`, error);
        this.importStats.issues.push(
          `Location for ${merchantName} (row ${location.originalRowIndex}): ${error.message}`
        );
        this.importStats.failedRows++;
      }
    }
  }

  async createMerchantLocation(merchantId, locationData) {
    const coordinates = this.validateCoordinates(
      locationData.merchant_latitude,
      locationData.merchant_longitude
    );

    const locationRecord = {
      merchant_id: merchantId,
      name: this.createLocationName(locationData),
      address_line_1: locationData.merchant_address_1?.trim() || '',
      address_line_2: locationData.merchant_address_2?.trim() || '',
      city: locationData.merchant_address_3?.trim() || locationData.merchant_address_2?.trim() || '',
      county: locationData.merchant_address_4?.trim() || '',
      postal_code: this.cleanPostcode(locationData.merchant_postcode),
      country: 'United Kingdom',
      phone: this.cleanPhone(locationData.merchant_phone),
      email: this.cleanEmail(locationData.merchant_email),
      latitude: coordinates.latitude,
      longitude: coordinates.longitude
    };

    const { error } = await this.supabase
      .from('merchant_locations')
      .insert(locationRecord);

    if (error) {
      throw new Error(`Database insert failed: ${error.message}`);
    }
  }

  async createOrganizationAffiliation(merchantId, organizationId) {
    const { error } = await this.supabase
      .from('merchant_organization_affiliations')
      .upsert({
        merchant_id: merchantId,
        organization_id: organizationId,
        affiliation_status: 'active',
        verification_date: new Date().toISOString()
      });

    if (error) {
      throw new Error(`Failed to create organization affiliation: ${error.message}`);
    }
  }

  validateCoordinates(lat, lng) {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    // UK bounds check
    if (!isNaN(latitude) && !isNaN(longitude) &&
        latitude >= 49.9 && latitude <= 60.9 && 
        longitude >= -8.2 && longitude <= 1.8) {
      return { latitude, longitude };
    }

    this.importStats.issues.push(
      `Invalid coordinates: ${lat}, ${lng} (outside UK bounds or invalid)`
    );
    return { latitude: null, longitude: null };
  }

  createLocationName(locationData) {
    const parts = [
      locationData.merchant_address_1,
      locationData.merchant_address_2,
      locationData.merchant_address_3
    ].filter(part => part && part.trim() !== '');

    return parts.length > 0 ? parts[0].trim() : 'Main Location';
  }

  cleanUrl(url) {
    if (!url || url.trim() === '') return null;
    url = url.trim();
    return url.startsWith('http') ? url : `https://${url}`;
  }

  cleanEmail(email) {
    if (!email || email.trim() === '') return null;
    email = email.trim().toLowerCase();
    return email.includes('@') ? email : null;
  }

  cleanPhone(phone) {
    if (!phone) return null;
    return phone.toString().replace(/\s+/g, ' ').trim();
  }

  cleanPostcode(postcode) {
    if (!postcode) return null;
    return postcode.trim().toUpperCase().replace(/\s+/g, ' ');
  }

  async logImportStart(batchId) {
    try {
      // Check if table exists, create basic log if possible
      const logData = {
        import_batch: batchId,
        total_rows: this.importStats.totalRows,
        status: 'in_progress',
        started_at: new Date().toISOString()
      };

      console.log(`📝 Starting import log: ${batchId}`);
    } catch (error) {
      console.warn('Warning: Could not create import log:', error.message);
    }
  }

  async logImportComplete(batchId) {
    try {
      console.log(`✅ Import completed: ${batchId}`);
    } catch (error) {
      console.warn('Warning: Could not update import log:', error.message);
    }
  }

  async logImportError(batchId, error) {
    try {
      console.error(`❌ Import failed: ${batchId} - ${error.message}`);
    } catch (logError) {
      console.warn('Warning: Could not log import error:', logError.message);
    }
  }
}
