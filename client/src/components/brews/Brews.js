import React from "react";
import PropTypes from "prop-types";
import BrewList from "./BrewList";

const Brews = props => {
  const makeBrewContent = brews => {
    const hasBrews = brews.length > 0;
    const noBrews = brews && brews.noBrews;
    let brewsContent;

    if (hasBrews) {
      brewsContent = <BrewList brews={brews} />;
    } else if (noBrews) {
      brewsContent = (
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">No brews yet</h4>
          <p className="mb-0">{noBrews}</p>
        </div>
      );
    }
    return brewsContent;
  };

  return (
    <div>
      <h5>Brews</h5>
      {makeBrewContent(props.brews)}
    </div>
  );
};

Brews.propTypes = {
  brews: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default Brews;
