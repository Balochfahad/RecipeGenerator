// @flow
import { Platform, StyleSheet } from "react-native";
import { Colors, Metrics, Fonts } from "../../theme";

const size = Metrics.ratio * 45;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  cover: {
    height: Metrics.screenWidth,
    width: Metrics.screenWidth
  },
  search: {
    margin: Metrics.baseMargin,
    padding: Metrics.baseMargin,
    flexDirection: "row",
    backgroundColor: Colors.background.quaternary
  },
  icon: {
    width: size / 2,
    height: size / 2,
    resizeMode: "contain",
    tintColor: Colors.navbar.text
  },
  smallIcon: {
    width: size / 4,
    height: size / 4,
    resizeMode: "contain",
    tintColor: Colors.text.tertiary
  },
  ingredientContainer: {
    flex: 1,
    marginTop: 0,
    margin: Metrics.baseMargin
  },
  ingredient: {
    marginLeft: 0,
    marginBottom: 0,
    flexDirection: "row",
    alignItems: "center",
    height: Metrics.ratio * 35,
    margin: Metrics.smallMargin,
    padding: Metrics.smallMargin,
    borderRadius: Metrics.borderRadius,
    backgroundColor: Colors.background.tertiary
  },
  ingredients: {
    flexWrap: "wrap",
    flexDirection: "row"
  },
  fabButton: {
    position: "absolute",
    bottom: Metrics.smallMargin,
    right: Metrics.smallMargin
  },
  header: {
    alignItems: "center",
    position: "absolute",
    flexDirection: "row",
    width: Metrics.screenWidth,
    paddingHorizontal: Metrics.baseMargin,
    marginTop: Metrics.doubleBaseMargin
  },
  title: {
    color: "#7D851B",
    fontFamily: "bernadette",
    paddingVertical: Metrics.smallMargin
  }
});
