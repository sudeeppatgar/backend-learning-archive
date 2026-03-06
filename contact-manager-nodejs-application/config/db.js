import mongoose from "mongoose";

export const connectDB = async (dburi) => {
  try {
    await mongoose.connect(dburi);
    console.log("database connected successfully");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
