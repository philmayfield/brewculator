import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import hasInStore from "../../common/hasInStore";
import RecipeDeets from "../layout/RecipeDeets";
import { clearErrors } from "../../actions/appActions";
import { getBrew } from "../../actions/brewActions";
import {
  saveGravity,
  getGravity,
  setGravity,
  makeGravity
} from "../../actions/gravityActions";
import GravityForm from "./GravityForm";

class AddEditGravity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      brew: "",
      brix: "",
      temp: "",
      notes: "",
      date: "",
      isNew: this.props.match.params.id === "new",
      errors: {}
    };

    const sessionBrewId = sessionStorage.getItem("brewId");
    const { recipe, match } = this.props;
    const { id } = match.params; // gravity id, should be id or 'new'

    const { inStore: hasStoreBrew } = hasInStore(
      sessionBrewId,
      recipe.version.brew,
      recipe.version.brews
    );

    if (id === "new") {
      // new gravity

      if (!hasStoreBrew && sessionBrewId) {
        // brew not in store, but we have the id in session storage
        // go fetch it over the wire
        this.props.getBrew(sessionBrewId);
      } else {
        // user is on add/edit gravity route with no recipe
        // redirect?
      }
    } else {
      // edit gravity

      const { inStore: hasStoreGravity, storeItem: storeGravity } = hasInStore(
        id,
        recipe.version.brew.gravity,
        recipe.version.brew.gravities
      );

      if (hasStoreBrew && hasStoreGravity) {
        // has brew and gravity
        this.props.setGravity(storeGravity);
        this.state._id = storeGravity._id;
        this.state.brix = storeGravity.brix;
        this.state.temp = storeGravity.temp;
        this.state.notes = storeGravity.notes;
        this.state.date = storeGravity.date;
      } else {
        // getGravity fetches everything
        this.props.getGravity(id);
      }
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { gravity } = this.props.recipe.version.brew;
    const ppgravity = prevProps.recipe.version.brew.gravity;

    // update state once gravity comes back
    if (gravity && gravity._id !== ppgravity._id) {
      this.setState({
        _id: gravity._id,
        brix: gravity.brix ? gravity.brix : "",
        temp: gravity.temp ? gravity.temp : "",
        notes: gravity.notes ? gravity.notes : "",
        date: gravity.date ? gravity.date : ""
      });
    }
  }

  handleInput(e) {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { recipe, history } = this.props;
    let newGravity;

    if (this.state.isNew) {
      newGravity = {
        brew: recipe.version.brew._id,
        date: this.state.date,
        brix: this.state.brix,
        temp: this.state.temp,
        notes: this.state.notes
      };
      console.log(">>> New gravity submit:", newGravity);
      this.props.makeGravity(newGravity, history);
    } else {
      newGravity = {
        ...recipe.version.brew.gravity,
        date: this.state.date,
        brix: this.state.brix,
        temp: this.state.temp,
        notes: this.state.notes
      };
      console.log(">>> Edit gravity submit:", newGravity);
      this.props.saveGravity(newGravity, history);
    }
  }

  handleGoBack() {
    this.props.clearErrors();
    this.props.history.goBack();
  }

  render() {
    const { recipe, appJunk, auth, errors } = this.props;
    const { loading } = appJunk;
    const { version } = recipe;
    const { brew } = version;
    const gravity = {
      brix: this.state.brix,
      temp: this.state.temp,
      notes: this.state.notes,
      date: this.state.date
    };
    const author = auth.users.find(user => user._id === recipe.author);

    return (
      <div className="add-edit-version">
        <RecipeDeets
          recipe={recipe}
          author={author}
          version={version}
          brew={brew}
          loading={loading}
        />
        <GravityForm
          new={this.state.isNew}
          gravity={gravity}
          errors={errors}
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
          handleGoBack={this.handleGoBack}
        />
      </div>
    );
  }
}

AddEditGravity.propTypes = {
  auth: PropTypes.object.isRequired,
  appJunk: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  getBrew: PropTypes.func.isRequired,
  saveGravity: PropTypes.func.isRequired,
  getGravity: PropTypes.func.isRequired,
  setGravity: PropTypes.func.isRequired,
  makeGravity: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

const mapStateToProps = state => ({
  auth: state.auth,
  appJunk: state.appJunk,
  recipe: state.recipe,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    getBrew,
    saveGravity,
    getGravity,
    setGravity,
    makeGravity,
    clearErrors
  }
)(AddEditGravity);
