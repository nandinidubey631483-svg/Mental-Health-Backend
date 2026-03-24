const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "bookmarkedMeditations",
    "title duration category audioUrl"
  );

  res.status(200).json({
    success: true,
    data: user
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const allowedFields = [
    "name",
    "age",
    "gender",
    "bio",
    "mentalHealthGoals"
  ];

  const updates = Object.keys(req.body).reduce((acc, key) => {
    if (allowedFields.includes(key)) {
      acc[key] = req.body[key];
    }
    return acc;
  }, {});

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true
  }).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: user
  });
});

module.exports = {
  getProfile,
  updateProfile
};
