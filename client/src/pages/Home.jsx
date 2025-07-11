import React from "react";
import Hero from "../components/Hero";
import Cards from "../components/Highlights";
import Featured from "../components/Featured";
import Banner from "../components/Banner";
import Testionial from "../components/Testionial";
import News from "../components/News";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const sectionFade = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero already has scroll animation inside */}
      <Hero />

      {/* Scroll Reveal Sections */}
      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Cards />
      </motion.div>

      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Featured />
      </motion.div>

      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Banner />
      </motion.div>

      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Testionial />
      </motion.div>

      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <News />
      </motion.div>
    </div>
  );
};

export default Home;
