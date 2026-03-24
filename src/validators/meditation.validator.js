const { query, param } = require("express-validator");

const meditationQueryValidator = [
  query("category").optional().isString().withMessage("Invalid category."),
  query("page").optional().isInt({ min: 1 }).withMessage("Invalid page."),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Invalid limit.")
];

const meditationIdValidator = [
  param("id").isMongoId().withMessage("Invalid meditation id.")
];

module.exports = {
  meditationQueryValidator,
  meditationIdValidator
};
