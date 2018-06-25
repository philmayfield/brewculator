import React from "react";
import PropTypes from "prop-types";

const AppControl = props => {
  return (
    <section className="app-control z-depth-3 w-100 d-flex">
      {props.children}
    </section>
  );
};

AppControl.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default AppControl;
