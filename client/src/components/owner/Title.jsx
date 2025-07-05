import React from "react";

const Title = ({ title, subTitle }) => {
  return (
    <div className="mb-8">
      <h1 className="font-extrabold text-3xl md:text-4xl text-black dark:text-white tracking-tight mb-2">
        <span className="bg-white bg-clip-text text-transparent">{title}</span>
      </h1>
      <p className="text-base md:text-lg text-gray-500 dark:text-gray-300 max-w-2xl">
        {subTitle}
      </p>
    </div>
  );
};

export default Title;
