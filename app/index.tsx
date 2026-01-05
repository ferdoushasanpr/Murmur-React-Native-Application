import { JSX } from "react";
import { StyleSheet, View } from "react-native";
import Login from "./screens/Login";

export default function Index(): JSX.Element {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});
