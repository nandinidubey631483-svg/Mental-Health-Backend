const { body, query } = require("express-validator");

const moodValues = [
  "very_sad",
  "sad",
  "anxious",
  "stressed",
  "neutral",
  "calm",
  "happy",
  "excited"
];

const createMoodValidator = [
  body("mood").isIn(moodValues).withMessage("Invalid mood value."),
  body("note").optional().isString().withMessage("Note must be a string."),
  body("date").isISO8601().withMessage("A valid date is required.")
];

const updateMoodValidator = [
  body("mood").optional().isIn(moodValues).withMessage("Invalid mood value."),
  body("note").optional().isString().withMessage("Note must be a string."),
  body("date").optional().isISO8601().withMessage("A valid date is required.")
];

const moodQueryValidator = [
  query("startDate").optional().isISO8601().withMessage("Invalid startDate."),
  query("endDate").optional().isISO8601().withMessage("Invalid endDate."),
  query("page").optional().isInt({ min: 1 }).withMessage("Invalid page."),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Invalid limit.")
];

module.exports = {
  createMoodValidator,
  updateMoodValidator,
  moodQueryValidator
};
