import React from "react";
import PropTypes from "prop-types";
import BrewList from "./BrewList";
import Alert from "../common/Alert";

const Brews = props => {
  const makeBrewContent = brews => {
    const hasBrews = brews.length > 0;
    const noBrews = brews && brews.noBrews;
    let brewsContent;

    if (hasBrews) {
      brewsContent = <BrewList brews={brews} />;
    } else if (noBrews) {
      brewsContent = (
        <Alert bsStyle="alert-success" heading="No brews yet">
          <p className="mb-0">{noBrews}</p>
        </Alert>
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
