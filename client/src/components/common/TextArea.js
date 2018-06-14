import React from "react";
import PropTypes from "prop-types";

const TextArea = ({
  name,
  label,
  placeholder,
  value,
  error,
  onChange,
  disabled,
  info,
  required = false,
  autoFocus = false
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        className={`form-control ${error ? "is-invalid" : ""}`}
        placeholder={placeholder}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        autoFocus={autoFocus}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.string,
  onChange: PropTypes.func,
  info: PropTypes.string,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool
};

export default TextArea;
