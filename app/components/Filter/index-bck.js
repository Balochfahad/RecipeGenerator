// @flow
import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import Button from "../Button";
import Text from "../Text";
import Slider from "../Slider";
import styles from "./styles";
import { Images } from "../../theme";
import Sound from "react-native-sound";

Sound.setCategory("Playback");

const sounds = [
  {
    audio: new Sound("setting.mp3", Sound.MAIN_BUNDLE)
  }
];

const minCalories = 10;
const maxCalories = 5000;

export default class Filter extends React.Component {
  static propTypes = {
    preferences: PropTypes.object.isRequired,
    setPreferences: PropTypes.func.isRequired
  };

  state = {
    mealType: this.props.preferences.preferences.mealType,
    allergens: this.props.preferences.preferences.allergens,
    visible: false
  };

  _renderHeader(title, accessory = "") {
    return (
      <View style={styles.header}>
        <Text textAlign="left">{title}</Text>
        <Text textAlign="right">{accessory}</Text>
      </View>
    );
  }

  _render() {
    const { ingredient, onPress } = this.props;
    return (
      <TouchableOpacity
        style={styles.ingredient}
        key={ingredient.ingredient_id}
        onPress={onPress}
      >
        <Text color="tertiary" type="xSmall">
          {`${ingredient.ingredient_name}  `}
        </Text>
        <Image style={styles.smallIcon} source={Images.cross} />
      </TouchableOpacity>
    );
  }

  playSound() {
    sounds[0].audio.play();
  }

  _closeFilter = () => {
    this.setState({
      visible: false
    });
  };

  open = () => {
    this.setState({
      visible: true,
      mealType: this.props.preferences.preferences.mealType,
      allergens: this.props.preferences.preferences.allergens
    });
  };

  _onDone = () => {
    this.props.setPreferences({
      calories: this.slider.getValue(),
      mealType: this.state.mealType,
      allergens: this.state.allergens
    });
    this._closeFilter();
  };

  _renderContent() {
    if (
      _.isEmpty(this.props.preferences.data) &&
      this.props.preferences.isFetching
    ) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }

    let preferences = [];
    let mealTypes = [];
    const { mealType, allergens } = this.state;

    if (
      this.props.preferences.data.allergens &&
      this.props.preferences.data.allergens.length > 0
    ) {
      preferences = this.props.preferences.data.allergens;
    }

    if (
      this.props.preferences.data.meal_types &&
      this.props.preferences.data.meal_types.length > 0
    ) {
      mealTypes = this.props.preferences.data.meal_types;
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Slider
            value={this.props.preferences.preferences.calories}
            minimumValue={minCalories}
            maximumValue={maxCalories}
            minimumTrackTintColor={"#000000"}
            ref={ref => {
              this.slider = ref;
            }}
          />

          {mealTypes.length > 0 && this._renderHeader("Meal type")}
          {mealTypes.length > 0 /* flow-disable */ && (
            <View style={styles.chips}>
              {mealTypes.map(meal => (
                <TouchableOpacity
                  key={meal.id}
                  style={
                    mealType[meal.id]
                      ? styles.chipSelected
                      : styles.chipUnselected
                  } /* flow-enable */
                  onPress={() => {
                    this.playSound();
                    const mealTypeTemp = { ...this.state.mealType };
                    if (mealTypeTemp[meal.id]) {
                      delete mealTypeTemp[meal.id];
                    } else {
                      mealTypeTemp[meal.id] = meal.id;
                    }

                    this.setState({
                      mealType: mealTypeTemp
                    });
                  }}
                >
                  <Text color={mealType[meal.id] ? "tertiary" : "secondary"}>
                    {meal.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {preferences.length > 0 && this._renderHeader("Allergen based")}
          {preferences.length > 0 /* flow-disable */ && (
            <View style={styles.chips}>
              {preferences.map(preference => (
                <TouchableOpacity
                  key={preference.id}
                  style={
                    allergens[preference.id]
                      ? styles.chipSelected
                      : styles.chipUnselected
                  } /* flow-enable */
                  onPress={() => {
                    this.playSound();
                    const allergensTemp = { ...this.state.allergens };
                    if (allergensTemp[preference.id]) {
                      delete allergensTemp[preference.id];
                    } else {
                      allergensTemp[preference.id] = preference.id;
                    }

                    this.setState({
                      allergens: allergensTemp
                    });
                  }}
                >
                  <Text
                    color={allergens[preference.id] ? "tertiary" : "secondary"}
                  >
                    {preference.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
        <Button onPress={this._onDone} />
      </View>
    );
  }

  _clear = () => {
    this.slider.clear(2500);
    this.setState({
      calories: 2500,
      mealType: {},
      allergens: {}
    });
  };

  render() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.visible}
        onRequestClose={this._closeFilter}
      >
        <View style={styles.container}>
          <View style={styles.navBar}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={this._closeFilter}
            >
              <Image source={Images.closeFilter} />
            </TouchableOpacity>
            <Text style={styles.title}>Filter</Text>
            <TouchableOpacity style={styles.clearAll} onPress={this._clear}>
              <Text>Clear All</Text>
            </TouchableOpacity>
          </View>

          {this._renderContent()}
        </View>
      </Modal>
    );
  }
}
