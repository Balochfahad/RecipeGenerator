// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    paddingTop: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
    justifyContent: "space-between"
  },
  slider: {
    margin: Metrics.smallMargin
  }
});
