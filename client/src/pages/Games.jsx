import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import GameCard from "../components/Card";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Games = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { games, axios, gamesLoading } = useAppContext();

  const isSearchData = pickupLocation && pickupDate && returnDate;

  const [filteredGames, setFilteredGames] = useState([]);

  const searchGameAvailability = async () => {
    try {
      const { data } = await axios.post("/api/bookings/check-availability", {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });
      if (data.success) {
        setFilteredGames(data.availableGames);
        if (data.availableGames.length === 0) {
          toast("No games available");
        }
      }
    } catch (error) {
      toast.error("Failed to search games");
    }
  };

  useEffect(() => {
    if (isSearchData) searchGameAvailability();
  }, [pickupLocation, pickupDate, returnDate]);

  useEffect(() => {
    if (!isSearchData && !gamesLoading) setFilteredGames(games || []);
  }, [games, isSearchData, gamesLoading]);

  const [input, setInput] = useState("");

  const displayedGames = filteredGames.filter((game) => {
    if (!input.trim()) return true;
    return (
      game.brand.toLowerCase().includes(input.toLowerCase()) ||
      game.model.toLowerCase().includes(input.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl bg-black mx-auto px-4 py-6 sm:py-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-2">
          Our Products
        </h1>
        <div className="flex justify-center items-center mb-4 sm:mb-6">
          <p className="text-gray-300 w-full text-center text-sm sm:text-base">
            Explore our Top products
          </p>
        </div>
        <div className="flex justify-center items-center mb-6 sm:mb-8">
          <div className="flex items-center gap-2 bg-white rounded-full shadow px-3 sm:px-4 py-2 w-full max-w-md">
            <img
              src={assets.search_icon}
              alt="search"
              className="w-4 h-4 sm:w-5 sm:h-5 opacity-60"
            />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search the games"
              className="flex-1 outline-none bg-transparent px-2 text-gray-700 text-sm sm:text-base"
            />
            <img
              src={assets.filter_icon}
              alt="filter"
              className="w-4 h-4 sm:w-5 sm:h-5 opacity-60 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="text-white mb-4 text-sm sm:text-base">
        Showing
        <span className="text-green-500 mx-1 font-semibold">
          {displayedGames.length}
        </span>
        games
      </div>

      {gamesLoading ? (
        <div className="text-white text-center py-10">Loading games...</div>
      ) : displayedGames.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
              No Games Found
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              {input.trim()
                ? "Try adjusting your search terms"
                : "No games available for the selected criteria"}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {displayedGames.map((game, index) => (
            <div key={index}>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Games;
