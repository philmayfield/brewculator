import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RecipeDeets from "../layout/RecipeDeets";
import { getRecipe } from "../../actions/recipeActions";
import { makeVersion } from "../../actions/versionActions";
import VersionForm from "./VersionForm";

class AddVersion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      version: "",
      notes: "",
      errors: {}
    };

    const { recipe, match } = this.props;
    const { id } = match.params; // recipe id
    const hasStoreRecipe = recipe && recipe._id === id;

    if (!hasStoreRecipe) {
      // fetch recipe, should only happen on reload of edit page
      this.props.getRecipe(id);
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  handleInput(e) {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const newVersion = {
      recipe: this.props.recipe._id,
      version: this.state.version,
      notes: this.state.notes
    };

    console.log(">>> New version submit:", newVersion);

    this.props.makeVersion(newVersion, this.props.history);
  }

  handleGoBack() {
    this.props.history.goBack();
  }

  render() {
    const { recipe, auth, errors } = this.props;
    const version = {
      version: this.state.version,
      notes: this.state.notes
    };
    const author = auth.users.find(user => user._id === recipe.author);

    return (
      <div className="addVersion">
        <RecipeDeets recipe={recipe} author={author} version={null} />
        <VersionForm
          new={true}
          recipe={recipe}
          version={version}
          errors={errors}
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
          handleGoBack={this.handleGoBack}
        />
      </div>
    );
  }
}

AddVersion.propTypes = {
  auth: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  getRecipe: PropTypes.func.isRequired,
  makeVersion: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

const mapStateToProps = state => ({
  auth: state.auth,
  recipe: state.recipe,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getRecipe, makeVersion }
)(AddVersion);
