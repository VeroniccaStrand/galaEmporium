import Ticket from "../models/ticketModel.js";
import Event from "../models/eventModel.js";
import User from "../models/userModel.js";

// create
export const createTicket = async (req, res) => {
  try {
    const { userId, eventId } = req.body;
    if (!userId || !eventId) {
      res
        .status(400)
        .json({ message: "Please insert the correct information." });
    }
    const ticket = await Ticket.create({
      userId,
      eventId,
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { tickets: ticket._id } },
      { new: true }
    );
    if (ticket) {
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
