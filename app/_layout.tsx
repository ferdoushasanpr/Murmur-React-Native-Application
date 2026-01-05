import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { JSX } from "react";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout(): JSX.Element {
  return (
    <ThemeProvider value={DarkTheme}>
      <StatusBar style="light" />
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="screens/UserProfile" />
          <Stack.Screen
            name="screens/(tabs)"
            options={{ gestureEnabled: false }}
          />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
