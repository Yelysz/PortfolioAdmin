import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(">>> DB is connected");
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }
};
