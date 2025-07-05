import React from "react";
import { useNavigate } from "react-router-dom";

const GameCard = ({ game }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/gamedetails/${game._id}`);
        scrollTo(0, 0);
      }}
      className="bg-black rounded-2xl shadow-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-white/20 cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={game.image}
          alt={`${game.brand} ${game.model}`}
          className="w-full h-48 sm:h-56 object-contain"
        />

        {/* Availability Badge */}
        {game.isAvailable && (
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
            Available Now
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/80 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
          <span className="font-bold text-base sm:text-lg">
            {currency}
            {game.pricePerDay}
          </span>
          <span className="text-xs sm:text-sm"> / day</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        {/* Game Title */}
        <div className="mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
            {game.brand} {game.model}
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm">
            {game.year} • {game.category}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-2 leading-relaxed">
          {game.description}
        </p>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-colors duration-200 shadow-md text-sm sm:text-base">
          Rent Now
        </button>
      </div>
    </div>
  );
};

export default GameCard;
