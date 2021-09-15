// @flow
import _ from "lodash";
import moment from "moment";
import Util from "../../util";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ScrollableTabView from "react-native-scrollable-tab-view";
import * as Animatable from "react-native-animatable";
import {
  View,
  Image,
  Animated,
  Easing,
  Platform,
  TouchableOpacity,
  FlatList
} from "react-native";
import Sound from "react-native-sound";

import {
  request,
  clearCheck,
  directionChecked,
  ingredientChecked
} from "../../actions/RecipeDetailActions";
import {
  Text,
  TabBar,
  Direction,
  Nutrition,
  Ingredients,
  ActivityIndicator
} from "../../components";
import { Images, Metrics } from "../../theme";

import styles from "./styles";

Sound.setCategory("Playback");

const sounds = [
  {
    audio: new Sound("beep.wav", Sound.MAIN_BUNDLE)
  },
  {
    audio: new Sound("buzzer.wav", Sound.MAIN_BUNDLE)
  },
  {
    audio: new Sound("drop1.wav", Sound.MAIN_BUNDLE)
  },
  {
    audio: new Sound("drop2.wav", Sound.MAIN_BUNDLE)
  },
  {
    audio: new Sound("hit1.wav", Sound.MAIN_BUNDLE)
  },
  {
    audio: new Sound("hit2.wav", Sound.MAIN_BUNDLE)
  },
  {
    audio: new Sound("open1.wav", Sound.MAIN_BUNDLE)
  },
  {
    audio: new Sound("open2.wav", Sound.MAIN_BUNDLE)
  },
  {
    audio: new Sound("pour1.wav", Sound.MAIN_BUNDLE)
  },
  {
    audio: new Sound("pour2.wav", Sound.MAIN_BUNDLE)
  },
  {
    audio: new Sound("rattle.wav", Sound.MAIN_BUNDLE)
  },
  {
    audio: new Sound("reach.wav", Sound.MAIN_BUNDLE)
  },
  {
    audio: new Sound("setting.wav", Sound.MAIN_BUNDLE)
  },
  {
    audio: new Sound("shaker.wav", Sound.MAIN_BUNDLE)
  },
  {
    audio: new Sound("tap1.wav", Sound.MAIN_BUNDLE)
  },
  {
    audio: new Sound("tap2.wav", Sound.MAIN_BUNDLE)
  },
  {
    audio: new Sound("thrown.wav", Sound.MAIN_BUNDLE)
  }
];

class RecipeDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const { clearAllButton } = "params" in state && state.params;

    return {
      title: "Recipe Detail",
      headerRight: clearAllButton && clearAllButton()
    };
  };

  static propTypes = {
    recipeDetail: PropTypes.object.isRequired,
    recipes: PropTypes.object.isRequired,
    request: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  };

  state = {
    serving: 1,
    animating: false,
    isFullScreen: false,
    marginTop: 0
  };

  componentDidMount() {
    this.props.request(this.getItem().recipe_id);
  }

  componentWillReceiveProps(nextProps: Object) {
    const { state } = this.props.navigation;
    const { clearAllButton } = "params" in state && state.params;

    const { recipe_id } = this.getItem();

    // FIXME: following condition is not working on android
    // and we believe following condition is not required.
    // TODO: Remove this condition if not required.
    // if (
    //   nextProps.recipeDetail.data &&
    //   nextProps.recipeDetail.data[recipe_id] &&
    //   nextProps.recipeDetail.data[recipe_id].recipe &&
    //   nextProps.recipeDetail.data[recipe_id].recipe.serving &&
    //   nextProps.recipeDetail.data[recipe_id].recipe.serving !==
    //     this.state.serving
    // ) {
    // this.state.serving =
    //   nextProps.recipeDetail.data[recipe_id].recipe.serving;
    // }

    if (
      (!this.props.recipeDetail.selectedIngredient[recipe_id] &&
        nextProps.recipeDetail.selectedIngredient[recipe_id]) ||
      (!this.props.recipeDetail.selectedDirection[recipe_id] &&
        nextProps.recipeDetail.selectedDirection[recipe_id])
    ) {
      this.props.navigation.setParams({
        clearAllButton: () => (
          <TouchableOpacity
            onPress={() => this.props.clearCheck(this.getItem().recipe_id)}
            style={{
              padding: Metrics.smallMargin
            }}
          >
            <Text>Clear All</Text>
          </TouchableOpacity>
        )
      });
    } else if (
      (this.props.recipeDetail.selectedDirection[recipe_id] &&
        !nextProps.recipeDetail.selectedDirection[recipe_id]) ||
      (this.props.recipeDetail.selectedDirection[recipe_id] &&
        !nextProps.recipeDetail.selectedDirection[recipe_id])
    ) {
      this.props.navigation.setParams({ clearAllButton: undefined });
    } else if (
      (clearAllButton &&
        (!this.isEmpty(this.props.recipeDetail.selectedIngredient[recipe_id]) &&
          this.isEmpty(
            nextProps.recipeDetail.selectedIngredient[recipe_id]
          ))) ||
      (!this.isEmpty(this.props.recipeDetail.selectedDirection[recipe_id]) &&
        this.isEmpty(nextProps.recipeDetail.selectedDirection[recipe_id]))
    ) {
      this.props.navigation.setParams({ clearAllButton: undefined });
    } else if (
      (!clearAllButton &&
        (this.isEmpty(this.props.recipeDetail.selectedIngredient[recipe_id]) &&
          !this.isEmpty(
            nextProps.recipeDetail.selectedIngredient[recipe_id]
          ))) ||
      (this.isEmpty(this.props.recipeDetail.selectedDirection[recipe_id]) &&
        !this.isEmpty(nextProps.recipeDetail.selectedDirection[recipe_id]))
    ) {
      this.props.navigation.setParams({
        clearAllButton: () => (
          <TouchableOpacity
            onPress={() => this.props.clearCheck(this.getItem().recipe_id)}
            style={{
              padding: Metrics.smallMargin
            }}
          >
            <Text>Clear All</Text>
          </TouchableOpacity>
        )
      });
    }
  }

  isEmpty(data) {
    let flag = true;
    if (data) {
      for (const [key, value] of Object.entries(data)) {
        if (value) {
          flag = false;
          break;
        }
      }
    }
    return flag;
  }

  playSound() {
    sounds[Math.floor(Math.random() * sounds.length)].audio.play();
  }

  updateServing = serving => {
    this.playSound();
    this.setState({
      serving: Math.max(1, Math.min(this.state.serving + serving, 20))
    });
  };

  componentWillMount() {
    const { recipe_id } = this.getItem();
    if (
      this.props.recipeDetail.selectedIngredient[recipe_id] ||
      this.props.recipeDetail.selectedDirection[recipe_id]
    ) {
      this.props.navigation.setParams({
        clearAllButton: () => (
          <TouchableOpacity
            onPress={() => this.props.clearCheck(this.getItem().recipe_id)}
            style={{
              padding: Metrics.smallMargin
            }}
          >
            <Text>Clear All</Text>
          </TouchableOpacity>
        )
      });
    }
  }

  getItem = () => this.props.navigation.state.params.item;

  tabView;
  offsetY = new Animated.Value(0);

  fullScreen = () => {
    if (this.state.isFullScreen || this.state.animating) {
      return;
    }
    this.state.animating = true;
    this.refs.tab3.fadeOut(100);
    this.refs.tab2.fadeOut(100);
    this.refs.tab1.fadeOut(100).then(() => {
      this.setState(
        {
          animating: true
        },
        () => {
          Animated.timing(this.offsetY, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear
          }).start(() => {
            this.setState(
              {
                animating: false,
                isFullScreen: true
              },
              () => {
                Animated.timing(this.offsetY, {
                  toValue: 0,
                  duration: 0,
                  easing: Easing.linear
                }).start(() => {
                  this.refs.tab1.fadeIn();
                  this.refs.tab2.fadeIn();
                  this.refs.tab3.fadeIn();
                });
              }
            );
          });
        }
      );
    });
  };

  disableFullScreen() {
    if (!this.state.isFullScreen) {
      return;
    }

    this.refs.tab3.fadeOut(100);
    this.refs.tab2.fadeOut(100);
    this.refs.tab1.fadeOut(100).then(() => {
      this.setState(
        {
          animating: true
        },
        () => {
          Animated.timing(this.offsetY, {
            toValue: 1,
            duration: 0,
            easing: Easing.linear
          }).start(() => {
            this.setState(
              {
                isFullScreen: false
              },
              () => {
                Animated.timing(this.offsetY, {
                  toValue: 0,
                  duration: 300,
                  easing: Easing.linear
                }).start(() => {
                  this.setState(
                    {
                      animating: false
                    },
                    () => {
                      this.refs.tab1.fadeIn();
                      this.refs.tab2.fadeIn();
                      this.refs.tab3.fadeIn();
                    }
                  );
                });
              }
            );
          });
        }
      );
    });
  }

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
    const { recipe_id, recipe_image, recipe_name } = this.getItem();
    const { isFullScreen } = this.state;
    const {
      data,
      selectedIngredient,
      selectedDirection
    } = this.props.recipeDetail;

    const sourceImage = recipe_image ? { uri: recipe_image } : Images.cover;

    const translateY = this.offsetY.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.state.marginTop]
    });
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.container, { transform: [{ translateY }] }]}
        >
          {!isFullScreen && (
            <View
              onLayout={({ nativeEvent }) => {
                this.setState({ marginTop: -nativeEvent.layout.height });
              }}
            >
              <Image
                resizeMode="cover"
                source={sourceImage}
                style={styles.cover}
              >
                <Image
                  source={Images.shade}
                  resizeMode="stretch"
                  style={styles.cover}
                >
                  <View style={styles.coverContainer}>
                    <Text
                      type={"medium"}
                      numberOfLines={2}
                      textAlign="left"
                      color="tertiary"
                      style={{
                        margin: Metrics.smallMargin,
                        marginBottom: Metrics.baseMargin
                      }}
                    >
                      {recipe_name}
                    </Text>
                  </View>
                </Image>
              </Image>
            </View>
          )}
          {this._renderScrollableTab(
            data[recipe_id],
            selectedIngredient[recipe_id] || {},
            selectedDirection[recipe_id] || {}
          )}
        </Animated.View>
      </View>
    );
  }

  _calculateNutrition(nutrition, originalServing) {
    const serving = this.state.serving;

    if (serving === originalServing) {
      return nutrition;
    }

    if (originalServing === 1) {
      return nutrition * serving;
    }

    return nutrition / originalServing * serving;
  }

  _renderScrollableTab(data, selectedIngredient, selectedDirection) {
    if (Util.isEmpty(data)) {
      return <ActivityIndicator />;
    }

    const titles = [
      ["Ingredients", data.ingredients.length, "Counts"],
      [
        "Directions",
        moment.duration(data.recipe.preparation_time).asMinutes(),
        "Minutes"
      ],
      [
        "Nutrition",
        Math.round(
          this._calculateNutrition(
            +data.recipe.calories,
            data.recipe.serving || 1
          ) * 1000
        ) / 1000,
        "Calories"
      ]
    ];
    // console.log(this.props.recipes.data);
    return (
      <ScrollableTabView
        locked
        tabBarUnderlineStyle={styles.tabBarUnderline}
        prerenderingSiblingsNumber={Infinity}
        renderTabBar={() => (
          <TabBar
            titles={titles}
            onSwipeUp={() => this.fullScreen()}
            onSwipeDown={() => this.disableFullScreen()}
          />
        )}
        ref={tabView => {
          this.tabView = tabView;
        }}
      >
        <Animatable.View
          ref="tab1"
          tabLabel={0}
          style={{
            flex: 1,
            marginTop: Platform.select({
              ios: 0,
              android: Metrics.baseMargin
            })
          }}
        >
          <Ingredients
            data={data.ingredients}
            serving={this.state.serving}
            onFullScreen={this.fullScreen}
            updateServing={this.updateServing}
            recipe_id={this.getItem().recipe_id}
            checked={this.props.ingredientChecked}
            selectedIngredient={selectedIngredient}
            originalServing={data.recipe.serving || 1}
          />
        </Animatable.View>
        <Animatable.View
          ref="tab2"
          tabLabel={1}
          style={{
            flex: 1,
            marginTop: Platform.select({
              ios: 0,
              android: Metrics.baseMargin
            })
          }}
        >
          <Direction
            data={data.steps}
            onFullScreen={this.fullScreen}
            recipe_id={this.getItem().recipe_id}
            checked={this.props.directionChecked}
            selectedDirection={selectedDirection}
          />
        </Animatable.View>
        <Animatable.View
          ref="tab3"
          tabLabel={2}
          style={{
            flex: 1,
            marginTop: Platform.select({
              ios: 0,
              android: Metrics.baseMargin
            })
          }}
        >
          <Nutrition
            data={data.nutritions}
            serving={this.state.serving}
            onFullScreen={this.fullScreen}
            updateServing={this.updateServing}
            originalServing={data.recipe.serving || 1}
          />
        </Animatable.View>
      </ScrollableTabView>
    );
  }
}

const mapStateToProps = ({
  ingredient,
  recipes,
  networkInfo,
  recipeDetail
}) => ({
  recipeDetail,
  recipes,
  networkInfo
});

const actions = {
  request,
  clearCheck,
  ingredientChecked,
  directionChecked
};

export default connect(mapStateToProps, actions)(RecipeDetail);
