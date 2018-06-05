import { SET_CURRENT_USER } from "../actions/actionTypes";
import { notEmpty } from "../common/empty";

const initialState = {
  isAuth: false,
  user: {}
};

// every reducer receives all actions, and processes switch to see if the action type applies to them
// reducer returns an updated version of the state, based on the switch statement
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuth: notEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
