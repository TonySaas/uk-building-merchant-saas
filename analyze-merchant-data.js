#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
import dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in environment variables')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Paths to CSV files
const toolbankPath = '/Users/tonyboyle/Library/CloudStorage/Dropbox/MERCHANT DEALS Folder Dropbox/MERCHANT DEALS DATA/TOOLBANK Retailers and Brands/Toolbank_Retailers_910.csv'
const nmbsPath = '/Users/tonyboyle/Library/CloudStorage/Dropbox/MERCHANT DEALS Folder Dropbox/MERCHANT DEALS DATA/NMBS Merchants and Suppliers/NMBS_merchants_FINAL_COMPLETE.csv'

// Function to read CSV file
function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = []
        fs.createReadStream(filePath)
            .pipe(parse({ 
                columns: true, 
                skip_empty_lines: true,
                trim: true,
                bom: true // Handle UTF-8 BOM
            }))
            .on('data', (row) => results.push(row))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error))
    })
}

// Function to normalize names for comparison
function normalizeName(name) {
    if (!name) return ''
    return name
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove special characters
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim()
        .replace(/\b(ltd|limited|llp|plc|&|and|co|company)\b/g, '') // Remove common business suffixes
        .trim()
}

// Function to normalize postcodes
function normalizePostcode(postcode) {
    if (!postcode) return ''
    return postcode.toUpperCase().replace(/\s+/g, '')
}

// Function to check for potential duplicates
function findPotentialDuplicates(toolbankData, existingMerchants) {
    const duplicates = []
    const normalized = new Map()
    
    // Create normalized lookup for existing merchants
    existingMerchants.forEach(merchant => {
        const normalizedName = normalizeName(merchant.name)
        const normalizedPostcode = normalizePostcode(merchant.locations?.[0]?.postal_code || '')
        const key = `${normalizedName}|${normalizedPostcode}`
        
        if (!normalized.has(key)) {
            normalized.set(key, [])
        }
        normalized.get(key).push(merchant)
    })
    
    // Check Toolbank data for duplicates
    toolbankData.forEach((toolbankMerchant, index) => {
        const normalizedName = normalizeName(toolbankMerchant.R_Retailers_Name)
        const normalizedPostcode = normalizePostcode(toolbankMerchant.R_Retailers_PostCode)
        const key = `${normalizedName}|${normalizedPostcode}`
        
        if (normalized.has(key)) {
            duplicates.push({
                toolbankIndex: index,
                toolbankMerchant: toolbankMerchant,
                existingMerchants: normalized.get(key),
                matchType: 'name_postcode'
            })
        }
    })
    
    return duplicates
}

// Main analysis function
async function analyzeData() {
    try {
        console.log('🔍 Starting merchant data analysis...\n')
        
        // 1. Check if organizations exist
        console.log('1. Checking organizations...')
        const { data: organizations, error: orgError } = await supabase
            .from('organizations')
            .select('id, name, type')
        
        if (orgError) {
            console.error('Error fetching organizations:', orgError)
            return
        }
        
        console.log('Available organizations:')
        organizations.forEach(org => {
            console.log(`   - ${org.name} (${org.type}) - ID: ${org.id}`)
        })
        
        const toolbankOrg = organizations.find(org => org.name.toLowerCase().includes('toolbank'))
        const nmbsOrg = organizations.find(org => org.name.toLowerCase().includes('nmbs'))
        
        if (!toolbankOrg) {
            console.error('❌ Toolbank organization not found!')
            return
        }
        
        console.log(`\n✅ Toolbank organization found: ${toolbankOrg.id}`)
        if (nmbsOrg) {
            console.log(`✅ NMBS organization found: ${nmbsOrg.id}`)
        }
        
        // 2. Get existing merchants
        console.log('\n2. Fetching existing merchants...')
        const { data: existingMerchants, error: merchantError } = await supabase
            .from('merchants')
            .select(`
                id, name, created_at,
                merchant_locations(postal_code, address_line_1, city),
                merchant_organization_affiliations(organization_id)
            `)
        
        if (merchantError) {
            console.error('Error fetching merchants:', merchantError)
            return
        }
        
        console.log(`Found ${existingMerchants.length} existing merchants`)
        
        // Count by organization
        const orgCounts = {}
        existingMerchants.forEach(merchant => {
            merchant.merchant_organization_affiliations?.forEach(affiliation => {
                const orgId = affiliation.organization_id
                orgCounts[orgId] = (orgCounts[orgId] || 0) + 1
            })
        })
        
        console.log('Merchant count by organization:')
        organizations.forEach(org => {
            const count = orgCounts[org.id] || 0
            console.log(`   - ${org.name}: ${count} merchants`)
        })
        
        // 3. Read Toolbank CSV data
        console.log('\n3. Reading Toolbank retailers CSV...')
        const toolbankData = await readCSV(toolbankPath)
        console.log(`Found ${toolbankData.length} Toolbank retailers`)
        
        // Show sample of Toolbank data
        console.log('\nSample Toolbank data structure:')
        console.log(Object.keys(toolbankData[0]))
        console.log('First record:', toolbankData[0])
        
        // 4. Check for duplicates
        console.log('\n4. Checking for potential duplicates...')
        const duplicates = findPotentialDuplicates(toolbankData, existingMerchants)
        
        console.log(`Found ${duplicates.length} potential duplicates`)
        
        if (duplicates.length > 0) {
            console.log('\n⚠️  DUPLICATE ANALYSIS:')
            duplicates.forEach((dup, index) => {
                console.log(`\nDuplicate ${index + 1}:`)
                console.log(`  Toolbank: ${dup.toolbankMerchant.R_Retailers_Name} (${dup.toolbankMerchant.R_Retailers_PostCode})`)
                dup.existingMerchants.forEach(existing => {
                    const location = existing.merchant_locations?.[0]
                    console.log(`  Existing: ${existing.name} (${location?.postal_code || 'No postcode'})`)
                    console.log(`            Created: ${existing.created_at}`)
                })
            })
        } else {
            console.log('✅ No obvious duplicates found based on name and postcode matching')
        }
        
        // 5. Data quality analysis
        console.log('\n5. Data quality analysis for Toolbank data...')
        
        const dataQuality = {
            missingNames: 0,
            missingPostcodes: 0,
            missingPhones: 0,
            missingWebsites: 0,
            invalidCoordinates: 0,
            totalRecords: toolbankData.length
        }
        
        toolbankData.forEach(record => {
            if (!record.R_Retailers_Name || record.R_Retailers_Name.trim() === '') {
                dataQuality.missingNames++
            }
            if (!record.R_Retailers_PostCode || record.R_Retailers_PostCode.trim() === '') {
                dataQuality.missingPostcodes++
            }
            if (!record.R_Retailers_Telephone || record.R_Retailers_Telephone.trim() === '') {
                dataQuality.missingPhones++
            }
            if (!record.R_Retailers_Website_URL || record.R_Retailers_Website_URL.trim() === '') {
                dataQuality.missingWebsites++
            }
            
            const lat = parseFloat(record.R_Retailers_Latitude)
            const lng = parseFloat(record.R_Retailers_Longitude)
            if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) {
                dataQuality.invalidCoordinates++
            }
        })
        
        console.log('Data quality summary:')
        console.log(`  Total records: ${dataQuality.totalRecords}`)
        console.log(`  Missing names: ${dataQuality.missingNames}`)
        console.log(`  Missing postcodes: ${dataQuality.missingPostcodes}`)
        console.log(`  Missing phones: ${dataQuality.missingPhones}`)
        console.log(`  Missing websites: ${dataQuality.missingWebsites}`)
        console.log(`  Invalid coordinates: ${dataQuality.invalidCoordinates}`)
        
        // 6. Generate recommendations
        console.log('\n6. RECOMMENDATIONS:')
        console.log('==================')
        
        if (duplicates.length === 0) {
            console.log('✅ READY TO IMPORT: No duplicates detected')
            console.log('   You can proceed with importing the 910 Toolbank retailers')
        } else {
            console.log('⚠️  DUPLICATES DETECTED: Manual review required')
            console.log('   Please review the duplicates above before importing')
            console.log('   Consider:')
            console.log('   - Are these truly the same businesses?')
            console.log('   - Should we merge the records?')
            console.log('   - Should we skip the duplicates?')
        }
        
        console.log('\nImport strategy recommendations:')
        console.log('- Use UPSERT logic to handle any missed duplicates')
        console.log('- Create merchant_organization_affiliations with Toolbank org ID')
        console.log('- Map CSV fields to database schema carefully')
        console.log('- Validate postcodes and coordinates during import')
        console.log('- Consider batch processing for large dataset')
        
        return {
            duplicates,
            dataQuality,
            toolbankOrgId: toolbankOrg.id,
            nmbsOrgId: nmbsOrg?.id,
            toolbankDataCount: toolbankData.length,
            existingMerchantCount: existingMerchants.length
        }
        
    } catch (error) {
        console.error('Error during analysis:', error)
    }
}

// Run the analysis
analyzeData()
    .then((result) => {
        if (result) {
            console.log('\n✅ Analysis complete!')
        }
    })
    .catch(console.error)
