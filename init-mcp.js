// Initialize Supabase MCP with environment variables
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase URL or Anon Key in environment variables');
  console.log('Please make sure you have the following environment variables set:');
  console.log('VITE_SUPABASE_URL or SUPABASE_URL');
  console.log('VITE_SUPABASE_ANON_KEY or SUPABASE_ANON_KEY');
  console.log('VITE_SUPABASE_SERVICE_ROLE or SUPABASE_SERVICE_ROLE_KEY (recommended for admin operations)');
  process.exit(1);
}

// Initialize Supabase client with service role for admin operations
const supabase = createClient(supabaseUrl, serviceRoleKey || supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

console.log('Supabase MCP initialized successfully!');
console.log('Project URL:', supabaseUrl);

// Test connection and list tables
async function testConnection() {
  console.log('Testing Supabase connection...');
  
  try {
    // Try to list tables using the SQL API
    const { data, error } = await supabase
      .rpc('get_tables')
      .select();

    if (error) {
      console.log('Standard table listing failed, trying alternative method...');
      // If the function doesn't exist, create it
      await createGetTablesFunction();
      return await testConnection();
    }
    
    console.log('✅ Successfully connected to Supabase');
    
    if (!data || data.length === 0) {
      console.log('\nNo tables found in the database.');
      console.log('\nTo set up the initial database schema, you can:');
      console.log('1. Use the Supabase dashboard at https://app.supabase.com');
      console.log('2. Run SQL migrations using the Supabase CLI');
      console.log('3. Create tables programmatically using the Supabase client');
    } else {
      console.log('\n=== Database Tables ===');
      data.forEach(table => {
        console.log(`- ${table.table_name}`);
      });
    }
  } catch (error) {
    console.error('❌ Error connecting to Supabase:');
    console.error(error.message);
    console.log('\nTroubleshooting tips:');
    console.log('1. Verify your Supabase URL and API key are correct');
    console.log('2. Check if Row Level Security (RLS) is enabled and properly configured');
    console.log('3. Try using the service role key for admin operations');
  }
}

// Create a function to list tables if it doesn't exist
async function createGetTablesFunction() {
  console.log('Creating get_tables function...');
  
  const createFunctionSQL = `
    create or replace function get_tables()
    returns table (table_name text)
    language sql
    as $$
      select tablename as table_name
      from pg_tables
      where schemaname = 'public';
    $$;
  `;

  try {
    const { data, error } = await supabase.rpc('execute_sql', { query: createFunctionSQL });
    
    if (error) {
      console.error('Error creating get_tables function:');
      console.error(error);
      return;
    }
    
    console.log('✅ Successfully created get_tables function');
  } catch (error) {
    console.error('Error creating get_tables function:');
    console.error(error);
  }
}

// Run the test
testConnection();
