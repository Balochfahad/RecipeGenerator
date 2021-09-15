// @flow
import { StyleSheet, Platform } from "react-native";
import { Metrics, Colors, Fonts } from "../../theme";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : 0;

export default StyleSheet.create({
  container: {
    flex: 1
  },
  navBar: {
    paddingTop: STATUSBAR_HEIGHT,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,

    alignItems: "center",
    justifyContent: "center",
    width: Metrics.screenWidth,
    height: Metrics.navBarHeight,
    backgroundColor: Colors.navbar.background
  },
  title: {
    ...Fonts.style.medium,
    fontWeight: "normal",
    color: Colors.navbar.text
  },
  closeBtn: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: Metrics.smallMargin,
    paddingTop: STATUSBAR_HEIGHT
  },
  clearAll: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: Metrics.smallMargin,
    paddingTop: STATUSBAR_HEIGHT
  },
  header: {
    flexDirection: "row",
    paddingTop: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
    justifyContent: "space-between"
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: Metrics.smallMargin
  },
  chipSelected: {
    borderColor: "black",
    backgroundColor: "black",
    margin: Metrics.smallMargin,
    padding: Metrics.smallMargin,
    borderRadius: Metrics.borderRadius,
    borderWidth: Metrics.horizontalLineHeight
  },
  chipUnselected: {
    borderColor: "black",
    margin: Metrics.smallMargin,
    padding: Metrics.smallMargin,
    backgroundColor: "transparent",
    borderRadius: Metrics.borderRadius,
    borderWidth: Metrics.horizontalLineHeight
  }
});
