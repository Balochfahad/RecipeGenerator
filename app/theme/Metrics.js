import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;

const baselineHeight = 680;

const ratio = screenHeight / baselineHeight;

const generatedFontSize = (size: number) => +size * ratio;

export default {
  ratio,
  screenWidth,
  screenHeight,
  generatedFontSize,
  smallMargin: 8 * ratio,
  baseMargin: 16 * ratio,
  doubleBaseMargin: 20 * ratio,
  horizontalLineHeight: 1, //StyleSheet.hairlineWidth,
  navBarHeight: Platform.OS === "ios" ? 64 : 54,
  borderRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    normal: 25,
    medium: 35,
    large: 50,
    xl: 60
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  }
};
