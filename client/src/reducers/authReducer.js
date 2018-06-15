import { SET_CURRENT_USER, GET_USERNAME } from "../actions/actionTypes";
import { notEmpty } from "../common/empty";

const initialState = {
  isAuth: false,
  user: {},
  users: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuth: notEmpty(action.payload),
        user: action.payload
      };
    case GET_USERNAME:
      return {
        ...state,
        users: [
          ...state.users.filter(user => user._id !== action.payload._id),
          action.payload
        ]
      };
    default:
      return state;
  }
}
