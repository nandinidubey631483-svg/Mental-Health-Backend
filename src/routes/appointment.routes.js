const express = require("express");

const {
  bookAppointment,
  getAppointments,
  cancelAppointment,
  updateAppointmentStatus
} = require("../controllers/appointment.controller");
const { protect, authorize } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {
  bookAppointmentValidator,
  appointmentIdValidator,
  appointmentQueryValidator,
  updateAppointmentStatusValidator
} = require("../validators/appointment.validator");

const router = express.Router();

router.use(protect);

router.get("/", appointmentQueryValidator, validate, getAppointments);
router.post("/", authorize("user", "admin"), bookAppointmentValidator, validate, bookAppointment);
router.patch("/:id/cancel", appointmentIdValidator, validate, cancelAppointment);
router.patch(
  "/:id/status",
  authorize("therapist", "admin"),
  appointmentIdValidator,
  updateAppointmentStatusValidator,
  validate,
  updateAppointmentStatus
);

module.exports = router;
