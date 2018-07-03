import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { notEmpty } from "../../common/empty";

const RecipeDeets = props => {
  const {
    brew = null,
    version = null,
    recipe = null,
    author = null,
    loading = false
  } = props;

  const displayName = recipe => {
    if (recipe && recipe.name) {
      return (
        <h1 className="d-inline-flex flex-wrap align-items-baseline">
          <span className="mr-3">{recipe.name}</span>
          <small>{recipe.style}</small>
        </h1>
      );
    }
  };
  const displayByLine = (recipe, author) => {
    if (recipe) {
      return (
        <p className={`text-muted ${version || brew ? "mb-2" : "mb-0"}`}>
          Added {author && `by ${author.username}`} on{" "}
          <span className="text-nowrap">
            {moment(recipe.date).format("MMM D, YYYY")}
          </span>
        </p>
      );
    }
  };
  const displayVersion = version => {
    if (version && notEmpty(version._id)) {
      return (
        <div className="col-auto col-sm-6 mb-3">
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
        <div className="col-auto col-sm-6 mb-3">
          <h5 className="m-0">
            Brewed {moment.utc(brew.date).format("MMM D, YYYY")}
          </h5>
          <p className={`m-0 ${brew.notes ? "" : "d-none"}`}>{brew.notes}</p>
        </div>
      );
    }
  };
  const hasGravitiesContent = notEmpty(props.gravitiesContent);

  return (
    !loading && (
      <div>
        {displayName(recipe)}
        <div className="info-container recipe-deets p-3 mb-3 z-depth-3">
          {displayByLine(recipe, author)}
          <div className="row">
            {displayVersion(version)}
            {displayBrew(brew)}
          </div>
          {hasGravitiesContent && (
            <div>
              <hr className="mt-0" />
              {props.gravitiesContent}
            </div>
          )}
        </div>
      </div>
    )
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
