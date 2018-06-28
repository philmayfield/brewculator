// actions related to gravities - get gravity(ies) / create / update / delete

import axios from "axios";
import {
  getErrors,
  clearErrors,
  isLoading,
  notLoading,
  defaultContext
} from "./appActions";
import { getBrew } from "./brewActions";
import {
  GET_GRAVITY,
  SET_GRAVITY,
  GET_GRAVITIES,
  DELETE_GRAVITY
} from "./actionTypes";

// READ - all gravities for a brew id
export const getAllGravities = id => dispatch => {
  dispatch(isLoading());
  dispatch(defaultContext());

  axios
    .get(`/api/gravities/${id}`)
    .then(res => {
      dispatch({
        type: GET_GRAVITIES,
        payload: res.data
      });
      dispatch(notLoading());
    })
    .catch(err => {
      dispatch(notLoading());
      dispatch(getErrors(err.response.data));
    });
};

// READ - one gravity by id
export const getGravity = id => dispatch => {
  dispatch(isLoading());

  axios
    .get(`/api/gravity/${id}`)
    .then(res => {
      sessionStorage.setItem("gravityId", id);
      dispatch({
        type: GET_GRAVITY,
        payload: res.data
      });
      dispatch(notLoading());
      return res.data;
    })
    .then(gravity => {
      // fetch the brew associated with gravity
      dispatch(getBrew(gravity.brew));
      return gravity;
    })
    .catch(err => {
      console.log("err", err);
      dispatch(notLoading());
      dispatch(getErrors(err.response.data));
    });
};

// UPDATE - one gravity by id
export const saveGravity = (gravity, history) => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading());
  dispatch(defaultContext());

  const { _id } = gravity;

  axios
    .post(`/api/gravity/${_id}`, gravity)
    .then(({ data }) => {
      dispatch(setGravity(gravity));
      dispatch(notLoading());
      return history.push(`/brew/${data.brew}`);
    })
    .catch(err => {
      dispatch(notLoading());
      dispatch(getErrors(err.response.data));
    });
};

// CREATE - one new gravity
export const makeGravity = (gravity, history) => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading());

  axios
    .post(`/api/gravity/`, gravity)
    .then(({ data }) => {
      dispatch(notLoading());
      return history.push(`/brew/${data.brew}`);
    })
    .catch(err => {
      dispatch(notLoading());
      dispatch(getErrors(err.response.data));
    });
};

// DELETE - one gravity by id
export const deleteGravity = id => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading());
  dispatch(defaultContext());

  axios
    .delete(`/api/gravity/${id}`)
    .then(() => {
      sessionStorage.setItem("gravityId", null);
      dispatch({
        type: DELETE_GRAVITY,
        payload: id
      });
      dispatch(notLoading());
    })
    .catch(err => {
      dispatch(notLoading());
      dispatch(getErrors(err.response.data));
    });
};

export const setGravity = gravity => {
  sessionStorage.setItem("gravityId", gravity._id);
  return {
    type: SET_GRAVITY,
    payload: gravity
  };
};
