// Simple script to upload organization logos to Supabase Storage
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use the same URL and anon key from the test script
const supabaseUrl = 'https://lpsfnwbkofjpzmlbcztw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwc2Zud2Jrb2ZqcHptbGJjenR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NjYzMzYsImV4cCI6MjA2NjU0MjMzNn0.YlVqNL82lmS0gdLVV64prQMRBPZXDjrnjt_10itzgAg';

const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET_NAME = 'organization-logos';

async function uploadLogo() {
  console.log('🖼️  Uploading organization logo...');
  
  try {
    const filePath = path.join(process.cwd(), 'assets/logos/bmf.png');
    const fileContent = fs.readFileSync(filePath);
    
    console.log('📤 Uploading BMF logo...');
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload('public/bmf.png', fileContent, {
        cacheControl: '3600',
        upsert: true,
        contentType: 'image/png'
      });
      
    if (uploadError) {
      if (uploadError.message.includes('bucket not found')) {
        console.error('❌ Error: The bucket does not exist. Please create it in the Supabase dashboard first.');
        console.log('1. Go to Storage in your Supabase dashboard');
        console.log(`2. Create a new bucket named: ${BUCKET_NAME}`);
        console.log('3. Set it to public');
        console.log('4. Run this script again');
      } else {
        console.error('❌ Error uploading logo:', uploadError);
      }
      return;
    }
    
    console.log('✅ Logo uploaded successfully!');
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl('public/bmf.png');
      
    console.log('🌐 Public URL:', publicUrl);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

uploadLogo();
