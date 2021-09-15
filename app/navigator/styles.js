import { StyleSheet } from "react-native";
import { Fonts, Colors } from "../theme";

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.navbar.background
  },
  title: {
    ...Fonts.style.medium,
    fontWeight: "normal",
    color: Colors.navbar.text
  }
});
