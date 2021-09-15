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
    audio: new Sound("setting.wav", Sound.MAIN_BUNDLE)
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
    //mealType: this.props.preferences.preferences.mealType,
    // mealType: this.props.preferences.preferences.mealType,
    dishType: this.props.preferences.preferences.dishType,
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
      //mealType: this.props.preferences.preferences.mealType,
      dishType: this.props.preferences.preferences.dishType,
      allergens: this.props.preferences.preferences.allergens
    });
  };

  _onDone = () => {
    // return;
    this.props.setPreferences({
      dishType: this.state.dishType,
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
    let dishTypes = [];
    const { dishType, allergens } = this.state;

    if (
      this.props.preferences.data.allergens &&
      this.props.preferences.data.allergens.length > 0
    ) {
      preferences = this.props.preferences.data.allergens;
    }

    if (
      // this.props.preferences.data.meal_types &&
      // this.props.preferences.data.meal_types.length > 0
      this.props.preferences.data.dish_type &&
      this.props.preferences.data.dish_type.length > 0
    ) {
      // mealTypes = this.props.preferences.data.meal_types;
      dishTypes = this.props.preferences.data.dish_type;
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {dishTypes.length > 0 && this._renderHeader("Dish Type")}
          {dishTypes.length > 0 /* flow-disable */ && (
            <View style={styles.chips}>
              {dishTypes.map(meal => (
                <TouchableOpacity
                  key={meal.id}
                  style={
                    dishType[meal.id]
                      ? styles.chipSelected
                      : styles.chipUnselected
                  } /* flow-enable */
                  onPress={() => {
                    this.playSound();
                    const mealTypeTemp = { ...this.state.dishType };
                    if (mealTypeTemp[meal.id]) {
                      delete mealTypeTemp[meal.id];
                    } else {
                      mealTypeTemp[meal.id] = meal.id;
                    }

                    this.setState({
                      dishType: mealTypeTemp
                    });
                  }}
                >
                  <Text color={dishType[meal.id] ? "tertiary" : "secondary"}>
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
    // this.slider.clear(2500);
    this.setState({
      calories: 2500,
      dishType: {},
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
