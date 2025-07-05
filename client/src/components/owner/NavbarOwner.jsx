import React from "react";
import { dummyGameData, dummyUserData } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const NavbarOwner = ({ onMenuToggle }) => {
  const { user } = useAppContext();
  return (
    <nav className="w-full bg-black text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between shadow-2xl border-b border-white/10 backdrop-blur-sm">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="flex flex-col">
          <span
            style={{ fontFamily: "'Orbitron', sans-serif" }}
            className="pr-2 sm:pr-4 rounded-xl text-green-200 text-xl sm:text-2xl lg:text-3xl pl-1 pb-1 font-extrabold"
          >
            ConGame
          </span>
        </div>
      </Link>

      {/* User Welcome Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notification Bell */} {/* User Profile */}
        <div className="hidden sm:flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl px-3 sm:px-4 py-2 border border-white/10 hover:border-white/20 transition-all duration-300 group">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black border-2 from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-300 text-xs sm:text-sm">
              Welcome back,
            </span>
            <span className="font-bold text-transparent bg-clip-text bg-white text-sm sm:text-lg group-hover:from-green-300 group-hover:to-emerald-500 transition-all duration-300">
              {user?.name || "Owner"}
            </span>
          </div>
        </div>
        {/* Mobile User Info */}
        <div className="sm:hidden flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-2 py-1 border border-white/10">
          <div className="w-6 h-6 bg-black border-2 from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 text-sm">
            {user?.name || "Owner"}
          </span>
        </div>
        {/* Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
          <div className="w-2 h-2 bg-green-800 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium">Online</span>
        </div>
        {/* Mobile Status Indicator */}
        <div className="sm:hidden flex items-center gap-1 bg-green-500/10 border border-green-500/20 rounded-full px-2 py-1">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse"></div>
          <span className=" text-xs font-medium">Online</span>
        </div>
      </div>
    </nav>
  );
};

export default NavbarOwner;
