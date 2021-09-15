import { Metrics, Fonts, Colors } from "../../theme";
import styles from "./styles";

const React = require("react");
const { ViewPropTypes } = (ReactNative = require("react-native"));

const { Text, View, Animated, Platform, PanResponder } = ReactNative;
const Button = require("./Button");

const swipeConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};

const swipeDirections = {
  SWIPE_UP: "SWIPE_UP",
  SWIPE_DOWN: "SWIPE_DOWN",
  SWIPE_LEFT: "SWIPE_LEFT",
  SWIPE_RIGHT: "SWIPE_RIGHT"
};

function isValidSwipe(
  velocity,
  velocityThreshold,
  directionalOffset,
  directionalOffsetThreshold
) {
  return (
    Math.abs(velocity) > velocityThreshold &&
    Math.abs(directionalOffset) < directionalOffsetThreshold
  );
}

const DefaultTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    backgroundColor: React.PropTypes.string,
    activeBackgroundColor: React.PropTypes.string,
    inactiveBackgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: ViewPropTypes.style,
    renderTab: React.PropTypes.func,
    underlineStyle: ViewPropTypes.style,
    onSwipeUp: React.PropTypes.func.isRequired,
    onSwipeDown: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      activeTextColor: Colors.text.tertiary,
      inactiveTextColor: Colors.text.primary,
      activeBackgroundColor: Colors.secondary,
      inactiveBackgroundColor: Colors.transparent,
      backgroundColor: null
    };
  },

  componentWillMount() {
    this.swipeConfig = swipeConfig;
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) =>
        this._handleShouldSetPanResponder(evt, gestureState),
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        this._handleShouldSetPanResponder(evt, gestureState),
      onPanResponderRelease: (evt, gestureState) =>
        this._handlePanResponderEnd(evt, gestureState),
      onPanResponderTerminate: (evt, gestureState) =>
        this._handlePanResponderEnd(evt, gestureState)
    });
  },

  _handleShouldSetPanResponder(evt, gestureState) {
    return (
      evt.nativeEvent.touches.length === 1 &&
      !this._gestureIsClick(gestureState)
    );
  },

  _gestureIsClick(gestureState) {
    return Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5;
  },

  _handlePanResponderEnd(evt, gestureState) {
    const swipeDirection = this._getSwipeDirection(gestureState);
    this._triggerSwipeHandlers(swipeDirection);
  },

  _getSwipeDirection(gestureState) {
    const { SWIPE_UP, SWIPE_DOWN } = swipeDirections;
    const { dy } = gestureState;
    if (this._isValidVerticalSwipe(gestureState)) {
      return dy > 0 ? SWIPE_DOWN : SWIPE_UP;
    }
    return null;
  },

  _triggerSwipeHandlers(swipeDirection) {
    const { onSwipeUp, onSwipeDown } = this.props;
    const { SWIPE_UP, SWIPE_DOWN } = swipeDirections;
    if (swipeDirection === SWIPE_UP) {
      onSwipeUp();
    } else if (swipeDirection === SWIPE_DOWN) {
      onSwipeDown();
    }
  },

  _isValidVerticalSwipe(gestureState) {
    const { vy, dx } = gestureState;
    const { velocityThreshold, directionalOffsetThreshold } = this.swipeConfig;
    return isValidSwipe(vy, velocityThreshold, dx, directionalOffsetThreshold);
  },

  renderTab(title, page, isTabActive, onPressHandler) {
    const {
      activeBackgroundColor,
      inactiveBackgroundColor,
      activeTextColor,
      inactiveTextColor,
      onSwipeUp
    } = this.props;
    const color = isTabActive ? activeTextColor : inactiveTextColor;
    const backgroundColor = isTabActive
      ? activeBackgroundColor
      : inactiveBackgroundColor;
    const fontWeight = "normal";
    return (
      <Button
        style={styles.container}
        key={title[0]}
        onPress={() => {
          onPressHandler(page);
          onSwipeUp();
        }}
      >
        <View style={[styles.tab, this.props.tabStyle, { backgroundColor }]}>
          <Text style={{ ...Fonts.style.small, color, fontWeight }}>
            {title[0]}
          </Text>
          <Text style={{ ...Fonts.style.large, color, fontWeight }}>
            {title[1]}
          </Text>
          <Text style={{ ...Fonts.style.small, color, fontWeight }}>
            {title[2]}
          </Text>
        </View>
      </Button>
    );
  },

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: "absolute",
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderLeftWidth: containerWidth / numberOfTabs / 2 - 25,
      borderRightWidth: containerWidth / numberOfTabs / 2 - 25,
      borderBottomWidth: Metrics.ratio * 15,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: "navy",
      transform: [{ rotate: "180deg" }],
      top: Metrics.ratio * 88,
      marginLeft: 25
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs]
    });

    const style = Platform.select({
      ios: {
        zIndex: 1
      },
      android: {}
    });

    return (
      <View style={style}>
        <View
          style={[
            styles.tabs,
            { backgroundColor: this.props.backgroundColor },
            this.props.style
          ]}
          {...this._panResponder.panHandlers}
        >
          {this.props.tabs.map((name, page) => {
            const isTabActive = this.props.activeTab === page;
            const renderTab = this.props.renderTab || this.renderTab;
            return renderTab(
              this.props.titles[page],
              page,
              isTabActive,
              this.props.goToPage
            );
          })}
        </View>
        <Animated.View
          style={[tabUnderlineStyle, { left }, this.props.underlineStyle]}
        />
      </View>
    );
  }
});

module.exports = DefaultTabBar;
