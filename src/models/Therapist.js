const mongoose = require("mongoose");

const availabilitySlotSchema = new mongoose.Schema(
  {
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    }
  },
  { _id: false }
);

const therapistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    specialization: {
      type: String,
      required: true,
      trim: true
    },
    experience: {
      type: Number,
      required: true,
      min: 0
    },
    availabilitySlots: {
      type: [availabilitySlotSchema],
      default: []
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  {
    timestamps: true
  }
);

therapistSchema.index({ specialization: "text", name: "text" });

module.exports = mongoose.model("Therapist", therapistSchema);
