import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function setItem(key: string, value: string) {
  // console.log("Save token", key, value);
  await SecureStore.setItemAsync(key, value);
}

export async function getItem(key: string) {
  const value = await SecureStore.getItemAsync(key);
  return value;
}

export async function removeItem(key: string) {
  const value = await SecureStore.deleteItemAsync(key);
  return value;
}

// SecureStore is not supported on the web
// https://github.com/expo/expo/issues/7744#issuecomment-611093485
export const tokenCache =
  Platform.OS !== "web"
    ? {
        getItem,
        setItem,
        removeItem,
      }
    : undefined;
