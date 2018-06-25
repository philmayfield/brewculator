import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Loading extends Component {
  render() {
    const { loading } = this.props.appJunk;
    let loadingGuts = null;

    // if (loading) {
    //   loadingGuts = (
    //     <div className="app-loading d-flex align-items-center justify-content-center">
    //       <div>LOADING&hellip;</div>
    //     </div>
    //   );
    // }

    loadingGuts = (
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
