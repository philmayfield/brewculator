import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { DELETE_BREW } from "../../actions/actionTypes";
import { actionConfirm } from "../../actions/appActions";
import Moment from "react-moment";

class BrewListItem extends Component {
  handleRemoval(e) {
    e.preventDefault();

    this.props.actionConfirm({
      confirm: DELETE_BREW,
      confirmId: e.target.value,
      confirmText: `Are you sure you want to delete this brew?`
    });
  }

  render() {
    const { brew } = this.props;
    return (
      <div className="list-group-item list-group-item-action d-flex align-items-center">
        <Link className="w-100" to={`/version/${brew._id}`}>
          <h5 className="m-0">
            {<Moment date={brew.date} format="MMM D, YYYY" />}
          </h5>
          <p className="m-0">{brew.notes}</p>
        </Link>
        <Link className="mr-3" to={`/editBrew/${brew._id}`}>
          Edit
        </Link>
        <button
          className="btn btn-empty text-danger"
          value={brew._id}
          onClick={this.handleRemoval.bind(this)}
        >
          Delete
        </button>
      </div>
    );
  }
}

BrewListItem.propTypes = {
  actionConfirm: PropTypes.func.isRequired,
  brew: PropTypes.object.isRequired
};

export default connect(
  null,
  { actionConfirm }
)(BrewListItem);
