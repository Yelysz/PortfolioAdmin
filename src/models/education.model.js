import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    firstDate: {
      type: Date,
      required: true,
    },
    secondDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Education", educationSchema);
