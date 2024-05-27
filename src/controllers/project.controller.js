import Project from "../models/project.model.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id }).populate("user");
    res.json(projects);
  } catch (error) {
    console.error("Error getting projects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createProject = async (req, res) => {
  try {
    const { title, description, tags, github, web } = req.body;
    // console.log('Request body:', req.body);

    let parsedTags;
    try {
      parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags);
    } catch (e) {
      console.error("Error parsing tags:", e);
      parsedTags = [];
    }

    // console.log('Parsed tags:', parsedTags);

    const project = new Project({
      title,
      description,
      tags: parsedTags,
      github,
      web,
      user: req.user.id,
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
  try {
    const { id } = req.params;
    const { title, description, tags, github, web } = req.body;
    
    let parsedTags;
    try {
      parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags);
    } catch (e) {
      console.error("Error parsing tags:", e);
      parsedTags = [];
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.tags = parsedTags.length ? parsedTags : project.tags;
    project.github = github || project.github;
    project.web = web || project.web;
    
    if (req.files?.image) {
      if (project.image?.public_id) {
        await deleteImage(project.image.public_id);
      }

      const result = await uploadImage(req.files.image.tempFilePath);
      project.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };

      await fs.unlink(req.files.image.tempFilePath);
    }

    await project.save();
    res.status(200).json(project);
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

    return res.status(204).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
