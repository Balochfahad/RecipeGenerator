import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  listItemHeader: {
    alignItems: "center",
    flexDirection: "row",
    margin: Metrics.smallMargin,
    marginTop: Metrics.baseMargin
  },
  cover: {
    height: Metrics.screenWidth / 1.8,
    width: Metrics.screenWidth
  },
  coverContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  listItemIcon: {
    height: Metrics.icons.small,
    width: Metrics.icons.small,
    marginRight: Metrics.smallMargin
  },
  listItemFooter: {
    flexDirection: "row",
    padding: Metrics.smallMargin,
    backgroundColor: Colors.windowTint,
    justifyContent: "space-between"
  },
  listItemAction: {
    alignItems: "center",
    justifyContent: "center"
  },
  listItemActionIcon: {
    height: Metrics.icons.normal,
    width: Metrics.icons.normal
  },
  heading: {
    ...Fonts.style.large,
    fontSize: 20
  },
  tabBarUnderline: {
    borderBottomColor: Colors.secondary
  },
  textSpacing: {
    marginBottom: Metrics.doubleBaseMargin
  }
});
