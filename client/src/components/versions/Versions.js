import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import VersionList from "./VersionList";
import Alert from "../common/Alert";

class Versions extends Component {
  render() {
    const { versions, errors } = this.props;
    const hasVersions = versions.length > 0;
    const { noVersions } = errors && errors;
    let versionsContent;

    if (hasVersions) {
      versionsContent = <VersionList versions={versions} />;
    } else if (noVersions) {
      versionsContent = (
        <Alert bsStyle="alert-success" heading="No versions yet">
          <p className="mb-0">{noVersions}</p>
        </Alert>
      );
    }

    return <div className="versions">{versionsContent}</div>;
  }
}

Versions.propTypes = {
  appJunk: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  versions: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

const mapStateToProps = state => ({
  appJunk: state.appJunk,
  errors: state.errors
});

export default connect(mapStateToProps)(Versions);
