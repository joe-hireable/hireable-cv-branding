
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Check if environment variables are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'
  );
  
  // For development purposes only - using placeholder values
  // In production, you should always use actual Supabase credentials
  const fallbackUrl = 'https://your-project-url.supabase.co';
  const fallbackKey = 'your-anon-key';
  
  console.warn(
    `⚠️ Using fallback Supabase values for development. The app will work but not connect to your Supabase instance.`
  );
  
  // Set fallback values for development
  if (!supabaseUrl) supabaseUrl = fallbackUrl;
  if (!supabaseAnonKey) supabaseAnonKey = fallbackKey;
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to get the current user
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};
