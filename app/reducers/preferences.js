// @flow

import Immutable from "seamless-immutable";
import * as types from "../actions/ActionTypes";

const initialState = Immutable({
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: {},
  preferences: {
    calories: 2500,
    dishType: {},
    allergens: {}
  }
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.PREFERENCES.REQUEST:
      return Immutable.merge(state, {
        isFetching: true
      });
    case types.PREFERENCES.SUCCESS:
      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data
      });
    case types.PREFERENCES.FAILURE:
      return Immutable.merge(state, {
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      });
    case types.UNSET_PREFERENCES:
    case types.SET_PREFERENCES:
      return Immutable.merge(state, {
        preferences: action.preferences
      });
    default:
      return state;
  }
};
