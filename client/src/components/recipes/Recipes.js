import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getAllRecipes } from "../../actions/recipeActions";
import { notEmpty } from "../../common/empty";
import RecipeList from "./RecipeList";
import AreYouSure from "../common/AreYouSure";
import AppControl from "../layout/AppControl";
import Alert from "../common/Alert";

class Recipes extends Component {
  componentDidMount() {
    this.props.getAllRecipes();
  }

  render() {
    const { isAuth } = this.props.auth;
    const { recipes } = this.props;
    const { loading, confirmObject } = this.props.appJunk;
    const hasRecipes = notEmpty(recipes);

    let recipeContent;
    let controlContent;

    if (hasRecipes && !loading) {
      recipeContent = <RecipeList recipes={recipes} />;
    } else if (!loading) {
      recipeContent = (
        <Alert bsStyle="alert-success" heading="No recipes yet">
          <p>
            Hey, there aren&rsquo;t any recipes here yet. Why don&rsquo;t you
            add some!
          </p>
        </Alert>
      );
    }

    if (notEmpty(confirmObject) && !loading) {
      controlContent = (
        <AppControl>
          <AreYouSure confirmObject={confirmObject} />
        </AppControl>
      );
    } else if (isAuth && !loading) {
      controlContent = (
        <AppControl>
          <Link className="btn btn-primary" to="/recipe/edit/new">
            Add a new recipe
          </Link>
        </AppControl>
      );
    }

    return (
      <div>
        <h1>Recipes</h1>
        {recipeContent}

        {controlContent}
      </div>
    );
  }
}

Recipes.propTypes = {
  recipes: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  appJunk: PropTypes.object.isRequired,
  getAllRecipes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  appJunk: state.appJunk,
  recipes: state.recipes
});

export default connect(
  mapStateToProps,
  { getAllRecipes }
)(Recipes);
