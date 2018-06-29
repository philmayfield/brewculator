import {
  GET_RECIPE,
  SET_RECIPE,
  DELETE_RECIPE,
  GET_VERSIONS,
  GET_VERSION,
  SET_VERSION,
  DELETE_VERSION,
  GET_BREWS,
  GET_BREW,
  SET_BREW,
  DELETE_BREW,
  GET_GRAVITIES,
  GET_GRAVITY,
  SET_GRAVITY,
  DELETE_GRAVITY
} from "../actions/actionTypes";

const defaultState = {
  name: "",
  style: "",
  author: "",
  date: "",
  versions: [],
  version: {
    brews: [],
    brew: {
      gravities: [],
      gravity: {}
    }
  }
};

export default (state = defaultState, action) => {
  // if (action.type === GET_GRAVITY || action.type === SET_GRAVITY) {
  //   console.log(">>>", state, action.payload);
  // }
  // if (action.type === GET_BREW) {
  //   console.log(">>>", state, action.payload);
  // }
  switch (action.type) {
    case GET_RECIPE:
    case SET_RECIPE:
      return {
        ...state,
        ...action.payload
      };

    case DELETE_RECIPE:
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
        version: {
          ...state.version,
          ...action.payload
        },
        versions: [
          ...state.versions.filter(
            version => version._id !== action.payload._id
          ),
          ...action.payload
        ]
      };

    case DELETE_VERSION:
      return {
        ...state,
        version: null,
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

    case GET_BREW:
    case SET_BREW:
      return {
        ...state,
        version: {
          ...state.version,
          brew: {
            ...state.version.brew,
            ...action.payload
          },
          brews: [
            ...state.version.brews.filter(
              brew => brew._id !== action.payload._id
            ),
            ...action.payload
          ]
        }
      };

    case DELETE_BREW:
      return {
        ...state,
        version: {
          ...state.version,
          brew: null,
          brews: [
            ...state.version.brews.filter(brew => brew._id !== action.payload)
          ]
        }
      };

    case GET_GRAVITIES:
      return {
        ...state,
        version: {
          ...state.version,
          brew: {
            ...state.version.brew,
            gravities: action.payload
          }
        }
      };

    case GET_GRAVITY:
    case SET_GRAVITY:
      return {
        ...state,
        version: {
          ...state.version,
          brew: {
            ...state.version.brew,
            gravity: {
              ...state.version.brew.gravity,
              ...action.payload
            },
            gravities: [
              ...state.version.brew.gravities.filter(
                gravity => gravity._id !== action.payload._id
              ),
              ...action.payload
            ]
          }
        }
      };

    case DELETE_GRAVITY:
      return {
        ...state,
        version: {
          ...state.version,
          brew: {
            ...state.version.brew,
            gravity: null,
            gravities: [
              ...state.version.brew.gravities.filter(
                gravity => gravity._id !== action.payload
              )
            ]
          },
          brews: [...state.version.brews]
        }
      };

    default:
      return state;
  }
};
