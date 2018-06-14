import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RecipeDeets from "../layout/RecipeDeets";
import AppControl from "../layout/AppControl";
import { getRecipe } from "../../actions/recipeActions";
import { makeVersion } from "../../actions/versionActions";

import Input from "../common/Input";
import TextArea from "../common/TextArea";

class AddEditVersion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        author: "",
        name: "",
        style: "",
        date: "",
        version: {},
        versions: []
      },
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

    // const versions = recipe && recipe.versions;
    // const hasVersions =
    //   versions && Array.isArray(versions) && notEmpty(versions);
    // let storeRecipe;

    // console.log(">", id, recipe, versions, hasVersions);
    // console.log("hasVersions", hasVersions);

    // if (hasVersions) {
    //   console.log("hasVersions");
    //   storeRecipe = this.props.recipe.versions.find(version => {
    //     console.log("-", version);
    //     return version._id === id;
    //   });
    // } else {
    // }

    // console.log(">", storeRecipe);

    // check if recipe already in the store
    // if (storeVersion && notEmpty(storeVersion)) {
    //   this.props.setVersion(storeVersion);
    // } else {
    //   this.props.getVersion(id);
    // }
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    const pRecipe = nextProps.recipe;
    const sRecipe = nextState.recipe;

    if (pRecipe._id !== sRecipe._id) {
      return { recipe: pRecipe };
    }
    return null;
  }

  handleInput(e) {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const newVersion = {
      recipe: this.state.recipe._id,
      version: this.state.version,
      notes: this.state.notes
    };

    console.log("submit!", newVersion);
    this.props.makeVersion(newVersion, this.props.history);
  }

  render() {
    const { auth, errors } = this.props;
    const { recipe } = this.state;
    const author = auth.users.find(user => user._id === recipe.author);
    let formContent;

    formContent = (
      <form id="addVersionForm" onSubmit={this.handleSubmit}>
        <h4>Add a new version</h4>
        <Input
          placeholder="Enter a version"
          label={`New Version for ${recipe.name}`}
          type="text"
          name="version"
          info="Example: 1, A, First, etc"
          autoFocus={true}
          value={this.state.version}
          error={errors.version}
          onChange={this.handleInput}
          required={true}
        />
        <TextArea
          placeholder="Optionally add some notes"
          label={`Version ${this.state.version} Notes`}
          name="notes"
          autoFocus={false}
          value={this.state.notes}
          error={errors.notes}
          onChange={this.handleInput}
        />
      </form>
    );

    return (
      <div className="addVersion">
        <RecipeDeets recipe={recipe} author={author} version={null} />
        {formContent}
        <AppControl>
          <button
            className="btn btn-secondary mr-3"
            onClick={this.props.history.goBack}
          >
            Back
          </button>
          <input
            className="btn btn-primary"
            type="submit"
            value="Make New Version"
            form="addVersionForm"
          />
        </AppControl>
      </div>
    );
  }
}

AddEditVersion.propTypes = {
  auth: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.string.isRequired
  ]),
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
)(AddEditVersion);
