import { take, put, call, fork, takeLatest } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { API_SEARCH_INGREDIENT } from "../constants";
import { success, failure } from "../actions/IngredientActions";

function callRequest(data) {
  return ApiSauce.post(API_SEARCH_INGREDIENT, data);
}

function* watchRequest(action) {
  const { search_item, limit, page_no, reset } = action;

  try {
    const payload = { search_item, limit, page_no };
    const response = yield call(callRequest, payload);
    yield put(success(response.data.ingredient, reset));
  } catch (err) {
    yield put(failure(err.message));
  }
}

export default function* root() {
  yield takeLatest(types.INGREDIENT.REQUEST, watchRequest);
}
