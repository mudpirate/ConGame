import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

// Base URL setup
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
console.log("Base URL being used:", axios.defaults.baseURL);

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [gamesLoading, setGamesLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [games, setGames] = useState([]);
  const [bookings, setBookings] = useState([]);

  // 🔒 Attach token to Axios if available
  const attachTokenToAxios = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // 🔐 Fetch logged-in user
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      }
    } catch (error) {
      console.error("Fetch user error:", error);
      toast.error("Session expired. Please login again.");
      logout(); // auto logout if token is invalid
    }
  };

  // 🎮 Fetch all games
  const fetchGames = async () => {
    setGamesLoading(true);
    try {
      const { data } = await axios.get("/api/user/games");
      data.success ? setGames(data.games) : toast.error(data.message);
    } catch (error) {
      toast.error("Unable to load games");
    } finally {
      setGamesLoading(false);
    }
  };

  // 📖 Fetch bookings
  const fetchBookings = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setBookings([]); // Clear bookings when user is not logged in
      return toast.error("User not logged in");
    }

    try {
      const { data } = await axios.get("/api/user/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
        setBookings([]); // Optional fallback
      }
    } catch (error) {
      console.log(error.message);
      setBookings([]); // Ensure it's cleared on error too
    }
  };

  // 🔓 Log out
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    delete axios.defaults.headers.common["Authorization"];
    toast.success("You have been logged out");
  };

  // ⏳ On app load — get token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      attachTokenToAxios(storedToken);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, []);

  // 🎯 When token updates
  useEffect(() => {
    if (token) {
      attachTokenToAxios(token);
      fetchUser();
      fetchBookings();
    }
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        currency,
        gamesLoading,
        axios,
        user,
        setUser,
        token,
        setToken,
        isOwner,
        setIsOwner,
        showLogin,
        setShowLogin,
        logout,
        games,
        setGames,
        bookings,
        setBookings,
        pickupDate,
        setPickupDate,
        returnDate,
        setReturnDate,
        fetchGames,
        fetchUser,
        fetchBookings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
