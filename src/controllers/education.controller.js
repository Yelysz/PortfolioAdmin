import Education from "../models/education.model.js";

export const getEducations = async (req, res) => {
  try {
    const educations = await Education.find({ user: req.user.id }).populate(
      "user"
    );
    res.json(educations);
  } catch (error) {
    console.error("Error getting educations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createEducation = async (req, res) => {
  const { title, place, description, firstDate, secondDate } = req.body;

  try {
    const education = new Education({
      title,
      place,
      description,
      firstDate,
      secondDate,
      user: req.user.id,
    });

    await education.save();
    res.status(201).json(education);
  } catch (error) {
    console.error("Error creating education:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEducation = async (req, res) => {
  const { id } = req.params;

  try {
    const education = await Education.findById(id);
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    res.json(education);
  } catch (error) {
    console.error("Error getting education by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateEducation = async (req, res) => {
  const { id } = req.params;
  const { title, place, description, firstDate, secondDate } = req.body;

  try {
    const education = await Education.findById(id);
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    education.title = title;
    education.place = place;
    education.description = description;
    education.firstDate = firstDate;
    education.secondDate = secondDate;

    await education.save();
    res.json(education);
  } catch (error) {
    console.error("Error updating education:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteEducation = async (req, res) => {
  const { id } = req.params;

  try {
    const education = await Education.findById(id);
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    await Education.deleteOne({ _id: id });
    res.json({ message: "Education deleted successfully" });
  } catch (error) {
    console.error("Error deleting education:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
