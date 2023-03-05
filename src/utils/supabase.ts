import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";
import { tokenCache } from "./cache";

export const supabase = createClient(
  Constants.expoConfig?.extra?.SUPABASE_URL,
  Constants.expoConfig?.extra?.SUPABASE_ANON_KEY,
  {
    auth: {
      storage: tokenCache,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
