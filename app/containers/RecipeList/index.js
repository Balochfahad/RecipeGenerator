// @flow
// eslint-disable-next-line
import _ from "lodash";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { ActivityIndicator, Error } from "../../components";
import RecipeListItem from "./RecipeListItem";

import { NO_RECIPE_FOUND } from "../../constants";
import Util from "../../util";
import { Metrics } from "../../theme";
import { request, success } from "../../actions/RecipesActions";
import styles from "./styles";
import Sound from "react-native-sound";

Sound.setCategory("Playback");

const sounds = [
  {
    audio: new Sound("search.wav", Sound.MAIN_BUNDLE)
  }
];

class RecipeList extends Component {
  static propTypes = {
    ingredient: PropTypes.object.isRequired,
    recipes: PropTypes.object.isRequired,
    request: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = {
    title: "Recipes"
  };

  componentWillUnmount() {
    this.props.success([], true, false);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.networkInfo.isNetworkConnected &&
      !this.props.networkInfo.isNetworkConnected &&
      this.props.recipes.failure
    ) {
      this.fetchData();
    }
  }

  componentDidMount() {
    sounds[0].audio.play();
    this.fetchData();
  }

  fetchData() {
    const arr = _.values(this.props.ingredient.selectedIngredient);
    let ingredients = [];
    for (let i = 0; i < arr.length; i++) {
      ingredients.push(arr[i].ingredient_id);
    }
    ingredients = ingredients.join();
    this.props.request(ingredients);
    this.ingredients = ingredients;
  }

  _onEndReach = () => {
    if (this.props.recipes.data.length % 10 === 0) {
      this.props.request(
        this.ingredients,
        false,
        this.props.recipes.data.length / 10 + 1
      );
    }
  };

  _renderItem = ({ item }) => (
    <RecipeListItem navigation={this.props.navigation} item={item} />
  );

  _renderContent() {
    if (
      !this.props.networkInfo.isNetworkConnected &&
      Util.isEmpty(this.props.recipes.data)
    ) {
      return <Error />;
    }
    if (
      this.props.recipes.failure &&
      this.props.recipes.errorMessage &&
      !this.props.recipes.isFetching
    ) {
      return <Error title={""} description={this.props.recipes.errorMessage} />;
    }
    if (
      (Util.isEmpty(this.props.recipes.data) &&
        this.props.recipes.isFetching) ||
      !this.alreadyFetching
    ) {
      this.alreadyFetching = true;
      return <ActivityIndicator />;
    }
    if (Util.isEmpty(this.props.recipes.data)) {
      return <Error title={""} description={NO_RECIPE_FOUND} />;
    }
    return (
      <FlatList
        ItemSeparatorComponent={() => (
          <View style={{ padding: Metrics.smallMargin }} />
        )}
        // pagingEnabled={true} /* for paging view */
        data={this.props.recipes.data}
        keyExtractor={Util.keyExtractor}
        renderItem={this._renderItem}
        // horizontal={true} /* Horizontal View*/
        onEndReached={this._onEndReach}
      />
    );
  }

  render() {
    return <View style={styles.container}>{this._renderContent()}</View>;
  }
}

const mapStateToProps = ({ recipes, ingredient, networkInfo }) => ({
  ingredient,
  recipes,
  networkInfo
});

const actions = {
  request,
  success
};

export default connect(mapStateToProps, actions)(RecipeList);
