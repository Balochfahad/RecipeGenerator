// API Configuration
//export const BASE_URL = "http://35.166.79.136"; // Old Live
export const BASE_URL = "http://foodintelligencenetwork.com"; // Live
// export const BASE_URL = "http://34.225.138.250";
// export const BASE_URL = "http://cubixsource.com/mobile/egrocer"; // Internal
// export const BASE_URL = "http://cubixsource.com/staging/egrocer"; // Staging
export const API_USER_NAME = "cubixapiuser";
export const API_PASSWORD = "apipass123";
export const API_TIMEOUT = 30000;

export const API = "/api/";
export const API_LIMIT = 10;
export const API_PREFERENCES = `${API}getPerferences`;
export const API_RECIPES = `${API}getRecipeByIngredient`;
export const API_RECIPE_DETAIL = `${API}recipeDetail`;
export const API_SEARCH_INGREDIENT = `${API}searchIngredient`;

export const API_LOG = false;

export const ERROR_SOMETHING_WENT_WRONG = {
  message: "errorSomethingWentWrong",
  error: 1
};
export const ERROR_NETWORK = {
  message: "errorSomethingWentWrong",
  error: 1
};

export const NO_DATA = "No ingredient found!";
export const NO_RECIPE_FOUND = "No recipe found!";
export const NO_INTERNET_TITLE = "! OOOPS";
export const NO_INTERNET_DESCRIPTION = "No internet connection";
