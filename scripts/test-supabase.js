#!/usr/bin/env node

/**
 * Simple Supabase Connection Test
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Service key length:', supabaseServiceKey?.length || 0);

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testConnection() {
    try {
        // Test basic connection
        console.log('📡 Testing basic connection...');
        const { data, error } = await supabase
            .from('organizations')
            .select('id, name')
            .limit(5);

        if (error) {
            console.error('❌ Connection error:', error);
            return false;
        }

        console.log('✅ Connection successful!');
        console.log('📊 Organizations found:', data.length);
        data.forEach(org => console.log(`  - ${org.name} (${org.id})`));

        // Test NMBS organization
        console.log('\n🔍 Looking for NMBS organization...');
        const { data: nmbs, error: nmbsError } = await supabase
            .from('organizations')
            .select('id, name')
            .eq('name', 'NMBS')
            .single();

        if (nmbsError) {
            console.error('❌ NMBS not found:', nmbsError);
            return false;
        }

        console.log('✅ NMBS found:', nmbs);
        return true;

    } catch (error) {
        console.error('❌ Unexpected error:', error);
        return false;
    }
}

testConnection().then(success => {
    if (success) {
        console.log('\n🎉 All tests passed! Ready to import NMBS merchants.');
    } else {
        console.log('\n❌ Tests failed. Please check configuration.');
        process.exit(1);
    }
});
