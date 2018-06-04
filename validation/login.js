const Validator = require("validator");
const isEmpty = require("./empty").isEmpty;
const notEmpty = require("./empty").notEmpty;

module.exports = function validateLoginInput(data = {}) {
  let errors = {};

  data.username = notEmpty(data.username) ? data.username : "";
  data.password = notEmpty(data.password) ? data.password : "";

  // username validations
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  // password validations
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
