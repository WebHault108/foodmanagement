import React, { useEffect } from "react";
import { FaBowlFood } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { FaPeoplePulling } from "react-icons/fa6";
import { GiAwareness } from "react-icons/gi";

import "./service.css";
import ServiceCard from "./ServiceCard";
import serviceOrg from "../../images/serviceorg.gif";

import AOS from "aos";
import "aos/dist/aos.css";

const Services = () => {
  const service_card = [
    {
      id: 1,
      icon: <FaBowlFood />,
      title: "Food Collection",
      desc: "We collect surplus food to prevent waste and feed the hungry daily.",
    },
    {
      id: 2,
      icon: <TbTruckDelivery />,
      title: "Efficient Distribution",
      desc: "Timely food delivery to shelters, kitchens, and organizations feeding hungry people..",
    },
    {
      id: 3,
      icon: <FaPeoplePulling />,
      title: "Volunteer Support",
      desc: "Volunteers collect food and distribute it, ensuring no one goes hungry.",
    },
    {
      id: 4,
      icon: <GiAwareness />,
      title: "Raising Awareness",
      desc: "We promote education on reducing food waste and combating global hunger issues.",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 450 });
  }, []);

  return (
    <>
      <div className="service-container">
        <div className="services">
          <div className="section-title">
            <p>What we do?</p>
          </div>
          <h2 className="service-heading">
            {/* Waste Less, Feed More, Together, We Can Make a Difference */}
            We Deliver Exactly What you need!
          </h2>
          <div className="service-main">
            <div className="content-left">
              <div className="service-available">
                {service_card.map((card) => {
                  const { id, icon, title, desc } = card;
                  return (
                    <ServiceCard
                      key={id}
                      icon={icon}
                      title={title}
                      desc={desc}
                    />
                  );
                })}
              </div>
            </div>
            <div className="content-right">
              <div className="image-container" data-aos="fade-up">
                <img
                  src={serviceOrg}
                  alt="serviceImage"
                  className="section-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
