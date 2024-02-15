import Club from "../models/clubModel.js";

export const createClub = async (req, res) => {
  try {
    const { name, genre, desc } = req.body;

    if (!name || !genre || !desc) {
      res.status(400).json({ message: " hur tänkte du nu, ditt ålahue " });
    }
    const club = await Club.create({
      name,
      genre,
      desc,
    });
    if (club) {
      res.status(201).send(club);
    }
  } catch (error) {
    console.error("Error adding User", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find();

    res.status(200).json(clubs);
  } catch (error) {
    console.error("Error getting club", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getOneClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      res.status(404).json({ message: "Club not found." });
    }
    res.status(200).json(club);
  } catch (error) {
    console.error("Error finding club", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteClubs = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      res.status(404).json({ message: "Club not found." });
    }
    await club.deleteOne();
    return res.status(200).json({ message: "Deleted:", id: req.params.id }); // fråga Linu
  } catch (error) {
    console.error("Error finding club", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const updateClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      res.status(404).json({ message: "Club not found." });
    }
    const updatedClub = await Club.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedClub);
  } catch (error) {
    console.error("Error updating Club", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
