import React from "react";
import { Pressable, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const { signInWithWorkOS } = useAuth();

  return (
    <>
      <View className="h-screen justify-center space-y-4">
        <View>
          <Pressable
            className="bg-rose-600 py-4 px-3 shadow"
            onPress={signInWithWorkOS}
          >
            <Text className="text-center text-white">Sign in with SSO</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
