import React from "react";
import PropTypes from "prop-types";

const AppControl = props => {
  return (
    <nav className="app-control z-depth-3 w-100 d-flex">{props.children}</nav>
  );
};

AppControl.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default AppControl;
