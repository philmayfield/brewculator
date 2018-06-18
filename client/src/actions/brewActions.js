// actions related to brews - get brews(s) / create / update / delete

import axios from "axios";
import { clearErrors, isLoading, notLoading } from "./appActions";
import { getVersion } from "./versionActions";
import {
  GET_ERRORS,
  GET_BREW,
  SET_BREW,
  GET_BREWS,
  DELETE_BREW
} from "./actionTypes";

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
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch(notLoading());
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
      // fetch the version associated with brew
      dispatch(getVersion(brew.version));
      return brew;
    })
    .catch(err => {
      console.log("catching", err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch(notLoading());
    });
};

// UPDATE - one recipes by id
// export const saveRecipe = (recipe, history) => dispatch => {
//   dispatch(clearErrors());
//   dispatch(isLoading());

//   const { _id } = recipe;

//   axios
//     .get(`/api/recipe/${_id}`, recipe)
//     .then(() => {
//       return history.push(`/recipe/${_id}`);
//     })
//     .catch(err => {
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       });
//     })
//     .finally(() => dispatch(notLoading()));
// };

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
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
      dispatch(notLoading());
    });
};

export const setBrew = brew => {
  sessionStorage.setItem("brewId", brew._id);
  return {
    type: SET_BREW,
    payload: brew
  };
};
