import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-start items-center px-4 py-8">
      <div className="text-center mb-5">
        <div className="inline-block px-4 sm:px-8 py-4 rounded-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-white font-serif mb-2">
            Rent Your
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl italic font-bold lg:text-8xl text-green-400 font-sans">
            Next Adventure
          </h1>
        </div>
      </div>

      <div className="w-full max-w-2xl mb-8 sm:mb-12 px-4">
        <div className="relative">
          <input
            type="text"
            onClick={() => navigate("/Games")}
            placeholder="Search games"
            className="w-full pl-12 pr-6 py-3 sm:py-4 border-2 border-white bg-white/80 backdrop-blur-sm rounded-full text-black placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-colors text-sm sm:text-base"
          />
          <img
            src={assets.search_icon}
            alt="search"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-black"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center w-full sm:w-3/4 lg:w-1/2 items-center gap-4 sm:gap-6 px-4">
        <h1 className="text-white text-sm sm:text-base lg:text-lg font-serif text-center leading-relaxed">
          We proudly operate in multiple cities across India, including Delhi,
          Mumbai, Bangalore, and Hyderabad. Our wide reach ensures fast,
          reliable service no matter where you are. As we continue to grow,
          we're expanding into even more locations to serve you better.
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full sm:w-auto">
          <button className="text-black font-bold bg-green-400 p-2 sm:p-3 rounded-3xl text-sm sm:text-base w-full sm:w-auto">
            Limited offer
          </button>
          <button className="text-white font-bold bg-black p-2 sm:p-3 border-2 border-gray-100 rounded-3xl text-sm sm:text-base w-full sm:w-auto">
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
