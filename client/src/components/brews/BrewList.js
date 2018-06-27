import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { actionConfirm } from "../../actions/appActions";
import { deleteBrew } from "../../actions/brewActions";
import ItemListItem from "../common/ItemListItem";

class BrewList extends Component {
  handleRemoval(e) {
    e.preventDefault();

    const button = e.target.closest("button");
    const { confirmItem = "this" } = button.dataset;
    const { value } = button;

    this.props.actionConfirm({
      confirmAction: deleteBrew,
      confirmId: value,
      confirmText: `Are you sure you want to delete the brew from ${confirmItem}?`
    });
  }

  render() {
    const { brews, auth } = this.props;

    const brewItems =
      Array.isArray(brews) &&
      brews.map(brew => (
        <ItemListItem
          key={brew._id}
          item={brew}
          itemType="brew"
          header={moment(brew.date).format("MMM D, YYYY")}
          sub={brew.notes}
          isAuth={auth.isAuth}
          handleRemoval={this.handleRemoval.bind(this)}
        />
      ));

    return <div className="list-group z-depth-3">{brewItems}</div>;
  }
}

BrewList.propTypes = {
  brews: PropTypes.array.isRequired,
  actionConfirm: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { actionConfirm }
)(BrewList);
