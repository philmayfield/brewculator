import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { notEmpty } from "../../common/empty";

const RecipeDeets = props => {
  const displayRecipe = (recipe, author) => {
    if (recipe) {
      return (
        <div>
          {recipe.name && (
            <div className="d-flex flex-wrap align-items-baseline mb-3">
              <h1 className="m-0 mr-3">{recipe.name}</h1>
              <h4 className="m-0">{recipe.style}</h4>
            </div>
          )}
          <p className="m-0">
            Added {author && `by ${author.username}`} on{" "}
            {moment(recipe.date).format("MMM D, YYYY")}
          </p>
        </div>
      );
    }
  };
  const displayVersion = version => {
    if (version && notEmpty(version._id)) {
      return (
        <div>
          <h4 className="m-0">Version {version.version}</h4>
          <p className={`${version.notes ? "" : "d-none"}`}>{version.notes}</p>
        </div>
      );
    }
  };
  const displayBrew = brew => {
    if (brew && notEmpty(brew._id)) {
      return (
        <div>
          <h4 className="m-0">
            Brewed on {moment(brew.date).format("MMM D, YYYY")}
          </h4>
          <p className={`${brew.notes ? "" : "d-none"}`}>{brew.notes}</p>
        </div>
      );
    }
  };

  return (
    <div className="recipe-deets p-3 mb-3 z-depth-3">
      {displayRecipe(props.recipe, props.author)}
      {displayVersion(props.version)}
      {displayBrew(props.brew)}
    </div>
  );
};

RecipeDeets.propTypes = {
  recipe: PropTypes.object,
  author: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  version: PropTypes.object,
  brew: PropTypes.object
};

export default RecipeDeets;
