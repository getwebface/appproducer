import { createClient } from '@supabase/supabase-js';

// Access environment variables safely.
// FIX: Cast import.meta to any to resolve TS error: Property 'env' does not exist on type 'ImportMeta'
const env = (import.meta as any).env || {};

// Use provided keys as default fallbacks for immediate connectivity
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://rjqxmvaaslsxliplgdfp.supabase.co';
const supabaseKey = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_sBoiRgpd4b90Pe3oCPR_Ng_gL_UPrSK';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables.');
}

export const supabase = createClient(
  supabaseUrl, 
  supabaseKey
);