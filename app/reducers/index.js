import { combineReducers } from "redux";
import navigator from "./navigator";
import preferences from "./preferences";
import networkInfo from "./networkInfo";
import recipes from "./recipes";
import recipeDetail from "./recipeDetail";
import ingredient from "./ingredient";

export default combineReducers({
  ingredient,
  recipes,
  recipeDetail,
  navigator,
  preferences,
  networkInfo
});
