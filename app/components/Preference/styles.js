// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    marginLeft: Metrics.baseMargin,
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    width: Metrics.icons.medium,
    height: Metrics.icons.medium
  },
  content: {
    flex: 1,
    padding: Metrics.smallMargin,
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: Colors.separator,
    marginLeft: Metrics.baseMargin
  },
  detail: {
    flex: 1
  },
  arrow: {
    height: Metrics.icons.tiny
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.windowTint
  },
  modalBody: {
    flex: 1,
    marginTop: Metrics.screenHeight,
    backgroundColor: Colors.black
  },
  modalContent: {
    alignItems: "center",
    flexDirection: "row",
    margin: Metrics.baseMargin,
    paddingVertical: Metrics.smallMargin
  },
  modalIcon: {
    marginRight: Metrics.baseMargin,
    width: Metrics.icons.medium,
    height: Metrics.icons.medium
  },
  modalItem: {
    flex: 1,
    padding: Metrics.baseMargin,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  tick: {
    width: Metrics.icons.tiny,
    height: Metrics.icons.tiny
  },
  footer: {
    backgroundColor: Colors.transparent,
    margin: Metrics.baseMargin
  }
});
