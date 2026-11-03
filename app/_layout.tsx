// app/_layout.tsx
import { StackHeader } from "@/components";
import { AudioModule } from "expo-audio";
import { Stack } from "expo-router";
import { LogBox } from "react-native";
import MainProvider from "../context/MainContext";

LogBox.ignoreLogs(["Text"]);

// Configura o comportamento de áudio para continuar tocando em segundo plano
async function setupAudioMode() {
  try {
    await AudioModule.setAudioModeAsync({
      shouldPlayInBackground: true, // <--- ISSO É O QUE MANTÉM A MÚSICA TOCANDO EM SEGUNDO PLANO
    });
  } catch (error) {
    console.error("Erro ao configurar o modo de áudio:", error);
  }
}

// Chame essa função assim que o app iniciar
setupAudioMode();

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
