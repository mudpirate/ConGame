import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import GameCard from "./Card";

const Featured = () => {
  const { games, gamesLoading } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black w-full px-4 py-12 sm:py-16 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Featured Consoles
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover our premium selection of games available for rent. From
            luxury consoles to efficient portables, find the perfect game for
            your journey.
          </p>
        </div>

<<<<<<< HEAD
        {gamesLoading ? (
          <div className="  rounded-2xl text-xl h-1/2 flex items-center justify-center text-white text-center  overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <div className="w-1/3 rounded-xl bg-white/10 py-10 ">
              Loading games....
            </div>
          </div>
        ) : (
          <>
            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {games.slice(0, 3).map((game) => (
                <div key={game._id}>
                  <GameCard game={game} />
                </div>
              ))}
=======
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {games.slice(0, 3).map((game) => (
            <div key={game._id}>
              <GameCard game={game} />
>>>>>>> da7f40701722d7ce91b99f0cf8d6af6c9c703b9e
            </div>

            {/* View All Button */}
            <div className="flex justify-center items-center mt-8 sm:mt-12">
              <button
                onClick={() => {
                  navigate("/games");
                  scrollTo(0, 0);
                }}
                className="bg-green-400 text-black font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-gray-200 transition-colors duration-200 shadow-lg text-sm sm:text-base"
              >
                Explore
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Featured;
