import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

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
  matchContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: Metrics.baseMargin,
    top: Metrics.baseMargin,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: Metrics.smallMargin,
    borderRadius: Metrics.borderRadius
  },
  coverContainer: {
    flex: 1,
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.baseMargin,
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
  }
});
