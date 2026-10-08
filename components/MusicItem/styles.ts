import { ITheme } from "@/interfaces";
import { StyleSheet } from "react-native";

const getStyles = (baseTheme: ITheme) => {
  return StyleSheet.create({
    card: {
      justifyContent: "space-between",
      flexDirection: "row",
      padding: 10,
    },
    coverPlaceholder: {
      width: 42,
      height: 42,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
  });
};

export default getStyles;
