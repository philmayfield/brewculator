// const Validator = require("validator");
const isEmpty = require("./empty").isEmpty;
// const notEmpty = require("./empty").notEmpty;

module.exports = function validateBrewInput() {
  let errors = {};

  // data.notes = notEmpty(data.notes) ? data.notes : "";

  // // brew validations
  // if (Validator.isEmpty(data.notes)) {
  //   errors.notes = "Brew notes are required";
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
