import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseUrl = rawUrl
  .trim()
  .replace(/\/+$/, "")
  .replace(/\/rest\/v1$/, "");
const supabaseAnonKey = (
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
).trim();

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Warning: Supabase Environment Variables are missing in .env.local",
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key",
);
