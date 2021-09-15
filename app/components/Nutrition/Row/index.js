import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Text from "../../Text";
import styles from "./styles";
import { Colors } from "../../../theme";

export default class Row extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    secondary: PropTypes.bool
  };

  static defaultProps = {
    secondary: false
  };

  render() {
    const { title, description, secondary } = this.props;
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: secondary
              ? Colors.background.primary
              : Colors.background.quaternary
          }
        ]}
      >
        <Text style={styles.title}>{title}</Text>
        <Text>{description}</Text>
      </View>
    );
  }
}
