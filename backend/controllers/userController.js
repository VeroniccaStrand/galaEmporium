import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//const salt = "saltamera";

// create
export const createUser = async (req, res) => {
  try {
    const { userName, email, password, role, clubId, tickets } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }
    if (!userName) {
      res.status(400).json({ message: "Please add Username." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      role,
      clubId,
      tickets,
    });

    if (user) {
      res.status(201).json(user);
    } else {
      res.status(500).json({ message: "Failed to create User" });
    }
  } catch (error) {
    console.error("Error adding User", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// get all users GET
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error adding User", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

//Get one user GET :id
export const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error finding user", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

//delete user DELETE
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    await user.deleteOne();
    return res.staus(200).json({ message: "deleted:", id: req.params.id });
  } catch (error) {
    console.error("Error deleting user", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found." });
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // hitta användaren
    const user = await User.findOne({ email });
    //om inte user finns eller inte lösenord matchar
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "invalid email or password" });
    }

    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });

    let message;
    switch (user.role) {
      case "Vistor":
        message = "Logged in as a Visitor";
        break;
      case "Club Admin":
        message = "Logged in as a Club Admin";
        break;
      case "Super Admin":
        message = "Logged in as a Super Admin";
        break;
    }
    res.status(200).json({ message, user, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

//Generera token
export const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  if (user.role === "Club Admin" && user.clubId) {
    // Konvertera ObjectId till sträng
    payload.clubId = user.clubId.toString();
  }

  console.log("Token generator", payload);

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

  return token;
};
