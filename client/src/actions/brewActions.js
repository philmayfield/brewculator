// actions related to brews - get brews(s) / create / update / delete

import axios from "axios";
import { getErrors, clearErrors, isLoading, notLoading } from "./appActions";
import { getVersion } from "./versionActions";
import { getAllGravities, setGravity } from "./gravityActions";
import { GET_BREW, SET_BREW, GET_BREWS, DELETE_BREW } from "./actionTypes";

// READ - all brews for a version id
export const getAllBrews = id => dispatch => {
  dispatch(isLoading("getAllBrews"));

  axios
    .get(`/api/brews/${id}`)
    .then(res => {
      dispatch({
        type: GET_BREWS,
        payload: res.data
      });
      dispatch(notLoading("getAllBrews"));
    })
    .catch(err => {
      dispatch(notLoading("getAllBrews"));
      dispatch(getErrors(err.response.data));
    });
};

// READ - one brew by id
export const getBrew = id => dispatch => {
  dispatch(isLoading("getBrew"));

  axios
    .get(`/api/brew/${id}`)
    .then(res => {
      sessionStorage.setItem("brewId", id);
      dispatch({
        type: GET_BREW,
        payload: res.data
      });
      dispatch(notLoading("getBrew"));
      return res.data;
    })
    .then(brew => {
      // fetch the version and gravities associated with brew
      Promise.all([
        dispatch(getVersion(brew.version)),
        dispatch(getAllGravities(brew._id)),
        dispatch(setGravity({}))
      ]);
      return brew;
    })
    .catch(err => {
      dispatch(notLoading("getBrew"));
      dispatch(getErrors(err.response.data));
    });
};

// UPDATE - one brew by id
export const saveBrew = (brew, history) => dispatch => {
  dispatch(isLoading("saveBrew"));
  dispatch(clearErrors());

  const { _id } = brew;

  axios
    .post(`/api/brew/${_id}`, brew)
    .then(() => {
      dispatch(setBrew(brew));
      dispatch(notLoading("saveBrew"));
      return history.push(`/brew/${_id}`);
    })
    .catch(err => {
      dispatch(notLoading("saveBrew"));
      dispatch(getErrors(err.response.data));
    });
};

// CREATE - one new brew
export const makeBrew = (brew, history) => dispatch => {
  dispatch(isLoading("makeBrew"));
  dispatch(clearErrors());

  axios
    .post(`/api/brew/`, brew)
    .then(({ data }) => {
      dispatch(notLoading("makeBrew"));
      return history.push(`/brew/${data._id}`);
    })
    .catch(err => {
      dispatch(notLoading("makeBrew"));
      dispatch(getErrors(err.response.data));
    });
};

// DELETE - one brew by id
export const deleteBrew = id => dispatch => {
  dispatch(isLoading("deleteBrew"));
  dispatch(clearErrors());

  axios
    .delete(`/api/brew/${id}`)
    .then(() => {
      sessionStorage.setItem("brewId", null);
      dispatch({
        type: DELETE_BREW,
        payload: id
      });
      dispatch(notLoading("deleteBrew"));
    })
    .catch(err => {
      dispatch(notLoading("deleteBrew"));
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
