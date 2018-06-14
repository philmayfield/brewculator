import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { actionConfirm } from "../../actions/appActions";
import { notEmpty } from "../../common/empty";
import {
  getVersion,
  setVersion,
  deleteVersion
} from "../../actions/versionActions";
import { getAllBrews } from "../../actions/brewActions";
import RecipeDeets from "../layout/RecipeDeets";
import AppControl from "../layout/AppControl";
import Brews from "../brews/Brews";
import AreYouSure from "../common/AreYouSure";

class Version extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        author: "",
        name: "",
        style: "",
        date: "",
        version: {},
        versions: []
      },
      errors: {}
    };

    const { id } = this.props.match.params;
    const { recipe } = this.props;
    const { versions } = recipe && recipe;
    const storeVersion =
      notEmpty(versions) && versions.find(version => version._id === id);
    const hasStoreVersion = storeVersion && notEmpty(storeVersion);

    if (hasStoreVersion) {
      // fetch version from the store
      this.props.setVersion(storeVersion);
      this.props.getAllBrews(id);
    } else {
      // fetch version over the wire, will also fetch recipe & brews
      this.props.getVersion(id);
    }

    this.state.usingStoreVersion = hasStoreVersion;
    this.handleDelete = this.handleDelete.bind(this);
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    const pRecipe = nextProps.recipe;
    const sRecipe = nextState.recipe;

    if (
      pRecipe._id !== sRecipe._id ||
      pRecipe.versions.length !== sRecipe.versions.length ||
      pRecipe.version !== sRecipe.version
    ) {
      return { recipe: pRecipe };
    }
    return null;
  }

  handleDelete(e) {
    e.preventDefault();

    const { _id, version, recipe } = this.state.recipe.version;

    this.props.actionConfirm({
      confirmAction: deleteVersion,
      confirmId: _id,
      confirmText: `Are you sure you want to delete Version ${version}?`,
      redirect: `/recipe/${recipe}`
    });
  }

  render() {
    const { recipe } = this.state;
    const { version } = recipe;
    const hasVersion = version && notEmpty(version._id);
    const { errors, auth, appJunk } = this.props;
    const { isAuth } = auth;
    const { loading, confirmObject } = appJunk;
    const author = auth.users.find(user => user._id === recipe.author);
    let errorContent, controlContent, versionContent;

    if (hasVersion) {
      versionContent = <Brews brews={version.brews} />;
    }

    if (notEmpty(errors)) {
      if (errors.noVersion) {
        errorContent = (
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Version not found</h4>
            <p className="mb-0">{errors.noVersion}</p>
          </div>
        );
      } else {
        errorContent = (
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error</h4>
            <p>{errors}</p>
            <p className="mb-0">Probably just need to refresh the page.</p>
          </div>
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
          <button
            className="btn btn-secondary mr-3"
            onClick={this.props.history.goBack}
          >
            Back
          </button>
          <button
            className={`btn btn-danger mr-3 ${hasVersion ? "" : "d-none"}`}
            onClick={this.handleDelete}
          >
            Delete This Version
          </button>
          <Link
            className={`btn btn-secondary mr-3 ${hasVersion ? "" : "d-none"}`}
            to={`edit/${hasVersion && version._id}`}
          >
            Edit This Version
          </Link>
          <Link
            className={`btn btn-primary ${hasVersion ? "" : "d-none"}`}
            to={`/brew/v/${hasVersion && version._id}`}
          >
            Add a Brew
          </Link>
        </AppControl>
      );
    }

    const recipeContent = (
      <div>
        <RecipeDeets recipe={recipe} author={author} version={version} />
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

Version.propTypes = {
  getVersion: PropTypes.func.isRequired,
  setVersion: PropTypes.func.isRequired,
  getAllBrews: PropTypes.func.isRequired,
  actionConfirm: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  // brews: PropTypes.array.isRequired,
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
    getVersion,
    setVersion,
    getAllBrews,
    actionConfirm
  }
)(Version);
