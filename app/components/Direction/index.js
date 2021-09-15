import React, { Component } from "react";
import { ScrollView } from "react-native";
import PropTypes from "prop-types";
import { Metrics } from "../../theme";
import Text from "../Text";
import Row from "../Row";

export default class Direction extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    onFullScreen: PropTypes.func.isRequired,
    checked: PropTypes.func.isRequired,
    recipe_id: PropTypes.number.isRequired,
    selectedDirection: PropTypes.object.isRequired
  };
  render() {
    return (
      <ScrollView onScroll={() => this.props.onFullScreen()}>
        <Text
          style={{ margin: Metrics.baseMargin }}
          type={"xxLarge"}
          textAlign="left"
          color="secondary"
        >
          Directions
        </Text>
        {this.props.data.map((row, index) => (
          <Row
            index={index}
            key={row.recipe_step_id}
            checked={
              (this.props.selectedDirection &&
                this.props.selectedDirection[index]) ||
              false
            }
            onChecked={this.props.checked}
            recipe_id={this.props.recipe_id}
            text={row.step}
          />
        ))}
      </ScrollView>
    );
  }
}
