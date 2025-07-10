import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only log in development
if (import.meta.env.DEV) {
  console.log('Search client config:', {
    url: supabaseUrl,
    hasServiceKey: !!supabaseServiceKey,
    hasAnonKey: !!supabaseAnonKey
  })
}

// Check if we have the required configuration
const hasValidConfig = supabaseUrl && (supabaseServiceKey || supabaseAnonKey)

// Create a client for search operations
// Try service key first, fallback to anon key
export const supabaseSearch = hasValidConfig 
  ? createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

// Check if environment variables are properly configured
export const isSearchConfigured = 
  supabaseUrl && 
  supabaseServiceKey && 
  supabaseUrl !== 'your_supabase_project_url' && 
  supabaseUrl !== 'https://placeholder.supabase.co' &&
  supabaseServiceKey !== 'your_service_role_key' &&
  supabaseServiceKey !== 'placeholder_service_key'