// actions related to authentication - registration / login / logout

import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../common/setAuthToken";
import { getErrors, clearErrors, isLoading, notLoading } from "./appActions";
import { CLEAR_ERRORS, GET_USERNAME, SET_CURRENT_USER } from "./actionTypes";

// CREATE - new user
export const registerUser = (userData, history) => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading());

  axios
    .post("/api/user/register", userData)
    .then(() => {
      dispatch({ type: CLEAR_ERRORS });
      // successful registration, send user to login page
      return history.push(`/login/${userData.username}`);
    })
    .catch(err => {
      dispatch(notLoading());
      dispatch(getErrors(err.response.data));
    });
};

// GET - user by id
export const getUser = id => dispatch => {
  // dispatch(clearErrors());
  dispatch(isLoading());

  axios
    .get(`/api/user/${id}`)
    .then(res => {
      dispatch({
        type: GET_USERNAME,
        payload: res.data
      });
      dispatch(notLoading());
    })
    .catch(err => {
      dispatch(notLoading());
      dispatch(getErrors(err.response.data));
    });
};

// GET - username by id
export const getUsername = id => dispatch => {
  // dispatch(clearErrors());
  dispatch(isLoading());

  axios
    .get(`/api/user/username/${id}`)
    .then(res => {
      dispatch({
        type: GET_USERNAME,
        payload: res.data
      });
      dispatch(notLoading());
    })
    .catch(err => {
      dispatch(notLoading());
      dispatch(getErrors(err.response.data));
    });
};

// login a registered user -
export const loginUser = userData => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading());

  axios
    .post("/api/user/login", userData)
    .then(res => {
      console.log("> logging in...");

      dispatch({ type: CLEAR_ERRORS });

      // save the token to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      // set token to auth header for axios calls
      setAuthToken(token);

      // decode token to get user data
      const decoded = jwt_decode(token);

      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch(notLoading());
      dispatch(getErrors(err.response.data));
    });
};

// set currently logged in user
export const setCurrentUser = payload => {
  return {
    type: SET_CURRENT_USER,
    payload
  };
};

// log user out
export const logoutUser = () => dispatch => {
  console.log("> logging out...");

  dispatch(clearErrors());

  // remove token from local storage
  localStorage.removeItem("jwtToken");

  // remove auth header for future axios requests
  setAuthToken(false);

  // set current user to empty object which will also set isAuth to false
  dispatch(setCurrentUser({}));
};
