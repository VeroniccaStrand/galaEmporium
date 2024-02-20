import Ticket from "../models/ticketModel.js";
import Event from "../models/eventModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// create

export const createTicket = async (req, res) => {
  try {
    const { eventId } = req.body;
    console.log(eventId);
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    const event = await Event.findById(eventId);
    console.log(event);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    if (event.tickets <= 0) {
      return res
        .status(400)
        .json({ message: "No available tickets for this event." });
    }

    const ticket = await Ticket.create({
      userId: decodedToken.id,
      eventId: req.body.eventId,
    });

    const user = await User.findById(decodedToken.id);
    user.tickets.push(ticket);
    await user.save();

    await Event.updateOne({ _id: eventId }, { $inc: { tickets: -1 } });

    await event.save();

    console.log("Ticket created successfully");
    res.status(201).json(ticket);
  } catch (error) {
    console.error("Error buying ticket", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const ticketInfo = async (req, res) => {
  const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

  const user = await User.findById(decodedToken.id);

  

  const userTickets = await Ticket.find({ userId: user._id })
      .populate({
        path: "eventId",
        select: "name dateTime",
      });
  
    console.log(userTickets)
  res.status(200).json();
};
