import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  setRecipe,
  getRecipe,
  deleteRecipe
} from "../../actions/recipeActions";
import { actionConfirm } from "../../actions/appActions";
import { getUsername } from "../../actions/authActions";
import { getAllVersions } from "../../actions/versionActions";
import { notEmpty } from "../../common/empty";
import RecipeDeets from "../layout/RecipeDeets";
import AppControl from "../layout/AppControl";
import Versions from "../versions/Versions";
import AreYouSure from "../common/AreYouSure";
import Alert from "../common/Alert";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    const { id } = this.props.match.params;
    const { recipes } = this.props;
    const storeRecipe =
      notEmpty(recipes) && recipes.find(recipe => recipe._id === id);
    const hasStoreRecipe = storeRecipe && notEmpty(storeRecipe);

    if (hasStoreRecipe) {
      // fetch recipe from the store
      this.props.setRecipe(storeRecipe);
      this.props.getAllVersions(id);
    } else {
      // fetch recipe over the wire, will also fetch author and versions
      this.props.getRecipe(id);
    }

    this.state.usingStoreRecipe = hasStoreRecipe;
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidUpdate(prevProps) {
    const usingStoreRecipe = this.state.usingStoreRecipe;

    if (usingStoreRecipe) {
      const { author } = this.props.recipe;
      const pAuthor = prevProps.recipe.author;

      if (author !== pAuthor) {
        this.props.getUsername(author);
      }
    }
  }

  handleDelete(e) {
    e.preventDefault();

    const { _id, name } = this.props.recipe;

    this.props.actionConfirm({
      confirmAction: deleteRecipe,
      confirmId: _id,
      confirmText: `Are you sure you want to delete "${name}"?`,
      redirect: "/recipes"
    });
  }

  render() {
    const { recipe, errors, auth, appJunk } = this.props;
    const { isAuth } = auth;
    const { loading, confirmObject } = appJunk;
    const hasRecipe = notEmpty(recipe._id);
    const author = auth.users.find(user => user._id === recipe.author);
    let errorContent, controlContent;

    const recipeContent = (
      <div>
        <RecipeDeets recipe={recipe} author={author} />
        <h5>Versions</h5>
        <Versions versions={recipe.versions} />
      </div>
    );

    if (notEmpty(errors)) {
      if (notEmpty(errors.recipeError)) {
        errorContent = (
          <Alert bsStyle="alert-danger" heading="Recipe not found">
            <p className="mb-0">{errors.recipeError}</p>
          </Alert>
        );
      }
    }

    if (notEmpty(confirmObject) && !loading) {
      controlContent = (
        <AppControl>
          <AreYouSure
            confirmObject={confirmObject}
            history={this.props.history}
          />
        </AppControl>
      );
    } else if (isAuth && !loading) {
      controlContent = (
        <AppControl>
          {/* <button
            className="btn btn-secondary mr-3"
            onClick={this.props.history.goBack}
          >
            Back
          </button> */}
          <Link className="btn btn-secondary mr-3" to="/recipes">
            Back
          </Link>
          <button
            className={`btn btn-danger mr-3 ${hasRecipe ? "" : "d-none"}`}
            onClick={this.handleDelete}
          >
            Delete This Recipe
          </button>
          <Link
            className={`btn btn-secondary mr-3 ${hasRecipe ? "" : "d-none"}`}
            to={`edit/${recipe._id}`}
          >
            Edit This Recipe
          </Link>
          <Link
            className={`btn btn-primary ${hasRecipe ? "" : "d-none"}`}
            to={`/version/edit/new`}
          >
            Add a Version
          </Link>
        </AppControl>
      );
    }

    return (
      <div>
        <div className="recipe">
          {errorContent ? errorContent : recipeContent}
        </div>
        {controlContent}
      </div>
    );
  }
}

Recipe.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  setRecipe: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  actionConfirm: PropTypes.func.isRequired,
  getUsername: PropTypes.func.isRequired,
  getAllVersions: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  recipe: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.bool.isRequired
  ]),
  recipes: PropTypes.array.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  appJunk: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

const mapStateToProps = state => ({
  auth: state.auth,
  appJunk: state.appJunk,
  errors: state.errors,
  recipe: state.recipe,
  recipes: state.recipes
});

export default connect(
  mapStateToProps,
  {
    getRecipe,
    setRecipe,
    deleteRecipe,
    actionConfirm,
    getUsername,
    getAllVersions
  }
)(Recipe);
