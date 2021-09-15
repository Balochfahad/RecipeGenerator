import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { API_PREFERENCES } from "../constants";
import { success, failure } from "../actions/PreferencesActions";

function callRequest() {
  return ApiSauce.post(API_PREFERENCES);
}

function* watchRequest() {
  while (true) {
    yield take(types.PREFERENCES.REQUEST);
    try {
      const response = yield call(callRequest);
      yield put(success(response.data.perferences));
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
