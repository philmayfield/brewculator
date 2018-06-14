import {
  // GET_VERSION,
  DELETE_VERSION
  // GET_BREWS
} from "../actions/actionTypes";

const defaultState = {
  recipe: "",
  version: "",
  notes: "",
  date: "",
  brews: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    // case GET_VERSION:
    //   return action.payload;

    case DELETE_VERSION:
      return defaultState;

    default:
      return state;
  }
};
