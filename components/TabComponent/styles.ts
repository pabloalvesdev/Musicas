import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

const stepCount = 3;
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  stepContainer: {
    // height: "100%",
    flexDirection: "row",
    width: width * stepCount,
    // flex: 1
  },
  stepText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
});

export default localStyles;
