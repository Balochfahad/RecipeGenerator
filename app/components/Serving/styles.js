// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Metrics.baseMargin
  },
  serving: {
    flexDirection: "row",
    alignItems: "center"
  },
  button: {
    width: 45 * Metrics.ratio,
    height: 40 * Metrics.ratio,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.border,
    padding: Metrics.smallMargin,
    borderRadius: Metrics.borderRadius,
    borderWidth: Metrics.horizontalLineHeight
  },
  icon: {
    // margin: Metrics.baseMargin
    // width: Metrics.icons.tiny,
    // height: Metrics.icons.tiny
  },
  buttonText: {
    width: Metrics.doubleBaseMargin * 2
  }
});
