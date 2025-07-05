import express from "express";
import {
  getGames,
  getUserData,
  registerUser,
  loginUser,
} from "../controllers/userController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/data", protect, getUserData);
router.get("/games", getGames);

export default router;
