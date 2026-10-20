import { darkTheme } from "@/constants/theme";
import { StyleSheet } from "react-native";

const zIndexBase = 500;

const localStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: zIndexBase,
    opacity: 0.7,
    backgroundColor: "black",
  },
  modal: {
    zIndex: zIndexBase + 1,
    width: "80%",
    borderRadius: darkTheme.radius.lg,
    padding: darkTheme.spacing.lg,
    gap: 30,
  },
  modalFooter: {
    gap: darkTheme.spacing.xs,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default localStyles;
