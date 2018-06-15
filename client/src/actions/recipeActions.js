// actions related to recipes - get recipe(s) / create / update / delete

import axios from "axios";
import { getUsername } from "./authActions";
import { clearErrors, isLoading, notLoading } from "./appActions";
import { getAllVersions } from "./versionActions";
import {
  GET_ERRORS,
  GET_RECIPE,
  SET_RECIPE,
  GET_RECIPES,
  DELETE_RECIPE
} from "./actionTypes";

// READ - all recipes
export const getAllRecipes = () => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading());

  axios
    .get("/api/recipe/all")
    .then(res => {
      dispatch({
        type: GET_RECIPES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    })
    .finally(() => dispatch(notLoading()));
};

// READ - one recipe by id
export const getRecipe = id => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading());

  axios
    .get(`/api/recipe/${id}`)
    .then(res => {
      dispatch({
        type: GET_RECIPE,
        payload: res.data
      });
      dispatch(notLoading());
      return res.data;
    })
    .then(recipe => {
      Promise.all([
        dispatch(getUsername(recipe.author)),
        dispatch(getAllVersions(recipe._id))
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

// UPDATE - one recipes by id
export const saveRecipe = (recipe, history) => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading());

  const { _id } = recipe;

  axios
    .post(`/api/recipe/${_id}`, recipe)
    .then(res => {
      dispatch({
        type: SET_RECIPE,
        payload: res.data
      });
      dispatch(notLoading());
      return history.push(`/recipe/${_id}`);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// CREATE - one new recipe
export const makeRecipe = (recipe, history) => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading());

  axios
    .post("/api/recipe/", recipe)
    .then(({ data }) => {
      dispatch(notLoading());
      return history.push(`/recipe/${data._id}`);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// DELETE - one recipe by id
export const deleteRecipe = id => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading());

  axios
    .delete(`/api/recipe/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_RECIPE,
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

export const setRecipe = recipe => {
  return {
    type: SET_RECIPE,
    payload: recipe
  };
};
