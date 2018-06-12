// actions related to versions - get versions(s) / create / update / delete

import axios from "axios";
// import { getUser } from "./authActions";
// import {
//   clearErrors,
//   isLoading,
//   notLoading
//  } from "./appActions";
import {
  GET_ERRORS,
  // GET_VERSION,
  GET_VERSIONS
  // DELETE_VERSION
} from "./actionTypes";

// READ - all versions
export const getAllVersions = id => dispatch => {
  axios
    .get(`/api/versions/${id}`)
    .then(res => {
      dispatch({
        type: GET_VERSIONS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// READ - one recipes by id
// export const getRecipe = id => dispatch => {
//   dispatch(clearErrors());
//   dispatch(isLoading());

//   axios
//     .get(`/api/recipe/${id}`)
//     .then(res => {
//       dispatch({
//         type: GET_RECIPE,
//         payload: res.data
//       });
//       return res.data;
//     })
//     .then(recipe => {
//       dispatch(getUser(recipe.author));
//       return recipe;
//     })
//     .then(something => {
//       console.log("something", something);
//     })
//     .catch(err => {
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       });
//     })
//     .finally(() => dispatch(notLoading()));
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

// DELETE - one recipe by id
// export const deleteRecipe = id => dispatch => {
//   dispatch(clearErrors());
//   dispatch(isLoading());

//   axios
//     .delete(`/api/recipe/${id}`)
//     .then(() => {
//       dispatch({
//         type: DELETE_RECIPE,
//         payload: id
//       });
//     })
//     .catch(err => {
//       dispatch({
//         type: GET_ERRORS,
//         payload: err
//       });
//     })
//     .finally(() => dispatch(notLoading()));
// };

// helpers

// export const setRecipe = recipe => {
//   return {
//     type: GET_RECIPE,
//     payload: recipe
//   };
// };
