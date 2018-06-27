import React from "react";
import PropTypes from "prop-types";

const Input = ({
  name,
  label,
  placeholder,
  value,
  error,
  type,
  onChange,
  disabled,
  info,
  required = false,
  autoFocus = false
}) => {
  return (
    <div className="form-group">
      <label htmlFor={`input-${name}`}>
        {label}
        {required && " *"}
      </label>
      <input
        type={type}
        className={`form-control ${error ? "is-invalid" : ""}`}
        placeholder={placeholder}
        id={`input-${name}`}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        autoFocus={autoFocus}
      />
      <div className="invalid-feedback">{error}</div>
      {info && <small className="form-text text-muted">{info}</small>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.string,
  onChange: PropTypes.func,
  info: PropTypes.string,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool
};

Input.defaultProps = {
  type: "text"
};

export default Input;
