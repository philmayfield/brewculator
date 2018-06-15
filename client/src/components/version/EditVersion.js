import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RecipeDeets from "../layout/RecipeDeets";
import { notEmpty } from "../../common/empty";
import { getRecipe } from "../../actions/recipeActions";
import {
  saveVersion,
  getVersion,
  setVersion
} from "../../actions/versionActions";

import VersionForm from "./VersionForm";

class EditVersion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      version: "",
      notes: "",
      errors: {}
    };

    const { recipe, match } = this.props;
    const { id } = match.params; // version id
    const hasStoreRecipe = recipe && notEmpty(recipe._id);
    let hasStoreVersion;

    if (hasStoreRecipe) {
      hasStoreVersion = recipe.version && recipe.version._id === id;

      if (hasStoreVersion) {
        this.props.setVersion(recipe.version);
        this.state._id = recipe.version._id;
        this.state.version = recipe.version.version;
        this.state.notes = recipe.version.notes;
      }
    }

    if (!hasStoreRecipe || !hasStoreVersion) {
      this.props.getVersion(id);
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    // console.log("gdsfp", nextProps.recipe, nextState);
    const { version } = nextProps.recipe;

    if (version && version._id !== nextState._id) {
      // populate form once call to get recipe comes back
      return {
        _id: version._id,
        version: version.version,
        notes: version.notes
      };
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
      ...this.props.recipe.version,
      version: this.state.version,
      notes: this.state.notes
    };

    console.log(">>> Edit version submit:", newVersion);

    this.props.saveVersion(newVersion, this.props.history);
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
      <div className="editVersion">
        <RecipeDeets recipe={recipe} author={author} version={null} />
        <VersionForm
          new={false}
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

EditVersion.propTypes = {
  auth: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  getRecipe: PropTypes.func.isRequired,
  saveVersion: PropTypes.func.isRequired,
  getVersion: PropTypes.func.isRequired,
  setVersion: PropTypes.func.isRequired,
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
  { getRecipe, saveVersion, getVersion, setVersion }
)(EditVersion);
