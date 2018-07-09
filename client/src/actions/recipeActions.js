// actions related to recipes - get recipe(s) / create / update / delete

import axios from "axios";
import { getUsername } from "./authActions";
import { getErrors, clearErrors, isLoading, notLoading } from "./appActions";
import { getAllVersions } from "./versionActions";
import {
  GET_RECIPE,
  SET_RECIPE,
  GET_RECIPES,
  DELETE_RECIPE
} from "./actionTypes";

// READ - all recipes
export const getAllRecipes = () => dispatch => {
  // dispatch(clearErrors());
  dispatch(isLoading("getAllRecipes"));

  axios
    .get("/api/recipe/all")
    .then(res => {
      dispatch({
        type: GET_RECIPES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(notLoading("getAllRecipes"));
      const error = err.response ? err.response.data : err;
      dispatch(getErrors(error));
    })
    .finally(() => dispatch(notLoading("getAllRecipes")));
};

// READ - one recipe by id
export const getRecipe = id => dispatch => {
  // dispatch(clearErrors());
  dispatch(isLoading("getRecipe"));

  axios
    .get(`/api/recipe/${id}`)
    .then(res => {
      const payload = checkResetVersion(res.data);

      dispatch({
        type: GET_RECIPE,
        payload
      });

      return payload;
    })
    .then(recipe => {
      Promise.all([
        dispatch(getUsername(recipe.author)),
        dispatch(getAllVersions(recipe._id))
      ]);
    })
    .catch(err => {
      const error = err.response ? err.response.data : err;
      dispatch(getErrors(error));
    })
    .finally(() => dispatch(notLoading("getRecipe")));
};

// UPDATE - one recipes by id
export const saveRecipe = (recipe, history) => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading("saveRecipe"));

  const { _id } = recipe;

  axios
    .post(`/api/recipe/${_id}`, recipe)
    .then(res => {
      dispatch({
        type: SET_RECIPE,
        payload: res.data
      });
      return history.push(`/recipe/${_id}`);
    })
    .catch(err => {
      const error = err.response ? err.response.data : err;
      dispatch(getErrors(error));
    })
    .finally(() => dispatch(notLoading("saveRecipe")));
};

// CREATE - one new recipe
export const makeRecipe = (recipe, history) => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading("makeRecipe"));

  axios
    .post("/api/recipe/", recipe)
    .then(({ data }) => {
      return history.push(`/recipe/${data._id}`);
    })
    .catch(err => {
      const error = err.response ? err.response.data : err;
      dispatch(getErrors(error));
    })
    .finally(() => dispatch(notLoading("makeRecipe")));
};

// DELETE - one recipe by id
export const deleteRecipe = id => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading("deleteRecipe"));

  axios
    .delete(`/api/recipe/${id}`)
    .then(() => {
      sessionStorage.setItem("recipeId", null);
      dispatch({
        type: DELETE_RECIPE,
        payload: id
      });
    })
    .catch(err => {
      const error = err.response ? err.response.data : err;
      dispatch(getErrors(error));
    })
    .finally(() => dispatch(notLoading("deleteRecipe")));
};

// helpers

export const setRecipe = recipe => {
  const payload = checkResetVersion(recipe);
  return {
    type: SET_RECIPE,
    payload
  };
};

const checkResetVersion = payload => {
  if (payload && payload._id !== sessionStorage.getItem("recipeId")) {
    payload.version = {
      brews: [],
      brew: {
        gravities: [],
        gravity: {}
      }
    };
    // set session storage
    sessionStorage.setItem("recipeId", payload._id);
  }
  return payload;
};
