import { useRouter } from "expo-router";
import { JSX } from "react";
import { StyleSheet, View } from "react-native";
import Login from "./screens/Login";

export default function Index(): JSX.Element {
  const router = useRouter();

  const handleLoginSuccess = (): void => {
    router.replace("/screens/tabs/Timeline");
  };

  return (
    <View style={styles.container}>
      <Login onLoginSuccess={handleLoginSuccess} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});
