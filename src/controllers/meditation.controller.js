const Meditation = require("../models/Meditation");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");
const getPagination = require("../utils/pagination");

const getMeditations = asyncHandler(async (req, res) => {
  const { category, page, limit } = req.query;
  const { skip, page: currentPage, limit: perPage } = getPagination(page, limit);

  const filter = {};
  if (category) {
    filter.category = new RegExp(`^${category}$`, "i");
  }

  const [items, total] = await Promise.all([
    Meditation.find(filter).sort({ createdAt: -1 }).skip(skip).limit(perPage),
    Meditation.countDocuments(filter)
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

const bookmarkMeditation = asyncHandler(async (req, res) => {
  const meditation = await Meditation.findById(req.params.id);
  if (!meditation) {
    throw new ApiError(404, "Meditation not found.");
  }

  const user = await User.findById(req.user._id);
  const alreadyBookmarked = user.bookmarkedMeditations.some(
    (item) => item.toString() === meditation._id.toString()
  );

  if (alreadyBookmarked) {
    user.bookmarkedMeditations = user.bookmarkedMeditations.filter(
      (item) => item.toString() !== meditation._id.toString()
    );
  } else {
    user.bookmarkedMeditations.push(meditation._id);
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: alreadyBookmarked
      ? "Meditation removed from bookmarks"
      : "Meditation bookmarked successfully"
  });
});

module.exports = {
  getMeditations,
  bookmarkMeditation
};
