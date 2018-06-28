import React from "react";
import PropTypes from "prop-types";
import ReactSVG from "react-svg";
import getImg from "../../common/getImg";
import { Link } from "react-router-dom";

const Button = props => {
  const {
    children,
    classes = ["btn-primary"],
    svgClasses = ["light"],
    clickOrTo,
    icon,
    value = null,
    confirmItem = null,
    type = "button"
  } = props;
  const iconPath = icon && getImg(icon);
  const className = `btn ${classes && classes.join(" ")}`;
  const svgClassName = `${children && children.length && "mr-2"} ${svgClasses &&
    svgClasses.join(" ")}`;

  return type === "link" ? (
    <Link className={className} to={clickOrTo}>
      {iconPath && <ReactSVG path={iconPath} svgClassName={svgClassName} />}
      {children}
    </Link>
  ) : (
    <button
      type={type}
      className={className}
      onClick={clickOrTo}
      value={value}
      data-confirm-item={confirmItem}
    >
      {iconPath && <ReactSVG path={iconPath} svgClassName={svgClassName} />}
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.string,
  classes: PropTypes.array,
  svgClasses: PropTypes.array,
  clickOrTo: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: PropTypes.string,
  value: PropTypes.any,
  confirmItem: PropTypes.string
};

export default Button;
