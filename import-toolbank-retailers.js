import fs from 'fs';
import csv from 'csv-parser';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Function to read CSV file with BOM handling
function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath, { encoding: 'utf8' })
            .pipe(csv({
                skipEmptyLines: true,
                mapHeaders: ({ header }) => header.replace(/^\uFEFF/, '') // Remove BOM
            }))
            .on('data', (data) => {
                const cleanData = {};
                Object.keys(data).forEach(key => {
                    const cleanKey = key.replace(/^\uFEFF/, '');
                    cleanData[cleanKey] = data[key];
                });
                results.push(cleanData);
            })
            .on('end', () => resolve(results))
            .on('error', reject);
    });
}

// Function to get Toolbank organization ID
async function getToolbankOrgId() {
    const { data, error } = await supabase
        .from('organizations')
        .select('id')
        .eq('name', 'Toolbank')
        .single();
    
    if (error) {
        throw new Error(`Error finding Toolbank organization: ${error.message}`);
    }
    
    return data.id;
}

// Function to normalize merchant name for duplicate checking
function normalizeName(name) {
    if (!name) return '';
    return name
        .toLowerCase()
        .replace(/ltd|limited|llp|plc|\(.*?\)|,/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
}

// Function to normalize postcode
function normalizePostcode(postcode) {
    if (!postcode) return '';
    return postcode.replace(/\s+/g, '').toUpperCase();
}

// Function to check if merchant already exists using actual column names
async function checkMerchantExists(merchantName, postcode) {
    const normalizedName = normalizeName(merchantName);
    
    // First, try exact name match using correct column name
    const { data: exactMatch, error } = await supabase
        .from('merchants')
        .select('id, merchant_name')
        .eq('merchant_name', merchantName);
    
    if (error) {
        console.error('Error checking exact match:', error);
        return null;
    }
    
    if (exactMatch && exactMatch.length > 0) {
        return { type: 'exact_name', merchant: exactMatch[0] };
    }
    
    // Check for normalized name matches
    const { data: allMerchants, error: allError } = await supabase
        .from('merchants')
        .select('id, merchant_name');
    
    if (allError) {
        console.error('Error fetching all merchants:', allError);
        return null;
    }
    
    for (const merchant of allMerchants) {
        if (normalizeName(merchant.merchant_name) === normalizedName) {
            return { type: 'normalized_name', merchant };
        }
    }
    
    return null;
}

// Function to transform Toolbank retailer data to match actual schema
function transformToolbankData(retailer) {
    const websiteUrl = retailer.merchant_website_URL || retailer.merchant_website_url || retailer.website_url;
    
    return {
        merchant_name: retailer.merchant_name?.trim(),
        merchant_category: retailer.merchant_category || 'General',
        merchant_website_url: websiteUrl && websiteUrl.startsWith('www.') ? `https://${websiteUrl}` : websiteUrl,
        merchant_email: retailer.merchant_email?.trim() || null,
        merchant_phone: retailer.merchant_phone?.trim() || null,
        merchant_address_1: retailer.merchant_address_1?.trim() || null,
        merchant_address_2: retailer.merchant_address_2?.trim() || null,
        merchant_address_3: retailer.merchant_address_3?.trim() || null,
        merchant_address_4: retailer.merchant_address_4?.trim() || null,
        merchant_postcode: retailer.merchant_postcode?.trim() || null,
        merchant_latitude: retailer.merchant_latitude ? parseFloat(retailer.merchant_latitude) : null,
        merchant_longitude: retailer.merchant_longitude ? parseFloat(retailer.merchant_longitude) : null,
        is_active: true,
        verification_status: 'verified',
        verified_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
}

// Function to create merchant location data (if using separate locations table)
function createLocationData(retailer, merchantId) {
    return {
        merchant_id: merchantId,
        name: `${retailer.merchant_name} - Main Location`,
        is_primary: true,
        address_line_1: retailer.merchant_address_1?.trim() || null,
        address_line_2: retailer.merchant_address_2?.trim() || null,
        city: retailer.merchant_address_3?.trim() || null,
        county: retailer.merchant_address_4?.trim() || null,
        postal_code: retailer.merchant_postcode?.trim() || null,
        country: 'United Kingdom',
        latitude: retailer.merchant_latitude ? parseFloat(retailer.merchant_latitude) : null,
        longitude: retailer.merchant_longitude ? parseFloat(retailer.merchant_longitude) : null,
        phone: retailer.merchant_phone?.trim() || null,
        email: retailer.merchant_email?.trim() || null,
        is_active: true,
        delivery_radius_km: 10,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
}

// Function to create merchant organization affiliation
function createOrgAffiliation(merchantId, orgId) {
    return {
        merchant_id: merchantId,
        organization_id: orgId,
        affiliation_status: 'active',
        membership_level: 'standard',
        member_since: new Date().toISOString().split('T')[0],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
}

// Main import function
async function importToolbankRetailers() {
    try {
        console.log('🚀 Starting Toolbank Retailers Import Process');
        console.log('================================================');
        
        // Step 1: Read the duplicate analysis results
        console.log('📊 Reading duplicate analysis results...');
        const exactDuplicates = JSON.parse(fs.readFileSync('/Users/tonyboyle/uk-building-merchant-saas/exact-duplicates.json', 'utf8'));
        console.log(`Found ${exactDuplicates.length} exact duplicates to handle`);
        
        // Step 2: Read Toolbank retailers data
        console.log('📁 Reading Toolbank retailers data...');
        const toolbankRetailers = await readCSV('/Users/tonyboyle/Library/CloudStorage/Dropbox/MERCHANT DEALS Folder Dropbox/MERCHANT DEALS DATA/TOOLBANK Retailers and Brands/Toolbank_Retailers_910.csv');
        console.log(`Loaded ${toolbankRetailers.length} Toolbank retailers`);
        
        // Step 3: Get Toolbank organization ID
        console.log('🏢 Getting Toolbank organization ID...');
        const toolbankOrgId = await getToolbankOrgId();
        console.log(`Toolbank organization ID: ${toolbankOrgId}`);
        
        // Step 4: Create duplicate lookup for fast checking
        console.log('🔍 Creating duplicate lookup...');
        const duplicateMap = new Map();
        exactDuplicates.forEach(dup => {
            const key = normalizeName(dup.toolbank.merchant_name);
            duplicateMap.set(key, dup);
        });
        
        // Step 5: Process each retailer
        console.log('⚙️  Processing retailers...');
        let imported = 0;
        let affiliations = 0;
        let skipped = 0;
        let errors = 0;
        const results = [];
        
        for (let i = 0; i < toolbankRetailers.length; i++) {
            const retailer = toolbankRetailers[i];
            
            if ((i + 1) % 50 === 0) {
                console.log(`   Processed ${i + 1}/${toolbankRetailers.length} retailers...`);
            }
            
            if (!retailer.merchant_name || !retailer.merchant_name.trim()) {
                console.log(`   ⚠️  Skipping retailer ${i + 1}: No merchant name`);
                skipped++;
                continue;
            }
            
            try {
                const normalizedName = normalizeName(retailer.merchant_name);
                
                // Check if this is a known duplicate from our analysis
                if (duplicateMap.has(normalizedName)) {
                    const duplicate = duplicateMap.get(normalizedName);
                    console.log(`   🔄 Found duplicate: ${retailer.merchant_name} matches NMBS: ${duplicate.nmbs.merchant_name}`);
                    
                    // Find the existing merchant in the database
                    const { data: existingMerchant, error: findError } = await supabase
                        .from('merchants')
                        .select('id, merchant_name')
                        .eq('merchant_name', duplicate.nmbs.merchant_name)
                        .single();
                    
                    if (findError || !existingMerchant) {
                        // Try normalized name search
                        const { data: allMerchants, error: allError } = await supabase
                            .from('merchants')
                            .select('id, merchant_name');
                        
                        if (!allError && allMerchants) {
                            const found = allMerchants.find(m => 
                                normalizeName(m.merchant_name) === normalizeName(duplicate.nmbs.merchant_name)
                            );
                            
                            if (found) {
                                // Add Toolbank affiliation to existing merchant
                                const affiliation = createOrgAffiliation(found.id, toolbankOrgId);
                                
                                const { error: affiliationError } = await supabase
                                    .from('merchant_organization_affiliations')
                                    .insert(affiliation);
                                
                                if (affiliationError && !affiliationError.message.includes('duplicate key')) {
                                    console.error(`   ❌ Error creating affiliation for ${retailer.merchant_name}:`, affiliationError);
                                    errors++;
                                } else {
                                    affiliations++;
                                    console.log(`   ✅ Added Toolbank affiliation to existing merchant: ${found.merchant_name}`);
                                    results.push({
                                        action: 'added_affiliation_to_duplicate',
                                        retailer: retailer.merchant_name,
                                        existing_merchant: found.merchant_name,
                                        existing_merchant_id: found.id
                                    });
                                }
                                continue;
                            }
                        }
                    } else {
                        // Add Toolbank affiliation to existing merchant
                        const affiliation = createOrgAffiliation(existingMerchant.id, toolbankOrgId);
                        
                        const { error: affiliationError } = await supabase
                            .from('merchant_organization_affiliations')
                            .insert(affiliation);
                        
                        if (affiliationError && !affiliationError.message.includes('duplicate key')) {
                            console.error(`   ❌ Error creating affiliation for ${retailer.merchant_name}:`, affiliationError);
                            errors++;
                        } else {
                            affiliations++;
                            console.log(`   ✅ Added Toolbank affiliation to existing merchant: ${existingMerchant.merchant_name}`);
                            results.push({
                                action: 'added_affiliation_to_duplicate',
                                retailer: retailer.merchant_name,
                                existing_merchant: existingMerchant.merchant_name,
                                existing_merchant_id: existingMerchant.id
                            });
                        }
                        continue;
                    }
                }
                
                // Check database for existing merchant (not from our duplicate analysis)
                const existingMerchant = await checkMerchantExists(retailer.merchant_name, retailer.merchant_postcode);
                
                if (existingMerchant) {
                    console.log(`   🔄 Found existing merchant in DB: ${retailer.merchant_name}`);
                    
                    // Add Toolbank affiliation to existing merchant
                    const affiliation = createOrgAffiliation(existingMerchant.merchant.id, toolbankOrgId);
                    
                    const { error: affiliationError } = await supabase
                        .from('merchant_organization_affiliations')
                        .insert(affiliation);
                    
                    if (affiliationError && !affiliationError.message.includes('duplicate key')) {
                        console.error(`   ❌ Error creating affiliation for ${retailer.merchant_name}:`, affiliationError);
                        errors++;
                    } else {
                        affiliations++;
                        results.push({
                            action: 'added_affiliation_to_existing',
                            retailer: retailer.merchant_name,
                            existing_merchant_id: existingMerchant.merchant.id
                        });
                    }
                    continue;
                }
                
                // Transform data for new merchant using actual schema
                const merchantData = transformToolbankData(retailer);
                
                // Insert new merchant
                const { data: newMerchant, error: merchantError } = await supabase
                    .from('merchants')
                    .insert(merchantData)
                    .select('id')
                    .single();
                
                if (merchantError) {
                    console.error(`   ❌ Error creating merchant ${retailer.merchant_name}:`, merchantError);
                    errors++;
                    results.push({
                        action: 'error_creating_merchant',
                        retailer: retailer.merchant_name,
                        error: merchantError.message
                    });
                    continue;
                }
                
                console.log(`   ✅ Created new merchant: ${retailer.merchant_name}`);
                
                // Create location record (optional - data is also in merchants table)
                const locationData = createLocationData(retailer, newMerchant.id);
                const { error: locationError } = await supabase
                    .from('merchant_locations')
                    .insert(locationData);
                
                if (locationError) {
                    console.log(`   ⚠️  Warning: Could not create location for ${retailer.merchant_name}: ${locationError.message}`);
                }
                
                // Create Toolbank affiliation
                const affiliationData = createOrgAffiliation(newMerchant.id, toolbankOrgId);
                const { error: affiliationError } = await supabase
                    .from('merchant_organization_affiliations')
                    .insert(affiliationData);
                
                if (affiliationError) {
                    console.error(`   ⚠️  Error creating affiliation for ${retailer.merchant_name}:`, affiliationError);
                } else {
                    affiliations++;
                }
                
                imported++;
                results.push({
                    action: 'imported_new',
                    retailer: retailer.merchant_name,
                    merchant_id: newMerchant.id
                });
                
            } catch (error) {
                console.error(`   ❌ Error processing ${retailer.merchant_name}:`, error);
                errors++;
                results.push({
                    action: 'error',
                    retailer: retailer.merchant_name,
                    error: error.message
                });
            }
        }
        
        // Step 6: Write results
        console.log('💾 Writing import results...');
        fs.writeFileSync('/Users/tonyboyle/uk-building-merchant-saas/toolbank-import-results.json', 
            JSON.stringify(results, null, 2));
        
        // Step 7: Final summary
        console.log('\n📋 IMPORT SUMMARY');
        console.log('=================');
        console.log(`✅ New merchants imported: ${imported}`);
        console.log(`🔄 Toolbank affiliations created: ${affiliations}`);
        console.log(`⏭️  Skipped (no name): ${skipped}`);
        console.log(`❌ Errors: ${errors}`);
        console.log(`📊 Total processed: ${toolbankRetailers.length}`);
        console.log(`📁 Results saved to: toolbank-import-results.json`);
        
        // Step 8: Recommendations
        console.log('\n💡 NEXT STEPS');
        console.log('=============');
        console.log('1. Review import results in toolbank-import-results.json');
        console.log('2. Verify merchant_organization_affiliations table for Toolbank affiliations');
        console.log('3. Check that duplicate merchants were properly handled');
        console.log('4. Run validation queries to ensure data integrity');
        
        if (errors > 0) {
            console.log(`\n⚠️  WARNING: ${errors} errors occurred during import`);
            console.log('   Review the results file for details on failed imports');
        }
        
        if (exactDuplicates.length > 0) {
            console.log(`\n✅ SUCCESS: Handled ${exactDuplicates.length} duplicate merchants`);
            console.log('   Added Toolbank affiliations to existing NMBS merchants where possible');
        }
        
    } catch (error) {
        console.error('💥 Fatal error during import:', error);
        process.exit(1);
    }
}

// Function to validate import results
async function validateImport() {
    console.log('🔍 Validating Import Results');
    console.log('============================');
    
    try {
        // Check total merchants
        const { count: totalMerchants, error: countError } = await supabase
            .from('merchants')
            .select('*', { count: 'exact', head: true });
            
        if (countError) {
            console.error('Error counting merchants:', countError);
            return;
        }
        
        // Check Toolbank affiliations
        const toolbankOrgId = await getToolbankOrgId();
        const { count: toolbankAffiliations, error: affiliationError } = await supabase
            .from('merchant_organization_affiliations')
            .select('*', { count: 'exact', head: true })
            .eq('organization_id', toolbankOrgId);
            
        if (affiliationError) {
            console.error('Error counting Toolbank affiliations:', affiliationError);
            return;
        }
        
        // Check NMBS affiliations for comparison
        const { data: nmbsOrg } = await supabase
            .from('organizations')
            .select('id')
            .eq('name', 'NMBS')
            .single();
            
        const { count: nmbsAffiliations } = await supabase
            .from('merchant_organization_affiliations')
            .select('*', { count: 'exact', head: true })
            .eq('organization_id', nmbsOrg.id);
        
        console.log(`📊 Total merchants in database: ${totalMerchants}`);
        console.log(`🏢 Merchants affiliated with Toolbank: ${toolbankAffiliations}`);
        console.log(`🏢 Merchants affiliated with NMBS: ${nmbsAffiliations}`);
        
        // Show sample Toolbank merchants
        console.log('\n📋 Sample Toolbank Merchants:');
        const { data: sampleToolbank, error: sampleError } = await supabase
            .from('merchants')
            .select(`
                merchant_name,
                merchant_postcode,
                merchant_organization_affiliations!inner(
                    organizations(name)
                )
            `)
            .eq('merchant_organization_affiliations.organizations.name', 'Toolbank')
            .limit(5);
            
        if (sampleError) {
            console.error('Error fetching sample Toolbank merchants:', sampleError);
        } else if (sampleToolbank) {
            sampleToolbank.forEach(merchant => {
                console.log(`   - ${merchant.merchant_name} (${merchant.merchant_postcode})`);
            });
        }
        
    } catch (error) {
        console.error('Error during validation:', error);
    }
}

// Function to show import statistics
async function showImportStats() {
    console.log('📊 Import Statistics');
    console.log('===================');
    
    try {
        // Read results file if it exists
        if (fs.existsSync('/Users/tonyboyle/uk-building-merchant-saas/toolbank-import-results.json')) {
            const results = JSON.parse(
                fs.readFileSync('/Users/tonyboyle/uk-building-merchant-saas/toolbank-import-results.json', 'utf8')
            );
            
            const stats = {
                imported_new: 0,
                added_affiliation_to_duplicate: 0,
                added_affiliation_to_existing: 0,
                error: 0,
                error_creating_merchant: 0
            };
            
            results.forEach(result => {
                stats[result.action] = (stats[result.action] || 0) + 1;
            });
            
            console.log('\n📋 Results Breakdown:');
            Object.entries(stats).forEach(([action, count]) => {
                if (count > 0) {
                    console.log(`   ${action.replace(/_/g, ' ')}: ${count}`);
                }
            });
            
            console.log(`\n📊 Total operations: ${results.length}`);
        } else {
            console.log('No import results file found. Run the import first.');
        }
        
    } catch (error) {
        console.error('Error reading import stats:', error);
    }
}

// Main function
async function main() {
    const args = process.argv.slice(2);
    
    if (args.includes('--validate')) {
        await validateImport();
    } else if (args.includes('--stats')) {
        await showImportStats();
    } else if (args.includes('--help')) {
        console.log('Toolbank Retailers Import Script');
        console.log('Usage: node import-toolbank-retailers.js [options]');
        console.log('');
        console.log('Options:');
        console.log('  --validate    Validate the import results and show database stats');
        console.log('  --stats       Show detailed import statistics from results file');
        console.log('  --help        Show this help message');
        console.log('');
        console.log('Default: Run the import process');
        console.log('');
        console.log('Example workflow:');
        console.log('  1. node import-toolbank-retailers.js --validate  # Check before import');
        console.log('  2. node import-toolbank-retailers.js             # Run the import');
        console.log('  3. node import-toolbank-retailers.js --stats     # Review results');
        console.log('  4. node import-toolbank-retailers.js --validate  # Final validation');
    } else {
        await importToolbankRetailers();
    }
}

// Only run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(console.error);
}

export { importToolbankRetailers, validateImport, showImportStats };
