import { GET_VERSIONS, DELETE_VERSION } from "../actions/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case GET_VERSIONS:
      return action.payload;

    case DELETE_VERSION:
      return state.filter(version => version._id !== action.payload);

    default:
      return state;
  }
};
