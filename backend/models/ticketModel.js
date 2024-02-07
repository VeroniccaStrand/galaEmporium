import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  },
  {
    timestamps: true,
  }
);



const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
