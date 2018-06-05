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
  required = false
}) => {
  return (
    <div className="input">
      <label>
        {label}
        <input
          type={type}
          className={`${error ? "is-invalid" : ""}`}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
        />
      </label>
      {info && <small className="form-text text-muted">{info}</small>}
      <div className="feedback">{error}</div>
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.string,
  onChange: PropTypes.func,
  info: PropTypes.string,
  required: PropTypes.bool
};

Input.defaultProps = {
  type: "text"
};

export default Input;
