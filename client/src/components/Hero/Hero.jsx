import React from "react";
import ButtonBlk from "../Buttons/ButtonBlk";
import ButtonGrn from "../Buttons/ButtonGrn";
import { NavLink } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <>
      <div className="hero-container">
        <div className="hero">
          <div className="heading">
            <h1 className="heading-title">
              Empowering Change,One Step at a Time
            </h1>
            <p className="heading-text">
              Together, we fight hunger, educate, and protect our planet
            </p>
          </div>

          <div className="hero-btns">
            <ButtonBlk text="Be a Donor" />
            {/* <NavLink to="/joinUs">
              <ButtonGrn text="Be a Donor" />
            </NavLink> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
