#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
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

async function testIntelligentSearch() {
    console.log('🔍 Testing Intelligent Search functionality...\n');
    
    // Test 1: Test merchant search functionality
    console.log('1. Testing merchant search...');
    try {
        const { data: merchants, error } = await supabase
            .from('merchants')
            .select(`
                id,
                merchant_name,
                merchant_email,
                merchant_phone,
                merchant_category,
                merchant_website_url,
                verification_status,
                is_active,
                created_at,
                updated_at,
                merchant_locations (
                    id,
                    name,
                    city,
                    county,
                    postal_code,
                    latitude,
                    longitude
                ),
                merchant_organization_affiliations (
                    id,
                    affiliation_status,
                    membership_level,
                    organization:organizations (
                        id,
                        name,
                        type,
                        logo_url
                    )
                )
            `)
            .ilike('merchant_name', '%Robert Price%')
            .eq('is_active', true)
            .limit(3);

        if (error) {
            console.error('❌ Merchant search error:', error);
        } else {
            console.log(`✅ Found ${merchants?.length || 0} merchants`);
            if (merchants && merchants.length > 0) {
                merchants.forEach(merchant => {
                    console.log(`- ${merchant.merchant_name} (${merchant.merchant_category || 'No category'})`);
                    if (merchant.merchant_locations && merchant.merchant_locations.length > 0) {
                        console.log(`  Location: ${merchant.merchant_locations[0].city}, ${merchant.merchant_locations[0].county}`);
                    }
                    if (merchant.merchant_organization_affiliations && merchant.merchant_organization_affiliations.length > 0) {
                        console.log(`  Organizations: ${merchant.merchant_organization_affiliations.map(a => a.organization.name).join(', ')}`);
                    }
                });
            }
        }
    } catch (error) {
        console.error('❌ Merchant search failed:', error);
    }

    console.log('\n2. Testing supplier search...');
    try {
        const { data: suppliers, error } = await supabase
            .from('suppliers')
            .select(`
                id,
                supplier_name,
                supplier_description,
                slug,
                supplier_website,
                country,
                is_active,
                created_at,
                updated_at
            `)
            .eq('is_active', true)
            .limit(5);

        if (error) {
            console.error('❌ Supplier search error:', error);
        } else {
            console.log(`✅ Found ${suppliers?.length || 0} active suppliers`);
            if (suppliers && suppliers.length > 0) {
                suppliers.forEach(supplier => {
                    console.log(`- ${supplier.supplier_name} ${supplier.supplier_description ? `(${supplier.supplier_description})` : ''}`);
                    if (supplier.country) {
                        console.log(`  Country: ${supplier.country}`);
                    }
                });
            }
        }
    } catch (error) {
        console.error('❌ Supplier search failed:', error);
    }

    console.log('\n3. Testing intelligent ranking...');
    
    // Test the ranking algorithm
    const testResults = [
        { name: 'Robert Price (BM) Limited', description: 'Building merchant' },
        { name: 'BM Supplies Ltd', description: 'General supplies' },
        { name: 'Another Robert Price Company', description: 'Different company' },
        { name: 'Robert Price Tools', description: 'Tool supplier' },
        { name: 'Price Robert Ltd', description: 'Reverse name' }
    ];

    const query = 'robert price';
    const lowerQuery = query.toLowerCase();

    const ranked = testResults.sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        
        // Priority 1: Exact match
        if (aName === lowerQuery && bName !== lowerQuery) return -1;
        if (bName === lowerQuery && aName !== lowerQuery) return 1;
        
        // Priority 2: Starts with query
        const aStartsWith = aName.startsWith(lowerQuery);
        const bStartsWith = bName.startsWith(lowerQuery);
        
        if (aStartsWith && !bStartsWith) return -1;
        if (bStartsWith && !aStartsWith) return 1;
        
        // Priority 3: Word boundary match
        const aWordBoundary = aName.includes(` ${lowerQuery}`);
        const bWordBoundary = bName.includes(` ${lowerQuery}`);
        
        if (aWordBoundary && !bWordBoundary) return -1;
        if (bWordBoundary && !aWordBoundary) return 1;
        
        // Priority 4: Length
        if (aName.length !== bName.length) {
            return aName.length - bName.length;
        }
        
        // Priority 5: Alphabetical
        return aName.localeCompare(bName);
    });

    console.log(`Ranking test for "${query}":`);
    ranked.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name}`);
    });

    console.log('\n4. Testing text highlighting...');
    
    function highlightText(text, query) {
        if (!query.trim()) {
            return { segments: [{ text, isHighlighted: false }], originalText: text };
        }

        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const parts = text.split(regex);
        
        const segments = parts.map(part => ({
            text: part,
            isHighlighted: regex.test(part)
        }));

        return { segments, originalText: text };
    }

    const highlightTests = [
        { text: 'Robert Price (BM) Limited', query: 'robert' },
        { text: 'BM Supplies Ltd', query: 'bm' },
        { text: 'Another Robert Price Company', query: 'price' }
    ];

    highlightTests.forEach(test => {
        const result = highlightText(test.text, test.query);
        console.log(`Text: "${test.text}", Query: "${test.query}"`);
        console.log(`Segments:`, result.segments);
    });

    console.log('\n✅ All intelligent search tests completed!');
}

// Run the test
testIntelligentSearch().catch(console.error);