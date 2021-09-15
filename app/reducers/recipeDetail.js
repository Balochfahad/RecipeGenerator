// @flow

import _ from "lodash";
import Immutable from "seamless-immutable";
import * as types from "../actions/ActionTypes";

const initialState = Immutable({
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: {},
  selectedIngredient: {},
  selectedDirection: {}
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.RECIPE_DETAIL.REQUEST:
      return Immutable.merge(state, {
        isFetching: true
      });
    case types.RECIPE_DETAIL.SUCCESS:
      const data = _.cloneDeep(state.data);
      data[action.recipe_id] = action.data;
      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: "",
        data
      });
    case types.RECIPE_DETAIL.FAILURE:
      return Immutable.merge(state, {
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      });
    case types.RECIPE_DETAIL_INGREDIENT_CHECKED:
      const selectedIngredient = _.cloneDeep(state.selectedIngredient);
      if (!selectedIngredient[action.recipe_id]) {
        selectedIngredient[action.recipe_id] = {};
      }
      selectedIngredient[action.recipe_id][action.index] = !selectedIngredient[
        action.recipe_id
      ][action.index];
      return Immutable.merge(state, {
        selectedIngredient
      });
    case types.RECIPE_DETAIL_DIRECTION_CHECKED:
      const selectedDirection = _.cloneDeep(state.selectedDirection);
      if (!selectedDirection[action.recipe_id]) {
        selectedDirection[action.recipe_id] = {};
      }
      selectedDirection[action.recipe_id][action.index] = !selectedDirection[
        action.recipe_id
      ][action.index];
      return Immutable.merge(state, {
        selectedDirection
      });
    case types.RECIPE_DETAIL_CLEAR_CHECK:
      const _selectedIngredient = _.cloneDeep(state.selectedIngredient);
      const _selectedDirection = _.cloneDeep(state.selectedDirection);
      if (_selectedIngredient[action.recipe_id]) {
        delete _selectedIngredient[action.recipe_id];
      }
      if (_selectedDirection[action.recipe_id]) {
        delete _selectedDirection[action.recipe_id];
      }
      return Immutable.merge(state, {
        selectedIngredient: _selectedIngredient,
        selectedDirection: _selectedDirection
      });
    default:
      return state;
  }
};
