import React from "react";
import PropTypes from "prop-types";
import Alert from "../common/Alert";

const ItemWrap = props => {
  const { items, errors, label } = props;

  const makeContent = items => {
    const hasItems = items && items.length > 0;
    const { [`no${label}`]: noItems } = errors && errors;
    let itemsContent;

    if (hasItems) {
      itemsContent = props.children;
    } else if (noItems || !hasItems) {
      itemsContent = (
        <Alert
          bsStyle="alert-success"
          heading={`No ${label.toLowerCase()} yet`}
        >
          <p className="mb-0">
            Hey, there arent any {label.toLowerCase()} here yet. How about you
            add one!
          </p>
        </Alert>
      );
    }
    return itemsContent;
  };

  return (
    <div>
      <h5>{label}</h5>
      {makeContent(items)}
    </div>
  );
};

ItemWrap.propTypes = {
  label: PropTypes.string,
  children: PropTypes.object,
  errors: PropTypes.object,
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default ItemWrap;
