import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;
  return { url, key };
}

export function createPublicSupabaseClient() {
  const config = getSupabaseConfig();
  if (!config) return null;

  return createClient(config.url, config.key, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}

export function getBrowserSupabaseClient() {
  if (typeof window === "undefined") return null;
  if (browserClient) return browserClient;

  const config = getSupabaseConfig();
  if (!config) return null;

  browserClient = createClient(config.url, config.key);
  return browserClient;
}