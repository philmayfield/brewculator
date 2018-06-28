import {
  IS_LOADING,
  NOT_LOADING,
  ACTION_CONFIRM,
  CHANGE_CONTEXT,
  DEFAULT_CONTEXT
} from "../actions/actionTypes";

const defaultState = {
  loading: false,
  altControlContext: false,
  confirmObject: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        loading: true
      };

    case NOT_LOADING:
      return {
        ...state,
        loading: false
      };

    case ACTION_CONFIRM:
      return {
        ...state,
        confirmObject: action.payload
      };

    case CHANGE_CONTEXT:
      return {
        ...state,
        altControlContext: action.payload
      };

    case DEFAULT_CONTEXT:
      return {
        ...state,
        altControlContext: false
      };

    default:
      return state;
  }
};
