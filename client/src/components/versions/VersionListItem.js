import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { actionConfirm } from "../../actions/appActions";
import { deleteVersion } from "../../actions/versionActions";

class VersionListItem extends Component {
  handleRemoval(e) {
    e.preventDefault();
    const { _id, version } = this.props.version;

    this.props.actionConfirm({
      confirmAction: deleteVersion,
      confirmId: _id,
      confirmText: `Are you sure you want to delete Version ${version}?`
    });
  }

  render() {
    const { version } = this.props;
    return (
      <div className="list-group-item list-group-item-action d-flex align-items-center">
        <Link className="w-100" to={`/version/${version._id}`}>
          <h5 className="m-0">{version.version}</h5>
          <p className="m-0">{version.notes}</p>
        </Link>
        <Link className="mr-3" to={`/version/edit/${version._id}`}>
          Edit
        </Link>
        <button
          className="btn btn-empty text-danger"
          value={version._id}
          onClick={this.handleRemoval.bind(this)}
        >
          Delete
        </button>
      </div>
    );
  }
}

VersionListItem.propTypes = {
  actionConfirm: PropTypes.func.isRequired,
  version: PropTypes.object.isRequired
};

export default connect(
  null,
  { actionConfirm }
)(VersionListItem);
