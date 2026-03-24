const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    therapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
      required: true
    },
    slotStart: {
      type: Date,
      required: true
    },
    slotEnd: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending"
    },
    notes: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

appointmentSchema.index(
  { therapist: 1, slotStart: 1, slotEnd: 1 },
  { unique: true, partialFilterExpression: { status: { $ne: "cancelled" } } }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
