import { GET_BREWS, DELETE_BREW } from "../actions/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case GET_BREWS:
      return action.payload;

    case DELETE_BREW:
      return state.filter(brew => brew._id !== action.payload);

    default:
      return state;
  }
};
