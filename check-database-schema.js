import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lpsfnwbkofjpzmlbcztw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwc2Zud2Jrb2ZqcHptbGJjenR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NjYzMzYsImV4cCI6MjA2NjU0MjMzNn0.YlVqNL82lmS0gdLVV64prQMRBPZXDjrnjt_10itzgAg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDatabaseSchema() {
  console.log('Checking database schema...');
  
  // List of tables to check based on the migrations
  const expectedTables = [
    'organizations',
    'organization_settings', 
    'user_profiles',
    'products',
    'offers',
    'merchants',
    'merchant_locations',
    'product_categories',
    'offer_products'
  ];
  
  console.log('\\nChecking for expected tables:');
  
  for (const tableName of expectedTables) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);
      
      if (error) {
        console.log(`❌ ${tableName}: ${error.message}`);
      } else {
        console.log(`✅ ${tableName}: Table exists (${data.length} sample records)`);
      }
    } catch (err) {
      console.log(`❌ ${tableName}: ${err.message}`);
    }
  }
  
  // Check some specific required functionality
  console.log('\\n=== SPECIFIC CHECKS ===');
  
  // Check if suppliers (users with supplier role) exist
  try {
    const { data: suppliers, error: supplierError } = await supabase
      .from('user_profiles')
      .select('id, email, role, first_name, last_name')
      .eq('role', 'supplier')
      .limit(5);
    
    if (supplierError) {
      console.log(`❌ Suppliers check: ${supplierError.message}`);
    } else {
      console.log(`✅ Suppliers: Found ${suppliers.length} supplier users`);
      if (suppliers.length > 0) {
        console.log('   Sample suppliers:', suppliers.map(s => `${s.first_name} ${s.last_name} (${s.email})`));
      }
    }
  } catch (err) {
    console.log(`❌ Suppliers check: ${err.message}`);
  }
  
  // Check if products exist
  try {
    const { data: products, error: productError } = await supabase
      .from('products')
      .select('id, name, supplier_id, organization_id')
      .limit(5);
    
    if (productError) {
      console.log(`❌ Products check: ${productError.message}`);
    } else {
      console.log(`✅ Products: Found ${products.length} products`);
      if (products.length > 0) {
        console.log('   Sample products:', products.map(p => p.name));
      }
    }
  } catch (err) {
    console.log(`❌ Products check: ${err.message}`);
  }
  
  // Check if offers exist
  try {
    const { data: offers, error: offerError } = await supabase
      .from('offers')
      .select('id, title, supplier_id, status')
      .limit(5);
    
    if (offerError) {
      console.log(`❌ Offers check: ${offerError.message}`);
    } else {
      console.log(`✅ Offers: Found ${offers.length} offers`);
      if (offers.length > 0) {
        console.log('   Sample offers:', offers.map(o => `${o.title} (${o.status})`));
      }
    }
  } catch (err) {
    console.log(`❌ Offers check: ${err.message}`);
  }
  
  console.log('\\n=== SUMMARY ===');
  console.log('If you see ❌ errors above, you need to run the database migrations.');
  console.log('The migrations are in /database/migrations/ and should be run in order:');
  console.log('1. 001_initial_schema.sql');
  console.log('2. 002_products_and_offers.sql'); 
  console.log('3. 003_analytics_and_interactions.sql');
  console.log('4. logo-update-sql.sql (for organization logos)');
}

checkDatabaseSchema();