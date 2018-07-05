import React from "react";
import { Provider } from "react-redux";
import getStore from "./store";
import PropTypes from "prop-types";

const Root = ({ children, initialState = {} }) => {
  const store = getStore(initialState);
  return <Provider store={store}>{children}</Provider>;
};

Root.propTypes = {
  children: PropTypes.object.isRequired,
  initialState: PropTypes.object
};

export default Root;
