// @flow
import Util from "../../util";
import React, { Component } from "react";
import { FlatList, View } from "react-native";
import PropTypes from "prop-types";

import Row from "./Row";
import { Text } from "../";
import Serving from "../Serving";
import { Metrics } from "../../theme";

export default class Nutrition extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    serving: PropTypes.number.isRequired,
    onFullScreen: PropTypes.func.isRequired,
    updateServing: PropTypes.func.isRequired,
    originalServing: PropTypes.number.isRequired
  };

  _calculateNutrition(nutrition) {
    const { serving, originalServing } = this.props;
    if (serving === originalServing) {
      return nutrition;
    }

    if (originalServing === 1) {
      return nutrition * serving;
    }

    return nutrition / originalServing * serving;
  }

  _renderHeader = () => (
    <View>
      <Text
        type={"xxLarge"}
        textAlign="left"
        color="secondary"
        style={{ margin: Metrics.baseMargin }}
      >
        Nutrition
      </Text>
      <Serving
        serving={this.props.serving}
        updateServing={this.props.updateServing}
      />
      <Text
        style={{
          marginVertical: Metrics.smallMargin,
          paddingHorizontal: Metrics.baseMargin
        }}
        textAlign="left"
      >
        Per Serving*
      </Text>
    </View>
  );

  _renderItem = ({ item, index }) => (
    <Row
      title={item.nutrition_name}
      secondary={index % 2 !== 0}
      description={`${Math.round(
        this._calculateNutrition(+item.nutrition_value) * 1000
      ) / 1000}  ${item.nutrition_unit}`}
    />
  );

  _renderFooter = () => (
    <Text style={{ marginTop: Metrics.baseMargin }}>
      *Nutrition has been calculated to the best of our knowledge. We are in no
      way certifying or given warranty the information above. In case of errors
      please contact us at info@richthomasllc.com.
    </Text>
  );

  render() {
    return (
      <FlatList
        initialNumToRender={1}
        renderItem={this._renderItem}
        keyExtractor={Util.keyExtractor}
        data={this.props.data}
        ListHeaderComponent={this._renderHeader}
        ListFooterComponent={this._renderFooter}
        onScroll={() => this.props.onFullScreen()}
      />
    );
  }
}
