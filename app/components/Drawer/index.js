// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from '../'
import {
  Images
} from '../../theme';
import styles from "./styles";

export default class Drawer extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.row} onPress={() => this._navigate('About Us', 'about')}>
          <Image style={styles.icon} source={Images.about} />
          <Text textAlign='left' type='mediumBold'>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.row, styles.highlightedRow]} onPress={() => this._navigate('Privacy Policy')}>
          <Image style={styles.icon} source={Images.terms} />
          <Text textAlign='left' type='mediumBold' style={{color: '#CE3838'}}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => this._navigate('Disclaimer', 'disclaimer')}>
          <Image style={styles.icon} source={Images.disclaimer} />
          <Text textAlign='left' type='mediumBold'>Disclaimer</Text>
        </TouchableOpacity>

      </View>
    )
  }

  _navigate(title, type = '') {
    this.props.navigation.dispatch({
      type: "Navigation/NAVIGATE",
      routeName: "WebViewScreen",
      params: { title, type }
    })
  }
}
