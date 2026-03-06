import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xfkckgvkytbufqpjbtba.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhma2NrZ3ZreXRidWZxcGpidGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMzUzNzAsImV4cCI6MjA4NzcxMTM3MH0.lkKLgQs9egh_PkjtEMyP-tkr0uSPHz2S7__TNv_9mCg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
