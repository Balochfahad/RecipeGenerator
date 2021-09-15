import { take, fork } from "redux-saga/effects";
import { LOAD } from "redux-storage";

function* watchReduxLoadFromDisk() {
  while (true) {
    yield take(LOAD);
  }
}

// Bootstrap Functions App
export default function* root() {
  yield fork(watchReduxLoadFromDisk);
}
