import React, { useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const categories = [
  "Generation",
  "Adventure",
  "Sports",
  "Racing",
  "Puzzle",
  "Strategy",
  "Simulation",
  "RPG",
  "Other",
];

const AddGame = () => {
  const { axios, currency } = useAppContext();

  const [gameData, setGameData] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    location: "",
    description: "",
    category: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setGameData({ ...gameData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setGameData({ ...gameData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();

      const { image, ...rest } = gameData;
      formData.append("formData", JSON.stringify(rest));
      formData.append("file", image);

      const { data } = await axios.post("/api/owner/add-game", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.success) {
        toast.success("Console added successfully!");
        setGameData({
          brand: "",
          model: "",
          year: "",
          pricePerDay: "",
          location: "",
          description: "",
          category: "",
          image: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-3 sm:px-4 w-full bg-black  min-h-screen py-6 sm:py-10">
      <Title
        title="Add New Console"
        subTitle="List a new gaming console for rent."
      />

      <div className="max-w-2xl mx-auto">
        <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl hover:border-white/30 transition-all duration-300">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-2">
              Add New Console
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Fill in the details below to list your gaming console
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-4 sm:space-y-6"
          >
            {/* Console Details Section */}
            <div className="bg-white/5 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/10">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Console Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5 sm:mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={gameData.brand}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 text-sm sm:text-base"
                    placeholder="e.g., PlayStation, Xbox, Nintendo"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5 sm:mb-2">
                    Model
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={gameData.model}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 text-sm sm:text-base"
                    placeholder="e.g., PS5, Series X, Switch"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5 sm:mb-2">
                    Year
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={gameData.year}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 text-sm sm:text-base"
                    placeholder="e.g., 2023"
                    min="1990"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5 sm:mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={gameData.category}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 text-sm sm:text-base"
                    required
                  >
                    <option value="" disabled className="bg-gray-800">
                      Select a category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-gray-800">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Location & Pricing Section */}
            <div className="bg-white/5 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/10">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Location & Pricing
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5 sm:mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={gameData.location}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 text-sm sm:text-base"
                    placeholder="e.g., New York, NY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5 sm:mb-2">
                    Price Per Day ({currency})
                  </label>
                  <input
                    type="number"
                    name="pricePerDay"
                    value={gameData.pricePerDay}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 text-sm sm:text-base"
                    placeholder="e.g., 25"
                    min="1"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white/5 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/10">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Description
              </h3>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5 sm:mb-2">
                  Console Description
                </label>
                <textarea
                  name="description"
                  value={gameData.description}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 resize-none text-sm sm:text-base"
                  rows={4}
                  placeholder="Describe your console, its condition, included accessories, etc."
                  required
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="bg-white/5 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/10">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Console Image
              </h3>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5 sm:mb-2">
                  Upload Console Image
                </label>
                <div className="border-2 border-dashed border-white/20 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center hover:border-white/40 transition-all duration-300">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                    required
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <svg
                      className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-gray-400 mb-1.5 sm:mb-2 text-sm sm:text-base">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </label>
                </div>
                {gameData.image && (
                  <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-green-400 text-xs sm:text-sm">
                      ✓ {gameData.image.name} selected
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                  <span className="hidden sm:inline">Adding Console...</span>
                  <span className="sm:hidden">Adding...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Console
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGame;
