const jwt = require("jsonwebtoken");

const getJwtSecret = () => process.env.JWT_KEY || process.env.JWT_SECRET;

const generateToken = (userId, role) => {
  const secret = getJwtSecret();

  if (!secret) {
    throw new Error("JWT_KEY or JWT_SECRET is not defined in environment variables.");
  }

  return jwt.sign({ userId, role }, secret, {
    expiresIn: process.env.JWT_EXPIRE || "7d"
  });
};

module.exports = generateToken;
