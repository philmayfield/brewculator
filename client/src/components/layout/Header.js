import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();

    this.props.logoutUser();
  }

  render() {
    const { isAuth } = this.props.auth;

    const loginBtn = (
      <Link className="nav-item nav-link" to="/login">
        Login
      </Link>
    );

    const logoutBtn = (
      <div className="loggedIn d-flex align-items-center">
        <span>{this.props.auth.user.username}</span>
        <button
          className="btn btn-link nav-item nav-link"
          onClick={this.handleLogout}
        >
          Logout
        </button>
      </div>
    );

    return (
      <header className="z-depth-3">
        <div className="d-flex">
          <h3 className="logo">Brewculator</h3>
          <nav className="d-flex w-100">
            <Link className="nav-item nav-link mr-auto" to="/recipes">
              Recipes
            </Link>
            {isAuth ? logoutBtn : loginBtn}
          </nav>
        </div>
        <hr className="mt-0" />
      </header>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
