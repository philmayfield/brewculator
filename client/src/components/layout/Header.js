import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import getImg from "../../common/getImg";
import ReactSVG from "react-svg";

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
    const logoImg = getImg("logo");
    const linkClasses = "btn btn-link btn-empty ml-3";

    const loginBtn = (
      <Link className={linkClasses} to="/login">
        Login
      </Link>
    );

    const logoutBtn = (
      <button className={linkClasses} onClick={this.handleLogout}>
        Logout
      </button>
    );

    return (
      <header className="z-depth-3 mb-3">
        <div className="d-flex container">
          <Link className="logo" to="/recipes">
            <ReactSVG path={logoImg} svgClassName="" />
          </Link>
          <nav
            className={`d-flex flex-wrap align-items-center justify-content-end w-100 ${isAuth &&
              "loggedIn"}`}
          >
            {isAuth && (
              <span className="username d-flex align-items-center">
                <ReactSVG
                  path={getImg("baselineAccountCircle24px")}
                  svgClassName={"mr-2"}
                />
                {this.props.auth.user.username}
              </span>
            )}
            {isAuth ? logoutBtn : loginBtn}
          </nav>
        </div>
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
