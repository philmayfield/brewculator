import React from "react";
import PropTypes from "prop-types";
import VersionListItem from "./VersionListItem";
import { notEmpty } from "../../common/empty";

const VersionList = props => {
  const { versions } = props;
  const versionItems =
    notEmpty(versions) &&
    versions.map(version => {
      return <VersionListItem key={version._id} version={version} />;
    });

  return <div className="list-group">{versionItems}</div>;
};

VersionList.propTypes = {
  versions: PropTypes.array.isRequired
};
export default VersionList;
