// actions related to versions - get versions(s) / create / update / delete

import axios from "axios";
import {
  // clearErrors,
  isLoading,
  notLoading
} from "./appActions";
// import { getRecipe } from "./recipeActions";
import {
  GET_ERRORS,
  // GET_BREW,
  GET_BREWS
  // DELETE_BREW
} from "./actionTypes";

// READ - all brews for a version
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

// READ - one version by id
// export const getVersion = id => dispatch => {
//   dispatch(clearErrors());
//   dispatch(isLoading());

//   axios
//     .get(`/api/version/${id}`)
//     .then(res => {
//       dispatch({
//         type: GET_VERSION,
//         payload: res.data
//       });
//       dispatch(notLoading());
//       return res.data;
//     })
//     .then(version => {
//       Promise.all([
//         dispatch(getRecipe(version.recipe)),
//         dispatch(getAllBrews(version._id))
//       ]);
//       return version;
//     })
//     .catch(err => {
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       });
//       dispatch(notLoading());
//     });
// };

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

// DELETE - one version by id
// export const deleteVersion = id => dispatch => {
//   dispatch(clearErrors());
//   dispatch(isLoading());

//   axios
//     .delete(`/api/version/${id}`)
//     .then(() => {
//       dispatch({
//         type: DELETE_VERSION,
//         payload: id
//       });
//       dispatch(notLoading());
//     })
//     .catch(err => {
//       dispatch({
//         type: GET_ERRORS,
//         payload: err
//       });
//       dispatch(notLoading());
//     });
// };
