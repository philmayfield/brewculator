const Validator = require("validator");
const isEmpty = require("./empty").isEmpty;
const notEmpty = require("./empty").notEmpty;

module.exports = function validateGravityInput(data = {}) {
  let errors = {};

  data.date = notEmpty(data.date) ? data.date + "" : "";
  data.brix = notEmpty(data.brix) ? data.brix + "" : "";
  data.temp = notEmpty(data.temp) ? data.temp + "" : "";

  // gravity validations
  if (Validator.isEmpty(data.date)) {
    errors.date = "The date field can not be empty";
  }
  if (!Validator.isISO8601(data.date)) {
    errors.date = "A valid date is required";
  }
  if (!Validator.isNumeric(data.brix)) {
    errors.brix = "Brix reading should be a number";
  }
  if (Validator.isEmpty(data.brix)) {
    errors.brix = "Brix reading is required";
  }

  // temp validations
  if (notEmpty(data.temp) && !Validator.isNumeric(data.temp)) {
    errors.temp = "Temperature should be a number";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
