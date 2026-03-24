const User = require("../models/User");
const Therapist = require("../models/Therapist");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");
const generateToken = require("../utils/generateToken");

const register = asyncHandler(async (req, res) => {
  const { name, email, password, age, gender, role, bio, mentalHealthGoals } =
    req.body;

  if (role === "admin") {
    throw new ApiError(403, "Admin accounts cannot be self-registered.");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists with this email.");
  }

  const user = await User.create({
    name,
    email,
    password,
    age,
    gender,
    role: role || "user",
    bio,
    mentalHealthGoals
  });

  if (user.role === "therapist") {
    await Therapist.create({
      name: user.name,
      specialization: req.body.specialization || "General Therapy",
      experience: req.body.experience || 0,
      availabilitySlots: req.body.availabilitySlots || [],
      user: user._id
    });
  }

  const token = generateToken(user._id, user.role);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const token = generateToken(user._id, user.role);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }
  });
});

module.exports = {
  register,
  login
};
