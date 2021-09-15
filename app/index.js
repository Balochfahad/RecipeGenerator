// @flow

// init localization
// import './I18n/I18n' // keep before AppContainer

import React, { Component } from "react";
import { AppRegistry, NativeModules } from "react-native";
import { Provider } from "react-redux";
import applyConfigSettings from "./config";
import configureStore from "./store";
import AppNavigator from "./navigator";

applyConfigSettings();

class App extends Component {
  state = {
    isLoading: true,
    store: configureStore(() => {
      this.setState({ isLoading: false });
      NativeModules.SplashScreen.hide();
    })
  };

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <Provider store={this.state.store}>
        <AppNavigator />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("RecipeGenerator", () => App);
