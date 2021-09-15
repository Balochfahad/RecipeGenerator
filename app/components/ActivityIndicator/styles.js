// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

const size = Metrics.ratio * 30;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    width: size,
    height: size,
    resizeMode: "contain",
    tintColor: Colors.navbar.text
  }
});
