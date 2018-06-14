import {
  GET_RECIPE,
  SET_RECIPE,
  DELETE_RECIPE,
  GET_VERSIONS,
  GET_VERSION,
  DELETE_VERSION,
  GET_BREWS,
  SET_VERSION
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
    case SET_RECIPE:
      return {
        ...state,
        ...action.payload
      };

    case DELETE_RECIPE:
      // return state.filter(recipe => recipe._id !== action.payload);
      return defaultState;

    case GET_VERSIONS:
      return {
        ...state,
        versions: action.payload
      };

    case GET_VERSION:
    case SET_VERSION:
      return {
        ...state,
        version: action.payload
      };

    case DELETE_VERSION:
      return {
        ...state,
        versions: [
          ...state.versions.filter(version => version._id !== action.payload)
        ]
      };

    case GET_BREWS:
      return {
        ...state,
        version: {
          ...state.version,
          brews: action.payload
        }
      };

    default:
      return state;
  }
};
