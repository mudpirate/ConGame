import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } =
    useAppContext();
  const [open, setOpen] = useState(false);

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error("Please login or register first");
      }
    } catch (error) {
      toast.error("Please Login ");
    }
  };

  const navigate = useNavigate();
  return (
    <nav className=" ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span
                style={{ fontFamily: "'Orbitron', sans-serif" }}
                className=" pr-4 rounded-xl text-green-200  text-3xl pl-1 pb-1 font-extrabold  "
              >
                ConGame
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-gray-300 font-serif text-md hover:text-gray-500 px-3 py-2 rounded-md transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => (isOwner ? navigate("/owner") : changeRole())}
              className="bg-green-400 hover:bg-green-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              {isOwner ? "Dashboard" : "List Games"}
            </button>
            <button
              onClick={() => {
                user ? logout() : setShowLogin(true);
              }}
              className="bg-black text-white border-2 hover:bg-gray-800  px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white-500"
              onClick={() => setOpen(!open)}
            >
              <img
                src={open ? assets.close_icon : assets.menu_icon}
                alt="menu"
                className="h-6 w-6  "
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        } fixed inset-y-0 right-0 z-50 w-64 bg-black shadow-xl`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* Mobile Search */}
          <div className="px-3 py-2">
            <button className="mb-3 flex " onClick={() => setOpen(!open)}>
              <img src={assets.close_icon} alt="" />
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search games"
                className="w-full pl-10 pr-4 py-2 border bg-white text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <img
                src={assets.search_icon}
                alt="search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              />
            </div>
          </div>

          {/* Mobile Menu Links */}
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="text-white hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Action Buttons */}
          <div className="px-3 py-2 space-y-2">
            <button
              onClick={() => {
                isOwner ? navigate("/owner") : changeRole();
                setOpen(false);
              }}
              className="w-full bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              {isOwner ? "Dashboard" : "List Games"}
            </button>
            <button
              onClick={() => {
                user ? logout() : setShowLogin(true);
                setOpen(false);
              }}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
