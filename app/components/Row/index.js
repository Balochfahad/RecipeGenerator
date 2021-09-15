// @flow
import _ from "lodash";
import React, { Component } from "react";
import { Image, Animated, Easing, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import Text from "../Text";
import { Images, Metrics, Colors } from "../../theme";

export default class Row extends Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onChecked: PropTypes.func.isRequired,
    recipe_id: PropTypes.number.isRequired
  };

  state = {
    showTick: this.props.checked
  };

  componentWillReceiveProps(nextProps: Object) {
    if (!_.isEqual(nextProps.checked, this.props.checked)) {
      this.animate(nextProps.checked ? 0 : 1, nextProps.checked ? 1 : 0);
    }
  }

  animatedValue = new Animated.Value(this.props.checked ? 1 : 0);

  animate(fromValue: number, toValue: number) {
    this.animatedValue.setValue(fromValue);
    Animated.timing(this.animatedValue, {
      toValue,
      duration: 300,
      easing: Easing.quad
    }).start(() => {
      this.setState({
        showTick: !this.state.showTick
      });
    });
  }

  render() {
    const { text, checked, onChecked, index, recipe_id } = this.props;

    const color = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.background.primary, Colors.background.quaternary]
    });

    return (
      <Animated.View
        style={{
          backgroundColor: color,
          paddingHorizontal: Metrics.baseMargin
        }}
      >
        <TouchableOpacity
          style={styles.row}
          onPress={() => onChecked(recipe_id, index)}
        >
          <Text textAlign="justify" style={styles.text}>
            {text}
          </Text>
          <View
            style={{
              width: Metrics.ratio * 20,
              alignItems: "flex-end"
            }}
          >
            {checked && (
              <Image
                source={Images.tick}
                style={{ marginTop: 5 * Metrics.ratio }}
              />
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
