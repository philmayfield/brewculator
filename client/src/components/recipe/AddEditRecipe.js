import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { notEmpty } from "../../common/empty";
import {
  getRecipe,
  setRecipe,
  saveRecipe,
  makeRecipe
} from "../../actions/recipeActions";
import Input from "../common/Input";
import AppControl from "../layout/AppControl";
import Alert from "../common/Alert";

class AddEditRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.match.params.id,
      name: "",
      style: "",
      errors: {}
    };

    const { id } = this.props.match.params;
    if (id !== "new") {
      const storeRecipe = this.props.recipes.find(recipe => recipe._id === id);

      // check if recipe already in the store
      if (storeRecipe && notEmpty(storeRecipe)) {
        this.props.setRecipe(storeRecipe);
        this.state.name = storeRecipe.name;
        this.state.style = storeRecipe.style;
      } else {
        this.props.getRecipe(id);
      }
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    const { recipe, errors } = nextProps;
    const { id } = nextProps.match.params;

    if (nextState.name || nextState.style) {
      return null;
    }
    if (notEmpty(errors)) {
      return { errors };
    }
    if (notEmpty(recipe) && id !== "new") {
      recipe.name = notEmpty(recipe.name) ? recipe.name : "";
      recipe.style = notEmpty(recipe.style) ? recipe.style : "";
      return { name: recipe.name, style: recipe.style };
    }
    return null;
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const id = this.state._id;
    let newRecipe;

    if (id === "new") {
      newRecipe = {
        name: this.state.name,
        style: this.state.style
      };
      this.props.makeRecipe(newRecipe, this.props.history);
    } else {
      newRecipe = {
        ...this.props.recipe,
        name: this.state.name,
        style: this.state.style
      };
      this.props.saveRecipe(newRecipe, this.props.history);
    }
  }

  render() {
    const { errors } = this.state;
    let errorContent, formContent;

    if (notEmpty(errors) && errors.recipeError) {
      errorContent = (
        <Alert bsStyle="alert-danger" heading="Recipe not found">
          <p className="mb-0">{errors.recipeError}</p>
        </Alert>
      );
    }

    formContent = (
      <form id="addEditRecipeForm" onSubmit={this.handleSubmit}>
        <Input
          placeholder="Enter a name for this recipe"
          label="Name"
          type="text"
          name="name"
          autoFocus={true}
          value={this.state.name}
          error={errors.name}
          onChange={this.handleInput}
          required={true}
        />
        <Input
          placeholder="Enter a style for this recipe"
          label="Style"
          type="text"
          name="style"
          value={this.state.style}
          error={errors.style}
          onChange={this.handleInput}
          required={true}
        />
      </form>
    );

    return (
      <div>
        <div className="d-flex flex-wrap align-items-baseline mb-3">
          <h1 className="m-0 flex-shrink-0 mr-3">{this.state.name}</h1>
          <h4 className="m-0 flex-shrink-0">{this.state.style}</h4>
        </div>
        {errorContent ? errorContent : formContent}
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
            value={this.state._id === "new" ? "Make New Recipe" : "Save Recipe"}
            form="addEditRecipeForm"
          />
        </AppControl>
      </div>
    );
  }
}

AddEditRecipe.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  setRecipe: PropTypes.func.isRequired,
  saveRecipe: PropTypes.func.isRequired,
  makeRecipe: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  recipes: PropTypes.array.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

const mapStateToProps = state => ({
  recipes: state.recipes,
  recipe: state.recipe,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getRecipe, setRecipe, saveRecipe, makeRecipe }
)(withRouter(AddEditRecipe));
