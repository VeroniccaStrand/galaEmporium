import Ticket from "../models/ticketModel.js";
import Event from "../models/eventModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// create
export const createTicket = async (req, res) => {
  try {
    const { eventId } = req.body;
   /* if (!eventId) {
      res
        .status(400)
        .json({ message: "Please insert the correct information." });
    }
    */
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    const ticket = await Ticket.create({
      userId: decodedToken.id,
      eventId: req.body.eventId,
    });
    const savedTicket = await ticket.save();
    console.log(savedTicket);
    if (savedTicket) {
      res.status(201).json(ticket);
    } else {
      res.status(500).json({ message: "Failed to create ticket" });
    }
  } catch (error) {
    console.error("Error buying ticket", error);
    res.status(500).json({ error: "Internal server error." });
  }
};


export const ticketInfo = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)
    .populate({
      path: "eventId",
      select: "name dateTime",
    })
    .populate({
      path: "userId",
      select: "userName",
    });
 

  res.status(200).json(ticket);
};

