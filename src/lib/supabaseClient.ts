import { createClient } from "@supabase/supabase-js";

// ✅ Ensure these values are defined and come from Vite env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// ✅ Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
