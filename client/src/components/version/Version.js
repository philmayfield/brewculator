import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { actionConfirm } from "../../actions/appActions";
import { notEmpty } from "../../common/empty";
import hasInStore from "../../common/hasInStore";
import {
  getVersion,
  setVersion,
  deleteVersion
} from "../../actions/versionActions";
import { getAllBrews, unsetBrew } from "../../actions/brewActions";
import ContextChangeBtn from "../common/ContextChangeBtn";
import RecipeDeets from "../layout/RecipeDeets";
import AppControl from "../layout/AppControl";
import ItemWrap from "../common/ItemWrap";
import BrewList from "../brews/BrewList";
import AreYouSure from "../common/AreYouSure";
import Alert from "../common/Alert";
import Button from "../common/Button";

class Version extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    const { id } = this.props.match.params;
    const { recipe } = this.props;
    const { version, versions } = recipe && recipe;
    const { inStore, storeItem } = hasInStore(id, version, versions);

    if (inStore) {
      // fetch version from the store
      this.props.setVersion(storeItem);
      this.props.getAllBrews(id);
    } else {
      // fetch version over the wire, will also fetch recipe & brews
      this.props.getVersion(id);
    }

    this.props.unsetBrew();

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
    const { loadingArr, confirmObject, altControlContext } = appJunk;
    const loading = loadingArr.length > 0;
    const hasVersion = version && notEmpty(version._id);
    const author = auth.users.find(user => user._id === recipe.author);
    let errorContent, controlContent, versionContent;

    if (hasVersion && !loading) {
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
    } else if (isAuth && !loading && altControlContext) {
      controlContent = (
        <AppControl>
          <ContextChangeBtn />
          <Button
            classes={["btn-danger", "flex-fill", hasVersion ? "" : "d-none"]}
            clickOrTo={this.handleDelete}
            icon="baselineDeleteForever24px"
          >
            Delete Version
          </Button>
          <Button
            type="link"
            classes={["btn-primary", "flex-fill", hasVersion ? "" : "d-none"]}
            clickOrTo={`edit/${hasVersion && version._id}`}
            icon="baselineEdit24px"
          >
            Edit Version
          </Button>
        </AppControl>
      );
    } else if (isAuth && !loading) {
      controlContent = (
        <AppControl>
          <ContextChangeBtn />
          <Button
            type="link"
            classes={["btn-secondary", "flex-fill"]}
            clickOrTo={`/recipe/${recipe._id}`}
            icon="baselineArrowBack24px"
          >
            Back
          </Button>
          <Button
            type="link"
            classes={["btn-primary", "flex-fill", hasVersion ? "" : "d-none"]}
            clickOrTo="/brew/edit/new"
            icon="baselineAddCircle24px"
          >
            Add Brew
          </Button>
        </AppControl>
      );
    }

    const recipeContent = (
      <div>
        <RecipeDeets
          recipe={recipe}
          author={author}
          version={version}
          loading={loading}
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

Version.propTypes = {
  getVersion: PropTypes.func.isRequired,
  setVersion: PropTypes.func.isRequired,
  unsetBrew: PropTypes.func.isRequired,
  getAllBrews: PropTypes.func.isRequired,
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
    getVersion,
    setVersion,
    getAllBrews,
    unsetBrew,
    actionConfirm
  }
)(Version);
