// @flow

import _ from "lodash";
import Immutable from "seamless-immutable";
import * as types from "../actions/ActionTypes";

const initialState = Immutable({
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: [],
  isEmpty: false,
  selectedIngredient: []
});

let selectedIngredient = [];

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.INGREDIENT_SELECTED:
      selectedIngredient = _.cloneDeep(state.selectedIngredient);
      const index = _.findIndex(
        selectedIngredient,
        o => o.ingredient_id === action.value.ingredient_id
      );
      if (index != -1) {
        selectedIngredient.splice(index, 1);
      }

      selectedIngredient.unshift(action.value);

      return Immutable.merge(state, {
        selectedIngredient
      });

    case types.INGREDIENT_UNSELECTED:
      selectedIngredient = _.cloneDeep(state.selectedIngredient);
      selectedIngredient.splice(action.index, 1);
      return Immutable.merge(state, {
        selectedIngredient
      });

    case types.INGREDIENT.REQUEST:
      return Immutable.merge(state, {
        isFetching: true,
        isEmpty: false
      });
    case types.INGREDIENT.SUCCESS:
      const isEmpty = _.isEmpty(action.data) && action.isEmpty;

      let data = _.cloneDeep(action.data);
      if (!action.reset) {
        data = _.cloneDeep(state.data.concat(action.data));
      }
      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: "",
        data,
        isEmpty
      });
    case types.INGREDIENT.FAILURE:
      return Immutable.merge(state, {
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage,
        isEmpty: false
      });
    default:
      return state;
  }
};
