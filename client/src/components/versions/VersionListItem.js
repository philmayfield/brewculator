import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { DELETE_VERSION } from "../../actions/actionTypes";
import { actionConfirm } from "../../actions/appActions";

class VersionListItem extends Component {
  handleRemoval(e) {
    e.preventDefault();

    this.props.actionConfirm({
      confirm: DELETE_VERSION,
      confirmId: e.target.value,
      confirmText: `Are you sure you want to delete version ${
        this.props.version.version
      }?`
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
        <Link className="mr-3" to={`/editVersion/${version._id}`}>
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
