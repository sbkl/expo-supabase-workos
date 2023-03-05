import { ExpoConfig, ConfigContext } from "@expo/config";

const SUPABASE_URL = "<my-supabase-project-url>";
const SUPABASE_ANON_KEY = "<my-supabase-anon-key>";

const defineConfig = (_ctx: ConfigContext): ExpoConfig => ({
  name: "expo",
  slug: "expo",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  scheme: "myapp",
  web: {
    bundler: "metro",
  },
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#FFFFF",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "your.bundle.identifier",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#FFFFF",
    },
  },
  extra: {
    eas: {
      projectId: "your-project-id",
    },
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
  },
});

export default defineConfig;
