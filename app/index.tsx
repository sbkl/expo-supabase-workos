import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../src/context/AuthContext";

export default function Page() {
  const { session, signOut } = useAuth();
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Logged in as</Text>
        <Text style={styles.subtitle}>{session?.user.email}</Text>
      </View>
      <View>
        <Pressable onPress={signOut}>
          <Text className="text-lg">Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
