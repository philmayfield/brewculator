const Validator = require("validator");
const isEmpty = require("./empty").isEmpty;
const notEmpty = require("./empty").notEmpty;

module.exports = function validateGravityInput(data = {}) {
  let errors = {};

  data.gravity = notEmpty(data.gravity) ? data.gravity + "" : "";
  data.temp = notEmpty(data.temp) ? data.temp + "" : "";

  // gravity validations
  if (Validator.isNumeric(data.gravity)) {
    errors.gravity = "Gravity should be a number";
  }
  if (Validator.isEmpty(data.gravity)) {
    errors.gravity = "Gravity is required";
  }

  // temp validations
  if (Validator.isNumeric(data.temp)) {
    errors.temp = "Temperature should be a number";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
