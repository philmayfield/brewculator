import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/authActions";
import Input from "../common/Input";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
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

    const noob = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.registerUser(noob, this.props.history);
  }

  render() {
    const { errors } = this.props;

    return (
      <div className="register">
        <h1>Sign Up</h1>
        <form onSubmit={this.formSubmit}>
          <Input
            placeholder="Enter a username"
            label="Username"
            type="text"
            name="username"
            value={this.state.username}
            error={errors.username}
            onChange={this.inputChange}
            required={true}
          />
          <Input
            placeholder="Choose a password"
            label="Password"
            type="password"
            name="password"
            value={this.state.password}
            error={errors.password}
            onChange={this.inputChange}
            required={true}
          />
          <input className="btn btn-primary" type="submit" value="Beer Me" />
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
