const Mood = require("../models/Mood");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");
const getPagination = require("../utils/pagination");
const { buildMoodAnalytics } = require("../utils/moodAnalytics");

const createMood = asyncHandler(async (req, res) => {
  const mood = await Mood.create({
    ...req.body,
    user: req.user._id
  });

  res.status(201).json({
    success: true,
    message: "Mood entry created successfully",
    data: mood
  });
});

const getMoods = asyncHandler(async (req, res) => {
  const { startDate, endDate, page, limit } = req.query;
  const { skip, page: currentPage, limit: perPage } = getPagination(page, limit);

  const filter = { user: req.user._id };

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  const [items, total] = await Promise.all([
    Mood.find(filter).sort({ date: -1 }).skip(skip).limit(perPage),
    Mood.countDocuments(filter)
  ]);

  res.status(200).json({
    success: true,
    pagination: {
      page: currentPage,
      limit: perPage,
      total,
      totalPages: Math.ceil(total / perPage)
    },
    data: items
  });
});

const getMoodById = asyncHandler(async (req, res) => {
  const mood = await Mood.findOne({ _id: req.params.id, user: req.user._id });
  if (!mood) {
    throw new ApiError(404, "Mood entry not found.");
  }

  res.status(200).json({
    success: true,
    data: mood
  });
});

const updateMood = asyncHandler(async (req, res) => {
  const mood = await Mood.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!mood) {
    throw new ApiError(404, "Mood entry not found.");
  }

  res.status(200).json({
    success: true,
    message: "Mood entry updated successfully",
    data: mood
  });
});

const deleteMood = asyncHandler(async (req, res) => {
  const mood = await Mood.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

  if (!mood) {
    throw new ApiError(404, "Mood entry not found.");
  }

  res.status(200).json({
    success: true,
    message: "Mood entry deleted successfully"
  });
});

const getMoodAnalytics = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  const filter = { user: req.user._id };

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  const moods = await Mood.find(filter).sort({ date: 1 });
  const analytics = buildMoodAnalytics(moods);

  res.status(200).json({
    success: true,
    data: analytics
  });
});

module.exports = {
  createMood,
  getMoods,
  getMoodById,
  updateMood,
  deleteMood,
  getMoodAnalytics
};
