import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if environment variables are properly configured
const isSupabaseConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_project_url' && 
  supabaseUrl !== 'https://placeholder.supabase.co' &&
  supabaseAnonKey !== 'your_supabase_anon_key' &&
  supabaseAnonKey !== 'placeholder_anon_key'

let supabase: any

if (!isSupabaseConfigured) {
  console.warn('⚠️ Supabase not configured - using mock client')
  console.log('To enable Supabase:')
  console.log('1. Create a Supabase project at https://supabase.com')
  console.log('2. Copy your project URL and anon key')
  console.log('3. Update .env.local with your credentials')
  
  // Create a mock client that won't cause errors
  supabase = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
      signUp: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({}),
      resetPasswordForEmail: () => Promise.resolve({ error: { message: 'Supabase not configured' } })
    },
    rpc: () => Promise.resolve({ data: [], error: { message: 'Supabase not configured' } }),
    from: () => ({
      select: () => Promise.resolve({ data: [], error: { message: 'Supabase not configured' } }),
      insert: () => Promise.resolve({ data: [], error: { message: 'Supabase not configured' } }),
      update: () => Promise.resolve({ data: [], error: { message: 'Supabase not configured' } }),
      delete: () => Promise.resolve({ data: [], error: { message: 'Supabase not configured' } })
    })
  }
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
}

export { supabase, isSupabaseConfigured }