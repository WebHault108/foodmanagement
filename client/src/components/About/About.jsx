import React from "react";
import aboutImg from "../../images/serviceImg.png";
// import Supports from "./Supports";
import Supports from "../Support/Supports";

import "./About.css";

const About = () => {
  return (
    <>
      <div className="about-cotainer">
        <div className="about">
          <div className="section-title">
            <p>Know About Us</p>
          </div>

          <div className="section-content">
            <div className="left-content">
              <div className="section-heading">
                <h1>Building a Compassionate Community</h1>
              </div>
              <div className="section-text">
                <p>
                  What started with a simple idea — that food should nourish
                  people, not landfills — has evolved into a larger mission to
                  uplift our community. Beyond food donations, we work
                  tirelessly to educate the public on waste reduction, organize
                  tree plantation drives, cleanliness campaigns, and ensure the
                  safety of animals.
                  <br />
                  <br />
                  We believe in the power of collective action and encourage
                  people from all walks of life to join us in creating a more
                  compassionate, sustainable world. Together, we can fight
                  hunger, protect the environment, and build a better future for
                  everyone.
                </p>
              </div>
            </div>
            <div className="right-content">
              <div className="imgage-section">
                <img src={aboutImg} alt="aboutImg" className="about-img" />
              </div>
            </div>
          </div>

          <div className="support">
            <Supports />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
