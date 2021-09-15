import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Platform, BackHandler } from "react-native";
import {
  addNavigationHelpers,
  StackNavigator,
  DrawerNavigator,
  NavigationActions
} from "react-navigation";

import Drawer from "../components/Drawer";
import styles from "./styles";
import { Colors } from "../theme";

import NetworkInfo from "../services/NetworkInfo";
import { networkInfoListener } from "../actions/NetworkInfoActions";

import {
  Search,
  RecipeList,
  RecipeDetail,
  Ingredients,
  WebView
} from "../containers";

const navigationConfig = {
  initialRouteName: "IngredientScreen",
  navigationOptions: {
    headerBackTitle: null,
    gesturesEnabled: false,
    drawerLockMode: "locked-closed",
    headerTintColor: Colors.navbar.text,
    headerStyle: styles.header,
    headerTitleStyle: styles.title
  }
};

const HomeStack = {
  IngredientScreen: {
    screen: Ingredients
  },
  SearchScreen: {
    screen: Search
  },
  // PreferencesScreen: {
  //   screen: Preferences
  // },
  RecipeListScreen: {
    screen: RecipeList
  },
  RecipeDetailScreen: {
    screen: RecipeDetail
  },
  WebViewScreen: {
    screen: WebView
  }
};

export const DrawerRoutes = {
  Home: {
    name: "Home",
    screen: StackNavigator(HomeStack, navigationConfig)
  }
};

export const Navigator = DrawerNavigator(
  DrawerRoutes,
  {
    contentComponent: ({ navigation }) => <Drawer navigation={navigation} />
  },
  {
    headerMode: "none"
  }
);

class AppNavigator extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    NetworkInfo.networkInfoListener(dispatch, networkInfoListener);
    this.initBackButton();
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    NetworkInfo.removeNetworkInfoListener(dispatch, networkInfoListener);
  }

  onBackButton = () => {
    const { dispatch, navigator } = this.props;

    if (navigator.index === 1) {
      dispatch({ type: "Navigation/NAVIGATE", routeName: "DrawerClose" });
      return true;
    }
    if (navigator.routes[0].routes[0].index > 0) {
      dispatch(NavigationActions.back());
      return true;
    }
    return false;
  };

  initBackButton() {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", this.onBackButton);
    }
  }

  render() {
    const { dispatch, navigator } = this.props;
    return (
      <Navigator
        navigation={addNavigationHelpers({ dispatch, state: navigator })}
      />
    );
  }
}

AppNavigator.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  navigator: state.navigator
});

export default connect(mapStateToProps)(AppNavigator);
