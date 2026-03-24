const express = require("express");
const { param } = require("express-validator");

const {
  createMood,
  getMoods,
  getMoodById,
  updateMood,
  deleteMood,
  getMoodAnalytics
} = require("../controllers/mood.controller");
const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {
  createMoodValidator,
  updateMoodValidator,
  moodQueryValidator
} = require("../validators/mood.validator");

const router = express.Router();

router.use(protect);

router.get("/", moodQueryValidator, validate, getMoods);
router.get("/analytics", moodQueryValidator, validate, getMoodAnalytics);
router.post("/", createMoodValidator, validate, createMood);
router.get("/:id", param("id").isMongoId(), validate, getMoodById);
router.put("/:id", param("id").isMongoId(), updateMoodValidator, validate, updateMood);
router.delete("/:id", param("id").isMongoId(), validate, deleteMood);

module.exports = router;
