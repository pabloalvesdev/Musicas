import { StyleSheet } from "react-native";
import { darkTheme } from "../constants/theme";

const globalSyles = StyleSheet.create({
    viewFullScreen: {
        flex: 1
    },
    viewCenter: {
        justifyContent: "center",
        alignItems: "center",
    },
    viewCenterFullScreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        gap: darkTheme.spacing.md
    }
});

export default globalSyles;