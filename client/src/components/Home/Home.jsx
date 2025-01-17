import React from "react";
// import { HomeNav } from "../HomeNav/HomeNav";
import Hero from "../Hero/Hero";
import Services from "../Service/Service";
import About from "../About/About";
import JoinUs from "../JoinUs/JoinUs";
import Projects from "../Projects/Projects";
import Chart from "../Chart/Chart";
// import Footer from "../Footer/Footer";

export const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <JoinUs />
      <Projects />
      <Chart />
    </>
  );
};
