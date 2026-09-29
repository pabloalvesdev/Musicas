// app/player/_layout.tsx
import { StackHeader } from "@/components";
import { Stack } from "expo-router";

export default function PlayerLayout() {
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

      {/* Tela 2: A Fila de Músicas Empilhadas */}
      <Stack.Screen
        name="queue"
        options={{
          title: "Fila de Reprodução",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
