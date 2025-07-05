import React from "react";

const Testionial = () => {
  return (
    <div className="min-h-screen border m-2 sm:m-4 rounded-2xl border-white/20 bg-black flex flex-col items-center justify-center text-center px-4 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-16 max-w-4xl mx-auto leading-tight">
          Trusted by <span className="text-green-400">30k+</span> world class
          companies & design teams
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Testimonial 1 */}
          <div className="flex flex-col items-center bg-white/10 backdrop-blur-md px-4 sm:px-6 py-6 sm:py-8 rounded-2xl border border-white/20 text-center text-gray-300 hover:bg-white/20 transition-all duration-300">
            <div className="relative mb-4 sm:mb-6">
              <img
                className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover"
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png"
                alt="userImage1"
              />
              <svg
                className="absolute top-0 -right-1 sm:-right-2"
                width="18"
                height="18"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="10.5" cy="10.5" r="8.5" fill="#10B981" />
                <path
                  d="m11.584 13.872 1.752-3.288 1.104-.288a2.7 2.7 0 0 1-.432.576.76.76 0 0 1-.552.24q-.672 0-1.248-.576t-.576-1.464q0-.936.624-1.584.648-.672 1.584-.672.888 0 1.536.672.672.648.672 1.584 0 .384-.168.912-.144.504-.576 1.296l-1.92 3.552zm-5.4 0 1.752-3.288 1.08-.288a2.2 2.2 0 0 1-.408.576.76.76 0 0 1-.552.24q-.696 0-1.272-.576t-.576-1.464q0-.936.624-1.584.648-.672 1.584-.672.888 0 1.536.672.672.648.672 1.584 0 .384-.144.912-.144.504-.576 1.296L7.96 14.832z"
                  fill="#fff"
                />
              </svg>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              "The game rental service exceeded my expectations. The process was
              seamless, the game was in perfect condition, and the customer
              support was outstanding. Highly recommended!"
            </p>
            <p className="text-base sm:text-lg text-white font-semibold mb-1">
              Donald Jackman
            </p>
            <p className="text-xs text-gray-400">Business Executive</p>
          </div>

          {/* Testimonial 2 */}
          <div className="flex flex-col items-center bg-white/10 backdrop-blur-md px-4 sm:px-6 py-6 sm:py-8 rounded-2xl border border-white/20 text-center text-gray-300 hover:bg-white/20 transition-all duration-300">
            <div className="relative mb-4 sm:mb-6">
              <img
                className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover"
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage2.png"
                alt="userImage2"
              />
              <svg
                className="absolute top-0 -right-1 sm:-right-2"
                width="18"
                height="18"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="10.5" cy="10.5" r="8.5" fill="#10B981" />
                <path
                  d="m11.584 13.872 1.752-3.288 1.104-.288a2.7 2.7 0 0 1-.432.576.76.76 0 0 1-.552.24q-.672 0-1.248-.576t-.576-1.464q0-.936.624-1.584.648-.672 1.584-.672.888 0 1.536.672.672.648.672 1.584 0 .384-.168.912-.144.504-.576 1.296l-1.92 3.552zm-5.4 0 1.752-3.288 1.08-.288a2.2 2.2 0 0 1-.408.576.76.76 0 0 1-.552.24q-.696 0-1.272-.576t-.576-1.464q0-.936.624-1.584.648-.672 1.584-.672.888 0 1.536.672.672.648.672 1.584 0 .384-.144.912-.144.504-.576 1.296L7.96 14.832z"
                  fill="#fff"
                />
              </svg>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              "I've been using this platform for months now and it's been
              fantastic. The variety of games available and the competitive
              pricing make it my go-to choice for rentals."
            </p>
            <p className="text-base sm:text-lg text-white font-semibold mb-1">
              Richard Nelson
            </p>
            <p className="text-xs text-gray-400">Travel Enthusiast</p>
          </div>

          {/* Testimonial 3 */}
          <div className="flex flex-col items-center bg-white/10 backdrop-blur-md px-4 sm:px-6 py-6 sm:py-8 rounded-2xl border border-white/20 text-center text-gray-300 hover:bg-white/20 transition-all duration-300 md:col-span-2 lg:col-span-1">
            <div className="relative mb-4 sm:mb-6">
              <img
                className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover"
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage3.png"
                alt="userImage3"
              />
              <svg
                className="absolute top-0 -right-1 sm:-right-2"
                width="18"
                height="18"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="10.5" cy="10.5" r="8.5" fill="#10B981" />
                <path
                  d="m11.584 13.872 1.752-3.288 1.104-.288a2.7 2.7 0 0 1-.432.576.76.76 0 0 1-.552.24q-.672 0-1.248-.576t-.576-1.464q0-.936.624-1.584.648-.672 1.584-.672.888 0 1.536.672.672.648.672 1.584 0 .384-.168.912-.144.504-.576 1.296l-1.92 3.552zm-5.4 0 1.752-3.288 1.08-.288a2.2 2.2 0 0 1-.408.576.76.76 0 0 1-.552.24q-.696 0-1.272-.576t-.576-1.464q0-.936.624-1.584.648-.672 1.584-.672.888 0 1.536.672.672.648.672 1.584 0 .384-.144.912-.144.504-.576 1.296L7.96 14.832z"
                  fill="#fff"
                />
              </svg>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              "As a frequent gamer, I appreciate the reliability and quality of
              service. The booking process is quick, and the games are always
              well-maintained. Excellent experience every time!"
            </p>
            <p className="text-base sm:text-lg text-white font-semibold mb-1">
              James Washington
            </p>
            <p className="text-xs text-gray-400">Marketing Director</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testionial;
