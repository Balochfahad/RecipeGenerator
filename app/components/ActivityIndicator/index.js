// @flow
import React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "./styles";
import { Colors } from "../../theme";

export default class MyActivityIndicator extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" animating color={Colors.secondary} />
      </View>
    );
  }
}
