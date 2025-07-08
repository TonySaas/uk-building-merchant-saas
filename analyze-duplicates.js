import fs from 'fs';
import csv from 'csv-parser';

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
                // Clean up the data object keys to remove any BOM characters
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

// Function to normalize merchant name for comparison
function normalizeName(name) {
    if (!name) return '';
    return name
        .toLowerCase()
        .replace(/ltd|limited|llp|plc|\(.*?\)|,/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
}

// Function to normalize postcode for comparison
function normalizePostcode(postcode) {
    if (!postcode) return '';
    return postcode.replace(/\s+/g, '').toUpperCase();
}

// Function to check if two addresses are genuinely similar
function addressSimilarity(addr1, addr2, postcode1, postcode2) {
    const norm1 = addr1 ? addr1.toLowerCase().replace(/\s+/g, ' ').trim() : '';
    const norm2 = addr2 ? addr2.toLowerCase().replace(/\s+/g, ' ').trim() : '';
    const pc1 = normalizePostcode(postcode1);
    const pc2 = normalizePostcode(postcode2);
    
    // If postcodes match exactly, it's likely the same address
    if (pc1 && pc2 && pc1 === pc2) return true;
    
    // Don't match based on generic words
    const genericWords = ['unit', 'road', 'street', 'avenue', 'lane', 'close', 'way', 'drive', 'court', 'place'];
    
    if (norm1 && norm2 && norm1.length > 10 && norm2.length > 10) {
        const words1 = norm1.split(' ').filter(word => 
            word.length > 3 && !genericWords.includes(word) && !/^\d+$/.test(word)
        );
        const words2 = norm2.split(' ').filter(word => 
            word.length > 3 && !genericWords.includes(word) && !/^\d+$/.test(word)
        );
        
        if (words1.length === 0 || words2.length === 0) return false;
        
        const commonWords = words1.filter(word => words2.includes(word));
        const similarity = commonWords.length / Math.min(words1.length, words2.length);
        
        return similarity >= 0.5 && commonWords.length >= 2;
    }
    
    return false;
}

// Function to find duplicates
function findDuplicates(nmbs, toolbank) {
    const duplicates = [];
    const potentialDuplicates = [];
    
    console.log('Analyzing for duplicates...');
    let processed = 0;
    
    for (const tbMerchant of toolbank) {
        if (processed % 100 === 0) {
            console.log(`Processed ${processed}/${toolbank.length} Toolbank retailers...`);
        }
        processed++;
        
        const tbName = normalizeName(tbMerchant.merchant_name);
        const tbPostcode = normalizePostcode(tbMerchant.merchant_postcode);
        const tbAddress = `${tbMerchant.merchant_address_1 || ''} ${tbMerchant.merchant_address_2 || ''}`.trim();
        
        if (!tbName) continue;
        
        for (const nmbsMerchant of nmbs) {
            const nmbsName = normalizeName(nmbsMerchant.merchant_name);
            const nmbsPostcode = normalizePostcode(nmbsMerchant.merchant_postcode);
            const nmbsAddress = `${nmbsMerchant.merchant_address_1 || ''} ${nmbsMerchant.merchant_address_2 || ''}`.trim();
            
            if (!nmbsName) continue;
            
            // Check for exact name match
            if (tbName === nmbsName) {
                duplicates.push({
                    type: 'exact_name_match',
                    toolbank: tbMerchant,
                    nmbs: nmbsMerchant,
                    similarity: 'exact_name'
                });
                continue;
            }
            
            // Check for same postcode with similar names
            if (tbPostcode && nmbsPostcode && tbPostcode === nmbsPostcode) {
                const nameDistance = levenshteinDistance(tbName, nmbsName);
                const maxLength = Math.max(tbName.length, nmbsName.length);
                const similarity = 1 - (nameDistance / maxLength);
                
                if (similarity > 0.8) {
                    potentialDuplicates.push({
                        type: 'similar_name_same_postcode',
                        toolbank: tbMerchant,
                        nmbs: nmbsMerchant,
                        similarity: similarity.toFixed(2)
                    });
                }
            }
            
            // Check for very similar names (>90% similarity)
            else {
                const nameDistance = levenshteinDistance(tbName, nmbsName);
                const maxLength = Math.max(tbName.length, nmbsName.length);
                const similarity = 1 - (nameDistance / maxLength);
                
                if (similarity > 0.9 && Math.abs(tbName.length - nmbsName.length) <= 3) {
                    potentialDuplicates.push({
                        type: 'very_similar_names',
                        toolbank: tbMerchant,
                        nmbs: nmbsMerchant,
                        similarity: similarity.toFixed(2)
                    });
                }
            }
            
            // Check for genuine address similarity
            if (addressSimilarity(tbAddress, nmbsAddress, tbPostcode, nmbsPostcode)) {
                potentialDuplicates.push({
                    type: 'address_similarity',
                    toolbank: tbMerchant,
                    nmbs: nmbsMerchant,
                    similarity: 'address'
                });
            }
        }
    }
    
    return { duplicates, potentialDuplicates };
}

// Levenshtein distance function
function levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    
    return matrix[str2.length][str1.length];
}

// Main execution
async function main() {
    try {
        console.log('Reading NMBS merchants...');
        const nmbsMerchants = await readCSV('/Users/tonyboyle/Library/CloudStorage/Dropbox/MERCHANT DEALS Folder Dropbox/MERCHANT DEALS DATA/NMBS Merchants and Suppliers/NMBS_merchants_FINAL_COMPLETE.csv');
        
        console.log('Reading Toolbank retailers...');
        const toolbankRetailers = await readCSV('/Users/tonyboyle/Library/CloudStorage/Dropbox/MERCHANT DEALS Folder Dropbox/MERCHANT DEALS DATA/TOOLBANK Retailers and Brands/Toolbank_Retailers_910.csv');
        
        console.log(`\nData loaded:`);
        console.log(`- NMBS merchants: ${nmbsMerchants.length} records`);
        console.log(`- Toolbank retailers: ${toolbankRetailers.length} records`);
        
        // Show sample data to verify structure
        if (toolbankRetailers.length > 0) {
            console.log('\nSample Toolbank data:');
            console.log('Columns:', Object.keys(toolbankRetailers[0]));
            console.log('First record:', toolbankRetailers[0].merchant_name);
        }
        
        if (nmbsMerchants.length > 0) {
            console.log('\nSample NMBS data:');
            console.log('Columns:', Object.keys(nmbsMerchants[0]));
            console.log('First record:', nmbsMerchants[0].merchant_name);
        }
        
        // Clean data - remove records with missing names
        const cleanNmbs = nmbsMerchants.filter(m => m.merchant_name && m.merchant_name.trim());
        const cleanToolbank = toolbankRetailers.filter(m => m.merchant_name && m.merchant_name.trim());
        
        console.log(`\nAfter cleaning:`);
        console.log(`- NMBS merchants: ${cleanNmbs.length} records`);
        console.log(`- Toolbank retailers: ${cleanToolbank.length} records`);
        
        if (cleanToolbank.length === 0) {
            console.log('\n❌ ERROR: No valid Toolbank retailers found after cleaning!');
            console.log('This suggests an issue with data parsing or column names.');
            return;
        }
        
        const { duplicates, potentialDuplicates } = findDuplicates(cleanNmbs, cleanToolbank);
        
        console.log(`\n=== DUPLICATE ANALYSIS RESULTS ===`);
        console.log(`Exact duplicates found: ${duplicates.length}`);
        console.log(`Potential duplicates found: ${potentialDuplicates.length}`);
        
        if (duplicates.length > 0) {
            console.log(`\n=== EXACT DUPLICATES ===`);
            duplicates.forEach((dup, index) => {
                console.log(`\n${index + 1}. ${dup.type.toUpperCase()}`);
                console.log(`   NMBS: ${dup.nmbs.merchant_name} | ${dup.nmbs.merchant_postcode}`);
                console.log(`   Toolbank: ${dup.toolbank.merchant_name} | ${dup.toolbank.merchant_postcode}`);
            });
        }
        
        if (potentialDuplicates.length > 0) {
            console.log(`\n=== POTENTIAL DUPLICATES (TOP 20) ===`);
            potentialDuplicates.slice(0, 20).forEach((dup, index) => {
                console.log(`\n${index + 1}. ${dup.type.toUpperCase()} (Similarity: ${dup.similarity})`);
                console.log(`   NMBS: ${dup.nmbs.merchant_name}`);
                console.log(`         ${dup.nmbs.merchant_address_1} ${dup.nmbs.merchant_address_2 || ''}`);
                console.log(`         ${dup.nmbs.merchant_postcode}`);
                console.log(`   Toolbank: ${dup.toolbank.merchant_name}`);
                console.log(`             ${dup.toolbank.merchant_address_1} ${dup.toolbank.merchant_address_2 || ''}`);
                console.log(`             ${dup.toolbank.merchant_postcode}`);
            });
            
            if (potentialDuplicates.length > 20) {
                console.log(`\n... and ${potentialDuplicates.length - 20} more potential duplicates`);
            }
        }
        
        // Write detailed results to files
        fs.writeFileSync('/Users/tonyboyle/uk-building-merchant-saas/exact-duplicates.json', 
            JSON.stringify(duplicates, null, 2));
        fs.writeFileSync('/Users/tonyboyle/uk-building-merchant-saas/potential-duplicates.json', 
            JSON.stringify(potentialDuplicates, null, 2));
        
        console.log(`\n=== FILES CREATED ===`);
        console.log(`- exact-duplicates.json: ${duplicates.length} records`);
        console.log(`- potential-duplicates.json: ${potentialDuplicates.length} records`);
        
        // Provide recommendations
        console.log(`\n=== RECOMMENDATIONS ===`);
        if (duplicates.length === 0 && potentialDuplicates.length < 10) {
            console.log('✅ LOW RISK: Few or no duplicates detected. Safe to proceed with import.');
            console.log('   Recommendation: Proceed with Toolbank import.');
        } else if (duplicates.length > 0) {
            console.log('⚠️  HIGH RISK: Exact duplicates found. These MUST be handled before import.');
            console.log('   Recommendation: Review and resolve exact duplicates first.');
        } else if (potentialDuplicates.length < 50) {
            console.log('⚠️  MEDIUM RISK: Some potential duplicates found.');
            console.log('   Recommendation: Quick manual review, then proceed with import.');
        } else {
            console.log('⚠️  MEDIUM-HIGH RISK: Many potential duplicates found.');
            console.log('   Recommendation: Thorough manual review before import.');
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
