import { GET_GRAVITIES, DELETE_GRAVITY } from "../actions/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case GET_GRAVITIES:
      return action.payload;

    case DELETE_GRAVITY:
      return state.filter(gravity => gravity._id !== action.payload);

    default:
      return state;
  }
};
