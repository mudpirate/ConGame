// Server API Configuration
// This file contains server-side API configuration and constants

// Server configuration
export const SERVER_CONFIG = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
};

// API Routes configuration
export const API_ROUTES = {
  // Auth routes
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
  },

  // User routes
  USERS: {
    BASE: "/users",
    PROFILE: "/users/profile",
    UPDATE: "/users/update",
  },

  // Game routes
  GAMES: {
    BASE: "/games",
    ADD: "/games/add",
    UPDATE: "/games/:id",
    DELETE: "/games/:id",
    DETAILS: "/games/:id",
  },

  // Booking routes
  BOOKINGS: {
    BASE: "/bookings",
    CREATE: "/bookings/create",
    UPDATE: "/bookings/:id",
    DELETE: "/bookings/:id",
    USER: "/bookings/user",
    OWNER: "/bookings/owner",
  },

  // Owner routes
  OWNER: {
    GAMES: "/owner/games",
    DASHBOARD: "/owner/dashboard",
    BOOKINGS: "/owner/bookings",
  },

  // Upload routes
  UPLOAD: {
    IMAGE: "/upload/image",
  },
};

// Database configuration
export const DB_CONFIG = {
  URI: process.env.MONGODB_URI || "mongodb://localhost:27017/gaming-rental",
  OPTIONS: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

// JWT configuration
export const JWT_CONFIG = {
  SECRET: process.env.JWT_SECRET || "your-secret-key",
  EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
};

// File upload configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp"],
  UPLOAD_PATH: "uploads/",
};

// API Response messages
export const API_MESSAGES = {
  SUCCESS: {
    LOGIN: "Login successful",
    REGISTER: "Registration successful",
    LOGOUT: "Logout successful",
    GAME_ADDED: "Game added successfully",
    GAME_UPDATED: "Game updated successfully",
    GAME_DELETED: "Game deleted successfully",
    BOOKING_CREATED: "Booking created successfully",
    BOOKING_UPDATED: "Booking updated successfully",
    BOOKING_DELETED: "Booking deleted successfully",
  },
  ERROR: {
    INVALID_CREDENTIALS: "Invalid credentials",
    USER_NOT_FOUND: "User not found",
    GAME_NOT_FOUND: "Game not found",
    BOOKING_NOT_FOUND: "Booking not found",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Access forbidden",
    VALIDATION_ERROR: "Validation error",
    SERVER_ERROR: "Internal server error",
  },
};

// HTTP Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export default {
  SERVER_CONFIG,
  API_ROUTES,
  DB_CONFIG,
  JWT_CONFIG,
  UPLOAD_CONFIG,
  API_MESSAGES,
  HTTP_STATUS,
};
