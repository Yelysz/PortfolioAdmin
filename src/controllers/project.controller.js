import Project from "../models/project.model.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const getProjects = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const options = {
      sort: { [sortBy]: sortOrder === "desc" ? -1 : 1 },
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
    };

    const projects = await Project.find({}, null, options);
    res.json(projects);
  } catch (error) {
    console.error("Error getting projects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createProject = async (req, res) => {
  const { title, description, tags, github, web } = req.body;

  try {
    const project = new Project({
      title,
      description,
      tags,
      github,
      web,
    });

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      project.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };

      await fs.unlink(req.files.image.tempFilePath);
    }

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, tags, github, web } = req.body;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.title = title;
    project.description = description;
    project.tags = tags;
    project.github = github;
    project.web = web;

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      project.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };

      if (project.image.public_id) {
        await deleteImage(project.image.public_id);
      }

      await fs.unlink(req.files.image.tempFilePath);
    }

    await project.save();

    res.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.image?.public_id) {
      await deleteImage(project.image.public_id);
    }

    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
