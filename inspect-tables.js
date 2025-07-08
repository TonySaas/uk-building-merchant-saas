import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function inspectMerchantsTable() {
    console.log('🔍 Inspecting Merchants Table Structure');
    console.log('=======================================');
    
    try {
        // Get table structure by querying with limit 1
        const { data, error } = await supabase
            .from('merchants')
            .select('*')
            .limit(1);
            
        if (error) {
            console.error('❌ Error fetching merchants:', error);
            return;
        }
        
        if (data && data.length > 0) {
            console.log('📋 Available columns in merchants table:');
            Object.keys(data[0]).forEach(column => {
                console.log(`   - ${column}: ${typeof data[0][column]}`);
            });
            
            console.log('\n📊 Sample record:');
            console.log(JSON.stringify(data[0], null, 2));
        } else {
            console.log('📋 Merchants table is empty, checking structure...');
            
            // Try to get schema info differently
            const { data: schemaData, error: schemaError } = await supabase.rpc('get_table_schema', {
                table_name: 'merchants'
            });
            
            if (schemaError) {
                console.log('⚠️  Cannot determine schema automatically');
                console.log('💡 Let\'s try inserting a test record to see the expected structure...');
            }
        }
        
    } catch (error) {
        console.error('💥 Error inspecting table:', error);
    }
}

async function inspectAllTables() {
    console.log('\n🗄️  Inspecting All Related Tables');
    console.log('==================================');
    
    const tables = [
        'merchants',
        'merchant_locations', 
        'merchant_organization_affiliations'
    ];
    
    for (const tableName of tables) {
        try {
            console.log(`\n📋 Table: ${tableName}`);
            
            const { data, error } = await supabase
                .from(tableName)
                .select('*')
                .limit(1);
                
            if (error) {
                console.log(`   ❌ Error: ${error.message}`);
                continue;
            }
            
            if (data && data.length > 0) {
                console.log('   📊 Columns:');
                Object.keys(data[0]).forEach(column => {
                    const value = data[0][column];
                    const type = value === null ? 'null' : typeof value;
                    console.log(`      - ${column}: ${type}`);
                });
            } else {
                console.log('   📭 Table is empty');
                
                // Try to determine structure from schema
                try {
                    // This is a workaround - try to insert invalid data to get column info
                    const { error: insertError } = await supabase
                        .from(tableName)
                        .insert({});
                        
                    if (insertError) {
                        // Parse the error message to get column info
                        console.log(`   💡 Schema hint: ${insertError.message}`);
                    }
                } catch (e) {
                    console.log('   ⚠️  Cannot determine empty table structure');
                }
            }
            
        } catch (error) {
            console.log(`   💥 Error inspecting ${tableName}:`, error.message);
        }
    }
}

async function main() {
    await inspectMerchantsTable();
    await inspectAllTables();
    
    console.log('\n💡 NEXT STEPS');
    console.log('=============');
    console.log('Based on the table structure, we may need to:');
    console.log('1. Update the import script to match the actual column names');
    console.log('2. Check if the database schema matches our migration files');
    console.log('3. Run any missing migrations');
}

main();
