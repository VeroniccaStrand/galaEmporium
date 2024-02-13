import Event from "../models/eventModel.js";
import jwt from 'jsonwebtoken'
import { loginUser } from "./userController.js";

export const createEvent = async (req, res) => {
  try {
    const { name, dateTime, desc, tickets, media, price } = req.body;
    const token = req.cookies.token;

    if (!name || !tickets || !dateTime) {
      res.status(400).json({ message: "Please add missing information." });
      return;
    }

    // Kolla om användaren är autentiserad genom JWT-kakan
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Om användaren inte är autentiserad eller saknar clubId, neka att skapa eventet
    if (!decodedToken || !decodedToken.clubId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const clubId = decodedToken.clubId;

    const event = await Event.create({
      name,
      clubId,
      dateTime,
      desc,
      tickets,
      media,
      price,
    });

    if (event) {
      res.status(201).json(event);
    } else {
      res.status(500).json({ message: "Failed to create Event" });
    }
  } catch (error) {
    console.error("Error adding Event", error);
    res.status(500).json({ error: "Internal server error." });
  }
};




export const getEventsWithClubId = async (req, res) => {
  try {
    const { clubId } = req.params; // Använd req.params istället för req.body för att hämta clubId från URL
    console.log(clubId);

    if (!clubId) {
      res.status(400).json({ message: "Bad Request. ClubId is missing in the request parameters." });
      return;
    }

    // Hämta events baserat på clubId från databasen
    const events = await Event.find({ clubId });

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events", error);
    res.status(500).json({ error: "Internal server error." });
  }
};





export const getOneEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found." })
    }
    res.status(200).json(event)
  } catch (error) {
    console.error("Error finding event", error);
    res.status(500).json({ error: "Internal server error"});
  }
}

export const deleteEvents = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found." });
    }
    await event.deleteOne();
    return res.status(200).json({ message: "Deleted:", id: req.params.id }); // fråga Linu
  } catch (error) {
    console.error("Error finding event", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const updateEvent = async (req,res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({message: "Event not found."})
    }
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedEvent);
    } catch (error){
      console.error("Error updating Event", error);
      res.status(500).json({ error: "Internal server error." });
    }
};