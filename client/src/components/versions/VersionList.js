import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { actionConfirm } from "../../actions/appActions";
import { deleteVersion } from "../../actions/versionActions";
import ItemListItem from "../common/ItemListItem";

class VersionList extends Component {
  handleRemoval(e) {
    e.preventDefault();

    const button = e.target.closest("button");
    const { confirmItem = "this" } = button.dataset;
    const { value } = button;

    this.props.actionConfirm({
      confirmAction: deleteVersion,
      confirmId: value,
      confirmText: `Are you sure you want to delete ${confirmItem}?`
    });
  }

  render() {
    const { versions, auth } = this.props;

    const versionItems =
      Array.isArray(versions) &&
      versions.map(version => (
        <ItemListItem
          key={version._id}
          item={version}
          itemType="version"
          header={version.version}
          sub={version.notes}
          isAuth={auth.isAuth}
          handleRemoval={this.handleRemoval.bind(this)}
        />
      ));

    return (
      <div className="list-group info-container z-depth-3">{versionItems}</div>
    );
  }
}

VersionList.propTypes = {
  versions: PropTypes.array.isRequired,
  actionConfirm: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { actionConfirm }
)(VersionList);
