// @flow
import * as types from "./ActionTypes";
import { API_LIMIT } from "../constants";

/* eslint camelcase: 1 */
export function request(
  search_item: Object,
  reset: boolean = true,
  page_no: number = 1,
  limit: number = API_LIMIT
) {
  return {
    search_item,
    page_no,
    reset,
    limit,
    type: types.INGREDIENT.REQUEST
  };
}

export function success(data, reset = true, isEmpty = true) {
  return {
    data,
    reset,
    isEmpty,
    type: types.INGREDIENT.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: types.INGREDIENT.FAILURE
  };
}

export function ingredientSelected(value) {
  return {
    value,
    type: types.INGREDIENT_SELECTED
  };
}

export function ingredientUnselected(index) {
  return {
    index,
    type: types.INGREDIENT_UNSELECTED
  };
}
