import express from "express";
import protect from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import {
  addGame,
  getOwnerGames,
  toggleGameAvailability,
  deleteGame,
  getDashboardData,
  changeRoleToOwner,
  updateUserImage,
} from "../controllers/ownerController.js";

const ownerRouter = express.Router();

ownerRouter.post("/add-game", protect, upload.single("file"), addGame);
ownerRouter.get("/games", protect, getOwnerGames);
ownerRouter.post("/toggle-game", protect, toggleGameAvailability);
ownerRouter.post("/delete-game", protect, deleteGame);
ownerRouter.get("/dashboard", protect, getDashboardData);
ownerRouter.post("/change-role", protect, changeRoleToOwner);
ownerRouter.post(
  "/update-image",
  upload.single("image"),
  protect,
  updateUserImage
);

export default ownerRouter;
