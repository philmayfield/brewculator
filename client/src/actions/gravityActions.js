// actions related to gravities - get gravity(ies) / create / update / delete

import axios from "axios";
import { getErrors, clearErrors, isLoading, notLoading } from "./appActions";
import { getBrew } from "./brewActions";
import {
  GET_GRAVITY,
  SET_GRAVITY,
  UNSET_GRAVITY,
  GET_GRAVITIES,
  DELETE_GRAVITY
} from "./actionTypes";

// READ - all gravities for a brew id
export const getAllGravities = id => dispatch => {
  dispatch(isLoading("getAllGravities"));

  axios
    .get(`/api/gravities/${id}`)
    .then(res => {
      dispatch({
        type: GET_GRAVITIES,
        payload: res.data
      });
      dispatch(notLoading("getAllGravities"));
    })
    .catch(err => {
      dispatch(notLoading("getAllGravities"));
      dispatch(getErrors(err.response.data));
    });
};

// READ - one gravity by id
export const getGravity = id => dispatch => {
  dispatch(isLoading("getGravity"));

  axios
    .get(`/api/gravity/${id}`)
    .then(res => {
      sessionStorage.setItem("gravityId", id);
      dispatch({
        type: GET_GRAVITY,
        payload: res.data
      });
      dispatch(notLoading("getGravity"));
      return res.data;
    })
    .then(gravity => {
      // fetch the brew associated with gravity
      dispatch(getBrew(gravity.brew));
      return gravity;
    })
    .catch(err => {
      dispatch(notLoading("getGravity"));
      dispatch(getErrors(err.response.data));
    });
};

// UPDATE - one gravity by id
export const saveGravity = (gravity, history) => dispatch => {
  dispatch(isLoading("saveGravity"));
  dispatch(clearErrors());

  const { _id } = gravity;

  axios
    .post(`/api/gravity/${_id}`, gravity)
    .then(({ data }) => {
      dispatch(setGravity(gravity));
      dispatch(notLoading("saveGravity"));
      return history.push(`/brew/${data.brew}`);
    })
    .catch(err => {
      dispatch(notLoading("saveGravity"));
      dispatch(getErrors(err.response.data));
    });
};

// CREATE - one new gravity
export const makeGravity = (gravity, history) => dispatch => {
  dispatch(isLoading("makeGravity"));
  dispatch(clearErrors());

  axios
    .post(`/api/gravity/`, gravity)
    .then(({ data }) => {
      dispatch(notLoading("makeGravity"));
      return history.push(`/brew/${data.brew}`);
    })
    .catch(err => {
      dispatch(notLoading("makeGravity"));
      dispatch(getErrors(err.response.data));
    });
};

// DELETE - one gravity by id
export const deleteGravity = id => dispatch => {
  dispatch(isLoading("deleteGravity"));
  dispatch(clearErrors());

  axios
    .delete(`/api/gravity/${id}`)
    .then(() => {
      sessionStorage.setItem("gravityId", null);
      dispatch({
        type: DELETE_GRAVITY,
        payload: id
      });
      dispatch(notLoading("deleteGravity"));
    })
    .catch(err => {
      dispatch(notLoading("deleteGravity"));
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

export const unsetGravity = () => {
  sessionStorage.setItem("gravityId", null);
  return {
    type: UNSET_GRAVITY
  };
};
