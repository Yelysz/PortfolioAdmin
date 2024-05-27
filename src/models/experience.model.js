import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
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
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Experience", experienceSchema);
