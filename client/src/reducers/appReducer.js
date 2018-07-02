import {
  IS_LOADING,
  NOT_LOADING,
  ACTION_CONFIRM,
  CHANGE_CONTEXT
} from "../actions/actionTypes";

const defaultState = {
  loadingArr: [],
  altControlContext: false,
  confirmObject: {}
};

export default (state = defaultState, action) => {
  // if (action.type === IS_LOADING || action.type === NOT_LOADING) {
  //   console.log(">", state, action);
  // }
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        loadingArr: [...state.loadingArr, action.payload]
      };

    case NOT_LOADING:
      return {
        ...state,
        loadingArr: state.loadingArr.filter(item => item !== action.payload),
        altControlContext: false,
        confirmObject: {}
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

    // set default context based on loading state instead
    // case DEFAULT_CONTEXT:
    //   return {
    //     ...state,
    //     altControlContext: false,
    //     confirmObject: {}
    //   };

    default:
      return state;
  }
};
