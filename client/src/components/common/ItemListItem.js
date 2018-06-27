import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "../common/Button";

const ItemListItem = props => {
  const {
    item,
    itemType,
    header,
    sub = "",
    isAuth,
    handleRemoval,
    isLink = true
  } = props;

  const editBtn = isAuth && (
    <Button
      type="link"
      classes={["btn-empty", "mr-3"]}
      clickOrTo={`/${itemType}/edit/${item._id}`}
      icon="baselineEdit24px"
      svgClasses={["primary"]}
    />
  );
  const deleteBtn = isAuth && (
    <Button
      type="button"
      confirmItem={header}
      classes={["btn-empty", "text-danger"]}
      value={item._id}
      clickOrTo={handleRemoval}
      icon="baselineDeleteForever24px"
      svgClasses={["danger"]}
    />
  );
  const makeHeaderFooter = () => (
    <div className="w-100 d-flex flex-wrap align-items-baseline pr-3">
      <h6 className="m-0 mr-3">{header}</h6>
      {sub && <p className="m-0">{sub}</p>}
    </div>
  );
  const makeLink = () => (
    <Link className="w-100" to={`/${itemType}/${item._id}`}>
      {makeHeaderFooter()}
    </Link>
  );

  return (
    <div className="list-group-item list-group-item-action d-flex align-items-center">
      {isLink ? makeLink() : makeHeaderFooter()}
      {editBtn}
      {deleteBtn}
    </div>
  );
};

ItemListItem.propTypes = {
  item: PropTypes.object.isRequired,
  itemType: PropTypes.string.isRequired,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  sub: PropTypes.string,
  isAuth: PropTypes.bool.isRequired,
  handleRemoval: PropTypes.func.isRequired,
  isLink: PropTypes.bool
};
export default ItemListItem;
