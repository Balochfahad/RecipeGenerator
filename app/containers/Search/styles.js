// @flow
import { Platform, StyleSheet } from "react-native";
import { Colors, Metrics, Fonts } from "../../theme";

const size = Metrics.ratio * 40;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  header: {
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    height: Metrics.navBarHeight,
    justifyContent: "space-between",
    borderBottomColor: Colors.border,
    paddingTop: Platform.OS === "android" ? 0 : Metrics.baseMargin
  },
  search: {
    flex: 1,
    ...Fonts.style.normal
  },
  ingredients: {
    marginBottom: size + Metrics.smallMargin
  },
  chips: {
    bottom: 0,
    position: "absolute",
    marginHorizontal: Metrics.smallMargin,
    height: size + Metrics.smallMargin
  },
  row: {
    flexDirection: "row",
    padding: Metrics.baseMargin
  }
});
