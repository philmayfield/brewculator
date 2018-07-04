import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import PropTypes from "prop-types";

const Root = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

Root.propTypes = {
  children: PropTypes.object.isRequired,
  initialState: PropTypes.object
};

export default Root;
