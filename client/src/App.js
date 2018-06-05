import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route
  // Switch
} from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import store from "./store";

import setAuthToken from "./common/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// Components
import Landing from "./components/layout/Landing";
import Signup from "./components/register/Signup";
import Login from "./components/login/Login";

import "./App.css";

// check for token
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;

  // set auth token header to the token
  setAuthToken(token);

  // decode token to get user data
  const decoded = jwt_decode(token);

  // set current user and isAuth
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // log out user
    store.dispatch(logoutUser());

    // redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route path="/" component={Landing} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/login/:user?" component={Login} exact />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
