import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import { notEmpty } from "../../common/empty";
import Input from "../common/Input";
import Alert from "../common/Alert";

class Login extends Component {
  constructor(props) {
    super(props);

    const user = this.props.match.params.user;

    this.state = {
      username: user ? user : "",
      password: "",
      newUser: notEmpty(user),
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

  componentDidMount() {
    this.handleAlreadyAuth(this.props.auth.isAuth);
  }

  componentDidUpdate() {
    this.handleAlreadyAuth(this.props.auth.isAuth);
  }

  handleAlreadyAuth(isAuth) {
    if (isAuth) {
      this.props.history.push("/recipes");
    }
  }

  render() {
    const { errors } = this.props;

    const newUserMsg = (
      <Alert bsStyle="alert-success" heading={`Welcome ${this.state.username}`}>
        <hr className="my-1" />
        <p className="mb-0">
          You&rsquo;re all registered up! Go ahead and login with the password
          you entered previously and get to brewing!
        </p>
      </Alert>
    );

    return (
      <div className="login">
        <h1>Login</h1>
        {this.state.newUser ? newUserMsg : null}
        <form onSubmit={this.formSubmit}>
          <Input
            placeholder="Enter your username"
            label="Username"
            type="text"
            name="username"
            autoFocus={!this.state.newUser}
            value={this.state.username}
            error={errors.username}
            onChange={this.inputChange}
          />
          <Input
            placeholder="Enter your password"
            label="Password"
            type="password"
            name="password"
            autoFocus={this.state.newUser}
            value={this.state.password}
            error={errors.password}
            onChange={this.inputChange}
          />
          <input className="btn btn-primary" type="submit" value="Login" />
        </form>
        <p>
          Don&rsquo;t have an account?
          <Link className="ml-2" to="/signup">
            Sign up now!
          </Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      user: PropTypes.string
    })
  })
};

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
