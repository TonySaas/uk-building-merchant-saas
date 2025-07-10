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

async function testMerchantSearch() {
    console.log('🔍 Testing merchant search functionality...\n');
    
    // Test 1: Check if merchants table exists and has data
    console.log('1. Checking merchants table...');
    const { data: merchants, error: merchantError, count } = await supabase
        .from('merchants')
        .select('*', { count: 'exact' })
        .limit(5);
    
    if (merchantError) {
        console.error('❌ Error querying merchants:', merchantError);
    } else {
        console.log(`✅ Found ${count} merchants in database`);
        if (merchants && merchants.length > 0) {
            console.log('Sample merchants:');
            merchants.forEach(merchant => {
                console.log(`- ${merchant.merchant_name || merchant.name || 'No name'} (ID: ${merchant.id})`);
            });
        } else {
            console.log('⚠️  No merchants found in database');
        }
    }
    
    console.log('\n2. Testing search for "Robert Price"...');
    const { data: robertPrice, error: searchError } = await supabase
        .from('merchants')
        .select('id, merchant_name, merchant_category, is_active')
        .ilike('merchant_name', '%Robert Price%')
        .limit(5);
    
    if (searchError) {
        console.error('❌ Error searching for Robert Price:', searchError);
    } else {
        console.log(`✅ Found ${robertPrice?.length || 0} merchants matching "Robert Price"`);
        if (robertPrice && robertPrice.length > 0) {
            robertPrice.forEach(merchant => {
                console.log(`- ${merchant.merchant_name} (Active: ${merchant.is_active})`);
            });
        }
    }
    
    console.log('\n3. Testing search for any merchant containing "BM"...');
    const { data: bmMerchants, error: bmError } = await supabase
        .from('merchants')
        .select('id, merchant_name, merchant_category, is_active')
        .ilike('merchant_name', '%BM%')
        .limit(5);
    
    if (bmError) {
        console.error('❌ Error searching for BM merchants:', bmError);
    } else {
        console.log(`✅ Found ${bmMerchants?.length || 0} merchants matching "BM"`);
        if (bmMerchants && bmMerchants.length > 0) {
            bmMerchants.forEach(merchant => {
                console.log(`- ${merchant.merchant_name} (Active: ${merchant.is_active})`);
            });
        }
    }
    
    console.log('\n4. Testing simple merchant search (any active merchant)...');
    const { data: anyMerchant, error: anyError } = await supabase
        .from('merchants')
        .select('id, merchant_name, merchant_category, is_active')
        .eq('is_active', true)
        .limit(3);
    
    if (anyError) {
        console.error('❌ Error searching for any merchant:', anyError);
    } else {
        console.log(`✅ Found ${anyMerchant?.length || 0} active merchants`);
        if (anyMerchant && anyMerchant.length > 0) {
            anyMerchant.forEach(merchant => {
                console.log(`- ${merchant.merchant_name}`);
            });
        }
    }
    
    console.log('\n5. Testing table structure...');
    const { data: tableInfo, error: tableError } = await supabase
        .from('merchants')
        .select('*')
        .limit(1);
    
    if (tableError) {
        console.error('❌ Error getting table structure:', tableError);
    } else if (tableInfo && tableInfo.length > 0) {
        console.log('✅ Table structure (first record fields):');
        console.log(Object.keys(tableInfo[0]).join(', '));
    }
}

// Run the test
testMerchantSearch().catch(console.error);