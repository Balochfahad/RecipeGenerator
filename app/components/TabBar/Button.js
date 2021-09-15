const React = require("react");
const ReactNative = require("react-native");

const { TouchableOpacity, TouchableNativeFeedback, Platform } = ReactNative;

const ButtonIOS = props => (
  <TouchableOpacity {...props}>
    {props.children}
  </TouchableOpacity>
);

const ButtonAndroid = props => (
  <TouchableNativeFeedback {...props}>
    {props.children}
  </TouchableNativeFeedback>
);

module.exports = Platform.OS === "ios" ? ButtonIOS : ButtonAndroid;
