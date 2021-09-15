/* eslint camelcase: 0 */
import * as types from "./ActionTypes";

export function request(recipe_id: string, user_id: number = 141) {
  return {
    recipe_id,
    user_id,
    type: types.RECIPE_DETAIL.REQUEST
  };
}

export function success(recipe_id, data) {
  return {
    recipe_id,
    data,
    type: types.RECIPE_DETAIL.SUCCESS
  };
}

export function failure(errorMessage) {
  return {
    errorMessage,
    type: types.RECIPE_DETAIL.FAILURE
  };
}

export function ingredientChecked(recipe_id, index) {
  return {
    recipe_id,
    index,
    type: types.RECIPE_DETAIL_INGREDIENT_CHECKED
  };
}

export function directionChecked(recipe_id, index) {
  return {
    recipe_id,
    index,
    type: types.RECIPE_DETAIL_DIRECTION_CHECKED
  };
}

export function clearCheck(recipe_id) {
  return {
    recipe_id,
    type: types.RECIPE_DETAIL_CLEAR_CHECK
  };
}
