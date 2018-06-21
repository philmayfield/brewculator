import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { actionConfirm } from "../../actions/appActions";
import { deleteRecipe } from "../../actions/recipeActions";
import ItemListItem from "../common/ItemListItem";

class RecipeListItem extends Component {
  handleRemoval(e) {
    e.preventDefault();

    const { confirmItem = "this" } = e.target.dataset;

    this.props.actionConfirm({
      confirmAction: deleteRecipe,
      confirmId: e.target.value,
      confirmText: `Are you sure you want to delete ${confirmItem}?`
    });
  }

  render() {
    const { recipes, auth } = this.props;

    const recipeItems =
      Array.isArray(recipes) &&
      recipes.map(recipe => (
        <ItemListItem
          key={recipe._id}
          item={recipe}
          itemType="recipe"
          header={recipe.name}
          sub={recipe.style}
          isAuth={auth.isAuth}
          handleRemoval={this.handleRemoval.bind(this)}
        />
      ));

    return <div className="list-group">{recipeItems}</div>;
  }
}

RecipeListItem.propTypes = {
  recipes: PropTypes.array.isRequired,
  actionConfirm: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { actionConfirm }
)(RecipeListItem);
