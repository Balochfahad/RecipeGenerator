// @flow

import _ from "lodash";
import Immutable from "seamless-immutable";
import * as types from "../actions/ActionTypes";

const initialState = Immutable({
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: [],
  isEmpty: false
});
export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.RECIPES.REQUEST:
      return Immutable.merge(state, {
        isEmpty: false,
        isFetching: true
      });
    case types.RECIPES.SUCCESS:
      let data = _.cloneDeep(action.data);
      if (!action.reset) {
        data = _.cloneDeep(state.data.concat(action.data));
      }
      const isEmpty = _.isEmpty(data) && action.isEmpty;

      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: "",
        data,
        isEmpty
      });
    case types.RECIPES.FAILURE:
      return Immutable.merge(state, {
        isEmpty: false,
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      });
    default:
      return state;
  }
};
