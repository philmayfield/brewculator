import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Loading extends Component {
  render() {
    const { loadingArr } = this.props.appJunk;
    const loading = loadingArr.length > 0;
    const loadingGuts = (
      <div
        className={`app-loading align-items-center justify-content-center ${
          loading ? "d-flex" : "d-none"
        }`}
      >
        <div className="loader">LOADING&hellip;</div>
      </div>
    );

    return loadingGuts;
  }
}

Loading.propTypes = {
  appJunk: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  appJunk: state.appJunk
});

export default connect(mapStateToProps)(Loading);
