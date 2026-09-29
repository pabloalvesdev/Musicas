// app/_layout.tsx
import { Stack } from "expo-router";
import { LogBox } from "react-native";
import MainProvider from "../context/MainContext";

LogBox.ignoreLogs(["Text"]);

export default function RootLayout() {
  return (
    <MainProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Abas principais do App */}
        <Stack.Screen name="(tabs)" />

        {/* Modal do Player */}
        <Stack.Screen
          name="player"
          options={{
            presentation: "modal", // Abre como Modal
            animation: "slide_from_bottom",
          }}
        />

        <Stack.Screen name="settings" />
      </Stack>
    </MainProvider>
  );
}
