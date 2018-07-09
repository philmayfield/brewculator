// actions related to brews - get brews(s) / create / update / delete

import axios from "axios";
import { getErrors, clearErrors, isLoading, notLoading } from "./appActions";
import { getVersion } from "./versionActions";
import { getAllGravities } from "./gravityActions";
import {
  GET_BREW,
  SET_BREW,
  UNSET_BREW,
  GET_BREWS,
  DELETE_BREW
} from "./actionTypes";

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
    })
    .catch(err => {
      const error = err.response ? err.response.data : err;
      dispatch(getErrors(error));
    })
    .finally(() => dispatch(notLoading("getAllBrews")));
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
      const error = err.response ? err.response.data : err;
      dispatch(getErrors(error));
    })
    .finally(() => dispatch(notLoading("getBrew")));
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
      return history.push(`/brew/${_id}`);
    })
    .catch(err => {
      const error = err.response ? err.response.data : err;
      dispatch(getErrors(error));
    })
    .finally(() => dispatch(notLoading("saveBrew")));
};

// CREATE - one new brew
export const makeBrew = (brew, history) => dispatch => {
  dispatch(isLoading("makeBrew"));
  dispatch(clearErrors());

  axios
    .post(`/api/brew/`, brew)
    .then(({ data }) => {
      return history.push(`/brew/${data._id}`);
    })
    .catch(err => {
      const error = err.response ? err.response.data : err;
      dispatch(getErrors(error));
    })
    .finally(() => dispatch(notLoading("makeBrew")));
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
    })
    .catch(err => {
      const error = err.response ? err.response.data : err;
      dispatch(getErrors(error));
    })
    .finally(() => dispatch(notLoading("deleteBrew")));
};

export const setBrew = brew => {
  sessionStorage.setItem("brewId", brew._id);
  return {
    type: SET_BREW,
    payload: brew
  };
};

export const unsetBrew = () => {
  sessionStorage.setItem("brewId", null);
  return {
    type: UNSET_BREW
  };
};
