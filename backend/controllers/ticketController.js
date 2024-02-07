import Ticket from "../models/ticketModel.js";

// create
export const createTicket = async (req, res) => {
  try {
    const { userId, eventId } = req.body
    if (!userId || !eventId) {
      res.status(400).json({message: 'Please insert the correct information.'})
    }
    const ticket = await Ticket.create({
      userId, 
      eventId,
    });

    if (ticket) {
        res.status(201).json(ticket);
    } else {
      res.status(500).json({ message: "Failed to create ticket" });
    }
  } catch (error) {
    console.error("Error buying ticket", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
