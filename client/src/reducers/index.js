import { combineReducers } from "redux";
import appReducer from "./appReducer";
import authReducer from "./authReducer";
import recipesReducer from "./recipesReducer";
import recipeReducer from "./recipeReducer";
import errorReducer from "./errorReducer";

// combines all of the reducers into one object
export default combineReducers({
  appJunk: appReducer,
  auth: authReducer,
  recipes: recipesReducer,
  recipe: recipeReducer,
  errors: errorReducer
});
