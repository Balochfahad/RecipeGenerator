// @flow
import _ from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";

import Text from "../Text";
import { Images } from "../../theme";
import styles from "./styles";

export default class Preference extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onItemPress: PropTypes.func.isRequired
  };

  _getSelectedPreferences = () => {
    const selectedPreferences = _.cloneDeep(this.props.selectedPreferences);
    const array = [];
    for (const key in selectedPreferences) {
      array.push(selectedPreferences[key]);
    }
    return !_.isEmpty(array) ? array.join(", ") : "None";
  };

  render() {
    const { item, onItemPress } = this.props;
    const { key, name } = item;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => onItemPress(item)}
      >
        <Image
          resizeMode="contain"
          source={Images.preferences[key]}
          style={styles.icon}
        />
        <View
          style={[
            styles.content,
            { borderBottomWidth: key === "diet_nutritions" ? 0 : 1 }
          ]}
        >
          <View style={styles.detail}>
            <Text
              numberOfLines={1}
              textAlign="left"
              color="secondary"
              type="xLarge"
            >
              {name}
            </Text>
            <Text numberOfLines={1} textAlign="left">
              {this._getSelectedPreferences()}
            </Text>
          </View>
          <Image
            resizeMode="contain"
            style={styles.arrow}
            source={Images.arrowForward}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
