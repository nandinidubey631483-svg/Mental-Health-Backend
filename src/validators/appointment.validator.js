const { body, param, query } = require("express-validator");

const bookAppointmentValidator = [
  body("therapistId").isMongoId().withMessage("Invalid therapist id."),
  body("slotStart").isISO8601().withMessage("slotStart must be a valid ISO date."),
  body("notes").optional().isString().withMessage("Notes must be a string.")
];

const appointmentIdValidator = [
  param("id").isMongoId().withMessage("Invalid appointment id.")
];

const appointmentQueryValidator = [
  query("status")
    .optional()
    .isIn(["pending", "confirmed", "cancelled"])
    .withMessage("Invalid status."),
  query("page").optional().isInt({ min: 1 }).withMessage("Invalid page."),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Invalid limit.")
];

const updateAppointmentStatusValidator = [
  body("status")
    .isIn(["pending", "confirmed", "cancelled"])
    .withMessage("Invalid appointment status.")
];

module.exports = {
  bookAppointmentValidator,
  appointmentIdValidator,
  appointmentQueryValidator,
  updateAppointmentStatusValidator
};
