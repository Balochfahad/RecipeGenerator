// @flow
import { StyleSheet } from "react-native";
import { Metrics } from "../../theme";

const size = Metrics.ratio * 45;
const width = Metrics.ratio * 70;
export default StyleSheet.create({
  container: {
    width: size,
    height: size,
    justifyContent: "center"
  },
  icon: {
    width: size / 2,
    height: size / 2,
    resizeMode: "contain"
  }
});
