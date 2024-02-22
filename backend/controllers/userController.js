import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create user
export const createUser = async (req, res) => {
  try {
    const { userName, email, password, role, clubId, tickets } = req.body;
    
    // Check if user already exists with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    // Check if username is provided
if (!userName || !email || !password) {
  return res.status(401).json({ message: "Please provide all required fields." });
}


    // Generate salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      role,
      clubId,
      tickets,
    });

    // Send a successful response with the user object
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Get all users (GET)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Get one user (GET :id)
export const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error searching for user", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Delete user (DELETE)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Delete the user
    await user.deleteOne();
    return res.status(200).json({ message: "Deleted:", id: req.params.id });
  } catch (error) {
    console.error("Error deleting user", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Update user (PUT)
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Log in user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find the user
    const user = await User.findOne({ email });
    
    // If the user doesn't exist or the password doesn't match
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate and send JWT token
    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });

    // Create a message based on user role
    let message;
    switch (user.role) {
      case "Visitor":
        message = "Logged in as Visitor";
        break;
      case "Club Admin":
        message = "Logged in as Club Administrator";
        break;
      case "Super Admin":
        message = "Logged in as Super Administrator";
        break;
    }

    res.status(200).json({ message, user, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Generate JWT token
export const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
    userName: user.userName,
  };

  if (user.role === "Club Admin" && user.clubId) {
    // Convert ObjectId to string
    payload.clubId = user.clubId.toString();
  }

  console.log("Token generator", payload);

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

  return token;
};
