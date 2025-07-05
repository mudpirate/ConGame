// API Configuration
// This file contains API URLs and endpoints that are shared across the application

// Base API URL - Change this based on your environment
export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-production-backend-url.com/api" // Replace with your actual production URL
    : "http://localhost:5000/api"; // Local development URL

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",

  // User endpoints
  USERS: "/users",
  USER_PROFILE: "/users/profile",

  // Game endpoints
  GAMES: "/games",
  GAME_DETAILS: (id) => `/games/${id}`,
  ADD_GAME: "/games/add",
  UPDATE_GAME: (id) => `/games/${id}`,
  DELETE_GAME: (id) => `/games/${id}`,

  // Booking endpoints
  BOOKINGS: "/bookings",
  CREATE_BOOKING: "/bookings/create",
  UPDATE_BOOKING: (id) => `/bookings/${id}`,
  DELETE_BOOKING: (id) => `/bookings/${id}`,
  USER_BOOKINGS: "/bookings/user",
  OWNER_BOOKINGS: "/bookings/owner",

  // Owner endpoints
  OWNER_GAMES: "/owner/games",
  OWNER_DASHBOARD: "/owner/dashboard",

  // Upload endpoints
  UPLOAD_IMAGE: "/upload/image",
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Export individual endpoint builders for convenience
export const getApiUrl = {
  login: () => buildApiUrl(API_ENDPOINTS.LOGIN),
  register: () => buildApiUrl(API_ENDPOINTS.REGISTER),
  logout: () => buildApiUrl(API_ENDPOINTS.LOGOUT),
  users: () => buildApiUrl(API_ENDPOINTS.USERS),
  userProfile: () => buildApiUrl(API_ENDPOINTS.USER_PROFILE),
  games: () => buildApiUrl(API_ENDPOINTS.GAMES),
  gameDetails: (id) => buildApiUrl(API_ENDPOINTS.GAME_DETAILS(id)),
  addGame: () => buildApiUrl(API_ENDPOINTS.ADD_GAME),
  updateGame: (id) => buildApiUrl(API_ENDPOINTS.UPDATE_GAME(id)),
  deleteGame: (id) => buildApiUrl(API_ENDPOINTS.DELETE_GAME(id)),
  bookings: () => buildApiUrl(API_ENDPOINTS.BOOKINGS),
  createBooking: () => buildApiUrl(API_ENDPOINTS.CREATE_BOOKING),
  updateBooking: (id) => buildApiUrl(API_ENDPOINTS.UPDATE_BOOKING(id)),
  deleteBooking: (id) => buildApiUrl(API_ENDPOINTS.DELETE_BOOKING(id)),
  userBookings: () => buildApiUrl(API_ENDPOINTS.USER_BOOKINGS),
  ownerBookings: () => buildApiUrl(API_ENDPOINTS.OWNER_BOOKINGS),
  ownerGames: () => buildApiUrl(API_ENDPOINTS.OWNER_GAMES),
  ownerDashboard: () => buildApiUrl(API_ENDPOINTS.OWNER_DASHBOARD),
  uploadImage: () => buildApiUrl(API_ENDPOINTS.UPLOAD_IMAGE),
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  buildApiUrl,
  getApiUrl,
};
