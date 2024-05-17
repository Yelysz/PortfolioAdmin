import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      public_id: String,
      secure_url: String,
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
