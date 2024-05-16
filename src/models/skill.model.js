import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Skill", skillSchema);
