import React, { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const ManageBookings = () => {
  const { currency, axios } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOwnerBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get("/api/bookings/owner-bookings");
      if (data.success) {
        setBookings(data.bookings);
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch bookings";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post("/api/bookings/change-status", {
        bookingId,
        status,
      });
      if (data.success) {
        toast.success(data.message || "Status updated successfully");
        fetchOwnerBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update status";
      toast.error(errorMessage);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30";
      case "pending":
        return "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border border-yellow-500/30";
      case "cancelled":
        return "bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 border border-red-500/30";
      case "completed":
        return "bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  if (loading) {
    return (
      <div className="px-3 sm:px-4 w-full bg-black min-h-screen py-6 sm:py-10">
        <div className="flex items-center justify-center h-48 sm:h-64">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-3 sm:px-4 w-full bg-black min-h-screen py-6 sm:py-10">
        <Title
          title="Manage Bookings"
          subTitle="View, edit, or remove your listed bookings."
        />
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12 sm:py-16">
            <div className="bg-red-500/10 backdrop-blur-sm rounded-lg sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-md mx-auto border border-red-500/20">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
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
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Error Loading Bookings
              </h3>
              <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
                {error}
              </p>
              <button
                onClick={fetchOwnerBookings}
                className="px-3 sm:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 text-sm sm:text-base"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-4 w-full bg-black min-h-screen py-6 sm:py-10">
      <Title
        title="Manage Bookings"
        subTitle="View, edit, or remove your listed bookings."
      />

      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-xs sm:text-sm">
                  Total Bookings
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                  {bookings.length}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-blue-500/20 flex-shrink-0 ml-2 sm:ml-3">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-xs sm:text-sm">Pending</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-400">
                  {bookings.filter((b) => b.status === "pending").length}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-yellow-500/20 flex-shrink-0 ml-2 sm:ml-3">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-xs sm:text-sm">Confirmed</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">
                  {bookings.filter((b) => b.status === "confirmed").length}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-green-500/20 flex-shrink-0 ml-2 sm:ml-3">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400"
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
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-xs sm:text-sm">
                  Total Revenue
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                  {currency}
                  {bookings.reduce((sum, b) => sum + (b.price || 0), 0)}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-green-500/20 flex-shrink-0 ml-2 sm:ml-3">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-white/10">
            <h3 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              Recent Bookings
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Manage and update booking statuses
            </p>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                No Bookings Found
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">
                You don't have any bookings yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-gray-300 font-semibold text-xs sm:text-sm">
                      Console
                    </th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-gray-300 font-semibold text-xs sm:text-sm max-md:hidden">
                      Date Range
                    </th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-gray-300 font-semibold text-xs sm:text-sm">
                      Total
                    </th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-gray-300 font-semibold text-xs sm:text-sm max-md:hidden">
                      Payment
                    </th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-gray-300 font-semibold text-xs sm:text-sm">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr
                      key={booking._id || index}
                      className={`border-b border-white/5 hover:bg-white/5 transition-all duration-300 ${
                        index % 2 === 0 ? "bg-white/5" : "bg-white/10"
                      }`}
                    >
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <div className="flex items-center gap-2 sm:gap-4">
                          <div className="relative">
                            <img
                              src={
                                booking.game?.image || "/placeholder-image.jpg"
                              }
                              alt="Console"
                              className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg sm:rounded-xl border border-white/10"
                              onError={(e) => {
                                e.target.src = "/placeholder-image.jpg";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg sm:rounded-xl"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white text-sm sm:text-base truncate">
                              {booking.game?.brand || "Unknown"}{" "}
                              {booking.game?.model || "Game"}
                            </p>
                            <p className="text-gray-400 text-xs sm:text-sm">
                              {booking.game?.category || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 max-md:hidden">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-gray-300 text-xs sm:text-sm">
                            {new Date(booking.pickupDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}{" "}
                            -{" "}
                            {new Date(booking.returnDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <div className="text-sm sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                          {currency}
                          {booking.price || 0}
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 max-md:hidden">
                        <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-gray-300">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"></div>
                          Offline
                        </span>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6">
                        <select
                          onChange={(e) =>
                            changeBookingStatus(booking._id, e.target.value)
                          }
                          value={booking.status}
                          className="px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 text-xs sm:text-sm"
                        >
                          <option value="pending" className="bg-gray-800">
                            Pending
                          </option>
                          <option value="confirmed" className="bg-gray-800">
                            Confirmed
                          </option>
                          <option value="cancelled" className="bg-gray-800">
                            Cancelled
                          </option>
                          <option value="completed" className="bg-gray-800">
                            Completed
                          </option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
