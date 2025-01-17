import React, { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

const ServiceCard = (props) => {
  useEffect(() => {
    AOS.init({ duration: 450 });
  }, []);

  return (
    <div className="service-card" data-aos="fade-up">
      <div className="service-icon">{props.icon}</div>
      <div className="service-content">
        <div className="service-title">{props.title}</div>
        <div className="service-desc">{props.desc}</div>
      </div>
    </div>
  );
};

export default ServiceCard;
