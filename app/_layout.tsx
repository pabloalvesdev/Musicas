import { Slot } from "expo-router";
import { LogBox } from "react-native";
import MainProvider from "../context/MainContext";

LogBox.ignoreLogs(["Text"]);

export default function RootLayout() {
  return (
    <MainProvider>
      <Slot />
    </MainProvider>
  );
}
