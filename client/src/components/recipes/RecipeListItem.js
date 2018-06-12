import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { actionConfirm } from "../../actions/appActions";
import { deleteRecipe } from "../../actions/recipeActions";

class RecipeListItem extends Component {
  handleRemoval(e) {
    e.preventDefault();

    this.props.actionConfirm({
      confirmAction: deleteRecipe,
      confirmId: e.target.value,
      confirmText: `Are you sure you want to delete "${
        this.props.recipe.name
      }"?`
    });
  }

  render() {
    const { recipe } = this.props;
    return (
      <div className="list-group-item list-group-item-action d-flex align-items-center">
        <Link className="w-100" to={`/recipe/${recipe._id}`}>
          <h5 className="m-0">{recipe.name}</h5>
          <p className="m-0">{recipe.style}</p>
        </Link>
        <Link className="mr-3" to={`/recipe/edit/${recipe._id}`}>
          Edit
        </Link>
        <button
          className="btn btn-empty text-danger"
          value={recipe._id}
          onClick={this.handleRemoval.bind(this)}
        >
          Delete
        </button>
      </div>
    );
  }
}

RecipeListItem.propTypes = {
  actionConfirm: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired
};

export default connect(
  null,
  { actionConfirm }
)(RecipeListItem);
