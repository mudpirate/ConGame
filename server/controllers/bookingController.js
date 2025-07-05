import Booking from "../models/Booking.js";
import Game from "../models/Game.js";

// ✅ Check game availability
const checkAvailability = async (gameId, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    game: gameId,
    pickupDate: { $lte: returnDate },
    returnDate: { $gte: pickupDate },
  });
  return bookings.length === 0;
};

// ✅ Check availability for games by location/date/search
export const checkAvailabilityOfGame = async (req, res, next) => {
  try {
    const { location, pickupDate, returnDate, search } = req.body;

    let searchRegex = null;
    if (search?.trim()) {
      const normalized = search.replace(/\s+/g, "").toLowerCase();
      searchRegex = new RegExp(normalized.split("").join("\\s*"), "i");
    }

    let query = { location, isAvailable: true };
    let games = await Game.find(query);

    if (searchRegex) {
      games = games.filter(
        (g) =>
          searchRegex.test(g.brand.replace(/\s+/g, "").toLowerCase()) ||
          searchRegex.test(g.model.replace(/\s+/g, "").toLowerCase())
      );
    }

    const availableGamePromises = games.map(async (game) => {
      const isAvailable = await checkAvailability(
        game._id,
        pickupDate,
        returnDate
      );
      return { ...game._doc, isAvailable };
    });

    let availableGames = await Promise.all(availableGamePromises);
    availableGames = availableGames.filter((g) => g.isAvailable === true);

    res.json({ success: true, availableGames });
  } catch (error) {
    next(error);
  }
};

// ✅ Create a booking
export const createBooking = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { game: gameIdFromBody, pickupDate, returnDate } = req.body;

    if (!gameIdFromBody || !pickupDate || !returnDate) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const gameData = await Game.findById(gameIdFromBody);
    if (!gameData) {
      res.status(404);
      throw new Error("Game not found");
    }

    const isAvailable = await checkAvailability(
      gameIdFromBody,
      pickupDate,
      returnDate
    );
    if (!isAvailable) {
      res.status(400);
      throw new Error("Game not available for selected dates");
    }

    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    let days = Math.ceil(Math.abs(returned - picked) / (1000 * 60 * 60 * 24));
    if (days === 0) days = 1;

    const totalPrice = days * Number(gameData.pricePerDay);

    const booking = await Booking.create({
      game: gameIdFromBody,
      user: _id,
      owner: gameData.owner,
      pickupDate: picked,
      returnDate: returned,
      price: totalPrice,
    });

    res.json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};

// ✅ Get all bookings for current user
export const getUserBookings = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id })
      .populate("game")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    next(error);
  }
};

// ✅ Get bookings owned by current owner
export const getOwnerBookings = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ owner: _id })
      .populate("game")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    next(error);
  }
};

// ✅ Change booking status (e.g. confirmed, completed, cancelled)
export const changeBookingStatus = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;

    const booking = await Booking.findById(bookingId).populate("game");

    if (!booking) {
      res.status(404);
      throw new Error("Booking not found");
    }

    if (booking.game.owner.toString() !== _id.toString()) {
      res.status(403);
      throw new Error("Not authorized to update this booking");
    }

    booking.status = status;
    await booking.save();

    res.json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};
