import User from '../models/userModel.js';

// create
export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!email) {
      res.status(400).json({ message: 'Please add email.' });
    }

    const user = await User.create({
      name,
      email,
    });

    if (user) {
      res.status(201).json({
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(500).json({ message: 'Failed to create User' });
    }
  } catch (error) {
    console.error('Error adding User', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// get all users GET
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error('Error adding User', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

//Get one user GET :id
export const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found." })
    }
    res.status(200).json(user)
  } catch (error) {
    console.error('Error finding user', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
}

//delete user DELETE
export const deleteUser = async (req,res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" })

    }
    await user.deleteOne()
    return  res.staus(200).json({message:'deleted:',id: req.params.id})
  } catch (error) {
    console.error('Error deleting user', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
}

export const updateUser = async (req,res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({message: 'User not found.'})
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedUser);
    } catch (error){
      console.error('Error updating user', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
};
