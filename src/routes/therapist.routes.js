const express = require("express");

const { getTherapists } = require("../controllers/therapist.controller");
const validate = require("../middleware/validate.middleware");
const { therapistQueryValidator } = require("../validators/therapist.validator");

const router = express.Router();

router.get("/", therapistQueryValidator, validate, getTherapists);

module.exports = router;
