import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { actionConfirm } from "../../actions/appActions";
// import { deleteBrew } from "../../actions/brewActions";
import ItemListItem from "../common/ItemListItem";
import Moment from "react-moment";

class BrewList extends Component {
  handleRemoval(e) {
    e.preventDefault();

    const { confirmItem = "this" } = e.target.dataset.confirmItem;

    this.props.actionConfirm({
      // confirmAction: deleteBrew,
      confirmId: e.target.value,
      confirmText: `Are you sure you want to delete ${confirmItem}?`
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
          header={<Moment date={brew.date} format="MMM D, YYYY" />}
          sub={brew.notes}
          isAuth={auth.isAuth}
          handleRemoval={this.handleRemoval.bind(this)}
        />
      ));

    return <div className="list-group">{brewItems}</div>;
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
