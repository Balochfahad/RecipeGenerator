// @flow
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import {
  View,
  FlatList,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback
} from "react-native";

import { NO_DATA } from "../../constants";

import Util from "../../util";
import {
  Text,
  ButtonHeader,
  Separator,
  AlertMessage as MyAlertMessage,
  Error
} from "../../components";
import { Metrics, Images } from "../../theme";
import Ingredient from "../Ingredients/Ingredient";
import styles from "./styles";

import {
  success,
  request,
  ingredientSelected,
  ingredientUnselected
} from "../../actions/IngredientActions";

const { AlertMessage, MessageBarManager } = MyAlertMessage;

class Search extends Component {
  static propTypes = {
    request: PropTypes.func.isRequired,
    success: PropTypes.func.isRequired,
    ingredient: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    ingredientSelected: PropTypes.func.isRequired,
    ingredientUnselected: PropTypes.func.isRequired
  };

  static navigationOptions = {
    header: null
  };

  state = {
    visibleStyle: {
      flex: 1
    }
  };

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this._clearList();
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = e => {
    let height = Metrics.screenHeight - e.endCoordinates.height;
    height -= 20;
    this.setState({
      visibleStyle: {
        height
      }
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      visibleStyle: {
        flex: 1
      }
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)
    );
  }

  _onItemPress = item => {
    const { selectedIngredient } = this.props.ingredient;
    if (selectedIngredient.length < 10) {
      this.props.ingredientSelected(item);
      this.chips.scrollToOffset({ x: 0 });
    } else {
      MessageBarManager.showAlert({
        alertType: "error",
        title: "Ingredient selection limit exceeds"
      });
    }
  };

  _onChipPress = index => {
    this.props.ingredientUnselected(index);
  };

  _fetchIngredient(search_item: string) {
    if (search_item.length === 0) {
      this._clearList();
    }
    this.search_item = search_item;
    if (search_item.length > 1) {
      this.props.request(this.search_item);
    }
    this.setState({
      search_item
    });
  }

  _onEndReach = () => {
    const { ingredient } = this.props;
    this.props.request(
      this.search_item,
      false,
      ingredient.data.length / 10 + 1
    );
  };

  _clearList = () => {
    this.props.success([], true, false);
  };
  _clearData = () => {
    this.textInput.clear();
    this.props.success([], false);
  };

  _renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => this._onItemPress(item)}>
      <View style={styles.row}>
        <Text numberOflines={1} textAlign="left">
          {item.ingredient_name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  _renderChip = ({ item, index }) => (
    <Ingredient
      ingredient={item}
      key={item.ingredient_id}
      onPress={() => this._onChipPress(index)}
    />
  );

  _renderSeparator = () => <Separator />;

  _selectComponentToRender(data) {
    if (!this.props.isNetworkConnected && Util.isEmpty(data)) {
      return <Error />;
    } else if (this.props.ingredient.isEmpty) {
      return <Error title={""} description={NO_DATA} />;
    } else {
      return (
        <FlatList
          data={_.isEmpty(this.state.search_item) ? [] : data}
          style={styles.ingredients}
          initialNumToRender={1}
          renderItem={this._renderItem}
          keyExtractor={Util.keyExtractor}
          keyboardShouldPersistTaps="always"
          ItemSeparatorComponent={this._renderSeparator}
        />
      );
    }
  }

  render() {
    const { ingredient } = this.props;

    const data = _.cloneDeep(ingredient.data);
    const selectedIngredient = _.cloneDeep(ingredient.selectedIngredient);
    return (
      <View style={styles.container}>
        <View style={this.state.visibleStyle}>
          <View style={styles.header}>
            <ButtonHeader
              alignItems="center"
              source={Images.arrowBack}
              onPress={() => this.props.navigation.goBack()}
            />
            <TextInput
              autoFocus
              clearButtonMode="while-editing"
              returnKeyType="search"
              underlineColorAndroid="transparent"
              style={styles.search}
              value={this.state.search_item}
              placeholder="Search ingredients"
              ref={input => {
                this.textInput = input;
              }}
              onChangeText={search_item => {
                this._fetchIngredient(search_item);
              }}
            />
            <ButtonHeader
              source="X"
              // onPress={() => this.props.navigation.goBack()}
              onPress={() => this._clearData()}
            />
          </View>

          {this._selectComponentToRender(data)}

          <FlatList
            horizontal
            style={styles.chips}
            initialNumToRender={1}
            data={selectedIngredient}
            renderItem={this._renderChip}
            ref={ref => {
              this.chips = ref;
            }}
            keyExtractor={Util.keyExtractor}
            keyboardShouldPersistTaps="always"
          />
        </View>
        <AlertMessage />
      </View>
    );
  }
}

const mapStateToProps = ({ ingredient, networkInfo }) => ({
  ingredient,
  isNetworkConnected: networkInfo.isNetworkConnected
});

const actions = {
  request,
  success,
  ingredientSelected,
  ingredientUnselected
};

export default connect(mapStateToProps, actions)(Search);
