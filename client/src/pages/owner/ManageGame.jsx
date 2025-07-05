import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const ManageGame = () => {
  const { isOwner, axios, currency } = useAppContext();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOwnerGames = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/owner/games");
      if (data.success) {
        setGames(data.games);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (gameId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-game", {
        gameId,
      });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerGames();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteGame = async (gameId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this game listing?"
      );
      if (!confirm) return;
      const { data } = await axios.post("/api/owner/delete-game", {
        gameId,
      });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerGames();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOwnerGames();
  }, [isOwner]);

  if (loading) {
    return (
      <div className="px-3 sm:px-4 w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen py-6 sm:py-10">
        <div className="flex items-center justify-center h-48 sm:h-64">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-4 w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen py-6 sm:py-10">
      <Title
        title="Manage Games"
        subTitle="View, edit, or remove your listed games."
      />

      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-xs sm:text-sm">Total Games</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                  {games.length}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-blue-500/20 flex-shrink-0 ml-2 sm:ml-3">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-xs sm:text-sm">Available</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">
                  {games.filter((g) => g.isAvailable).length}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-green-500/20 flex-shrink-0 ml-2 sm:ml-3">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-xs sm:text-sm">Unavailable</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-400">
                  {games.filter((g) => !g.isAvailable).length}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-red-500/20 flex-shrink-0 ml-2 sm:ml-3">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-xs sm:text-sm">Avg. Price</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
                  {currency}
                  {games.length > 0
                    ? Math.round(
                        games.reduce((sum, g) => sum + g.pricePerDay, 0) /
                          games.length
                      )
                    : 0}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-yellow-500/20 flex-shrink-0 ml-2 sm:ml-3">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Games Table */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-white/10">
            <h3 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              Your Game Listings
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Manage availability and remove games from your inventory
            </p>
          </div>

          {games.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                No Games Listed
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">
                You haven't added any games to your inventory yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-gray-300 font-semibold text-xs sm:text-sm">
                      Console
                    </th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-gray-300 font-semibold text-xs sm:text-sm max-md:hidden">
                      Category
                    </th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-gray-300 font-semibold text-xs sm:text-sm">
                      Price/Day
                    </th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-gray-300 font-semibold text-xs sm:text-sm max-md:hidden">
                      Status
                    </th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-gray-300 font-semibold text-xs sm:text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game, index) => (
                    <tr
                      key={game._id || index}
                      className={`border-b border-white/5 hover:bg-white/5 transition-all duration-300 ${
                        index % 2 === 0 ? "bg-white/5" : "bg-white/10"
                      }`}
                    >
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <div className="flex items-center gap-2 sm:gap-4">
                          <div className="relative">
                            <img
                              src={game.image}
                              alt="Console"
                              className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg sm:rounded-xl border border-white/10"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg sm:rounded-xl"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white text-sm sm:text-base truncate">
                              {game.brand} {game.model}
                            </p>
                            <p className="text-gray-400 text-xs sm:text-sm">
                              {game.year}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 max-md:hidden">
                        <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-gray-300">
                          <svg
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-400"
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
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <div className="text-sm sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                          {currency}
                          {game.pricePerDay}
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 max-md:hidden">
                        <span
                          className={`inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-semibold ${
                            game.isAvailable
                              ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30"
                              : "bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 border border-red-500/30"
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                              game.isAvailable ? "bg-green-400" : "bg-red-400"
                            }`}
                          ></div>
                          {game.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button
                            title={
                              game.isAvailable
                                ? "Make Unavailable"
                                : "Make Available"
                            }
                            onClick={() => toggleAvailability(game._id)}
                            className="p-1.5 sm:p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300 group"
                          >
                            {game.isAvailable ? (
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 group-hover:text-yellow-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 group-hover:text-green-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            )}
                          </button>
                          <button
                            title="Delete Game"
                            onClick={() => deleteGame(game._id)}
                            className="p-1.5 sm:p-2 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-300 group"
                          >
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 group-hover:text-red-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageGame;
