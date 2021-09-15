import _ from "lodash";
import { take, put, call, fork, select } from "redux-saga/effects";

import { API_RECIPES } from "../constants";
import ApiSauce from "../services/ApiSauce";
import { getPreferences } from "../selectors";
import * as types from "../actions/ActionTypes";
import { success, failure } from "../actions/RecipesActions";

function callRequest(data) {
  return ApiSauce.post(API_RECIPES, data);
}

function* watchRequest() {
  while (true) {
    const { ingredient_id, limit, page_no, reset } = yield take(
      types.RECIPES.REQUEST
    );
    try {
      const { preferences } = yield select(getPreferences);

      const calories = preferences.calories;
      const allergens = _.keys(preferences.allergens).join(",");
      const dish_type = _.keys(preferences.dishType).join(",");
      // const meal_type = _.keys(preferences.mealType).join(",");

      const payload = {
        ingredient_id,
        calories,
        allergens,
        dish_type,
        limit,
        page_no
      };
      console.log(payload);
      const response = yield call(callRequest, payload);
      yield put(success(response.data, reset));
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
