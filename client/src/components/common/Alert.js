import React from "react";
import PropTypes from "prop-types";
import { notEmpty } from "../../common/empty";

const Alert = props => {
  const renderHeading = () => {
    if (notEmpty(props.heading)) {
      return <h4 className="alert-heading">{props.heading}</h4>;
    }
  };
  return (
    <div className={`alert ${props.bsStyle}`} role="alert">
      {renderHeading()}
      {props.children}
    </div>
  );
};

Alert.propTypes = {
  bsStyle: PropTypes.string,
  heading: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default Alert;
