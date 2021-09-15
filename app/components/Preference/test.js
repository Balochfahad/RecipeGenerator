// @flow
import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, Image } from "react-native";
import * as Animatable from "react-native-animatable";

import Text from "../Text";
import { Images, Colors } from "../../theme";
import styles from "./styles";

export default class PreferenceModal extends Component {
  render() {
    return (
      <View style={styles.modalContainer}>
        <Animatable.View
          ref={modal => {
            this.modal = modal;
          }}
          style={styles.modalBody}
        >
          <View style={styles.modalContent}>
            <Image
              resizeMode="contain"
              source={Images.preferences.allergens}
              style={styles.icon}
            />
            <Text
              numberOfLines={1}
              textAlign="left"
              color="tertiary"
              type="xLarge"
            >
              Allergens
            </Text>
          </View>
        </Animatable.View>
      </View>
    );
  }
}
