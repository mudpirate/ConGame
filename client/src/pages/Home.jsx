import React from "react";
import Hero from "../components/Hero";
import Cards from "../components/Highlights";
import Featured from "../components/Featured";
import Banner from "../components/Banner";
import Testionial from "../components/Testionial";
import News from "../components/News";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Hero />
      <Cards />
      <Featured />
      <Banner />
      <Testionial />
      <News />
    </div>
  );
};

export default Home;
