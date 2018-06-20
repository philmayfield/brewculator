// actions related to brews - get brews(s) / create / update / delete

import axios from "axios";
import { getErrors, clearErrors, isLoading, notLoading } from "./appActions";
import { getVersion } from "./versionActions";
import { getAllGravities } from "./gravityActions";
import { GET_BREW, SET_BREW, GET_BREWS, DELETE_BREW } from "./actionTypes";

// READ - all brews for a version id
export const getAllBrews = id => dispatch => {
  dispatch(isLoading());
  axios
    .get(`/api/brews/${id}`)
    .then(res => {
      dispatch({
        type: GET_BREWS,
        payload: res.data
      });
      dispatch(notLoading());
    })
    .catch(err => {
      dispatch(notLoading());
      dispatch(getErrors(err.response.data));
    });
};

// READ - one brew by id
export const getBrew = id => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading());

  axios
    .get(`/api/brew/${id}`)
    .then(res => {
      sessionStorage.setItem("brewId", id);
      dispatch({
        type: GET_BREW,
        payload: res.data
      });
      dispatch(notLoading());
      return res.data;
    })
    .then(brew => {
      // fetch the version and gravities associated with brew
      Promise.all([
        dispatch(getVersion(brew.version)),
        dispatch(getAllGravities(brew._id))
      ]);
      return brew;
    })
    .catch(err => {
      dispatch(notLoading());
      dispatch(getErrors(err.response.data));
    });
};

// UPDATE - one brew by id
export const saveBrew = (brew, history) => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading());

  const { _id } = brew;

  axios
    .post(`/api/brew/${_id}`, brew)
    .then(() => {
      dispatch(setBrew(brew));
      dispatch(notLoading());
      return history.push(`/brew/${_id}`);
    })
    .catch(err => {
      dispatch(notLoading());
      dispatch(getErrors(err.response.data));
    });
};

// CREATE - one new brew
export const makeBrew = (brew, history) => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading());

  axios
    .post(`/api/brew/`, brew)
    .then(({ data }) => {
      dispatch(notLoading());
      return history.push(`/brew/${data._id}`);
    })
    .catch(err => {
      dispatch(notLoading());
      dispatch(getErrors(err.response.data));
    });
};

// DELETE - one brew by id
export const deleteBrew = id => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading());

  axios
    .delete(`/api/brew/${id}`)
    .then(() => {
      sessionStorage.setItem("brewId", null);
      dispatch({
        type: DELETE_BREW,
        payload: id
      });
      dispatch(notLoading());
    })
    .catch(err => {
      dispatch(notLoading());
      dispatch(getErrors(err.response.data));
    });
};

export const setBrew = brew => {
  sessionStorage.setItem("brewId", brew._id);
  return {
    type: SET_BREW,
    payload: brew
  };
};
