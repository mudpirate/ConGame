import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const MyBookings = () => {
  const { currency, axios } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get("/api/bookings/user-bookings");
      if (data.success) {
        // Filter out bookings without images
        const bookingsWithImages = data.bookings.filter(
          (booking) =>
            booking.game?.image &&
            booking.game.image.trim() !== "" &&
            booking.game.image !== "/placeholder-image.jpg"
        );
        setBookings(bookingsWithImages);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-gradient-to-r from-green-400 to-green-600 text-white";
      case "pending":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white";
      case "cancelled":
        return "bg-gradient-to-r from-red-400 to-red-600 text-white";
      case "completed":
        return "bg-gradient-to-r from-blue-400 to-blue-600 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-10 bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen">
        <div className="flex items-center justify-center h-48 sm:h-64">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-10 bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen">
        <div className="text-center py-12 sm:py-16">
          <div className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 max-w-md mx-auto border border-red-500/20">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Error Loading Bookings
            </h3>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">{error}</p>
            <button
              onClick={fetchBookings}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 text-sm sm:text-base"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-10 bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-white mb-3 sm:mb-4">
          My Bookings
        </h1>
        <div className="w-16 sm:w-24 h-1 bg-green-400 mx-auto rounded-full"></div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 max-w-md mx-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
              No Bookings Found
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Start by renting a game to see your bookings here!
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {bookings.map((booking, idx) => (
            <div
              key={booking._id || idx}
              className="group bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-[1.01] sm:hover:scale-[1.02] overflow-hidden"
            >
              <div className="p-4 sm:p-6 flex flex-col lg:flex-row gap-4 sm:gap-6">
                {/* Game Image */}
                <div className="w-full lg:w-1/4 flex items-center justify-center">
                  <div className="relative group w-full max-w-xs lg:max-w-none">
                    <img
                      src={booking.game?.image}
                      alt={booking.game?.brand || "Game"}
                      className="w-full h-40 sm:h-48 lg:h-40 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-3">
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                          {booking.game?.brand || "Unknown"}{" "}
                          {booking.game?.model || "Game"}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-gray-300 mb-3">
                          {booking.game?.year && (
                            <span className="flex items-center gap-1 text-sm">
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {booking.game.year}
                            </span>
                          )}
                          {booking.game?.category && (
                            <span className="flex items-center gap-1 text-sm">
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                              </svg>
                              {booking.game.category}
                            </span>
                          )}
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                    </div>

                    {booking.game?.description && (
                      <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                        {booking.game.description}
                      </p>
                    )}
                  </div>

                  {/* Date, Location, Price */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pt-4 border-t border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <svg
                          className="w-4 h-4 text-blue-400 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="font-medium text-xs sm:text-sm">
                          {new Date(booking.pickupDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}{" "}
                          -{" "}
                          {new Date(booking.returnDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      {booking.game?.location && (
                        <div className="flex items-center gap-2 text-gray-300">
                          <svg
                            className="w-4 h-4 text-green-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="font-medium text-xs sm:text-sm">
                            {booking.game.location}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-gray-400 text-xs sm:text-sm">
                          Total Price
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                          {currency}
                          {booking.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
