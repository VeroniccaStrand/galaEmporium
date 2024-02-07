import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: String,   
    required: true,
  },
  tickets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tickets'
  }]
});

const User = mongoose.model('User', userSchema);
export default User;
