// @flow
import Util from "../../util";
import React, { Component } from "react";
import { View, FlatList } from "react-native";
import PropTypes from "prop-types";

import Row from "../Row";
import Text from "../Text";
import Serving from "../Serving";
import Separator from "../Separator";
import { Metrics } from "../../theme";

export default class Ingredients extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    checked: PropTypes.func.isRequired,
    serving: PropTypes.number.isRequired,
    recipe_id: PropTypes.number.isRequired,
    onFullScreen: PropTypes.func.isRequired,
    updateServing: PropTypes.func.isRequired,
    originalServing: PropTypes.number.isRequired,
    selectedIngredient: PropTypes.object.isRequired
  };

  _calculateQuantity(quantity) {
    const { serving, originalServing } = this.props;
    if (serving === originalServing) {
      return quantity;
    }

    if (originalServing === 1) {
      return quantity * serving;
    }

    return quantity / originalServing * serving;
  }

  _renderItem = ({ item, index }) => {
    const ingredientType =
      item.ingredient_type && item.ingredient_type !== ""
        ? ` (${item.ingredient_type})`
        : "";
    return (
      <Row
        index={index}
        checked={
          (this.props.selectedIngredient &&
            this.props.selectedIngredient[index]) ||
          false
        }
        onChecked={this.props.checked}
        recipe_id={this.props.recipe_id}
        text={`${Math.round(this._calculateQuantity(+item.quantity) * 1000) /
          1000} ${item.unit} ${item.ingredient_name}${ingredientType}`}
      />
    );
  };

  _renderSeparator = () => <Separator />;

  _renderHeader = () => (
    <View>
      <Text
        type={"xxLarge"}
        textAlign="left"
        color="secondary"
        style={{ margin: Metrics.baseMargin }}
      >
        Ingredients
      </Text>
      <Serving
        serving={this.props.serving}
        updateServing={this.props.updateServing}
      />
    </View>
  );

  render() {
    return (
      <FlatList
        data={this.props.data}
        initialNumToRender={1}
        renderItem={this._renderItem}
        keyExtractor={Util.keyExtractor}
        ListHeaderComponent={this._renderHeader}
        onScroll={() => this.props.onFullScreen()}
        ItemSeparatorComponent={this._renderSeparator}
      />
    );
  }
}
