// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Image, TouchableOpacity } from "react-native";
import { Images } from "../../theme";

import Text from "../Text";
import styles from "./styles";

export default class Serving extends React.PureComponent {
  static propTypes = {
    serving: PropTypes.number.isRequired,
    updateServing: PropTypes.func.isRequired
  };

  render() {
    const { serving, updateServing } = this.props;

    return (
      <View style={styles.container}>
        <Text>Serving Size</Text>
        <View style={styles.serving}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => updateServing(-1)}
          >
            <Image source={Images.minus} style={styles.icon} />
          </TouchableOpacity>

          <Text style={styles.buttonText}>{serving}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => updateServing(1)}
          >
            <Image source={Images.plus} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
