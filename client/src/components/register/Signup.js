import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/authActions";
import Input from "../common/Input";
import Button from "../common/Button";

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
      <div className="row">
        <div className="col-sm-12 col-md-8 col-lg-6 m-auto">
          <h1>Sign up</h1>
          <div className="signup p-3 mb-3 z-depth-3">
            <form onSubmit={this.formSubmit}>
              <Input
                placeholder="Enter a username"
                label="Username"
                type="text"
                name="username"
                autoFocus={true}
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
              <Button
                type="submit"
                classes={[
                  "btn-primary",
                  "mt-5",
                  "d-flex",
                  "w-100",
                  "justify-content-center"
                ]}
                icon="baselineLocalDrink24px"
              >
                Beer Me
              </Button>
            </form>
          </div>
          <p className="text-center">
            Already have an account?
            <Link className="ml-2" to="/login">
              Log in now!
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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
