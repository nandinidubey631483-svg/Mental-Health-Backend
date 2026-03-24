const Therapist = require("../models/Therapist");
const asyncHandler = require("../utils/asyncHandler");
const getPagination = require("../utils/pagination");

const getTherapists = asyncHandler(async (req, res) => {
  const { specialization, search, page, limit } = req.query;
  const { skip, page: currentPage, limit: perPage } = getPagination(page, limit);

  const filter = {};

  if (specialization) {
    filter.specialization = new RegExp(specialization, "i");
  }

  if (search) {
    filter.$or = [
      { name: new RegExp(search, "i") },
      { specialization: new RegExp(search, "i") }
    ];
  }

  const [items, total] = await Promise.all([
    Therapist.find(filter).sort({ experience: -1 }).skip(skip).limit(perPage),
    Therapist.countDocuments(filter)
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

module.exports = {
  getTherapists
};
