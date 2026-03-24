const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },
    age: {
      type: Number,
      required: true,
      min: 13,
      max: 120
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "non_binary", "prefer_not_to_say", "other"]
    },
    role: {
      type: String,
      enum: ["user", "therapist", "admin"],
      default: "user"
    },
    bio: {
      type: String,
      default: ""
    },
    mentalHealthGoals: {
      type: [String],
      default: []
    },
    bookmarkedMeditations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meditation"
      }
    ]
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function userPreSave(next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
