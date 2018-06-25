import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ACTION_CONFIRM } from "../../actions/actionTypes";
import { notEmpty } from "../../common/empty";

class AreYouSure extends Component {
  render() {
    const { handleConfirm, handleCancel } = this.props;
    const { confirmText = "Are you sure?" } = this.props.confirmObject;

    return (
      <div className="are-you-sure w-100">
        <p className="text-center m-2">{confirmText}</p>
        <div className="d-flex">
          <button
            className="btn btn-success flex-fill"
            value={true}
            onClick={handleConfirm}
          >
            Yep, do it!
          </button>
          <button
            className="btn btn-danger flex-fill"
            value={false}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

AreYouSure.propTypes = {
  appJunk: PropTypes.object.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  confirmObject: PropTypes.object
};

const mapStateToProps = state => ({
  appJunk: state.appJunk
});

const mapDispatchToProps = (dispatch, props) => {
  // pull confirm object off of props
  return {
    handleConfirm: () => {
      const { confirmId, confirmAction, redirect } = props.confirmObject;

      Promise.all([
        // dispatch the confirmation action
        dispatch(confirmAction(confirmId)),

        // clear the confirmation state object
        dispatch({
          type: ACTION_CONFIRM,
          payload: {}
        })
      ]).then(() => {
        if (notEmpty(redirect)) {
          return props.history.push(redirect);
        }
      });
    },
    handleCancel: () => {
      // no action - clear the confirmation state object
      dispatch({
        type: ACTION_CONFIRM,
        payload: {}
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AreYouSure);
