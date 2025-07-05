import React, { useState } from "react";
import { dummyUserData, ownerMenuLinks, assets } from "../../assets/assets";
import { useLocation, Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const Sidebar = ({ onClose }) => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState("");

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const { data } = await axios.post("/api/owner/update-image", formData);
      if (data.success) {
        fetchUser();
        toast.success("Image Updated");
        setImage("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="bg-black min-h-screen w-56 sm:w-64 p-4 sm:p-6 flex flex-col items-center border-r border-white/10 shadow-2xl">
      {/* Mobile Close Button */}
      <div className="lg:hidden w-full flex justify-end mb-4">
        <button
          onClick={onClose}
          className="p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Profile Section */}
      <div className="w-full text-center mb-6 sm:mb-8">
        <div className="group relative mb-3 sm:mb-4 inline-block">
          <label htmlFor="image" className="cursor-pointer block relative">
            <div className="relative">
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : user?.image ||
                      "https://images.pexels.com/photos/31452622/pexels-photo-31452622.jpeg"
                }
                alt="Profile"
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover border-2 sm:border-4 border-white/20 shadow-lg group-hover:border-blue-400/50 transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-green-400 p-1.5 sm:p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
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
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
            </div>
            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>

        {image && (
          <button
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-xs sm:text-sm mb-3 sm:mb-4 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg mx-auto"
            onClick={updateImage}
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="hidden sm:inline">Save Image</span>
            <span className="sm:hidden">Save</span>
          </button>
        )}

        <div className="mb-4 sm:mb-6">
          <h3 className="font-bold text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-1">
            {user?.name || "Owner"}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm">Admin</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="w-full flex-1">
        <div className="mb-3 sm:mb-4">
          <h4 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 sm:mb-3 px-2 sm:px-4">
            Dashboard
          </h4>
        </div>
        <ul className="space-y-1 sm:space-y-2">
          {ownerMenuLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 w-full group relative overflow-hidden
                    ${
                      isActive
                        ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white border shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
                  )}

                  {/* Icon */}
                  <div
                    className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg transition-all duration-300 flex-shrink-0
                    ${
                      isActive
                        ? " text-white"
                        : "bg-white/10 text-gray-400 group-hover:bg-white/20 group-hover:text-white"
                    }`}
                  >
                    {link.icon ? (
                      <img
                        src={link.icon}
                        alt=""
                        className="w-3 h-3 sm:w-4 sm:h-4"
                      />
                    ) : (
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
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
                    )}
                  </div>

                  {/* Text */}
                  <span className="font-medium text-sm sm:text-base truncate">
                    {link.name}
                  </span>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-xl"></div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="w-full pt-4 sm:pt-6 border-t border-white/10">
        <div className="text-center">
          <p className="text-gray-400 text-xs mb-1.5 sm:mb-2">Console Rental</p>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs font-medium">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
