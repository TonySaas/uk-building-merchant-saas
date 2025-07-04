import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lpsfnwbkofjpzmlbcztw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwc2Zud2Jrb2ZqcHptbGJjenR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NjYzMzYsImV4cCI6MjA2NjU0MjMzNn0.YlVqNL82lmS0gdLVV64prQMRBPZXDjrnjt_10itzgAg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function insertSuppliers() {
  console.log('🔧 Inserting sample suppliers into Supabase...');
  
  const suppliers = [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      email: 'john.supplier@toolsupplier.com',
      first_name: 'John',
      last_name: 'Smith',
      role: 'supplier',
      company_name: 'Professional Tools Ltd',
      phone: '+44 20 7123 4567',
      address_line_1: '123 Industrial Estate',
      city: 'Manchester',
      county: 'Greater Manchester',
      postal_code: 'M1 1AA',
      country: 'United Kingdom'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      email: 'sarah.wilson@buildingsupplies.com',
      first_name: 'Sarah',
      last_name: 'Wilson',
      role: 'supplier',
      company_name: 'Premium Building Supplies',
      phone: '+44 161 234 5678',
      address_line_1: '456 Trade Park',
      city: 'Birmingham',
      county: 'West Midlands',
      postal_code: 'B2 4QJ',
      country: 'United Kingdom'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      email: 'mike.thompson@electricaltools.com',
      first_name: 'Mike',
      last_name: 'Thompson',
      role: 'supplier',
      company_name: 'Thompson Electrical Tools',
      phone: '+44 113 567 8901',
      address_line_1: '789 Commerce Way',
      city: 'Leeds',
      county: 'West Yorkshire',
      postal_code: 'LS1 2AB',
      country: 'United Kingdom'
    }
  ];
  
  const merchants = [
    {
      id: '660e8400-e29b-41d4-a716-446655440001',
      email: 'emma.jones@localhardware.com',
      first_name: 'Emma',
      last_name: 'Jones',
      role: 'merchant',
      company_name: 'Local Hardware Store',
      phone: '+44 20 8765 4321',
      address_line_1: '12 High Street',
      city: 'London',
      county: 'Greater London',
      postal_code: 'SW1A 1AA',
      country: 'United Kingdom'
    },
    {
      id: '660e8400-e29b-41d4-a716-446655440002',
      email: 'david.brown@toolsandmore.com',
      first_name: 'David',
      last_name: 'Brown',
      role: 'merchant',
      company_name: 'Tools & More Ltd',
      phone: '+44 161 876 5432',
      address_line_1: '34 Market Street',
      city: 'Manchester',
      county: 'Greater Manchester',
      postal_code: 'M4 3EF',
      country: 'United Kingdom'
    }
  ];
  
  const consumers = [
    {
      id: '770e8400-e29b-41d4-a716-446655440001',
      email: 'james.customer@email.com',
      first_name: 'James',
      last_name: 'Customer',
      role: 'consumer',
      phone: '+44 7123 456789',
      address_line_1: '56 Residential Road',
      city: 'Bristol',
      county: 'Somerset',
      postal_code: 'BS1 5RT',
      country: 'United Kingdom'
    }
  ];
  
  // Combine all users
  const allUsers = [...suppliers, ...merchants, ...consumers];
  
  console.log(`\\nInserting ${allUsers.length} users (${suppliers.length} suppliers, ${merchants.length} merchants, ${consumers.length} consumers)...`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const user of allUsers) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .upsert(user, { onConflict: 'email' })
        .select();
      
      if (error) {
        console.log(`❌ ${user.email}: ${error.message}`);
        errorCount++;
      } else {
        console.log(`✅ ${user.email}: ${user.role} inserted successfully`);
        successCount++;
      }
    } catch (err) {
      console.log(`❌ ${user.email}: ${err.message}`);
      errorCount++;
    }
  }
  
  console.log(`\\n=== INSERTION SUMMARY ===`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  
  // Verify the data
  console.log(`\\n=== VERIFICATION ===`);
  
  try {
    const { data: supplierData, error: supplierError } = await supabase
      .from('user_profiles')
      .select('email, first_name, last_name, role, company_name')
      .eq('role', 'supplier');
    
    if (supplierError) {
      console.log(`❌ Supplier verification: ${supplierError.message}`);
    } else {
      console.log(`✅ Suppliers in database: ${supplierData.length}`);
      supplierData.forEach(supplier => {
        console.log(`   📦 ${supplier.first_name} ${supplier.last_name} (${supplier.company_name}) - ${supplier.email}`);
      });
    }
    
    const { data: merchantData, error: merchantError } = await supabase
      .from('user_profiles')
      .select('email, first_name, last_name, role, company_name')
      .eq('role', 'merchant');
    
    if (merchantError) {
      console.log(`❌ Merchant verification: ${merchantError.message}`);
    } else {
      console.log(`\\n✅ Merchants in database: ${merchantData.length}`);
      merchantData.forEach(merchant => {
        console.log(`   🏪 ${merchant.first_name} ${merchant.last_name} (${merchant.company_name}) - ${merchant.email}`);
      });
    }
    
    const { data: consumerData, error: consumerError } = await supabase
      .from('user_profiles')
      .select('email, first_name, last_name, role')
      .eq('role', 'consumer');
    
    if (consumerError) {
      console.log(`❌ Consumer verification: ${consumerError.message}`);
    } else {
      console.log(`\\n✅ Consumers in database: ${consumerData.length}`);
      consumerData.forEach(consumer => {
        console.log(`   👤 ${consumer.first_name} ${consumer.last_name} - ${consumer.email}`);
      });
    }
    
  } catch (error) {
    console.error('Verification error:', error);
  }
  
  console.log(`\\n🎉 Supplier insertion process complete!`);
  console.log(`\\n💡 Next steps:`);
  console.log(`1. Visit http://localhost:5173/register to test registration`);
  console.log(`2. The registration wizard now has supplier data to work with`);
  console.log(`3. You can create products and offers for these suppliers`);
}

insertSuppliers();