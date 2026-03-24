const { query } = require("express-validator");

const therapistQueryValidator = [
  query("specialization")
    .optional()
    .isString()
    .withMessage("Invalid specialization."),
  query("search").optional().isString().withMessage("Invalid search term."),
  query("page").optional().isInt({ min: 1 }).withMessage("Invalid page."),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Invalid limit.")
];

module.exports = {
  therapistQueryValidator
};
