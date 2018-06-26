// actions related to the app - confirmation

import {
  ACTION_CONFIRM,
  GET_ERRORS,
  CLEAR_ERRORS,
  IS_LOADING,
  NOT_LOADING,
  CHANGE_CONTEXT
} from "./actionTypes";

// app show confirm state -
// whatItIs should be an object with the form of
// {
//   confirmAction: someActionGenerator,
//   confirmId: 12345,
//   confirmText: 'Are you sure?'
// }
// or reset with an empty object
export const actionConfirm = whatItIs => {
  return { type: ACTION_CONFIRM, payload: whatItIs };
};

// get errors
export const getErrors = err => {
  return {
    type: GET_ERRORS,
    payload: err
  };
};

// clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// app is loading state
export const isLoading = () => {
  return { type: IS_LOADING };
};

// app is not loading state
export const notLoading = () => {
  return { type: NOT_LOADING };
};

// app control context modifier
export const changeControlContext = context => {
  const payload = context === "false";
  return {
    type: CHANGE_CONTEXT,
    payload
  };
};
