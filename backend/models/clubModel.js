import mongoose from "mongoose";

const clubSchema = mongoose.Schema({
  name: {
    type: String,
  },
  genre: {
    type: String,
  },
  desc: {
    type: String,
  },
})


const Club = mongoose.model("Club", clubSchema);
export default Club;

