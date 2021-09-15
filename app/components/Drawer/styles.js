// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.baseMargin,
    backgroundColor: Colors.navbar.background
  },
  row: {
    flexDirection : 'row',
    alignItems: 'center',

    padding: Metrics.doubleBaseMargin
  },
  icon: {
    marginRight: Metrics.doubleBaseMargin
  },
  highlightedRow: {
    backgroundColor: '#FCFCFC'
  }
});
