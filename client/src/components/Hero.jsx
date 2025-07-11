import React, { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import controlller from "../assets/controller.png";

const Hero = () => {
  const navigate = useNavigate();

  // 3D Tilt logic
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateDegreeX = ((y - centerY) / centerY) * -30;
    const rotateDegreeY = ((x - centerX) / centerX) * 30;

    rotateX.set(rotateDegreeX);
    rotateY.set(rotateDegreeY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4 py-3">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-1"
      >
        <div className="inline-block px-4 sm:px-8 py-4 rounded-2xl">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-white font-serif mb-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Rent Your
          </motion.h1>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl italic font-bold lg:text-8xl text-green-400 font-sans"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Next Adventure
          </motion.h1>
        </div>

        {/* 3D Tilt Image */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, perspective: 1000 }}
          className="flex justify-center items-center"
        >
          <img
            className="w-80 h-80 object-contain"
            src={controlller}
            alt="controller"
          />
        </motion.div>
      </motion.div>

      {/* Search Input */}
      <motion.div
        className="w-full max-w-2xl mb-8 sm:mb-12 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
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
            className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5"
          />
        </div>
      </motion.div>

      {/* Description + Buttons */}
      <motion.div
        className="flex flex-col justify-center w-full sm:w-3/4 lg:w-1/2 items-center gap-4 sm:gap-6 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <p className="text-white text-sm sm:text-base lg:text-lg font-serif text-center leading-relaxed">
          We proudly operate in multiple cities across India, including Delhi,
          Mumbai, Bangalore, and Hyderabad. Our wide reach ensures fast,
          reliable service no matter where you are. As we continue to grow,
          we're expanding into even more locations to serve you better.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-black font-bold bg-green-400 p-2 sm:p-3 rounded-3xl text-sm sm:text-base w-full sm:w-auto"
          >
            Limited offer
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white font-bold bg-black p-2 sm:p-3 border-2 border-gray-100 rounded-3xl text-sm sm:text-base w-full sm:w-auto"
          >
            Rent Now
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
