// app/player/_layout.tsx
import { StackHeader } from "@/components";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => (
          <StackHeader
            back={props.back}
            navigation={props.navigation}
            options={props.options}
            route={props.route}
          />
        ),
      }}
    >
      {/* Tela 1: O Player com Capa, Controles, etc. */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
