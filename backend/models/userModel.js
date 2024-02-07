import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,   
    enum: ['Visitor', 'Club Admin', 'Super Admin'],
    default: 'Visitor',
  },
  clubId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    default:null,
  },
  tickets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tickets'
  }]
});

const User = mongoose.model('User', userSchema);
export default User;


