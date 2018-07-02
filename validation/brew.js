const Validator = require("validator");
const isEmpty = require("./empty").isEmpty;
const notEmpty = require("./empty").notEmpty;

module.exports = function validateBrewInput(data = {}) {
  let errors = {};

  data.date = notEmpty(data.date) ? data.date + "" : "";

  if (Validator.isEmpty(data.date)) {
    errors.date = "The date field can not be empty";
  }
  if (!Validator.isISO8601(data.date)) {
    errors.date = "A valid date is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
