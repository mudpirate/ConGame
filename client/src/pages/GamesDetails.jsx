import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { assets } from "../assets/assets";

const GameDetails = () => {
  const { id } = useParams();
  const {
    games,
    axios,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    currency,
  } = useAppContext();

  const navigate = useNavigate();
  const [game, setGame] = useState(null);

  const submit = async () => {
    if (!pickupDate || !returnDate) {
      toast.error("Please select both pickup and return dates.");
      return;
    }
    try {
      const { data } = await axios.post("/api/bookings/create", {
        game: id,
        pickupDate,
        returnDate,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setGame(games.find((g) => g._id === id));
  }, [games, id]);

  return game ? (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium sm:hidden lg:block">
              Back to all consoles
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Game Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Game Image */}
            <div className="group bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:border-white/40 transition-all duration-300">
              <div className="relative">
                <img
                  src={game.image}
                  alt={`${game.brand} ${game.model}`}
                  className="w-full h-96 lg:h-[500px] object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Game Details */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="flex items-start justify-between mb-8">
                <div className="flex-1">
                  <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-3">
                    {game.brand} {game.model}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-300 mb-4">
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-400"
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
                      {game.year}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      {game.category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                    {currency}
                    {game.pricePerDay}
                  </div>
                  <div className="text-gray-400 text-lg">per day</div>
                </div>
              </div>

              {game.isAvailable && (
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Available Now
                </div>
              )}

              {game.description && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Description
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {game.description}
                  </p>
                </div>
              )}

              {/* Game Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {game.location && (
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-green-400"
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
                      </div>
                      <h4 className="text-white font-semibold">Location</h4>
                    </div>
                    <p className="text-gray-300">{game.location}</p>
                  </div>
                )}

                <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold">Rental Period</h4>
                  </div>
                  <p className="text-gray-300">
                    Flexible rental periods available
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 sticky top-24 hover:border-white/40 transition-all duration-300">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-white mb-2">
                  Book This Game
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-3">
                    Pickup Date
                  </label>
                  <div className="relative">
                    <input
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      type="date"
                      className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 [color-scheme:dark]"
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
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
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-3">
                    Return Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-4 py-4 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 [color-scheme:dark]"
                      min={pickupDate || new Date().toISOString().split("T")[0]}
                      required
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
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
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Price per day:</span>
                    <span className="text-white font-semibold">
                      {currency}
                      {game.pricePerDay}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total (estimated):</span>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                      {currency}
                      {pickupDate && returnDate
                        ? Math.ceil(
                            (new Date(returnDate) - new Date(pickupDate)) /
                              (1000 * 60 * 60 * 24)
                          ) * game.pricePerDay
                        : game.pricePerDay}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
                >
                  Book Now
                </button>
              </form>

              <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-blue-300 text-sm font-medium mb-1">
                      Free Cancellation
                    </p>
                    <p className="text-gray-400 text-xs">
                      Cancel up to 24 hours before pickup for a full refund
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Game Not Found</h2>
        <p className="text-gray-400 mb-6">
          The game you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/games")}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          Browse All Games
        </button>
      </div>
    </div>
  );
};

export default GameDetails;
