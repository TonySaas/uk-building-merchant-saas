import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://lpsfnwbkofjpzmlbcztw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwc2Zud2Jrb2ZqcHptbGJjenR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NjYzMzYsImV4cCI6MjA2NjU0MjMzNn0.YlVqNL82lmS0gdLVV64prQMRBPZXDjrnjt_10itzgAg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function applyDatabaseFix() {
  try {
    // Read the SQL file
    const sql = fs.readFileSync('database-fix-complete.sql', 'utf8');
    
    // Split SQL into individual statements (rough approach)
    const statements = sql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))
      .filter(stmt => !stmt.match(/^\\s*$/));
    
    console.log(`Found ${statements.length} SQL statements to execute...`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      // Skip comments and empty statements
      if (statement.startsWith('--') || statement.trim().length === 0) {
        continue;
      }
      
      try {
        console.log(`\\nExecuting statement ${i + 1}/${statements.length}...`);
        console.log(`Preview: ${statement.substring(0, 100)}...`);
        
        const { data, error } = await supabase.rpc('exec_sql', {
          query: statement + ';'
        });
        
        if (error) {
          console.log(`❌ Error: ${error.message}`);
          errorCount++;
        } else {
          console.log(`✅ Success`);
          successCount++;
        }
        
        // Small delay to avoid overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (err) {
        console.log(`❌ Exception: ${err.message}`);
        errorCount++;
      }
    }
    
    console.log(`\\n=== EXECUTION SUMMARY ===`);
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📊 Total: ${successCount + errorCount}`);
    
    if (errorCount === 0) {
      console.log(`\\n🎉 All SQL statements executed successfully!`);
    } else {
      console.log(`\\n⚠️  Some statements failed. You may need to run them manually in Supabase SQL Editor.`);
    }
    
    // Test the database after applying fixes
    console.log(`\\n=== TESTING DATABASE ACCESS ===`);
    await testDatabaseAccess();
    
  } catch (error) {
    console.error('Error reading or executing SQL:', error);
    console.log('\\n💡 MANUAL EXECUTION REQUIRED');
    console.log('Copy the contents of database-fix-complete.sql and run it in your Supabase SQL Editor.');
  }
}

async function testDatabaseAccess() {
  const tables = ['organizations', 'user_profiles', 'products', 'offers', 'merchants'];
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        console.log(`❌ ${table}: ${error.message}`);
      } else {
        console.log(`✅ ${table}: Table accessible`);
      }
    } catch (err) {
      console.log(`❌ ${table}: ${err.message}`);
    }
  }
}

console.log('🔧 Applying database fixes...');
applyDatabaseFix();