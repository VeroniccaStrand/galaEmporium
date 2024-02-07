import Event from "../models/eventModel.js";

export const createEvent = async (req, res) => {
  try {
    const { name, clubId, dateTime, desc, tickets, media, price } = req.body;
    if (!tickets) {
      res.status(400).json({ message: "Please missing information." });
    }

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

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json(events);
  } catch (error) {
    console.error("Error adding Event", error);
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
    console.error('Error finding event', error);
    res.status(500).json({ error: 'Internal server error'});
  }
}

export const deleteEvents = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: "Event not found." });
    }
    await event.deleteOne();
    return res.status(200).json({ message: "deleted:", id: req.params.id }); // fråga Linu
  } catch (error) {
    console.error("Error finding event", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
