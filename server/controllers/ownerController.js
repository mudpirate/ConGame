import fs from "fs";
import Game from "../models/Game.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import imagekit from "../configs/imagekit.js";

// 🔧 Upload image to ImageKit and return optimized URL
const uploadToImageKit = async (file, folder, width = "1280") => {
  const buffer = fs.readFileSync(file.path);

  const response = await imagekit.upload({
    file: buffer,
    fileName: file.originalname,
    folder,
  });

  return imagekit.url({
    path: response.filePath,
    transformation: [{ width }, { quality: "auto" }, { format: "webp" }],
  });
};
// 🛠️ Change user role to 'owner'
export const changeRoleToOwner = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { role: "owner" },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404);
      throw new Error("User not found");
    }

    res.json({ success: true, message: "Now you can list games" });
  } catch (error) {
    next(error);
  }
};

// ➕ Add a new game
export const addGame = async (req, res, next) => {
  try {
    if (!req.body.formData) {
      res.status(400);
      throw new Error("Missing game data");
    }

    if (!req.file) {
      res.status(400);
      throw new Error("Image file missing");
    }

    const gameData = JSON.parse(req.body.formData);
    const image = await uploadToImageKit(req.file, "/games");

    await Game.create({ ...gameData, owner: req.user._id, image });

    res.json({ success: true, message: "Game added successfully!" });
  } catch (error) {
    next(error);
  }
};

// 🎮 Get games listed by current owner
export const getOwnerGames = async (req, res, next) => {
  try {
    const games = await Game.find({ owner: req.user._id });
    res.json({ success: true, games });
  } catch (error) {
    next(error);
  }
};

// 🔁 Toggle availability of a game
export const toggleGameAvailability = async (req, res, next) => {
  try {
    const { gameId } = req.body;
    const game = await Game.findById(gameId);

    if (!game || game.owner.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized");
    }

    game.isAvailable = !game.isAvailable;
    await game.save();

    res.json({ success: true, message: "Availability toggled", game });
  } catch (error) {
    next(error);
  }
};

// ❌ Delete a game
export const deleteGame = async (req, res, next) => {
  try {
    const { gameId } = req.body;
    const game = await Game.findById(gameId);

    if (!game || game.owner.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized");
    }

    await Game.deleteOne({ _id: gameId });

    res.json({ success: true, message: "Game removed" });
  } catch (error) {
    next(error);
  }
};

export const getDashboardData = async (req, res, next) => {
  try {
    if (req.user.role !== "owner") {
      res.status(403);
      throw new Error("Unauthorized");
    }

    const ownerId = req.user._id;

    const [games, bookings, pending, completed] = await Promise.all([
      Game.find({ owner: ownerId }),
      Booking.find({ owner: ownerId }).populate("game").sort({ createdAt: -1 }),
      Booking.countDocuments({ owner: ownerId, status: "pending" }),
      Booking.countDocuments({ owner: ownerId, status: "completed" }),
    ]);

    const monthlyRevenue = bookings
      .filter((b) => b.status === "confirmed")
      .reduce((sum, b) => sum + b.price, 0);

    const recentBookings = bookings.slice(0, 3); // ✅ this line is correct

    // ✅ Make sure this recentBookings is inside the dashboardData object:
    res.json({
      success: true,
      dashboardData: {
        totalGames: games.length,
        totalBookings: bookings.length,
        pendingBookings: pending,
        completedBookings: completed,
        monthlyRevenue,
        recentBookings,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 🖼️ Upload user profile image
export const updateUserImage = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error("Image file missing");
    }

    const image = await uploadToImageKit(req.file, "/users", "400");

    await User.findByIdAndUpdate(req.user._id, { image });

    res.json({ success: true, message: "Image updated" });
  } catch (error) {
    next(error);
  }
};
