const Appointment = require("../models/Appointment");
const Therapist = require("../models/Therapist");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");
const getPagination = require("../utils/pagination");

const getTherapistIdsForUser = async (userId) => {
  const therapistProfiles = await Therapist.find({ user: userId }).select("_id");
  return therapistProfiles.map((item) => item._id);
};

const bookAppointment = asyncHandler(async (req, res) => {
  const { therapistId, slotStart, notes } = req.body;
  const therapist = await Therapist.findById(therapistId);

  if (!therapist) {
    throw new ApiError(404, "Therapist not found.");
  }

  const requestedStart = new Date(slotStart);
  const matchedSlot = therapist.availabilitySlots.find(
    (slot) => new Date(slot.start).getTime() === requestedStart.getTime()
  );

  if (!matchedSlot) {
    throw new ApiError(400, "Selected slot is not available.");
  }

  const existingAppointment = await Appointment.findOne({
    therapist: therapistId,
    slotStart: matchedSlot.start,
    slotEnd: matchedSlot.end,
    status: { $ne: "cancelled" }
  });

  if (existingAppointment) {
    throw new ApiError(409, "This slot is already booked.");
  }

  const appointment = await Appointment.create({
    user: req.user._id,
    therapist: therapistId,
    slotStart: matchedSlot.start,
    slotEnd: matchedSlot.end,
    notes,
    status: "pending"
  });

  res.status(201).json({
    success: true,
    message: "Appointment booked successfully",
    data: appointment
  });
});

const getAppointments = asyncHandler(async (req, res) => {
  const { status, page, limit } = req.query;
  const { skip, page: currentPage, limit: perPage } = getPagination(page, limit);

  const filter = {};
  if (req.user.role === "user") {
    filter.user = req.user._id;
  } else if (req.user.role === "therapist") {
    const therapistIds = await getTherapistIdsForUser(req.user._id);
    filter.therapist = { $in: therapistIds };
  }

  if (status) {
    filter.status = status;
  }

  const [items, total] = await Promise.all([
    Appointment.find(filter)
      .populate("user", "name email")
      .populate("therapist", "name specialization")
      .sort({ slotStart: 1 })
      .skip(skip)
      .limit(perPage),
    Appointment.countDocuments(filter)
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

const cancelAppointment = asyncHandler(async (req, res) => {
  const filter = { _id: req.params.id };
  if (req.user.role === "user") {
    filter.user = req.user._id;
  } else if (req.user.role === "therapist") {
    const therapistIds = await getTherapistIdsForUser(req.user._id);
    filter.therapist = { $in: therapistIds };
  }

  const appointment = await Appointment.findOne(filter);
  if (!appointment) {
    throw new ApiError(404, "Appointment not found.");
  }

  appointment.status = "cancelled";
  await appointment.save();

  res.status(200).json({
    success: true,
    message: "Appointment cancelled successfully",
    data: appointment
  });
});

const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const filter = { _id: req.params.id };

  if (req.user.role === "therapist") {
    const therapistIds = await getTherapistIdsForUser(req.user._id);
    filter.therapist = { $in: therapistIds };
  }

  const appointment = await Appointment.findOneAndUpdate(
    filter,
    { status: req.body.status },
    { new: true, runValidators: true }
  );

  if (!appointment) {
    throw new ApiError(404, "Appointment not found.");
  }

  res.status(200).json({
    success: true,
    message: "Appointment status updated successfully",
    data: appointment
  });
});

module.exports = {
  bookAppointment,
  getAppointments,
  cancelAppointment,
  updateAppointmentStatus
};
