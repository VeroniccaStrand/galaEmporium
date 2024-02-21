import Ticket from "../models/ticketModel.js";
import Event from "../models/eventModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Skapa

export const createTicket = async (req, res) => {
  try {
    const { eventId } = req.body;
    console.log(eventId);
    
    // Avkoda JWT-token från cookies med hjälp av den hemliga nyckeln
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    // Hitta evenemanget baserat på eventId från förfrågan
    const event = await Event.findById(eventId);
    console.log(event);
    
    // Kontrollera om evenemanget finns
    if (!event) {
      return res.status(404).json({ message: "Evenemang hittades inte." });
    }

    // Kontrollera om det finns tillgängliga biljetter för evenemanget
    if (event.tickets <= 0) {
      return res
        .status(400)
        .json({ message: "Inga tillgängliga biljetter för detta evenemang." });
    }

    // Skapa en ny biljett och koppla den till användaren
    const ticket = await Ticket.create({
      userId: decodedToken.id,
      eventId: req.body.eventId,
    });

    // Hämta användaren och lägg till biljetten i deras lista
    const user = await User.findById(decodedToken.id);
    user.tickets.push(ticket);
    await user.save();

    // Uppdatera antalet tillgängliga biljetter för evenemanget
    await Event.updateOne({ _id: eventId }, { $inc: { tickets: -1 } });

    await event.save();

    console.log("Biljett skapad framgångsrikt");
    res.status(201).json(ticket);
  } catch (error) {
    console.error("Fel vid köp av biljett", error);
    res.status(500).json({ error: "Internt serverfel." });
  }
};

export const ticketInfo = async (req, res) => {
  try {
    // Kontrollera om det finns ett JWT-token i cookies
    if (!req.cookies.token) {
      // Om det inte finns, skicka en respons med status 401 (Unauthorized)
      // och ett meddelande om att användaren måste logga in
      return res.status(401).json({ message: "Du måste logga in" });
    }

    // Avkoda JWT-token från cookien
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    // Hitta användaren baserat på userId från det avkodade tokenet
    const user = await User.findById(decodedToken.id);

    // Hämta användarens biljetter och fyll på information om evenemang
    const userTickets = await Ticket.find({ userId: user._id })
      .populate({
        path: "eventId",
        select: "name dateTime",
      });

    // Logga användarens biljetter till konsolen (kan användas för felsökning)
    console.log(userTickets);

    // Skicka användarens biljetter som JSON-svar med status 200 (OK)
    res.status(200).json(userTickets);
  } catch (error) {
    // Hantera eventuella fel som kan uppstå under exekveringen av koden
    // Skicka ett felmeddelande till klienten med felstatus 500 (Internal Server Error)
    console.error(error);
    res.status(500).json({ message: "Ett fel inträffade vid hämtning av biljettinformation." });
  }
};
