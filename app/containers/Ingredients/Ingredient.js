// @flow
import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Image } from "react-native";

import { Text } from "../../components";
import { Images } from "../../theme";
import styles from "./styles";

export default class Ingredient extends React.Component {
  static propTypes = {
    ingredient: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired
  };

  render() {
    const { ingredient, onPress } = this.props;
    return (
      <TouchableOpacity
        style={styles.ingredient}
        key={ingredient.ingredient_id}
        onPress={onPress}
      >
        <Text color="tertiary" type="normal">
          {`${ingredient.ingredient_name}  `}
        </Text>
        <Image style={styles.smallIcon} source={Images.cross} />
      </TouchableOpacity>
    );
  }
}
