// @flow
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import {
  View,
  WebView
} from "react-native";

import styles from "./styles";

import AboutUs from '../../store/AboutUs';
import Disclaimer from '../../store/Disclaimer';
import PrivacyPolicy from '../../store/PrivacyPolicy';

class Search extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title
  });

  render() {
    const { type } = this.props.navigation.state.params;
    let source = PrivacyPolicy;
    if(type === 'about') {
      source = AboutUs;
    } else if(type === 'disclaimer') {
      source = Disclaimer;
    }
    
    return (
      <View style={styles.container}>
        <WebView style={{margin: 10}} source={{html: source}} />
      </View>
    );
  }
}

const mapStateToProps = () => ({
});

const actions = {
};

export default connect(mapStateToProps, actions)(Search);
