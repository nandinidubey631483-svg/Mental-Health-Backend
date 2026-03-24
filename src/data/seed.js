require("dotenv").config();

const connectDB = require("../config/db");
const Meditation = require("../models/Meditation");
const Therapist = require("../models/Therapist");
const meditations = require("./meditations.json");
const therapists = require("./therapists.json");

const seed = async () => {
  try {
    await connectDB();

    await Meditation.deleteMany();
    await Therapist.deleteMany();

    await Meditation.insertMany(meditations);
    await Therapist.insertMany(therapists);

    console.log("Seed data inserted successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seed();
