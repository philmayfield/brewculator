import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RecipeDeets from "../layout/RecipeDeets";
import hasInStore from "../../common/hasInStore";
import { clearErrors } from "../../actions/appActions";
import { getRecipe } from "../../actions/recipeActions";
import {
  saveVersion,
  getVersion,
  setVersion,
  makeVersion
} from "../../actions/versionActions";
import VersionForm from "./VersionForm";

class AddEditVersion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      version: "",
      notes: "",
      isNew: this.props.match.params.id === "new",
      errors: {}
    };

    const sessionRecipeId = sessionStorage.getItem("recipeId");
    const { recipe, recipes, match } = this.props;
    const { id } = match.params; // version id, should be id or 'new'

    const { inStore: hasStoreRecipe } = hasInStore(
      sessionRecipeId,
      recipe,
      recipes
    );

    if (id === "new") {
      // new version

      if (!hasStoreRecipe && sessionRecipeId) {
        // recipe not in store, but we have the id in session storage
        // go fetch it over the wire
        this.props.getRecipe(sessionRecipeId);
      } else {
        // user is on add/edit version route with no recipe
        // redirect?
      }
    } else {
      // edit version

      const { inStore: hasStoreVersion, storeItem: storeVersion } = hasInStore(
        id,
        recipe.version,
        recipe.versions
      );

      if (hasStoreRecipe && hasStoreVersion) {
        // has recipe and version
        this.props.setVersion(storeVersion);
        this.state._id = storeVersion._id;
        this.state.version = storeVersion.version;
        this.state.notes = storeVersion.notes;
      } else {
        // missing some data, go fetch over the wire
        this.props.getVersion(id);
      }
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { version } = this.props.recipe;
    const ppversion = prevProps.recipe.version;

    // update state once version prop comes back
    if (version && ppversion && version._id !== ppversion._id) {
      this.setState({
        _id: version._id,
        version: version.version,
        notes: version.notes
      });
    }
  }

  handleInput(e) {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let newVersion;

    if (this.state.isNew) {
      newVersion = {
        recipe: this.props.recipe._id,
        version: this.state.version,
        notes: this.state.notes
      };
      // console.log(">>> New version submit:", newVersion);
      this.props.makeVersion(newVersion, this.props.history);
    } else {
      newVersion = {
        ...this.props.recipe.version,
        version: this.state.version,
        notes: this.state.notes
      };
      // console.log(">>> Edit version submit:", newVersion);
      this.props.saveVersion(newVersion, this.props.history);
    }
  }

  handleGoBack() {
    this.props.clearErrors();
    this.props.history.goBack();
  }

  render() {
    const { recipe, auth, appJunk, errors } = this.props;
    const { loadingArr } = appJunk;
    const loading = loadingArr.length > 0;
    const version = {
      version: this.state.version,
      notes: this.state.notes
    };
    const author = auth.users.find(user => user._id === recipe.author);

    return (
      <div className="add-edit-version">
        <RecipeDeets recipe={recipe} author={author} loading={loading} />
        <VersionForm
          new={this.state.isNew}
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

AddEditVersion.propTypes = {
  auth: PropTypes.object.isRequired,
  appJunk: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  recipes: PropTypes.array.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  history: PropTypes.object.isRequired,
  getRecipe: PropTypes.func.isRequired,
  saveVersion: PropTypes.func.isRequired,
  getVersion: PropTypes.func.isRequired,
  setVersion: PropTypes.func.isRequired,
  makeVersion: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

const mapStateToProps = state => ({
  auth: state.auth,
  appJunk: state.appJunk,
  recipe: state.recipe,
  recipes: state.recipes,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    getRecipe,
    saveVersion,
    getVersion,
    setVersion,
    makeVersion,
    clearErrors
  }
)(AddEditVersion);
