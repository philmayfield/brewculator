import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
    <Link className="mr-3" to={`/${itemType}/edit/${item._id}`}>
      Edit
    </Link>
  );
  const deleteBtn = isAuth && (
    <button
      data-confirm-item={header}
      className="btn btn-empty text-danger"
      value={item._id}
      onClick={handleRemoval}
    >
      Delete
    </button>
  );
  const makeHeaderFooter = () => (
    <div className="w-100">
      <h6 className="m-0">{header}</h6>
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
