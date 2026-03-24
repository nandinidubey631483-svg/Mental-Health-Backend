const mongoose = require("mongoose");

const meditationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    duration: {
      type: Number,
      required: true,
      min: 1
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    audioUrl: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Meditation", meditationSchema);
