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
      dispatch(getErrors(err.response.data));
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
      dispatch(notLoading("getRecipe"));
      return payload;
    })
    .then(recipe => {
      Promise.all([
        dispatch(getUsername(recipe.author)),
        dispatch(getAllVersions(recipe._id))
      ]);
    })
    .catch(err => {
      dispatch(notLoading("getRecipe"));
      dispatch(getErrors(err.response.data));
    });
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
      dispatch(notLoading("saveRecipe"));
      return history.push(`/recipe/${_id}`);
    })
    .catch(err => {
      dispatch(notLoading("saveRecipe"));
      dispatch(getErrors(err.response.data));
    });
};

// CREATE - one new recipe
export const makeRecipe = (recipe, history) => dispatch => {
  dispatch(clearErrors());
  dispatch(isLoading("makeRecipe"));

  axios
    .post("/api/recipe/", recipe)
    .then(({ data }) => {
      dispatch(notLoading("makeRecipe"));
      return history.push(`/recipe/${data._id}`);
    })
    .catch(err => {
      dispatch(notLoading("makeRecipe"));
      dispatch(getErrors(err.response.data));
    });
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
      dispatch(notLoading("deleteRecipe"));
    })
    .catch(err => {
      dispatch(notLoading("deleteRecipe"));
      dispatch(getErrors(err.response.data));
    });
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
