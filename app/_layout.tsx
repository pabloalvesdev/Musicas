// app/_layout.tsx
import { StackHeader } from "@/components";
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

        <Stack.Screen
          options={{
            headerShown: true,
            header: (props) => (
              <StackHeader
                back={props.back}
                navigation={props.navigation}
                options={props.options}
                route={props.route}
              />
            ),
          }}
          name="settings"
        />
      </Stack>
    </MainProvider>
  );
}
