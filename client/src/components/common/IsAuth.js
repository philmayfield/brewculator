import { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser, logoutUser } from "../../actions/authActions";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../common/setAuthToken";
import PropTypes from "prop-types";

class IsAuth extends Component {
  constructor(props) {
    super(props);

    // check for token
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;

      // set auth token header to the token
      setAuthToken(token);

      // decode token to get user data
      const decoded = jwt_decode(token);

      // set current user and isAuth
      this.props.setCurrentUser(decoded);

      // check for expired token
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        console.log("login has expired...");

        // log out user
        this.props.logoutUser();

        // redirect to login
        props.history.push(`/login`);
      }
    }
  }

  render() {
    return null;
  }
}

IsAuth.propTypes = {
  history: PropTypes.object.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { setCurrentUser, logoutUser }
)(withRouter(IsAuth));
