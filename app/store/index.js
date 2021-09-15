import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import * as storage from "redux-storage";
import filter from "redux-storage-decorator-filter";
import createEngine from "redux-storage-engine-reactnativeasyncstorage";
import createSagaMiddleware from "redux-saga";
import reducers from "../reducers";
import sagas from "../sagas";

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true
});

export default function configureStore(onComplete) {
  const engine = filter(
    createEngine("AppTree"),
    [
      "whitelisted-key",
      ["ingredient", "selectedIngredient"],
      ["recipeDetail", "selectedIngredient"],
      ["recipeDetail", "selectedDirection"],
      ["preferences", "data"],
      ["preferences", "preferences"]
    ],
    []
  );
  const storeMiddleware = storage.createMiddleware(engine);
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    storage.reducer(reducers),
    compose(applyMiddleware(sagaMiddleware, storeMiddleware, logger))
  );

  if (isDebuggingInChrome) {
    window.store = store;
  }

  const load = storage.createLoader(engine);
  load(store)
    .then(onComplete)
    .catch(() =>
      console.log("Failed to load previous state @ configureStore.js#44")
    );

  sagaMiddleware.run(sagas);

  return store;
}
