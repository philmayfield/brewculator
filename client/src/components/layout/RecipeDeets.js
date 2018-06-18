import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

import { notEmpty } from "../../common/empty";

const RecipeDeets = props => {
  const displayRecipe = (recipe, author) => {
    if (recipe /*&& notEmpty(recipe._id)*/) {
      return (
        <div>
          <div className="d-flex flex-wrap align-items-baseline mb-3">
            <h1 className="m-0 flex-shrink-0 mr-3">{recipe.name}</h1>
            <h4 className="m-0 flex-shrink-0">{recipe.style}</h4>
          </div>
          <p>
            Added {author && `by ${author.username}`} on{" "}
            {<Moment date={recipe.date} format="MMM D, YYYY" />}
          </p>
        </div>
      );
    }
  };
  const displayVersion = version => {
    if (version && notEmpty(version._id)) {
      return (
        <div>
          <h4 className="m-0 flex-shrink-0">Version {version.version}</h4>
          <p className={`${version.notes ? "" : "d-none"}`}>{version.notes}</p>
        </div>
      );
    }
  };
  const displayBrew = brew => {
    if (brew && notEmpty(brew._id)) {
      return (
        <div>
          <h4 className="m-0 flex-shrink-0">
            Brewed on {<Moment date={brew.date} format="MMM D, YYYY" />}
          </h4>
          <p className={`${brew.notes ? "" : "d-none"}`}>{brew.notes}</p>
        </div>
      );
    }
  };

  return (
    <div className="recipe-deets">
      {displayRecipe(props.recipe, props.author)}
      {displayVersion(props.version)}
      {displayBrew(props.brew)}
      <hr />
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
