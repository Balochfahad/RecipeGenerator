const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";
const CANCEL = "CANCEL";

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach(
    type => (res[type] = `${base}_${type}`)
  );
  return res;
}

export const INGREDIENT = createRequestTypes("INGREDIENT");
export const INGREDIENT_SELECTED = "INGREDIENT_SELECTED";
export const INGREDIENT_UNSELECTED = "INGREDIENT_UNSELECTED";

export const RECIPES = createRequestTypes("RECIPES");
export const RECIPE_DETAIL = createRequestTypes("RECIPE_DETAIL");
export const RECIPE_DETAIL_INGREDIENT_CHECKED =
  "RECIPE_DETAIL_INGREDIENT_CHECKED";
export const RECIPE_DETAIL_DIRECTION_CHECKED =
  "RECIPE_DETAIL_DIRECTION_CHECKED";
export const RECIPE_DETAIL_CLEAR_CHECK = "RECIPE_DETAIL_CLEAR_CHECK";

export const PREFERENCES = createRequestTypes("PREFERENCES");
export const SET_PREFERENCES = "SET_PREFERENCES";
export const UNSET_PREFERENCES = "UNSET_PREFERENCES";

export const NETWORK_INFO = "NETWORK_INFO";
