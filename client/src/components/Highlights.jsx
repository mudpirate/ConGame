import React from "react";

import ps5 from "../assets/ps5.avif";
import xbox from "../assets/xbox.jpg";
import nin from "../assets/nin.jpg";

const Cards = () => {
  return (
    <div className="min-h-screen bg-black w-full px-4 py-8 sm:py-10 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto bg-black backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-white/20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl py-4 sm:py-6 font-extrabold text-center text-white">
          Highlights
        </h1>
        <h5 className="text-lg sm:text-xl font-medium text-center text-gray-400 mb-8 sm:mb-12 px-4">
          Explore our selection of Consoles available for your next adventure
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {/* Card 1 */}
          <div className="bg-black backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <div className="relative">
              <img
                src={ps5}
                alt="PlayStation 5"
                className="w-full h-48 sm:h-56 object-cover"
              />
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                PlayStation 5
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Next-gen gaming game with 4K graphics and lightning-fast loading
                times.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-black backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <div className="relative">
              <img
                src={xbox}
                alt="Xbox Series X"
                className="w-full h-48 sm:h-56 object-cover"
              />
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                Xbox Series X
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                The most powerful Xbox ever with 4K gaming at 120 FPS.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-black backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <div className="relative">
              <img
                src={nin}
                alt="Nintendo Switch"
                className="w-full h-48 sm:h-56 object-cover"
              />
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                Nintendo Switch
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Portable gaming game for on-the-go entertainment.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-6 sm:mt-8">
          <button className="bg-white text-black font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-gray-200 transition-colors duration-200 shadow-lg text-sm sm:text-base">
            Explore more...
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
