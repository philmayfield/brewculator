import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuth) {
      // TODO: figure out where to push to on authenticated login
      this.props.history.push("/somewhere");
    }
  }

  render() {
    return (
      <div>
        <h1>Landing</h1>
        <Link className="btn btn-primary" to="/login">
          Log In
        </Link>
        <Link className="btn btn-primary" to="/signup">
          Sign Up
        </Link>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
