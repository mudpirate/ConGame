import React from "react";

const News = () => {
  return (
    <div className="flex p-6 sm:p-10 mx-2 sm:mx-8 flex-col items-center justify-center text-center space-y-2">
      <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold text-white">
        Never Miss a Deal!
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-white pb-6 sm:pb-8 px-4">
        Subscribe to get the latest offers, new arrivals, and exclusive
        discounts
      </p>
      <form className="flex flex-col sm:flex-row items-center justify-between max-w-2xl w-full gap-3 sm:gap-0">
        <input
          className="border bg-white rounded-md h-12 sm:h-13 outline-none w-full sm:border-r-0 sm:rounded-r-none px-3 text-black text-sm sm:text-base"
          type="text"
          placeholder="Enter your email id"
          required
        />
        <button
          type="submit"
          className="w-full sm:w-auto px-6 sm:px-8 md:px-12 h-12 sm:h-13 text-white bg-indigo-500 hover:bg-indigo-600 transition-all cursor-pointer rounded-md sm:rounded-l-none text-sm sm:text-base font-medium"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};
export default News;
