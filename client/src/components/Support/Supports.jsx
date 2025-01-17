import React, { useEffect } from "react";
import { IoIosPeople } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { PiCertificateFill } from "react-icons/pi";

import "./Supports.css";

import AOS from "aos";
import "aos/dist/aos.css";

const Supports = () => {
  useEffect(() => {
    AOS.init({ duration: 450 });
  }, []);
  return (
    <>
      <div className="support-cotainer">
        <div className="support-card">
          <div className="icon">
            <IoIosPeople className="support-icon" />
          </div>
          <p>800,000+ people fed</p>
        </div>
        <div className="support-card">
          <div className="icon">
            <BiSupport className="support-icon" />
          </div>
          <p>24 X 7 Customer support</p>
        </div>
        <div className="support-card">
          <div className="icon">
            <PiCertificateFill className="support-icon" />
          </div>
          <p>ISO Certified</p>
        </div>
      </div>
    </>
  );
};

export default Supports;
