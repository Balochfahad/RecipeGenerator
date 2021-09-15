import * as types from "./ActionTypes";

export function request() {
  return {
    type: types.PREFERENCES.REQUEST
  };
}

export function success(data) {
  return {
    data,
    type: types.PREFERENCES.SUCCESS
  };
}

export function failure(errorMessage) {
  return {
    errorMessage,
    type: types.PREFERENCES.FAILURE
  };
}

export function setPreferences(preferences) {
  console.log(preferences);
  return {
    preferences,
    type: types.SET_PREFERENCES
  };
}

export function unsetPreferences(preferences) {
  return {
    preferences,
    type: types.UNSET_PREFERENCES
  };
}
