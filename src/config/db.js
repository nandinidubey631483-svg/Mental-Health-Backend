const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URL;

  if (!mongoUri) {
    throw new Error("MONGO_URL is not defined in environment variables.");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
};

module.exports = connectDB;
