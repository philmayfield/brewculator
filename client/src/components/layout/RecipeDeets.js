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
            <h1 className="d-flex flex-wrap align-items-baseline mb-1">
              <span className="mr-3">{recipe.name}</span>
              <small>{recipe.style}</small>
            </h1>
          )}
          <p
            className={`text-muted ${!props.version && !props.brew && "mb-0"}`}
          >
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
        <div className="col">
          <h5 className="m-0">Version {version.version}</h5>
          <p className={`m-0 ${version.notes ? "" : "d-none"}`}>
            {version.notes}
          </p>
        </div>
      );
    }
  };
  const displayBrew = brew => {
    if (brew && notEmpty(brew._id)) {
      return (
        <div className="col">
          <h5 className="m-0">
            Brewed {moment(brew.date).format("MMM D, YYYY")}
          </h5>
          <p className={`m-0 ${brew.notes ? "" : "d-none"}`}>{brew.notes}</p>
        </div>
      );
    }
  };
  const hasGravitiesContent = notEmpty(props.gravitiesContent);

  return (
    <div className="recipe-deets p-3 mb-3 z-depth-3">
      {displayRecipe(props.recipe, props.author)}
      <div className="row">
        {displayVersion(props.version)}
        {displayBrew(props.brew)}
      </div>
      {hasGravitiesContent && (
        <div>
          <hr />
          {props.gravitiesContent}
        </div>
      )}
    </div>
  );
};

RecipeDeets.propTypes = {
  recipe: PropTypes.object,
  author: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  version: PropTypes.object,
  brew: PropTypes.object,
  gravitiesContent: PropTypes.object
};

export default RecipeDeets;
