// @flow
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import {
  View,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import DeviceInfo from "react-native-device-info";

import styles from "./styles";
import Ingredient from "./Ingredient";
import { Images, Metrics } from "../../theme";
import { Text, ButtonHeader, Filter } from "../../components";
import { ingredientUnselected } from "../../actions/IngredientActions";
import { request as requestPreferences } from "../../actions/PreferencesActions";
import {
  setPreferences,
  unsetPreferences
} from "../../actions/PreferencesActions";

class Ingredients extends Component {
  static propTypes = {
    unsetPreferences: PropTypes.func.isRequired,
    setPreferences: PropTypes.func.isRequired,
    preferences: PropTypes.object.isRequired,
    requestPreferences: PropTypes.func.isRequired,
    ingredient: PropTypes.object.isRequired,
    ingredientUnselected: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = () => ({
    header: null,
    title: "Ingredient"
  });

  componentDidMount() {
    this.props.requestPreferences();
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps, this.props);
  }

  _gotoRecipeList = () => {
    this.props.navigation.dispatch({
      type: "Navigation/NAVIGATE",
      routeName: "RecipeListScreen"
    });
  };

  _renderIngredient = ingredients => {
    if (_.isEmpty(ingredients)) {
      return (
        <View style={styles.ingredientContainer}>
          <Text textAlign="left">
            Add ingredients of your choice by search to find related recipes
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.ingredientContainer}>
        <Text textAlign="left">Ingredients (10 Max)</Text>
        <ScrollView>
          <View style={styles.ingredients}>
            {ingredients.map((ingredient, index) => (
              <Ingredient
                ingredient={ingredient}
                key={ingredient.ingredient_id}
                onPress={() => this.props.ingredientUnselected(index)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  render() {
    const { selectedIngredient } = this.props.ingredient;
    const ingredients = _.cloneDeep(selectedIngredient);

    return (
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          source={Images.ingredients}
          style={styles.cover}
        />
        <TouchableWithoutFeedback
          onPress={() =>
            this.props.navigation.dispatch({
              type: "Navigation/NAVIGATE",
              routeName: "SearchScreen"
            })
          }
        >
          <View style={styles.search}>
            <Text textAlign="left" style={{ flex: 1 }}>
              Search ingredient
            </Text>
            <Image style={styles.icon} source={Images.search} />
          </View>
        </TouchableWithoutFeedback>

        {this._renderIngredient(ingredients)}

        {!_.isEmpty(ingredients) && (
          <TouchableOpacity
            style={styles.fabButton}
            onPress={this._gotoRecipeList}
          >
            <Image source={Images.forward} />
          </TouchableOpacity>
        )}

        <View style={styles.header}>
          <View style={{ position: "absolute", left: Metrics.baseMargin }}>
            <ButtonHeader
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
              source={Images.menu}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: Metrics.ratio * 40
            }}
          >
            <Image
              source={
                Platform.OS === "ios" && DeviceInfo.isTablet()
                  ? Images.iPadRecipeGenerator
                  : Images.recipeGenerator
              }
            />
            <Text type="medium" style={styles.title}>
              {" "}
              Recipe Generator
            </Text>
          </View>
          <View style={{ position: "absolute", right: 0 }}>
            <ButtonHeader
              onPress={() => this.filter.open(this.props.preferences)}
              source={Images.filter}
            />
          </View>
        </View>
        <Filter
          ref={ref => {
            this.filter = ref;
          }}
          preferences={this.props.preferences}
          setPreferences={this.props.setPreferences}
          unsetPreferences={this.props.unsetPreferences}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ ingredient, preferences }) => ({
  ingredient,
  preferences
});

const actions = {
  setPreferences,
  unsetPreferences,
  requestPreferences,
  ingredientUnselected
};

export default connect(mapStateToProps, actions)(Ingredients);
