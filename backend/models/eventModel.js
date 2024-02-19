import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
    },
    dateTime: {
      type: Date,
    },
    desc: {
      type: String,
    },
    tickets: {
      type: Number,
    },
    media: {
      data: Buffer,
      ContentType: String,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
