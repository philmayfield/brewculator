import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { actionConfirm } from "../../actions/appActions";
import { deleteGravity } from "../../actions/gravityActions";
import ItemListItem from "../common/ItemListItem";

class GravityList extends Component {
  handleRemoval(e) {
    e.preventDefault();

    const { confirmItem = "this" } = e.target.dataset;

    this.props.actionConfirm({
      confirmAction: deleteGravity,
      confirmId: e.target.value,
      confirmText: `Are you sure you want to delete the gravity reading from ${confirmItem}?`
    });
  }

  render() {
    const { gravities, auth } = this.props;

    const gravityItems =
      Array.isArray(gravities) &&
      gravities.map(gravity => (
        <ItemListItem
          key={gravity._id}
          item={gravity}
          itemType="gravity"
          header={moment.utc(gravity.date).format("MMM D, YYYY")}
          sub={gravity.notes}
          isAuth={auth.isAuth}
          handleRemoval={this.handleRemoval.bind(this)}
          isLink={false}
        />
      ));

    return <div className="list-group z-depth-3">{gravityItems.reverse()}</div>;
  }
}

GravityList.propTypes = {
  gravities: PropTypes.array.isRequired,
  actionConfirm: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { actionConfirm }
)(GravityList);
