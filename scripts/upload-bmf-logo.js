// Script to upload the BMF logo to Supabase Storage
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Supabase configuration - using service role key for admin access
const supabaseUrl = 'https://lpsfnwbkofjpzmlbcztw.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable is not set');
  console.log('Please set the SUPABASE_SERVICE_ROLE_KEY in your environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// File and bucket configuration
const BUCKET_NAME = 'organization-logos';
const LOGO_PATH = path.join(process.cwd(), 'assets/logos/BMF_logo.png');
const UPLOAD_PATH = 'public/bmf-logo.png';

async function uploadLogo() {
  try {
    console.log('📤 Uploading BMF logo to Supabase Storage...');
    
    // Read the file
    const file = fs.readFileSync(LOGO_PATH);
    
    // Upload the file
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(UPLOAD_PATH, file, {
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
      .getPublicUrl(UPLOAD_PATH);
      
    console.log('\n🌐 Public URL:');
    console.log(publicUrl);
    
    console.log('\nTo use this logo in your application, update the organization data with this URL:');
    console.log(`{
  id: "bmf",
  name: "BMF",
  logo: "${publicUrl}",
  // ... other fields
}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

uploadLogo();
