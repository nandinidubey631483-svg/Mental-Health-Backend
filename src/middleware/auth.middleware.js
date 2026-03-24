const jwt = require("jsonwebtoken");

const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");

const getJwtSecret = () => process.env.JWT_KEY || process.env.JWT_SECRET;

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Not authorized. Token missing.");
  }

  const secret = getJwtSecret();
  if (!secret) {
    throw new ApiError(500, "JWT_KEY or JWT_SECRET is not configured.");
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, secret);
  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    throw new ApiError(401, "Not authorized. User no longer exists.");
  }

  req.user = user;
  next();
});

const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError(403, "Access denied for this resource."));
  }

  next();
};

module.exports = {
  protect,
  authorize
};
