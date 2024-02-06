import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model('user', userSchema);
export default User;
