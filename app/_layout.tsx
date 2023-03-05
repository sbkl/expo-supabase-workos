import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../src/context/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Slot />
        <StatusBar />
      </SafeAreaProvider>
    </AuthProvider>
  );
}
