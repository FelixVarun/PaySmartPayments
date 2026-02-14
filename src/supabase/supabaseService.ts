




import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xlaqqpnzjoaiyrewgznv.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsYXFxcG56am9haXlyZXdnem52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMjY0NzcsImV4cCI6MjA4NjYwMjQ3N30.24W-9Ke2DesOUZji01U_sUzhtyEtVvg-VfK2ELiaTsI';


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
