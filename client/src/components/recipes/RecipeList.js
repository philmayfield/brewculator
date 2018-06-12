import React from "react";
import PropTypes from "prop-types";
import RecipeListItem from "./RecipeListItem";
import { notEmpty } from "../../common/empty";

const RecipeList = props => {
  const { recipes } = props;
  const recipeItems =
    notEmpty(recipes) &&
    recipes.map(recipe => {
      return <RecipeListItem key={recipe._id} recipe={recipe} />;
    });

  return <div className="list-group">{recipeItems}</div>;
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired
};
export default RecipeList;
