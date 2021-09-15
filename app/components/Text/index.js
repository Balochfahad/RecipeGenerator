// @flow
import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";
import { Fonts, Colors } from "../../theme";

export default class MyText extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    style: Text.propTypes.style,
    color: PropTypes.oneOf(_.keys(Colors.text)),
    textAlign: PropTypes.oneOf(["left", "center", "right", "justify"]),
    type: PropTypes.oneOf(_.keys(Fonts.style))
  };

  static defaultProps = {
    title: "\t",
    type: "normal",
    color: "primary",
    textAlign: "center",
    style: Text.defaultProps.style,
    children: Text.defaultProps.children
  };

  render() {
    const {
      title,
      type,
      style,
      color,
      children,
      textAlign,
      ...rest
    } = this.props;

    const textStyle = StyleSheet.flatten([
      Fonts.style[type],
      {
        textAlign,
        color: Colors.text[color],
        backgroundColor: Colors.transparent
      },
      style
    ]);
    return (
      <Text style={textStyle} {...rest}>
        {children || title}
      </Text>
    );
  }
}
