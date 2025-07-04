import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Load environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase URL or Anon Key in environment variables');
  console.log('Please make sure you have the following environment variables set:');
  console.log('VITE_SUPABASE_URL or SUPABASE_URL');
  console.log('VITE_SUPABASE_ANON_KEY or SUPABASE_ANON_KEY');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔌 Testing Supabase connection...');
console.log('Project URL:', supabaseUrl);

// Test the connection by fetching the current user (should work even without tables)
async function testConnection() {
  try {
    console.log('\n🔍 Testing authentication...');
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) throw sessionError;
    
    if (session) {
      console.log('✅ Authenticated as:', session.user.email);
    } else {
      console.log('ℹ️ Not authenticated. This is normal if you\'re using anon key.');
    }
    
    // Try to list any tables that might exist
    console.log('\n🔍 Checking for tables...');
    
    // Try to get a list of all tables by querying the information_schema
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .limit(5);
    
    if (tablesError) {
      console.log('❌ Could not list tables. This is expected if RLS is enabled.');
      console.log('Error details:', tablesError.message);
    } else if (tables && tables.length > 0) {
      console.log('\n📋 Found tables:');
      tables.forEach(table => console.log(`- ${table.table_name}`));
    } else {
      console.log('ℹ️ No tables found or insufficient permissions to list them.');
    }
    
    console.log('\n💡 Next steps:');
    console.log('1. Check your Supabase dashboard at:', supabaseUrl.replace('/rest/v1', ''));
    console.log('2. Verify your database tables in the Table Editor');
    console.log('3. Check Row Level Security (RLS) settings if you expect to see tables');
    
  } catch (error) {
    console.error('\n❌ Error testing Supabase connection:');
    console.error(error);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Verify your Supabase URL and API key are correct');
    console.log('2. Check if your Supabase project is running');
    console.log('3. Ensure your IP is whitelisted in Supabase if using IP restrictions');
    console.log('4. Try disabling Row Level Security (RLS) temporarily for testing');
  }
}

// Run the test
testConnection();
