# API Configuration Guide

This document explains how to use the API configuration files in this project.

## Files Created

1. **`client/src/config/api.js`** - Client-side API configuration
2. **`server/config/api.js`** - Server-side API configuration

## Client-Side Usage

### Import the configuration

```javascript
import { API_BASE_URL, getApiUrl } from "../config/api.js";
// or
import apiConfig from "../config/api.js";
```

### Using the API URLs

```javascript
// Get the base URL
console.log(API_BASE_URL); // http://localhost:5000/api (development)

// Get specific endpoint URLs
const loginUrl = getApiUrl.login(); // http://localhost:5000/api/auth/login
const gamesUrl = getApiUrl.games(); // http://localhost:5000/api/games
const gameDetailsUrl = getApiUrl.gameDetails("123"); // http://localhost:5000/api/games/123

// Make API calls
const response = await fetch(getApiUrl.login(), {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),
});
```

### Environment-based URLs

The `API_BASE_URL` automatically switches based on the environment:

- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-production-backend-url.com/api`

To set the production URL, update the `API_BASE_URL` in `client/src/config/api.js`.

## Server-Side Usage

### Import the configuration

```javascript
import { SERVER_CONFIG, API_ROUTES, API_MESSAGES } from "../config/api.js";
// or
import apiConfig from "../config/api.js";
```

### Using server configuration

```javascript
// Server setup
const port = SERVER_CONFIG.PORT; // 5000
const corsOrigin = SERVER_CONFIG.CORS_ORIGIN; // http://localhost:3000

// Route definitions
app.post(API_ROUTES.AUTH.LOGIN, authController.login);
app.get(API_ROUTES.GAMES.BASE, gameController.getAllGames);
app.get(API_ROUTES.GAMES.DETAILS, gameController.getGameById);

// Response messages
res.json({
  message: API_MESSAGES.SUCCESS.LOGIN,
  status: HTTP_STATUS.OK,
});
```

## Environment Variables

### Client Environment Variables

Create a `.env` file in the client directory (this file is ignored by git):

```env
# .env (client)
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### Server Environment Variables

Create a `.env` file in the server directory (this file is ignored by git):

```env
# .env (server)
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gaming-rental
JWT_SECRET=your-secret-key-here
CORS_ORIGIN=http://localhost:3000
```

## Updating Configuration

### Adding New Endpoints

1. **Client-side**: Add to `API_ENDPOINTS` and `getApiUrl` in `client/src/config/api.js`
2. **Server-side**: Add to `API_ROUTES` in `server/config/api.js`

### Changing Base URLs

1. **Development**: Update the development URL in the respective config files
2. **Production**: Update the production URL in `client/src/config/api.js`

## Best Practices

1. **Never commit sensitive data**: Use environment variables for secrets
2. **Keep URLs centralized**: All API URLs should be defined in these config files
3. **Use consistent naming**: Follow the existing naming conventions
4. **Document changes**: Update this README when adding new endpoints

## Example: Adding a New Endpoint

### 1. Update Client Config (`client/src/config/api.js`)

```javascript
export const API_ENDPOINTS = {
  // ... existing endpoints
  NEW_FEATURE: "/new-feature",
  NEW_FEATURE_DETAILS: (id) => `/new-feature/${id}`,
};

export const getApiUrl = {
  // ... existing functions
  newFeature: () => buildApiUrl(API_ENDPOINTS.NEW_FEATURE),
  newFeatureDetails: (id) => buildApiUrl(API_ENDPOINTS.NEW_FEATURE_DETAILS(id)),
};
```

### 2. Update Server Config (`server/config/api.js`)

```javascript
export const API_ROUTES = {
  // ... existing routes
  NEW_FEATURE: {
    BASE: "/new-feature",
    DETAILS: "/new-feature/:id",
  },
};
```

### 3. Use in Components

```javascript
import { getApiUrl } from "../config/api.js";

const response = await fetch(getApiUrl.newFeature());
const details = await fetch(getApiUrl.newFeatureDetails("123"));
```
