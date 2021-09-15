// @flow
// eslint-disable-next-line
import Util from "../../util";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  View,
  Image,
  Modal,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import * as Animatable from "react-native-animatable";

import { Text, Button, Separator } from "../";
import { Images, Metrics } from "../../theme";
import styles from "./styles";

export default class PreferenceModal extends Component {
  static propTypes = {
    preferences: PropTypes.object.isRequired,
    onPreferencesItem: PropTypes.func.isRequired
  };

  state = {
    item: { key: "", name: "" },
    modalVisible: false
  };

  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    return (
      !_.isEqual(nextState, this.state) || !_.isEqual(nextProps, this.props)
    );
  }

  _setModalVisible(visible: boolean = true, callback) {
    this.setState(
      {
        modalVisible: visible
      },
      () => {
        if (callback) {
          callback();
        }
      }
    );
  }

  show = (item: Object) => {
    this.setState(
      {
        item
      },
      () => this._toggleModal()
    );
  };

  _toggleModal = (show: boolean = true) => {
    if (!this.modalInAnim) {
      let marginTop = Metrics.screenHeight;

      if (show) {
        this._setModalVisible(true, () => {
          marginTop -= Metrics.screenHeight / 1.3;
          this.modal.transitionTo({ marginTop }, 500, "ease");
        });
      } else {
        this.modal.transitionTo({ marginTop }, 500, "ease");
      }

      setTimeout(() => {
        if (!show) {
          this._setModalVisible(false);
        }
        this.modalInAnim = false;
      }, 500);
    }
  };

  _onItemPress = ({ id: key, title: value }, isItemSelected) => {
    const { key: property } = this.state.item;
    this.props.onPreferencesItem(property, key, value, isItemSelected);
  };

  _renderItem = ({ item }) => {
    const isItemSelected = this._isItemSelected(item);
    return (
      <TouchableWithoutFeedback
        onPress={() => this._onItemPress(item, isItemSelected)}
      >
        <View style={styles.modalItem}>
          <Text color="tertiary" textAlign="left">{item.title}</Text>
          {isItemSelected &&
            <Image
              resizeMode="contain"
              source={Images.tick}
              style={styles.tick}
            />}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  _isItemSelected = ({ id }) => {
    const { key } = this.state.item;
    const { selectedPreferences } = this.props.preferences;
    return selectedPreferences[key] && selectedPreferences[key][id];
  };

  render() {
    const { key, name } = this.state.item;
    const data = this.props.preferences.data[key];
    return (
      <Modal
        animation="fade"
        transparent
        visible={this.state.modalVisible}
        onRequestClose={() => this._toggleModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => this._toggleModal(false)}>
          <View style={styles.modalContainer}>
            <Animatable.View
              ref={modal => {
                this.modal = modal;
              }}
              style={styles.modalBody}
            >
              <TouchableWithoutFeedback>
                <View style={{ flex: 1 }}>
                  <View style={styles.modalContent}>
                    <Image
                      resizeMode="contain"
                      source={Images.preferences[key]}
                      style={styles.modalIcon}
                    />
                    <Text
                      numberOfLines={1}
                      textAlign="left"
                      color="tertiary"
                      type="xLarge"
                    >
                      {name}
                    </Text>
                  </View>
                  <FlatList
                    data={data}
                    initialNumToRender={1}
                    renderItem={this._renderItem}
                    keyExtractor={Util.keyExtractor}
                    ItemSeparatorComponent={() => (
                      <Separator
                        style={{ marginHorizontal: Metrics.baseMargin }}
                      />
                    )}
                  />
                  <View style={styles.footer}>
                    <Button onPress={() => this._toggleModal(false)} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Animatable.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
