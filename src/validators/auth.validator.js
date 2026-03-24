const { body } = require("express-validator");

const registerValidator = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("email").isEmail().withMessage("A valid email is required."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  body("age")
    .isInt({ min: 13, max: 120 })
    .withMessage("Age must be between 13 and 120."),
  body("gender")
    .isIn(["male", "female", "non_binary", "prefer_not_to_say", "other"])
    .withMessage("Invalid gender value."),
  body("role")
    .optional()
    .isIn(["user", "therapist"])
    .withMessage("Role must be either user or therapist."),
  body("mentalHealthGoals")
    .optional()
    .isArray()
    .withMessage("mentalHealthGoals must be an array."),
  body("specialization")
    .optional()
    .isString()
    .withMessage("Specialization must be a string."),
  body("experience")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Experience must be a non-negative integer."),
  body("availabilitySlots")
    .optional()
    .isArray()
    .withMessage("availabilitySlots must be an array.")
];

const loginValidator = [
  body("email").isEmail().withMessage("A valid email is required."),
  body("password").notEmpty().withMessage("Password is required.")
];

module.exports = {
  registerValidator,
  loginValidator
};
