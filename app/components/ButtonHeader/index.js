// @flow
import React from "react";
import PropTypes from "prop-types";
import { Image, TouchableOpacity } from "react-native";
import { Text } from "../";
import styles from "./styles";

export default class ButtonHeader extends React.Component {
  static propTypes = {
    alignItems: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  };
  static defaultProps = {
    alignItems: "flex-start"
  };

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, { alignItems: this.props.alignItems }]}
        onPress={this.props.onPress}
      >
        {typeof this.props.source === "string"
          ? <Text color="secondary">{this.props.source}</Text>
          : <Image style={styles.icon} source={this.props.source} />}
      </TouchableOpacity>
    );
  }
}
