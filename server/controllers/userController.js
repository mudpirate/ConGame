import User from "../models/User.js";
import Game from "../models/Game.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (userID) => {
  const payload = { id: userID };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc Register a new user
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 5) {
      res.status(400);
      throw new Error(
        "Please fill all fields and ensure password is at least 5 characters."
      );
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user._id.toString());

    res.status(201).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

// @desc Login user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user._id.toString());
    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

// @desc Get logged-in user data
export const getUserData = async (req, res, next) => {
  try {
    const { user } = req;
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @desc Get all available games
export const getGames = async (req, res, next) => {
  try {
    const games = await Game.find({ isAvailable: true });
    res.status(200).json({ success: true, games });
  } catch (error) {
    next(error);
  }
};
