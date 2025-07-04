import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Load environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase URL or Anon Key in environment variables');
  console.log('Please make sure you have the following environment variables set:');
  console.log('VITE_SUPABASE_URL or SUPABASE_URL');
  console.log('VITE_SUPABASE_ANON_KEY or SUPABASE_ANON_KEY');
  process.exit(1);
}

// Initialize Supabase client with service role for admin operations
const supabase = createClient(supabaseUrl, serviceRoleKey || supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function listTables() {
  try {
    // Try to get a list of tables using the REST API
    const { data: tables, error } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public');

    if (error) {
      console.error('Error listing tables:');
      console.error(error);
      return;
    }

    console.log('\n=== Database Tables ===');
    
    if (!tables || tables.length === 0) {
      console.log('No tables found in the database.');
    } else {
      tables.forEach((table, index) => {
        console.log(`${index + 1}. ${table.tablename}`);
      });
    }
  } catch (error) {
    console.error('Error connecting to Supabase:');
    console.error(error);
  }
}

// Run the function
console.log('Connecting to Supabase...');
listTables();
