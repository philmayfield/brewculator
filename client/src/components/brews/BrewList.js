import React from "react";
import PropTypes from "prop-types";
import BrewListItem from "./BrewListItem";
import { notEmpty } from "../../common/empty";

const BrewList = props => {
  const { brews } = props;
  const brewItems =
    notEmpty(brews) &&
    brews.map(brew => <BrewListItem key={brew._id} brew={brew} />);

  return <div className="list-group">{brewItems}</div>;
};

BrewList.propTypes = {
  brews: PropTypes.array.isRequired
};
export default BrewList;
