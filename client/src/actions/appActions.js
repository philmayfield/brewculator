// actions related to the app - confirmation

import {
  ACTION_CONFIRM,
  CLEAR_ERRORS,
  IS_LOADING,
  NOT_LOADING
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
