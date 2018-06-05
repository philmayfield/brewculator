import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import Input from "../common/Input";

class Login extends Component {
  constructor(props) {
    super(props);

    const user = this.props.match.params.user;

    this.state = {
      username: user ? user : "",
      password: "",
      errors: {}
    };

    this.inputChange = this.inputChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  formSubmit(e) {
    e.preventDefault();

    const myDude = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.loginUser(myDude);
  }

  render() {
    const { errors } = this.props;

    return (
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={this.formSubmit}>
          <Input
            placeholder="Enter your username"
            label="Username"
            type="text"
            name="username"
            value={this.state.username}
            error={errors.username}
            onChange={this.inputChange}
          />
          <Input
            placeholder="Enter your password"
            label="Password"
            type="password"
            name="password"
            value={this.state.password}
            error={errors.password}
            onChange={this.inputChange}
          />
          <input type="submit" value="Login" />
          <Link className="" to="/signup">
            Sign up
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      user: PropTypes.string
    })
  })
};

export default connect(mapStateToProps, { loginUser })(Login);
