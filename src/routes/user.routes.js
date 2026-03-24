const express = require("express");

const { getProfile, updateProfile } = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { updateProfileValidator } = require("../validators/user.validator");

const router = express.Router();

router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfileValidator, validate, updateProfile);

module.exports = router;
