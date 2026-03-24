const { body } = require("express-validator");

const updateProfileValidator = [
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty."),
  body("age")
    .optional()
    .isInt({ min: 13, max: 120 })
    .withMessage("Age must be between 13 and 120."),
  body("gender")
    .optional()
    .isIn(["male", "female", "non_binary", "prefer_not_to_say", "other"])
    .withMessage("Invalid gender value."),
  body("mentalHealthGoals")
    .optional()
    .isArray()
    .withMessage("mentalHealthGoals must be an array.")
];

module.exports = {
  updateProfileValidator
};
