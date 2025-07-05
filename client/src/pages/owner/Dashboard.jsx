import React, { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const { axios, isOwner, currency } = useAppContext();

  const [data, setData] = useState({
    totalGames: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    games: [],
    bookings: [],
    monthlyRevenue: 0,
    recentBookings: [],
  });

  const dashboardCards = [
    {
      title: "Total Consoles",
      value: data.totalGames,
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
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
      ),
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-500/10 to-blue-600/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-500/10 to-emerald-600/10",
      borderColor: "border-green-500/20",
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-500/10 to-orange-500/10",
      borderColor: "border-yellow-500/20",
    },
    {
      title: "Confirmed",
      value: data.completedBookings,
      icon: assets.listIconColored,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-500/10 to-purple-600/10",
      borderColor: "border-purple-500/20",
    },
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");
      if (data.success) {
        setData(data.dashboardData);
        console.log(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]);

  return (
    <div className="px-3 sm:px-4 md:px-10 bg-black  pt-6 sm:pt-10 flex-1 min-h-screen">
      <Title
        title="Admin Dashboard"
        subTitle="Monitor overall platform performance including"
      />

      {/* Dashboard Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 hover:border-white/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex-1 min-w-0">
                <div className="text-gray-400 text-xs sm:text-sm font-medium mb-1">
                  {card.title}
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                  {card.value}
                </div>
              </div>
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r ${card.bgColor} rounded-lg sm:rounded-xl flex items-center justify-center border ${card.borderColor} group-hover:scale-110 transition-transform duration-300 flex-shrink-0 ml-2 sm:ml-3`}
              >
                {typeof card.icon === "object" ? (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
                    {card.icon}
                  </div>
                ) : (
                  <img
                    src={card.icon}
                    alt={card.title}
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                  />
                )}
              </div>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1">
              <div
                className={`h-1 bg-gradient-to-r ${card.color} rounded-full transition-all duration-1000`}
                style={{ width: `${Math.min((card.value / 100) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables Section */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Recent Bookings */}
        <div className="flex-1 min-w-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-white/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">
                Recent Bookings
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                Latest customer bookings
              </p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg sm:rounded-xl flex items-center justify-center border border-white/20 flex-shrink-0 ml-3">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
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

          {data.bookings?.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
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
              <p className="text-gray-400 text-sm sm:text-base">
                No recent bookings
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {data.bookings?.map((booking, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-black rounded-lg sm:rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 hover:scale-[1.01] shadow-sm group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 flex-shrink-0">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm sm:text-base truncate">
                      {booking?.game?.brand} {booking?.game?.model}
                    </div>
                    <div className="text-gray-400 text-xs sm:text-sm">
                      {new Date(booking.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm sm:text-lg font-bold text-white">
                      {currency}
                      {booking.price}
                    </div>
                    <span
                      className={`inline-block px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-semibold border transition-colors duration-200 ${
                        booking.status === "confirmed"
                          ? "bg-white text-black border-white"
                          : "bg-black text-white border-white"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Monthly Revenue */}
        <div className="flex-1 min-w-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-white/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-1">
                Monthly Revenue
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                Revenue for current month
              </p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-green-500/20 flex-shrink-0 ml-3">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
          </div>

          <div className="text-center py-6 sm:py-8">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-3 sm:mb-4">
              {currency}
              {data.monthlyRevenue}
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5 sm:h-2 mb-3 sm:mb-4">
              <div
                className="h-1.5 sm:h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.min(
                    (data.monthlyRevenue / 10000) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm">
              Monthly target: {currency}10,000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
