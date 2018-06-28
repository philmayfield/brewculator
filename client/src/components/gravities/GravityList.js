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

    const button = e.target.closest("button");
    const { confirmItem = "this" } = button.dataset;
    const { value } = button;

    this.props.actionConfirm({
      confirmAction: deleteGravity,
      confirmId: value,
      confirmText: `Are you sure you want to delete the gravity reading from ${confirmItem}?`
    });
  }

  render() {
    const { gravities, auth } = this.props;

    const gravityItems =
      Array.isArray(gravities) &&
      gravities.map(gravity => {
        const { _id, date, brix, temp, notes } = gravity;

        let sub = `${brix}\u00B0Bx`;
        sub += temp && ` \u00B7 ${temp}\u00B0F`;
        sub += notes && ` \u00B7 ${notes}`;

        return (
          <ItemListItem
            key={_id}
            item={gravity}
            itemType="gravity"
            header={moment.utc(date).format("MMM D, YYYY")}
            sub={sub}
            isAuth={auth.isAuth}
            handleRemoval={this.handleRemoval.bind(this)}
            isLink={false}
          />
        );
      });

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
