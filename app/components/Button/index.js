// @flow
import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";

import Text from "../Text";
import styles from "./styles";

export default class Button extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string
  };

  static defaultProps = {
    title: "Done",
    color: "tertiary"
  };

  render() {
    const { title, onPress, color } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text color={color}>{title}</Text>
      </TouchableOpacity>
    );
  }
}
