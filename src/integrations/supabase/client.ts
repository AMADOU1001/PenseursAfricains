// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mwpdhkndlsfuilouofjl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13cGRoa25kbHNmdWlsb3VvZmpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2Nzk3MjEsImV4cCI6MjA2NzI1NTcyMX0.reV4oNQN2ZZROx8-v1QxZnmgltoQHUhuF1LEOcI8ZUQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});