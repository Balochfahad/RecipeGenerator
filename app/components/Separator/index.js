// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./styles";

export default class Separator extends Component {
  static propTypes = {
    style: PropTypes.object
  };

  static defaultProps = {
    style: {}
  };

  render() {
    return <View style={[styles.container, this.props.style]} />;
  }
}
