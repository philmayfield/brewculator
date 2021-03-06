import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { notEmpty } from "../../common/empty";
import hasInStore from "../../common/hasInStore";
import {
  getRecipe,
  setRecipe,
  saveRecipe,
  makeRecipe
} from "../../actions/recipeActions";
import RecipeDeets from "../layout/RecipeDeets";
import Input from "../common/Input";
import AppControl from "../layout/AppControl";
import Alert from "../common/Alert";
import Button from "../common/Button";

class AddEditRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.match.params.id,
      name: "",
      style: "",
      isNew: this.props.match.params.id === "new",
      date: Date.now()
    };

    let { id } = this.props.match.params;

    if (this.props.test && this.props.testId) {
      id = this.props.testId;
    }

    if (id !== "new") {
      const { recipe, recipes } = this.props;

      // check store recipe
      const { inStore: hasStoreRecipe, storeItem: storeRecipe } = hasInStore(
        id,
        recipe,
        recipes
      );

      // check if recipe already in the store
      if (hasStoreRecipe) {
        this.props.setRecipe(storeRecipe);
        this.state.name = storeRecipe.name;
        this.state.style = storeRecipe.style;
        this.state.date = storeRecipe.date;
      } else {
        this.props.getRecipe(id);
      }
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { recipe } = this.props;
    const pprecipe = prevProps.recipe;

    // update state once brew comes back
    if (recipe && pprecipe && recipe._id !== pprecipe._id) {
      this.setState({
        _id: recipe._id,
        name: recipe.name,
        style: recipe.style,
        date: recipe.date
      });
    }
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isNew } = this.state;
    let newRecipe;

    if (isNew) {
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
    const { recipe, auth, appJunk, errors } = this.props;
    const { loadingArr } = appJunk;
    const loading = loadingArr.length > 0;
    const hasRecipe = notEmpty(recipe._id);
    const author =
      hasRecipe && auth.users.find(user => user._id === recipe.author);
    const { isNew, name, style, date } = this.state;
    const sRecipe = { name, style, date };
    let errorContent, formContent;

    if (notEmpty(errors) && errors.recipeError) {
      errorContent = (
        <Alert bsStyle="alert-danger" heading="Recipe not found">
          <p className="mb-0">{errors.recipeError}</p>
        </Alert>
      );
    }

    formContent = (
      <form className="form-wrapper z-depth-3" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <Input
              placeholder="Enter a name for this recipe"
              label="Recipe Name"
              type="text"
              name="name"
              autoFocus={true}
              value={name}
              error={errors.name}
              onChange={this.handleInput}
              required={true}
            />
          </div>
          <div className="col-md-6 mb-3">
            <Input
              placeholder="Enter a style for this recipe"
              label="Beer Style"
              type="text"
              name="style"
              value={style}
              error={errors.style}
              onChange={this.handleInput}
              required={true}
            />
          </div>
        </div>
        <div>* required field</div>
        <AppControl>
          <Button
            classes={["btn-secondary", "flex-fill"]}
            clickOrTo={this.props.history.goBack}
            icon="baselineArrowBack24px"
          >
            Back
          </Button>
          <Button
            type="submit"
            classes={["btn-primary", "flex-fill"]}
            icon="baselineSave24px"
          >
            {isNew ? "Save New Recipe" : "Save Recipe"}
          </Button>
        </AppControl>
      </form>
    );

    return (
      <div>
        <RecipeDeets recipe={sRecipe} author={author} loading={loading} />
        {errorContent ? errorContent : formContent}
      </div>
    );
  }
}

AddEditRecipe.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  setRecipe: PropTypes.func.isRequired,
  saveRecipe: PropTypes.func.isRequired,
  makeRecipe: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  appJunk: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  recipes: PropTypes.array.isRequired,
  test: PropTypes.bool,
  testId: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

const mapStateToProps = state => ({
  auth: state.auth,
  appJunk: state.appJunk,
  recipes: state.recipes,
  recipe: state.recipe,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getRecipe, setRecipe, saveRecipe, makeRecipe }
)(withRouter(AddEditRecipe));
