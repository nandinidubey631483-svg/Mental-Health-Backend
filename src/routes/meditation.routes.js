const express = require("express");

const {
  getMeditations,
  bookmarkMeditation
} = require("../controllers/meditation.controller");
const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {
  meditationQueryValidator,
  meditationIdValidator
} = require("../validators/meditation.validator");

const router = express.Router();

router.get("/", meditationQueryValidator, validate, getMeditations);
router.post("/:id/bookmark", protect, meditationIdValidator, validate, bookmarkMeditation);

module.exports = router;
