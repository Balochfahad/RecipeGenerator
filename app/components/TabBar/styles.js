import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tabs: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    flexDirection: "row",
    height: Metrics.ratio * 90,
    justifyContent: "space-around",
    borderColor: Colors.separator,
    borderWidth: Metrics.horizontalLineHeight
  }
});
