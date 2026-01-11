import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Team = {
  id: string;
  name: string;
  country: string;
  city?: string;
  stadium?: string;
  latitude: number;
  longitude: number;
  capacity?: number;
  tier?: string;
  crest?: string; // Original ID from teams.json, used for logo file path
  created_at?: string;
  updated_at?: string;
};
