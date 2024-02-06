import User from '../models/userModel.js';

export const getAllUsers = async () => {
  try {
    const users = await User.find();

    return users;
  } catch (error) {
    throw error;
  }
};
