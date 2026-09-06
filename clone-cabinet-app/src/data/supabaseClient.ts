import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// v1.2 backend experiment: only lineage voting depends on this. Without these env vars set,
// LineageVotesProvider falls back to the original local-only behavior — the app still works
// with zero Supabase setup, it just doesn't share vote tallies across devices.
export const supabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = supabaseConfigured ? createClient(url!, anonKey!) : null;
