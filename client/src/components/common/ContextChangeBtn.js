import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeControlContext } from "../../actions/appActions";
import Button from "../common/Button";

export class ContextChangeBtn extends Component {
  handleChangeContext(e) {
    e.preventDefault();
    const { altControlContext } = this.props.appJunk;
    this.props.changeControlContext(altControlContext);
  }

  render() {
    const { altControlContext } = this.props.appJunk;
    const contextIcon = altControlContext
      ? "baselineClose24px"
      : "baselineMoreVert24px";

    return (
      <Button
        type="button"
        classes={["btn-info"]}
        clickOrTo={this.handleChangeContext.bind(this)}
        icon={contextIcon}
      />
    );
  }
}

const mapStateToProps = state => ({
  appJunk: state.appJunk
});

ContextChangeBtn.propTypes = {
  changeControlContext: PropTypes.func.isRequired,
  appJunk: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { changeControlContext }
)(ContextChangeBtn);
