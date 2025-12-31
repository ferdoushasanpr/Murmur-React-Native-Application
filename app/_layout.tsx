import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { JSX } from "react";

export default function RootLayout(): JSX.Element {
  return (
    <ThemeProvider value={DarkTheme}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#121212" },
          animation: "fade_from_bottom",
        }}
      >
        <Stack.Screen name="index" />

        <Stack.Screen
          name="timeline"
          options={{
            gestureEnabled: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
