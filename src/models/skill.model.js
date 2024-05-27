import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    image: {
      public_id: String,
      secure_url: String,
    },
    alt: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true
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

export default mongoose.model("Skill", skillSchema);
