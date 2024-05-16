import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    github: {
      type: String,
    },
    web: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);
