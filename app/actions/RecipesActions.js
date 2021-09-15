// @flow
import * as types from "./ActionTypes";
import { API_LIMIT } from "../constants";

/* eslint camelcase: 1 */
export function request(
  ingredient_id: string,
  reset: boolean = true,
  page_no: number = 1,
  limit: number = API_LIMIT
) {
  return {
    ingredient_id,
    page_no,
    reset,
    limit,
    type: types.RECIPES.REQUEST
  };
}

export function success(data, reset = true, isEmpty = true) {
  return {
    data,
    reset,
    type: types.RECIPES.SUCCESS
  };
}

export function failure(errorMessage) {
  return {
    errorMessage,
    type: types.RECIPES.FAILURE
  };
}
