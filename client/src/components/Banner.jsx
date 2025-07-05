import React from "react";
import { assets } from "../assets/assets";

const Banner = () => {
  return (
    <div className="h-auto mx-2 sm:mx-5 py-8 sm:py-12 border border-white/20 rounded-xl flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center px-4 sm:px-6">
        {/* Content Section */}
        <div className="text-white mb-4 sm:mb-1 order-2 lg:order-1">
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-5 font-bold leading-tight">
              Do you own a <span className="text-green-600">Console?</span>
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed">
              Turn your game into a source of income! Join thousands of game
              owners who are earning money by renting out their games. Our
              platform makes it easy to list, manage, and earn from your game.
            </p>
          </div>

          <div className="flex pb-3 mt-4 sm:mt-5 flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base">
              List Your Game
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-black font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 text-sm sm:text-base">
              Learn More
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative order-1 lg:order-2">
          <div className="relative z-10">
            <img
              src={assets.banner_car_image}
              alt="Luxury Game"
              className="w-full h-auto rounded-2xl"
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 sm:w-32 h-24 sm:h-32 bg-green-500/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-16 sm:w-24 h-16 sm:h-24 bg-purple-500/20 rounded-full blur-xl"></div>

          {/* Floating Badge */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
