const Validator = require("validator");
const isEmpty = require("./empty").isEmpty;
const notEmpty = require("./empty").notEmpty;

module.exports = function validateVersionInput(data = {}) {
  let errors = {};

  data.version = notEmpty(data.version) ? data.version : "";

  // version validations
  if (Validator.isEmpty(data.version)) {
    errors.version = "Recipe version is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
