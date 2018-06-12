import { GET_VERSIONS } from "../actions/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case GET_VERSIONS:
      return action.payload;

    default:
      return state;
  }
};
