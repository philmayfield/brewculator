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
import ItemWrap from "../common/ItemWrap";
import BrewList from "../brews/BrewList";
import AreYouSure from "../common/AreYouSure";
import Alert from "../common/Alert";

class Version extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    const { id } = this.props.match.params;
    const { recipe } = this.props;
    const { versions } = recipe && recipe;
    const storeVersion =
      Array.isArray(versions) && versions.find(version => version._id === id);
    const hasStoreVersion = storeVersion && notEmpty(storeVersion);

    if (hasStoreVersion) {
      // fetch version from the store
      this.props.setVersion(storeVersion);
      this.props.getAllBrews(id);
    } else {
      // fetch version over the wire, will also fetch recipe & brews
      this.props.getVersion(id);
    }

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();

    const { _id, version, recipe } = this.props.recipe.version;

    this.props.actionConfirm({
      confirmAction: deleteVersion,
      confirmId: _id,
      confirmText: `Are you sure you want to delete Version ${version}?`,
      redirect: `/recipe/${recipe}`
    });
  }

  render() {
    const { recipe, errors, auth, appJunk } = this.props;
    const { version } = recipe;
    const { isAuth } = auth;
    const { loading, confirmObject } = appJunk;
    const hasVersion = version && notEmpty(version._id);
    const author = auth.users.find(user => user._id === recipe.author);
    let errorContent, controlContent, versionContent;

    if (hasVersion) {
      versionContent = (
        <ItemWrap label="Brews" items={version.brews} errors={errors}>
          <BrewList brews={version.brews} />
        </ItemWrap>
      );
    }

    if (errors && errors.noVersion) {
      errorContent = (
        <Alert bsStyle="alert-danger" heading="Version not found">
          <p className="mb-0">{errors.noVersion}</p>
        </Alert>
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
          <Link className="btn btn-secondary mr-3" to={`/recipe/${recipe._id}`}>
            Back
          </Link>
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
            to={`/brew/edit/new`}
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
