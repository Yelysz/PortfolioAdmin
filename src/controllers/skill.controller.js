import Skill from "../models/skill.model.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.user.id }).populate("user");
    res.json(skills);
  } catch (error) {
    console.error("Error getting skills:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createSkill = async (req, res) => {
  const { alt, title } = req.body;

  try {
    const skill = new Skill({
      title,
      alt,
      user: req.user.id,
    });

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      skill.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };

      await fs.unlink(req.files.image.tempFilePath);
    }

    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    console.error("Error creating skill:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.status(200).json(skill);
  } catch (error) {
    console.error("Error getting skill by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateSkill = async (req, res) => {
  const { alt, title } = req.body;
  const { id } = req.params;

  try {
    const skill = await Skill.findById(id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    skill.title = title;
    skill.alt = alt;

    if (req.files?.image) {
      if (skill.image?.public_id) {
        await deleteImage(skill.image.public_id);
      }
      const result = await uploadImage(req.files.image.tempFilePath);
      skill.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.files.image.tempFilePath);
    }

    await skill.save();
    res.status(200).json(skill);
  } catch (error) {
    console.error("Error updating skill:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    if (skill.image?.public_id) {
      await deleteImage(skill.image.public_id);
    }

    return res.status(204).json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error("Error deleting skill:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
