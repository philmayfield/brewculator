import React, { Component } from "react";
import { connect } from "react-redux";
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
import hasInStore from "../../common/hasInStore";
import ContextChangeBtn from "../common/ContextChangeBtn";
import RecipeDeets from "../layout/RecipeDeets";
import AppControl from "../layout/AppControl";
import VersionList from "../versions/VersionList";
import ItemWrap from "../common/ItemWrap";
import AreYouSure from "../common/AreYouSure";
import Alert from "../common/Alert";
import Button from "../common/Button";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    const { id } = this.props.match.params;
    const { recipe, recipes } = this.props;
    const { inStore, storeItem } = hasInStore(id, recipe, recipes);

    if (inStore) {
      // fetch recipe from the store
      this.props.setRecipe(storeItem);
      this.props.getAllVersions(id);
    } else {
      // fetch recipe over the wire, will also fetch author and versions
      this.props.getRecipe(id);
    }

    this.state.usingStoreRecipe = inStore;
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
    const { loadingArr, confirmObject, altControlContext } = appJunk;
    const loading = loadingArr.length > 0;
    const hasRecipe = notEmpty(recipe._id);
    const author = auth.users.find(user => user._id === recipe.author);

    let errorContent, controlContent;

    const recipeContent = (
      <div>
        <RecipeDeets recipe={recipe} author={author} loading={loading} />
        {!loading && (
          <ItemWrap label="Versions" items={recipe.versions} errors={errors}>
            <VersionList versions={recipe.versions} />
          </ItemWrap>
        )}
      </div>
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
          <ContextChangeBtn />
          <Button
            type="link"
            classes={["btn-secondary", "flex-fill", hasRecipe ? "" : "d-none"]}
            clickOrTo={`edit/${recipe._id}`}
            icon="baselineEdit24px"
          >
            Edit Recipe
          </Button>
          <Button
            classes={["btn-danger", "flex-fill", hasRecipe ? "" : "d-none"]}
            clickOrTo={this.handleDelete}
            icon="baselineDeleteForever24px"
          >
            Delete Recipe
          </Button>
        </AppControl>
      );
    } else if (isAuth && !loading) {
      controlContent = (
        <AppControl>
          <ContextChangeBtn />
          <Button
            type="link"
            classes={["btn-secondary", "flex-fill"]}
            clickOrTo="/recipes"
            icon="baselineArrowBack24px"
          >
            Back
          </Button>
          <Button
            type="link"
            classes={["btn-primary", "flex-fill", hasRecipe ? "" : "d-none"]}
            clickOrTo="/version/edit/new"
            icon="baselineAddCircle24px"
          >
            Add Version
          </Button>
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
