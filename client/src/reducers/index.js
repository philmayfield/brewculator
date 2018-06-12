import { combineReducers } from "redux";
import appReducer from "./appReducer";
import authReducer from "./authReducer";
import recipeReducer from "./recipeReducer";
import recipesReducer from "./recipesReducer";
import errorReducer from "./errorReducer";

// combines all of the reducers into one object
export default combineReducers({
  appJunk: appReducer,
  auth: authReducer,
  recipe: recipeReducer,
  recipes: recipesReducer,
  errors: errorReducer
});
