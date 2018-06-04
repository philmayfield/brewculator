const Validator = require("validator");
const isEmpty = require("./empty").isEmpty;
const notEmpty = require("./empty").notEmpty;

module.exports = function validateRecipeInput(data = {}) {
  let errors = {};

  data.name = notEmpty(data.name) ? data.name : "";
  data.style = notEmpty(data.style) ? data.style : "";

  // name validations
  if (Validator.isEmpty(data.name)) {
    errors.name = "Recipe name is required";
  }

  // style validations
  if (Validator.isEmpty(data.style)) {
    errors.style = "Recipe style is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
