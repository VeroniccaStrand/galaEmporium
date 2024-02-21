import Event from "../models/eventModel.js";
import jwt from "jsonwebtoken";
import { loginUser } from "./userController.js";

// Skapa ett evenemang
export const createEvent = async (req, res) => {
  try {
    const { name, dateTime, desc, tickets, media, price } = req.body;
    const token = req.cookies.token;

    // Kontrollera om nödvändig information finns
    if (!name || !tickets || !dateTime) {
      res.status(400).json({ message: "Vänligen ange all nödvändig information." });
      return;
    }

    // Avkoda JWT-kakan för att kontrollera autentisering
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Om användaren inte är autentiserad eller saknar clubId, neka att skapa eventet
    if (!decodedToken || !decodedToken.clubId) {
      res.status(401).json({ message: "Obehörig åtkomst" });
      return;
    }

    const clubId = decodedToken.clubId;

    // Skapa evenemanget
    const event = await Event.create({
      name,
      clubId,
      dateTime,
      desc,
      tickets,
      media,
      price,
    });

    // Skicka en lyckad respons med evenemangsobjektet
    if (event) {
      res.status(201).json(event);
    } else {
      res.status(500).json({ message: "Misslyckades med att skapa evenemang." });
    }
  } catch (error) {
    console.error("Fel vid skapande av evenemang", error);
    res.status(500).json({ error: "Internt serverfel." });
  }
};

// Hämta evenemang baserat på clubId (GET)
export const getEventsWithClubId = async (req, res) => {
  try {
    const { clubId } = req.params;

    // Kontrollera att clubId finns i förfrågningsparametrarna
    if (!clubId) {
      res.status(400).json({
        message: "Felaktig förfrågan. ClubId saknas i förfrågningsparametrarna.",
      });
      return;
    }

    // Hämta evenemang baserat på clubId från databasen
    const events = await Event.find({ clubId });

    // Skicka en lyckad respons med evenemangsobjekten
    res.status(200).json(events);
  } catch (error) {
    console.error("Fel vid hämtning av evenemang", error);
    res.status(500).json({ error: "Internt serverfel." });
  }
};

// Hämta ett enskilt evenemang (GET :id)
export const getOneEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Evenemanget hittades inte." });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Fel vid sökning av evenemang", error);
    res.status(500).json({ error: "Internt serverfel." });
  }
};

// Hämta alla evenemang (GET)
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("clubId", "name");

    // Skicka en lyckad respons med evenemangsobjekten
    res.status(200).json(events);
  } catch (error) {
    console.error("Fel vid hämtning av evenemang", error);
    res.status(500).json({ error: "Internt serverfel." });
  }
};

// Radera ett evenemang (DELETE)
export const deleteEvents = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Evenemanget hittades inte." });
    }

    // Radera evenemanget
    await event.deleteOne();
    return res.status(200).json({ message: "Raderat:", id: req.params.id });
  } catch (error) {
    console.error("Fel vid radering av evenemang", error);
    res.status(500).json({ error: "Internt serverfel." });
  }
};

// Uppdatera ett evenemang (PUT)
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Evenemanget hittades inte." });
    }

    // Uppdatera evenemanget
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    // Skicka en lyckad respons med det uppdaterade evenemangsobjektet
    return res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Fel vid uppdatering av evenemang", error);
    res.status(500).json({ error: "Internt serverfel." });
  }
};
