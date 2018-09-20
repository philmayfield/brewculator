import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ACTION_CONFIRM } from '../../actions/actionTypes';
import { notEmpty } from '../../common/empty';
import Button from './Button';
import ReactSVG from 'react-svg';
import getImg from '../../common/getImg';

class AreYouSure extends Component {
  render() {
    const { handleConfirm, handleCancel } = this.props;
    const { confirmText = 'Are you sure?' } = this.props.confirmObject;

    return (
      <div className="are-you-sure w-100">
        <div className="d-flex justify-content-center mb-2">
          <ReactSVG
            className="mr-2"
            svgClassName="danger"
            src={getImg('roundWarning24px')}
          />
          <strong>{confirmText}</strong>
        </div>
        <div className="d-flex">
          <Button
            type="button"
            classes={['btn-danger', 'flex-fill']}
            value={true}
            clickOrTo={handleCancel}
            icon="baselineClose24px"
          >
            No dont!
          </Button>
          <Button
            type="button"
            classes={['btn-success', 'flex-fill']}
            value={true}
            clickOrTo={handleConfirm}
            icon="baselineDone24px"
          >
            Yep, do it!
          </Button>
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
