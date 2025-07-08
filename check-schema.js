#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkSchema() {
    try {
        // Check merchants table columns
        console.log('Checking merchants table structure...')
        const { data: columns, error } = await supabase
            .rpc('get_table_columns', { table_name: 'merchants' })
        
        if (error) {
            console.log('Using direct query to check structure...')
            
            // Try to get a sample record to see the structure
            const { data: sample, error: sampleError } = await supabase
                .from('merchants')
                .select('*')
                .limit(1)
            
            if (sampleError) {
                console.error('Error fetching sample:', sampleError)
                
                // Let's try to get table info from information_schema
                const { data: tableInfo, error: infoError } = await supabase
                    .from('information_schema.columns')
                    .select('column_name, data_type, is_nullable')
                    .eq('table_name', 'merchants')
                    .eq('table_schema', 'public')
                
                if (infoError) {
                    console.error('Error fetching table info:', infoError)
                } else {
                    console.log('Merchants table columns:')
                    tableInfo.forEach(col => {
                        console.log(`  ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`)
                    })
                }
            } else {
                console.log('Sample merchant record:')
                console.log(sample[0])
                console.log('\nColumns available:')
                if (sample.length > 0) {
                    Object.keys(sample[0]).forEach(key => {
                        console.log(`  - ${key}`)
                    })
                }
            }
        } else {
            console.log('Table columns:', columns)
        }
        
        // Check merchant_organization_affiliations
        console.log('\nChecking merchant_organization_affiliations...')
        const { data: affiliations, error: affError } = await supabase
            .from('merchant_organization_affiliations')
            .select('*')
            .limit(1)
            
        if (affError) {
            console.error('Error fetching affiliations:', affError)
        } else {
            console.log('Sample affiliation:', affiliations[0])
        }
        
        // Check merchant_locations
        console.log('\nChecking merchant_locations...')
        const { data: locations, error: locError } = await supabase
            .from('merchant_locations')
            .select('*')
            .limit(1)
            
        if (locError) {
            console.error('Error fetching locations:', locError)
        } else {
            console.log('Sample location:', locations[0])
        }
        
    } catch (error) {
        console.error('Error:', error)
    }
}

checkSchema()
