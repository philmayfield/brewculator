// actions related to versions - get versions(s) / create / update / delete

import axios from "axios";
import { getErrors, clearErrors, isLoading, notLoading } from "./appActions";
import { getRecipe } from "./recipeActions";
import { getAllBrews } from "./brewActions";
import {
  GET_VERSION,
  SET_VERSION,
  GET_VERSIONS,
  DELETE_VERSION
} from "./actionTypes";

// READ - all versions for a recipe id
export const getAllVersions = id => dispatch => {
  dispatch(isLoading("getAllVersions"));

  axios
    .get(`/api/versions/${id}`)
    .then(res => {
      dispatch({
        type: GET_VERSIONS,
        payload: res.data
      });
      dispatch(notLoading("getAllVersions"));
    })
    .catch(err => {
      dispatch(notLoading("getAllVersions"));
      dispatch(getErrors(err.response.data));
    });
};

// READ - one version by id
export const getVersion = id => dispatch => {
  dispatch(isLoading("getVersion"));

  axios
    .get(`/api/version/${id}`)
    .then(res => {
      sessionStorage.setItem("versionId", id);
      dispatch({
        type: GET_VERSION,
        payload: res.data
      });
      dispatch(notLoading("getVersion"));
      return res.data;
    })
    .then(version => {
      Promise.all([
        dispatch(getRecipe(version.recipe)),
        dispatch(getAllBrews(version._id))
      ]);
      return version;
    })
    .catch(err => {
      dispatch(notLoading("getVersion"));
      dispatch(getErrors(err.response.data));
    });
};

// UPDATE - one versions by id
export const saveVersion = (version, history) => dispatch => {
  dispatch(isLoading("saveVersion"));
  dispatch(clearErrors());

  const { _id } = version;

  axios
    .post(`/api/version/${_id}`, version)
    .then(() => {
      dispatch(setVersion(version));
      dispatch(notLoading("saveVersion"));
      return history.push(`/version/${_id}`);
    })
    .catch(err => {
      dispatch(notLoading("saveVersion"));
      dispatch(getErrors(err.response.data));
    });
};

// CREATE - one new version
export const makeVersion = (version, history) => dispatch => {
  dispatch(isLoading("makeVersion"));

  axios
    .post(`/api/version/`, version)
    .then(({ data }) => {
      dispatch(notLoading("makeVersion"));
      return history.push(`/version/${data._id}`);
    })
    .catch(err => {
      dispatch(notLoading("makeVersion"));
      dispatch(getErrors(err.response.data));
    });
};

// DELETE - one version by id
export const deleteVersion = id => dispatch => {
  dispatch(isLoading("deleteVersion"));
  dispatch(clearErrors());

  axios
    .delete(`/api/version/${id}`)
    .then(() => {
      sessionStorage.setItem("versionId", null);
      dispatch({
        type: DELETE_VERSION,
        payload: id
      });
      dispatch(notLoading("deleteVersion"));
    })
    .catch(err => {
      dispatch(notLoading("deleteVersion"));
      dispatch(getErrors(err.response.data));
    });
};

// helpers

export const setVersion = recipe => {
  sessionStorage.setItem("versionId", recipe._id);
  return {
    type: SET_VERSION,
    payload: recipe
  };
};
