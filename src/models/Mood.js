const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    mood: {
      type: String,
      required: true,
      enum: [
        "very_sad",
        "sad",
        "anxious",
        "stressed",
        "neutral",
        "calm",
        "happy",
        "excited"
      ]
    },
    note: {
      type: String,
      default: ""
    },
    date: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

moodSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model("Mood", moodSchema);
