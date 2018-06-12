import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import VersionList from "./VersionList";

class Versions extends Component {
  render() {
    const { versions } = this.props;
    const hasVersions = versions.length > 0;
    const noVersions = versions && versions.noVersions;
    let versionsContent;

    if (hasVersions) {
      versionsContent = <VersionList versions={versions} />;
    } else if (noVersions) {
      versionsContent = (
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">No versions yet</h4>
          <p className="mb-0">{noVersions}</p>
        </div>
      );
    }

    return <div className="versions">{versionsContent}</div>;
  }
}

Versions.propTypes = {
  appJunk: PropTypes.object.isRequired,
  versions: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

const mapStateToProps = state => ({
  appJunk: state.appJunk
});

export default connect(mapStateToProps)(Versions);
