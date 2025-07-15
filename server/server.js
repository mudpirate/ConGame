import express from "express";
import "dotenv/config";

import cors from "cors";
import connectDB from "./configs/db.js";
import router from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRouter.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 7000;

// Global middleware
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.get("/", (req, res, next) => {
  res.send("Server is running");
});

app.use("/api/user", router);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter);

// Error handler middleware (should be after routes)
app.use(errorHandler);

// Global error listeners
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
  process.exit(1);
});

// Start server only if DB connects successfully

app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
