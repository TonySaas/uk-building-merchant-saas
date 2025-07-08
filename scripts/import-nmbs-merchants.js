#!/usr/bin/env node

/**
 * NMBS Merchants CSV Import Script
 * 
 * This script imports merchant data from the NMBS CSV file into the UK Building Merchant SaaS database.
 * It handles:
 * - Merchants table
 * - Merchant organization affiliations (NMBS)
 * - Merchant locations
 * - Proper data validation and cleanup
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase credentials in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Configuration
const CSV_FILE_PATH = '/Users/tonyboyle/Library/CloudStorage/Dropbox/MERCHANT DEALS Folder Dropbox/MERCHANT DEALS DATA/NMBS Merchants and Suppliers/NMBS_merchants_FINAL_COMPLETE.csv';
const BATCH_SIZE = 50; // Process in batches to avoid timeouts

/**
 * Validate and clean CSV data
 */
function validateAndCleanMerchantData(row) {
    // Clean and validate merchant name (required)
    const merchantName = row.merchant_name?.trim();
    if (!merchantName || merchantName.length < 2) {
        throw new Error(`Invalid merchant name: ${merchantName}`);
    }

    // Clean address fields
    const address1 = row.merchant_address_1?.trim() || null;
    const address2 = row.merchant_address_2?.trim() || null;
    const address3 = row.merchant_address_3?.trim() || null;
    const address4 = row.merchant_address_4?.trim() || null;
    const postcode = row.merchant_postcode?.trim() || null;

    // Clean contact fields
    const email = row.merchant_email?.trim()?.toLowerCase() || null;
    const phone = row.merchant_phone?.trim() || null;
    const website = row.merchant_website_url?.trim() || null;
    
    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        console.warn(`⚠️  Invalid email format for ${merchantName}: ${email}`);
    }

    // Clean coordinates
    let latitude = null;
    let longitude = null;
    
    if (row.merchant_latitude && row.merchant_longitude) {
        const lat = parseFloat(row.merchant_latitude);
        const lng = parseFloat(row.merchant_longitude);
        
        // Validate UK coordinates roughly
        if (lat >= 49.0 && lat <= 61.0 && lng >= -8.0 && lng <= 2.0) {
            latitude = lat;
            longitude = lng;
        } else {
            console.warn(`⚠️  Invalid coordinates for ${merchantName}: ${lat}, ${lng}`);
        }
    }

    // Clean category
    const category = row.merchant_category?.trim() || 'General';

    return {
        merchant_name: merchantName,
        merchant_category: category,
        merchant_address_1: address1,
        merchant_address_2: address2,
        merchant_address_3: address3,
        merchant_address_4: address4,
        merchant_postcode: postcode,
        merchant_website_url: website,
        merchant_email: email,
        merchant_phone: phone,
        merchant_latitude: latitude,
        merchant_longitude: longitude,
        // Determine city and county from address fields
        city: address3 || address2 || address1,
        county: address4 || address3,
    };
}

/**
 * Get NMBS organization ID
 */
async function getNMBSOrganizationId() {
    console.log('🔍 Getting NMBS organization ID...');
    
    const { data, error } = await supabase
        .from('organizations')
        .select('id')
        .eq('name', 'NMBS')
        .single();
    
    if (error) {
        console.error('❌ Error getting NMBS organization:', error);
        throw error;
    }
    
    if (!data) {
        throw new Error('NMBS organization not found in database');
    }
    
    console.log('✅ NMBS organization ID:', data.id);
    return data.id;
}

/**
 * Check if merchant already exists
 */
async function merchantExists(merchantName) {
    const { data, error } = await supabase
        .from('merchants')
        .select('id')
        .eq('merchant_name', merchantName)
        .limit(1);
    
    if (error) {
        console.error('❌ Error checking merchant existence:', error);
        return false;
    }
    
    return data && data.length > 0;
}

/**
 * Insert merchant data
 */
async function insertMerchant(merchantData, nmbs_org_id) {
    const {
        merchant_name,
        merchant_category,
        merchant_address_1,
        merchant_address_2,
        merchant_address_3,
        merchant_address_4,
        merchant_postcode,
        merchant_website_url,
        merchant_email,
        merchant_phone,
        merchant_latitude,
        merchant_longitude,
        city,
        county
    } = merchantData;

    // Check if merchant already exists
    if (await merchantExists(merchant_name)) {
        console.log(`⏭️  Merchant already exists: ${merchant_name}`);
        return null;
    }

    try {
        // Insert merchant
        const { data: merchant, error: merchantError } = await supabase
            .from('merchants')
            .insert([{
                merchant_name,
                merchant_category,
                merchant_address_1,
                merchant_address_2,
                merchant_address_3,
                merchant_address_4,
                merchant_postcode,
                merchant_website_url,
                merchant_email,
                merchant_phone,
                merchant_latitude,
                merchant_longitude,
                is_active: true,
                verification_status: 'verified', // NMBS merchants are pre-verified
                verified_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (merchantError) {
            console.error(`❌ Error inserting merchant ${merchant_name}:`, merchantError);
            return null;
        }

        console.log(`✅ Inserted merchant: ${merchant_name}`);

        // Insert organization affiliation
        const { error: affiliationError } = await supabase
            .from('merchant_organization_affiliations')
            .insert([{
                merchant_id: merchant.id,
                organization_id: nmbs_org_id,
                affiliation_status: 'active',
                membership_level: 'standard',
                member_since: new Date().toISOString().split('T')[0] // Today's date as default
            }]);

        if (affiliationError) {
            console.error(`❌ Error creating organization affiliation for ${merchant_name}:`, affiliationError);
        } else {
            console.log(`✅ Created NMBS affiliation for: ${merchant_name}`);
        }

        // Insert merchant location if address data is available
        if (merchant_address_1 && merchant_postcode) {
            const { error: locationError } = await supabase
                .from('merchant_locations')
                .insert([{
                    merchant_id: merchant.id,
                    name: `${merchant_name} - Main Location`,
                    is_primary: true,
                    address_line_1: merchant_address_1,
                    address_line_2: merchant_address_2,
                    city: city,
                    county: county,
                    postal_code: merchant_postcode,
                    country: 'United Kingdom',
                    latitude: merchant_latitude,
                    longitude: merchant_longitude,
                    phone: merchant_phone,
                    email: merchant_email,
                    is_active: true
                }]);

            if (locationError) {
                console.error(`❌ Error creating location for ${merchant_name}:`, locationError);
            } else {
                console.log(`✅ Created location for: ${merchant_name}`);
            }
        }

        return merchant;

    } catch (error) {
        console.error(`❌ Unexpected error processing ${merchant_name}:`, error);
        return null;
    }
}

/**
 * Process CSV file in batches
 */
async function processCsvFile(nmbs_org_id) {
    console.log('📖 Reading CSV file...');
    
    try {
        // Read the CSV file
        const csvContent = fs.readFileSync(CSV_FILE_PATH, 'utf8');
        
        // Parse CSV with papaparse
        const parseResult = Papa.parse(csvContent, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) => header.trim()
        });

        if (parseResult.errors.length > 0) {
            console.warn('⚠️  CSV parsing warnings:', parseResult.errors);
        }

        const merchants = [];
        let errorCount = 0;

        // Process and validate each row
        for (const row of parseResult.data) {
            try {
                const cleanedData = validateAndCleanMerchantData(row);
                merchants.push(cleanedData);
            } catch (error) {
                console.error(`❌ Invalid row data:`, error.message);
                errorCount++;
            }
        }

        console.log(`📊 Total merchants to process: ${merchants.length}`);
        console.log(`📊 Invalid rows skipped: ${errorCount}`);
        
        let processedCount = 0;
        let successCount = 0;
        let importErrorCount = 0;
        
        // Process in batches
        for (let i = 0; i < merchants.length; i += BATCH_SIZE) {
            const batch = merchants.slice(i, i + BATCH_SIZE);
            console.log(`\n🔄 Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(merchants.length / BATCH_SIZE)} (${batch.length} merchants)...`);
            
            // Process batch sequentially to avoid overwhelming the database
            for (const merchantData of batch) {
                const result = await insertMerchant(merchantData, nmbs_org_id);
                processedCount++;
                
                if (result) {
                    successCount++;
                } else {
                    importErrorCount++;
                }
                
                // Small delay to be gentle on the database
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            console.log(`✅ Batch completed. Progress: ${processedCount}/${merchants.length}`);
        }

        console.log('\n🎉 Import completed!');
        console.log(`📊 Total processed: ${processedCount}`);
        console.log(`📊 Successfully imported: ${successCount}`);
        console.log(`📊 Errors/Skipped: ${importErrorCount}`);
        
        return {
            total: merchants.length,
            processed: processedCount,
            success: successCount,
            errors: importErrorCount + errorCount
        };

    } catch (error) {
        console.error('❌ Error processing CSV file:', error);
        throw error;
    }
}

/**
 * Main import function
 */
async function main() {
    console.log('🚀 Starting NMBS merchants import...\n');
    
    try {
        // Check if CSV file exists
        if (!fs.existsSync(CSV_FILE_PATH)) {
            throw new Error(`CSV file not found: ${CSV_FILE_PATH}`);
        }

        // Test Supabase connection
        const { data: testData, error: testError } = await supabase
            .from('organizations')
            .select('count')
            .limit(1);

        if (testError) {
            throw new Error(`Supabase connection failed: ${testError.message}`);
        }

        console.log('✅ Supabase connection successful');

        // Get NMBS organization ID
        const nmbs_org_id = await getNMBSOrganizationId();

        // Process the CSV file
        const results = await processCsvFile(nmbs_org_id);

        console.log('\n🎯 Final Results:');
        console.log(`Total merchants in CSV: ${results.total}`);
        console.log(`Successfully imported: ${results.success}`);
        console.log(`Errors/Duplicates: ${results.errors}`);
        console.log(`Success rate: ${((results.success / results.total) * 100).toFixed(1)}%`);

    } catch (error) {
        console.error('❌ Import failed:', error.message);
        process.exit(1);
    }
}

// Check if this script is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}

export { main as importNMBSMerchants };
