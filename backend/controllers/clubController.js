import Club from "../models/clubModel.js";

// Skapa en klubb
export const createClub = async (req, res) => {
  try {
    const { name, genre, desc } = req.body;

    // Kontrollera om all nödvändig information finns
    if (!name || !genre || !desc) {
      res.status(400).json({ message: "Vänligen fyll i all nödvändig information." });
      return;
    }

    // Skapa klubben
    const club = await Club.create({
      name,
      genre,
      desc,
    });

    // Skicka en lyckad respons med klubboobjektet
    if (club) {
      res.status(201).send(club);
    }
  } catch (error) {
    console.error("Fel vid skapande av klubb", error);
    res.status(500).json({ error: "Internt serverfel." });
  }
};

// Hämta alla klubbar (GET)
export const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find();

    // Skicka en lyckad respons med klubboobjekten
    res.status(200).json(clubs);
  } catch (error) {
    console.error("Fel vid hämtning av klubbar", error);
    res.status(500).json({ error: "Internt serverfel." });
  }
};

// Hämta en klubb (GET :id)
export const getOneClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      res.status(404).json({ message: "Klubben hittades inte." });
    }

    // Skicka en lyckad respons med klubboobjektet
    res.status(200).json(club);
  } catch (error) {
    console.error("Fel vid sökning av klubb", error);
    res.status(500).json({ error: "Internt serverfel." });
  }
};

// Radera en klubb (DELETE)
export const deleteClubs = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      res.status(404).json({ message: "Klubben hittades inte." });
    }

    // Radera klubben
    await club.deleteOne();
    return res.status(200).json({ message: "Raderad:", id: req.params.id });
  } catch (error) {
    console.error("Fel vid radering av klubb", error);
    res.status(500).json({ error: "Internt serverfel." });
  }
};

// Uppdatera en klubb (PUT)
export const updateClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      res.status(404).json({ message: "Klubben hittades inte." });
    }

    // Uppdatera klubben
    const updatedClub = await Club.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // Skicka en lyckad respons med det uppdaterade klubboobjektet
    return res.status(200).json(updatedClub);
  } catch (error) {
    console.error("Fel vid uppdatering av klubb", error);
    res.status(500).json({ error: "Internt serverfel." });
  }
};
