import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import { actionConfirm } from "../../actions/appActions";
import { notEmpty } from "../../common/empty";
import { getBrew, setBrew, deleteBrew } from "../../actions/brewActions";
// import { getAllGravities } from "../../actions/gravityActions";
import RecipeDeets from "../layout/RecipeDeets";
import AppControl from "../layout/AppControl";
// import ItemWrap from "../common/ItemWrap";
// import BrewList from "../brews/BrewList";
import AreYouSure from "../common/AreYouSure";
import Alert from "../common/Alert";

class Brew extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    const { id } = this.props.match.params; // brew id
    const { recipe } = this.props;
    const version = recipe && recipe.version;
    const brews = version && version.brews;
    const storeBrew =
      Array.isArray(brews) && brews.find(brew => brew._id === id);
    const hasStoreBrew = storeBrew && notEmpty(storeBrew);

    if (hasStoreBrew) {
      // fetch version from the store
      this.props.setBrew(storeBrew);
      // this.props.getAllGravities(id);
    } else {
      // fetch brew over the wire, will also fetch recipe, version & gravities
      this.props.getBrew(id);
    }

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();

    const { _id, date, version } = this.props.recipe.version.brew;
    const friendlyDate = moment(date).format("MMM D, YYYY");

    this.props.actionConfirm({
      confirmAction: deleteBrew,
      confirmId: _id,
      confirmText: `Are you sure you want to delete the brew from ${friendlyDate}?`,
      redirect: `/version/${version}`
    });
  }

  render() {
    const { recipe, errors, auth, appJunk } = this.props;
    const { version } = recipe && recipe;
    const brew = version && version.brew;
    const { isAuth } = auth;
    const { loading, confirmObject } = appJunk;
    const hasVersion = version && notEmpty(version._id);
    const hasBrew = brew && notEmpty(brew._id);
    const author = auth.users.find(user => user._id === recipe.author);
    let errorContent, controlContent, versionContent;

    // if (hasBrew) {
    //   show chart here
    // }

    if (notEmpty(errors)) {
      if (errors.noBrew) {
        errorContent = (
          <Alert bsStyle="alert-danger" heading="Brew not found">
            <p className="mb-0">{errors.noBrew}</p>
          </Alert>
        );
      } else {
        errorContent = (
          <Alert bsStyle="alert-danger" heading="Error">
            <p>{errors}</p>
            <p className="mb-0">Probably just need to refresh the page.</p>
          </Alert>
        );
      }
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
          <Link
            className="btn btn-secondary mr-3"
            to={hasVersion ? `/version/${version._id}` : "/"}
          >
            Back
          </Link>
          <button
            className={`btn btn-danger mr-3 ${hasBrew ? "" : "d-none"}`}
            onClick={this.handleDelete}
          >
            Delete This Brew
          </button>
          <Link
            className={`btn btn-secondary mr-3 ${hasBrew ? "" : "d-none"}`}
            to={`edit/${hasBrew && brew._id}`}
          >
            Edit This Brew
          </Link>
          <Link
            className={`btn btn-primary ${hasBrew ? "" : "d-none"}`}
            to={`/gravity/b/${hasBrew && brew._id}`}
          >
            Add a Gravity Reading
          </Link>
        </AppControl>
      );
    }

    const recipeContent = (
      <div>
        <RecipeDeets
          recipe={recipe}
          author={author}
          version={version}
          brew={brew}
        />
        {versionContent}
      </div>
    );

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

Brew.propTypes = {
  getBrew: PropTypes.func.isRequired,
  setBrew: PropTypes.func.isRequired,
  // getAllGravities: PropTypes.func.isRequired,
  actionConfirm: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
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
  recipe: state.recipe
});

export default connect(
  mapStateToProps,
  {
    getBrew,
    setBrew,
    // getAllGravities,
    actionConfirm
  }
)(Brew);
