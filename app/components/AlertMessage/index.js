// @flow

import React, { Component } from 'react';

import {
  MessageBar,
  MessageBarManager
} from 'react-native-message-bar';

class AlertMessage extends Component {

  componentDidMount() {
    MessageBarManager.registerMessageBar(this.refs.alert);
  }

  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar();
  }

  render() {
    return (
      <MessageBar ref="alert" />
    );
  }
}

module.exports = {
  AlertMessage,
  MessageBarManager
}
