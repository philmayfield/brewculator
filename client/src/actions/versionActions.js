// actions related to versions - get versions(s) / create / update / delete

import axios from "axios";
import { clearErrors, isLoading, notLoading } from "./appActions";
import { getRecipe } from "./recipeActions";
import { getAllBrews } from "./brewActions";
import {
  GET_ERRORS,
  GET_VERSION,
  SET_VERSION,
  GET_VERSIONS,
  DELETE_VERSION
} from "./actionTypes";

// READ - all versions
export const getAllVersions = id => dispatch => {
  dispatch(isLoading());
  axios
    .get(`/api/versions/${id}`)
    .then(res => {
      dispatch({
        type: GET_VERSIONS,
        payload: res.data
      });
      dispatch(notLoading());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch(notLoading());
    });
};

// READ - one version by id
export const getVersion = id => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading());

  axios
    .get(`/api/version/${id}`)
    .then(res => {
      dispatch({
        type: GET_VERSION,
        payload: res.data
      });
      dispatch(notLoading());
      return res.data;
    })
    .then(version => {
      Promise.all([
        dispatch(getRecipe(version.recipe)),
        dispatch(getAllBrews(version._id))
      ]);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch(notLoading());
    });
};

// UPDATE - one versions by id
export const saveVersion = (version, history) => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading());

  const { _id } = version;

  axios
    .post(`/api/version/${_id}`, version)
    .then(() => {
      dispatch({
        type: SET_VERSION,
        payload: version
      });
      return history.push(`/version/${_id}`);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    })
    .finally(() => dispatch(notLoading()));
};

// CREATE - one new version
export const makeVersion = (version, history) => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading());

  axios
    .post(`/api/version/`, version)
    .then(({ data }) => {
      dispatch(notLoading());
      return history.push(`/version/${data._id}`);
    })
    .catch(err => {
      dispatch(notLoading());
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// DELETE - one version by id
export const deleteVersion = id => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading());

  axios
    .delete(`/api/version/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_VERSION,
        payload: id
      });
      dispatch(notLoading());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
      dispatch(notLoading());
    });
};

// helpers

export const setVersion = recipe => {
  return {
    type: SET_VERSION,
    payload: recipe
  };
};
