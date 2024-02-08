import mongoose from "mongoose";

const clubSchema = mongoose.Schema({
  name: {
    type: String,
    unique:true,
  },
  genre: {
    type: String,
  },
  desc: {
    type: String,
  },
  contact: [
    { email: String, phoneNumber: Number}
  ]
})


const Club = mongoose.model("Club", clubSchema);
export default Club;
