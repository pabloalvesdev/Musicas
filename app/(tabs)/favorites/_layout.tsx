// app/library/_layout.tsx
import { StackHeader, TabHeader } from "@/components";
import { Stack } from "expo-router";

export default function FavoritesLayout() {
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
      <Stack.Screen
        name="index"
        options={{
          title: "Favoritos",
          header: (props) => (
            <TabHeader
              navigation={props.navigation}
              options={props.options}
              route={props.route}
            />
          ),
        }}
      />

      {/* Tela 2: A Fila de Músicas Empilhadas */}
      <Stack.Screen
        name="playlist"
        options={{
          title: "Detalhes",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
