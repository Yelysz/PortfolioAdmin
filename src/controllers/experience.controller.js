import Experience from "../models/experience.model.js";

export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    console.error("Error getting experiences:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createExperience = async (req, res) => {
  const { title, place, description, firstDate, secondDate } = req.body;

  try {
    const experience = new Experience({
      title,
      place,
      description,
      firstDate,
      secondDate,
    });

    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    console.error("Error creating experience:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getExperience = async (req, res) => {
  const { id } = req.params;

  try {
    const experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.json(experience);
  } catch (error) {
    console.error("Error getting experience by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateExperience = async (req, res) => {
  const { id } = req.params;
  const { title, place, description, firstDate, secondDate } = req.body;

  try {
    const experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    experience.title = title;
    experience.place = place;
    experience.description = description;
    experience.firstDate = firstDate;
    experience.secondDate = secondDate;

    await experience.save();
    res.json(experience);
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteExperience = async (req, res) => {
  const { id } = req.params;

  try {
    const experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    await experience.remove();
    res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
