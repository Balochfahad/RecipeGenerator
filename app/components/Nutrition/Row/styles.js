import { StyleSheet } from "react-native";
import { Metrics } from "../../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: Metrics.baseMargin,
    width: Metrics.screenWidth
  },
  title: {
    flex: 1,
    textAlign: "left"
  }
});
