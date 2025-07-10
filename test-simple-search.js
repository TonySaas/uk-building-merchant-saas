#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing Supabase credentials in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSimpleSearch() {
    console.log('🔍 Testing simple search with anon key...\n');
    
    // Test 1: Simple search with anon key
    console.log('1. Testing simple merchant search with anon key...');
    try {
        const { data, error } = await supabase
            .from('merchants')
            .select('id, merchant_name, merchant_category')
            .ilike('merchant_name', '%Robert%')
            .limit(3);

        if (error) {
            console.error('❌ Error with anon key:', error.message);
            console.error('Error code:', error.code);
            console.error('Error details:', error.details);
        } else {
            console.log(`✅ Found ${data?.length || 0} merchants with anon key`);
            if (data && data.length > 0) {
                data.forEach(merchant => {
                    console.log(`- ${merchant.merchant_name} (${merchant.merchant_category})`);
                });
            }
        }
    } catch (error) {
        console.error('❌ Exception with anon key:', error.message);
    }

    // Test 2: Check if table exists
    console.log('\n2. Testing table access...');
    try {
        const { data, error } = await supabase
            .from('merchants')
            .select('id')
            .limit(1);

        if (error) {
            console.error('❌ Cannot access merchants table:', error.message);
        } else {
            console.log(`✅ Merchants table accessible, sample record exists: ${!!data?.length}`);
        }
    } catch (error) {
        console.error('❌ Exception accessing table:', error.message);
    }

    // Test 3: Test the exact query from the component
    console.log('\n3. Testing exact component query...');
    try {
        const query = 'Robert Price (BM) Limited';
        const { data, error } = await supabase
            .from('merchants')
            .select('id, merchant_name as name, merchant_category as description')
            .ilike('merchant_name', `%${query}%`)
            .limit(10);

        if (error) {
            console.error('❌ Component query error:', error.message);
        } else {
            console.log(`✅ Component query found ${data?.length || 0} results`);
            if (data && data.length > 0) {
                data.forEach(merchant => {
                    console.log(`- ${merchant.name} (${merchant.description})`);
                });
            }
        }
    } catch (error) {
        console.error('❌ Component query exception:', error.message);
    }
}

// Run the test
testSimpleSearch().catch(console.error);