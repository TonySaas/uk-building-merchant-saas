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

async function testSuppliersTable() {
    console.log('🔍 Testing suppliers table structure...\n');
    
    // Test 1: Check if table exists and get structure
    console.log('1. Checking suppliers table...');
    try {
        const { data: suppliers, error } = await supabase
            .from('suppliers')
            .select('*')
            .limit(1);

        if (error) {
            console.error('❌ Error accessing suppliers table:', error);
        } else {
            console.log(`✅ Suppliers table accessible`);
            if (suppliers && suppliers.length > 0) {
                console.log('Available columns:', Object.keys(suppliers[0]).join(', '));
            } else {
                console.log('⚠️  No suppliers found in table');
            }
        }
    } catch (error) {
        console.error('❌ Suppliers table test failed:', error);
    }

    // Test 2: Check user_profiles table for suppliers
    console.log('\n2. Checking user_profiles for suppliers...');
    try {
        const { data: userProfiles, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_type', 'supplier')
            .limit(3);

        if (error) {
            console.error('❌ Error accessing user_profiles:', error);
        } else {
            console.log(`✅ Found ${userProfiles?.length || 0} supplier profiles`);
            if (userProfiles && userProfiles.length > 0) {
                userProfiles.forEach(profile => {
                    console.log(`- ${profile.full_name || profile.company_name || 'No name'} (${profile.user_type})`);
                });
            }
        }
    } catch (error) {
        console.error('❌ User profiles test failed:', error);
    }

    // Test 3: Check if there's a separate suppliers table
    console.log('\n3. Checking for other supplier-related tables...');
    try {
        const { data: tables, error } = await supabase
            .from('information_schema.tables')
            .select('table_name')
            .eq('table_schema', 'public')
            .like('table_name', '%supplier%');

        if (error) {
            console.error('❌ Error checking table schema:', error);
        } else {
            console.log(`✅ Found ${tables?.length || 0} supplier-related tables`);
            if (tables && tables.length > 0) {
                tables.forEach(table => {
                    console.log(`- ${table.table_name}`);
                });
            }
        }
    } catch (error) {
        console.error('❌ Schema check failed:', error);
    }
}

// Run the test
testSuppliersTable().catch(console.error);