// @flow
import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, Image, TouchableWithoutFeedback } from "react-native";
import Text from "../../components/Text";
import { Images, Metrics } from "../../theme";

import styles from "./styles";

export default class RecipeListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  _gotoRecipeDetail = () => {
    this.props.navigation.dispatch({
      type: "Navigation/NAVIGATE",
      routeName: "RecipeDetailScreen",
      params: { item: this.props.item }
    });
  };

  _renderAction = (source, title) => (
    <View style={styles.listItemAction}>
      <Image
        resizeMode="contain"
        source={source}
        style={styles.listItemActionIcon}
      />
      <Text color="tertiary" type="xSmall">
        {title}
      </Text>
    </View>
  );

  render() {
    const { recipe_image, recipe_name, match_ingredient } = this.props.item;
    const sourceImage = recipe_image ? { uri: recipe_image } : Images.cover;

    return (
      <TouchableWithoutFeedback onPress={this._gotoRecipeDetail}>
        <View style={styles.container}>
          <Image resizeMode="cover" source={sourceImage} style={styles.cover}>
            <Image
              source={Images.shade}
              resizeMode="stretch"
              style={styles.cover}
            >
              {false && //TODO: Delete this code.
                match_ingredient && (
                  <View style={styles.matchContainer}>
                    <Text
                      type={"small"}
                      numberOfLines={1}
                      textAlign="left"
                      color="red"
                    >
                      Match
                    </Text>
                    <Text color="red" type="smallBold">
                      {Math.round(+match_ingredient)}%
                    </Text>
                  </View>
                )}
              <View style={styles.coverContainer}>
                <Text
                  type={"medium"}
                  numberOfLines={2}
                  textAlign="left"
                  color="tertiary"
                  style={{
                    marginBottom: Metrics.ratio * 4
                  }}
                >
                  {recipe_name}
                </Text>
              </View>
            </Image>
          </Image>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

/*
<View style={styles.listItemHeader}>
  <Image
    resizeMode="cover"
    source={Images.recipes_list[image]}
    style={styles.listItemIcon}
  />
  <Text textAlign="left">{dish_type}</Text>
</View>
*/
