import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RecipeDeets from "../layout/RecipeDeets";
import { notEmpty } from "../../common/empty";
import { clearErrors } from "../../actions/appActions";
import { getVersion } from "../../actions/versionActions";
import {
  saveBrew,
  getBrew,
  setBrew,
  makeBrew
} from "../../actions/brewActions";
import BrewForm from "./BrewForm";

class AddEditBrew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      version: "",
      notes: "",
      date: "",
      isNew: false,
      errors: {}
    };

    const sessionVersionId = sessionStorage.getItem("versionId");
    const { recipe, match } = this.props;
    const { id } = match.params; // brew id, should be id or 'new'
    const hasStoreRecipe = recipe && notEmpty(recipe._id);
    const version = hasStoreRecipe && recipe.version;
    const hasStoreVersion = hasStoreRecipe && notEmpty(version._id);
    let hasStoreBrew, brew;

    if (id === "new") {
      // new brew
      this.state.isNew = true;
      if (!hasStoreVersion && sessionVersionId) {
        // version not in store, but we have the id in session storage
        // go fetch it over the wire
        this.props.getVersion(sessionVersionId);
      } else {
        // user is on add/edit brew route with no recipe
        // redirect?
      }
    } else {
      // edit version
      if (hasStoreVersion) {
        hasStoreBrew = version.brew && version.brew._id === id;

        // has version and brew
        if (hasStoreBrew) {
          brew = version.brew;
          this.props.setBrew(brew);
          this.state._id = brew._id;
          this.state.date = brew.date;
          this.state.notes = brew.notes;
        }
      }

      if (!hasStoreVersion || !hasStoreBrew) {
        // getBrew fetches recipe and brews
        this.props.getBrew(id);
      }
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { brew } = this.props.recipe.version;
    const ppbrew = prevProps.recipe.version.brew;

    // update state once brew comes back
    if (brew && brew._id !== ppbrew._id) {
      this.setState({
        _id: brew._id,
        notes: brew.notes,
        date: brew.date
      });
    }
  }

  handleInput(e) {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let newBrew;

    if (this.state.isNew) {
      newBrew = {
        version: this.props.recipe.version._id,
        notes: this.state.notes
      };
      console.log(">>> New brew submit:", newBrew);
      this.props.makeBrew(newBrew, this.props.history);
    } else {
      newBrew = {
        ...this.props.recipe.version.brew,
        notes: this.state.notes
      };
      console.log(">>> Edit brew submit:", newBrew);
      this.props.saveBrew(newBrew, this.props.history);
    }
  }

  handleGoBack() {
    this.props.clearErrors();
    this.props.history.goBack();
  }

  render() {
    const { recipe, auth, errors } = this.props;
    const { version } = recipe;
    const brew = {
      notes: this.state.notes,
      date: this.state.date
    };
    const author = auth.users.find(user => user._id === recipe.author);

    return (
      <div className="add-edit-version">
        <RecipeDeets recipe={recipe} author={author} version={version} />
        <BrewForm
          new={this.state.isNew}
          brew={brew}
          errors={errors}
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
          handleGoBack={this.handleGoBack}
        />
      </div>
    );
  }
}

AddEditBrew.propTypes = {
  auth: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  getVersion: PropTypes.func.isRequired,
  saveBrew: PropTypes.func.isRequired,
  getBrew: PropTypes.func.isRequired,
  setBrew: PropTypes.func.isRequired,
  makeBrew: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

const mapStateToProps = state => ({
  auth: state.auth,
  recipe: state.recipe,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    getVersion,
    saveBrew,
    getBrew,
    setBrew,
    makeBrew,
    clearErrors
  }
)(AddEditBrew);
