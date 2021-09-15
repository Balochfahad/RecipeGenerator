import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { API_RECIPE_DETAIL } from "../constants";
import { success, failure } from "../actions/RecipeDetailActions";

function callRequest(data) {
  return ApiSauce.post(API_RECIPE_DETAIL, data);
}

function* watchRequest() {
  while (true) {
    const { recipe_id, user_id } = yield take(types.RECIPE_DETAIL.REQUEST);
    try {
      const payload = { recipe_id, user_id };
      const response = yield call(callRequest, payload);
      yield put(success(recipe_id, response.data));
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
