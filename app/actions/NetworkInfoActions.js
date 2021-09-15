import * as types from "./ActionTypes";

export function networkInfoListener(isNetworkConnected = false) {
  return {
    type: types.NETWORK_INFO,
    isNetworkConnected
  };
}
