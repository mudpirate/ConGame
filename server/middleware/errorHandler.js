// middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error("❌ ERROR:", err.stack);

  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
