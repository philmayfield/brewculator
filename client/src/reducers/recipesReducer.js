import { GET_RECIPES, DELETE_RECIPE } from "../actions/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case GET_RECIPES:
      return action.payload;

    case DELETE_RECIPE:
      return state.filter(recipe => recipe._id !== action.payload);

    default:
      return state;
  }
};
