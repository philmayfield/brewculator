const isEmpty = val =>
  val === undefined ||
  val === null ||
  (typeof val === "object" && Object.keys(val).length === 0) ||
  (Array.isArray(val) && val.length === 0) ||
  (typeof val === "string" && val.trim().length === 0);

const notEmpty = val => !isEmpty(val);

module.exports = {
  isEmpty,
  notEmpty
};
