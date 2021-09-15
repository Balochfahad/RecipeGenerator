// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Slider as SliderRN } from "react-native";

import Text from "../Text";
import styles from "./styles";

export default class Slider extends React.PureComponent {
  static propTypes = {
    value: PropTypes.number.isRequired
  };

  state = {
    value: this.props.value
  };

  getValue = () => this.state.value;

  clear = value => {
    this.setState({
      value
    });
  };

  _renderHeader(title, accessory) {
    return (
      <View style={styles.header}>
        <Text textAlign="left">{title}</Text>
        <Text textAlign="right">{accessory}</Text>
      </View>
    );
  }

  render() {
    const { value } = this.state;
    const { ...rest } = this.props;
    return (
      <View style={styles.container}>
        {this._renderHeader("Calories", Math.ceil(value))}
        <SliderRN
          {...rest}
          value={value}
          style={styles.slider}
          onValueChange={newValue =>
            this.setState({
              value: newValue
            })
          }
        />
      </View>
    );
  }
}
