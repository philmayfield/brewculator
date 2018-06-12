import {
  IS_LOADING,
  NOT_LOADING,
  ACTION_CONFIRM
} from "../actions/actionTypes";

const defaultState = {
  loading: false,
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

    default:
      return state;
  }
};
