import { fork } from "redux-saga/effects";

import init from "./init";
import preferences from "./preferences";
import recipes from "./recipes";
import recipeDetail from "./recipeDetail";
import ingredient from "./ingredient";

// Consider using takeEvery
export default function* root() {
  yield fork(init);
  yield fork(ingredient);
  yield fork(preferences);
  yield fork(recipes);
  yield fork(recipeDetail);
}
