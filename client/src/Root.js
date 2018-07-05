import React from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import PropTypes from "prop-types";

const middleware = [thunk];

const Root = ({ children, initialState = {} }) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  return <Provider store={store}>{children}</Provider>;
};

Root.propTypes = {
  children: PropTypes.object.isRequired,
  initialState: PropTypes.object
};

export default Root;
