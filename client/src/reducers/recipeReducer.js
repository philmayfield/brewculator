import {
  GET_RECIPE,
  DELETE_RECIPE,
  GET_VERSIONS
} from "../actions/actionTypes";

const defaultState = {
  name: "",
  style: "",
  author: "",
  date: "",
  versions: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_RECIPE:
      return action.payload;

    case DELETE_RECIPE:
      // return state.filter(recipe => recipe._id !== action.payload);
      return defaultState;

    case GET_VERSIONS:
      return {
        ...state,
        versions: action.payload
      };

    default:
      return state;
  }
};
