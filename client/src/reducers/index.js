import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

// combines all of the reducers into one object
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
