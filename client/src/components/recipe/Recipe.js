import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  // setRecipe,
  getRecipe,
  deleteRecipe
} from "../../actions/recipeActions";
import { actionConfirm } from "../../actions/appActions";
import { getUser } from "../../actions/authActions";
import { notEmpty } from "../../common/empty";
import AppControl from "../layout/AppControl";
import Versions from "../versions/Versions";
import AreYouSure from "../common/AreYouSure";
import Moment from "react-moment";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        author: "",
        name: "",
        style: "",
        date: "",
        versions: []
      }
    };

    const { id } = this.props.match.params;
    this.props.getRecipe(id);

    // fetch recipe from the store - works, but have to manually grab everything else
    // const { recipes } = this.props;

    // const storeRecipe =
    //   notEmpty(recipes) && recipes.find(recipe => recipe._id === id);

    // if (storeRecipe && notEmpty(storeRecipe)) {
    //   this.props.setRecipe(storeRecipe);
    // } else {
    //   this.props.getRecipe(id);
    // }

    this.handleDelete = this.handleDelete.bind(this);
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    const pRecipe = nextProps.recipe;
    const sRecipe = nextState.recipe;

    if (
      pRecipe._id !== sRecipe._id ||
      pRecipe.versions.length !== sRecipe.versions.length
    ) {
      return { recipe: pRecipe };
    }
    return null;
  }

  // not needed if fetching recipe with getRecipe()
  // componentDidUpdate(prevProps) {
  //   const { author } = this.props.recipe;

  //   if (prevProps.recipe.author !== author) {
  //     console.log(":D");
  //     this.props.getUser(author);
  //   }
  // }

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
    const { recipe } = this.state;
    const hasRecipe = notEmpty(recipe._id);
    const { errors, auth, appJunk } = this.props;
    const { isAuth } = auth;
    const { loading, confirmObject } = appJunk;
    const author = auth.users.find(user => user._id === recipe.author);
    let errorContent, controlContent;

    const recipeContent = (
      <div>
        <div className="d-flex flex-wrap align-items-baseline mb-3">
          <h1 className="m-0 flex-shrink-0 mr-3">{recipe.name}</h1>
          <h4 className="m-0 flex-shrink-0">{recipe.style}</h4>
        </div>
        <p>
          Created {author && `by ${author.username}`} on{" "}
          {<Moment date={recipe.date} format="MMM D, YYYY" />}
        </p>
        <hr />
        <h5>Versions</h5>
        <Versions versions={recipe.versions} />
      </div>
    );

    if (notEmpty(errors)) {
      errorContent = (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Recipe not found</h4>
          <p className="mb-0">{errors.recipeError}</p>
        </div>
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
    } else if (isAuth && !loading) {
      controlContent = (
        <AppControl>
          <button
            className="btn btn-secondary mr-3"
            onClick={this.props.history.goBack}
          >
            Back
          </button>
          <button
            className={`btn btn-danger mr-3 ${hasRecipe ? "" : "d-none"}`}
            onClick={this.handleDelete}
          >
            Delete Recipe
          </button>
          <Link
            className={`btn btn-secondary mr-3 ${hasRecipe ? "" : "d-none"}`}
            to={`edit/${recipe._id}`}
          >
            Edit Recipe
          </Link>
          <input
            className={`btn btn-primary ${hasRecipe ? "" : "d-none"}`}
            type="submit"
            value="Add a Version"
            form="addEditRecipeForm"
          />
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
  deleteRecipe: PropTypes.func.isRequired,
  actionConfirm: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
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
  { getRecipe, deleteRecipe, actionConfirm, getUser }
)(Recipe);
