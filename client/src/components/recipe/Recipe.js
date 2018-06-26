import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  setRecipe,
  getRecipe,
  deleteRecipe
} from "../../actions/recipeActions";
import { actionConfirm, changeControlContext } from "../../actions/appActions";
import { getUsername } from "../../actions/authActions";
import { getAllVersions } from "../../actions/versionActions";
import { notEmpty } from "../../common/empty";
import RecipeDeets from "../layout/RecipeDeets";
import AppControl from "../layout/AppControl";
import VersionList from "../versions/VersionList";
import ItemWrap from "../common/ItemWrap";
import AreYouSure from "../common/AreYouSure";
import Alert from "../common/Alert";
import getImg from "../../common/getImg";
import ReactSVG from "react-svg";

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
    this.handleChangeContext = this.handleChangeContext.bind(this);
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

  handleChangeContext(e) {
    e.preventDefault();
    const { altControlContext } = this.props.appJunk;
    this.props.changeControlContext(altControlContext);
  }

  render() {
    const { recipe, errors, auth, appJunk } = this.props;
    const { isAuth } = auth;
    const { loading, confirmObject, altControlContext } = appJunk;
    const hasRecipe = notEmpty(recipe._id);
    const author = auth.users.find(user => user._id === recipe.author);
    const contextIcon = getImg(
      altControlContext ? "baselineClose24px" : "baselineEdit24px"
    );
    let errorContent, controlContent;

    const recipeContent = (
      <div>
        <RecipeDeets recipe={recipe} author={author} />
        <ItemWrap label="Versions" items={recipe.versions} errors={errors}>
          <VersionList versions={recipe.versions} />
        </ItemWrap>
      </div>
    );

    const tweakBtn = (
      <button
        type="button"
        className="btn btn-info"
        onClick={this.handleChangeContext}
      >
        <ReactSVG path={contextIcon} svgClassName="light" />
      </button>
    );

    if (errors && errors.recipeError) {
      errorContent = (
        <Alert bsStyle="alert-danger" heading="Recipe not found">
          <p className="mb-0">{errors.recipeError}</p>
        </Alert>
      );
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
    } else if (isAuth && !loading && altControlContext) {
      controlContent = (
        <AppControl>
          {tweakBtn}
          <button
            className={`btn btn-danger flex-fill ${hasRecipe ? "" : "d-none"}`}
            onClick={this.handleDelete}
          >
            Delete This Recipe
          </button>
          <Link
            className={`btn btn-secondary flex-fill ${
              hasRecipe ? "" : "d-none"
            }`}
            to={`edit/${recipe._id}`}
          >
            Edit This Recipe
          </Link>
        </AppControl>
      );
    } else if (isAuth && !loading) {
      controlContent = (
        <AppControl>
          {tweakBtn}
          <Link className="btn btn-secondary flex-fill" to="/recipes">
            Back
          </Link>
          <Link
            className={`btn btn-primary flex-fill ${hasRecipe ? "" : "d-none"}`}
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
  changeControlContext: PropTypes.func.isRequired,
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
    getAllVersions,
    changeControlContext
  }
)(Recipe);
