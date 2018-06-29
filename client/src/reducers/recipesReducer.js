import { GET_RECIPES, DELETE_RECIPE, SET_RECIPE } from "../actions/actionTypes";

export default (state = [], action) => {
  // if (action.type === SET_RECIPE) {
  //   console.log(">", state, action);
  // }
  switch (action.type) {
    case GET_RECIPES:
      return action.payload;

    case SET_RECIPE:
      return [
        ...state.filter(recipe => recipe._id !== action.payload._id),
        ...action.payload
      ];

    case DELETE_RECIPE:
      return state.filter(recipe => recipe._id !== action.payload);

    default:
      return state;
  }
};
