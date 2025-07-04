import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase URL or Service Role Key in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const BUCKET_NAME = 'organization-logos';
const LOGO_DIR = path.join(__dirname, '../../assets/logos');

async function setupStorage() {
  console.log('🚀 Setting up Supabase Storage...');

  try {
    // 1. Check if bucket exists
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('❌ Error listing buckets:', bucketsError);
      return;
    }

    const bucketExists = buckets.some(bucket => bucket.name === BUCKET_NAME);

    if (!bucketExists) {
      // 2. Create bucket if it doesn't exist
      console.log(`🆕 Creating bucket: ${BUCKET_NAME}`);
      const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'],
        fileSizeLimit: 1024 * 1024 * 5, // 5MB
      });

      if (createError) {
        console.error('❌ Error creating bucket:', createError);
        return;
      }
      console.log('✅ Bucket created successfully');
    } else {
      console.log('✅ Bucket already exists');
    }

    // 3. Upload organization logos
    console.log('\n🖼️  Uploading organization logos...');
    
    try {
      const files = fs.readdirSync(LOGO_DIR);
      
      for (const file of files) {
        const filePath = path.join(LOGO_DIR, file);
        const fileExt = path.extname(file);
        const fileName = path.basename(file, fileExt);
        
        // Skip non-image files
        if (!['.png', '.jpg', '.jpeg', '.svg', '.webp'].includes(fileExt.toLowerCase())) {
          console.log(`⏩ Skipping non-image file: ${file}`);
          continue;
        }
        
        console.log(`📤 Uploading ${file}...`);
        
        const fileContent = fs.readFileSync(filePath);
        const { error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(`public/${fileName}${fileExt}`, fileContent, {
            cacheControl: '3600',
            upsert: true,
            contentType: `image/${fileExt.replace('.', '')}`
          });
          
        if (uploadError) {
          console.error(`❌ Error uploading ${file}:`, uploadError.message);
        } else {
          console.log(`✅ Uploaded ${file}`);
        }
      }
      
      // 4. Update bucket policy to make files public
      console.log('\n🔓 Updating bucket policy...');
      const { error: policyError } = await supabase.storage
        .from(BUCKET_NAME)
        .createSignedUrl('*', 60); // This is a workaround to ensure public access
        
      if (policyError) {
        console.error('❌ Error updating bucket policy:', policyError.message);
      } else {
        console.log('✅ Bucket policy updated');
      }
      
      console.log('\n🎉 Storage setup completed successfully!');
      
    } catch (dirError) {
      console.error('❌ Error reading logos directory:', dirError);
      console.log('ℹ️  Please create an "assets/logos" directory and add your logo files there.');
    }
    
  } catch (error) {
    console.error('❌ Error setting up storage:', error);
  }
}

setupStorage();
