import React from "react";
import { FaHome } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export const DonorBodyHeading = (props) => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let curr_month = month[new Date().getMonth()];
  return (
    <>
      <div className="col-12 col-md-4 d-flex align-items-center">
        <h4 className="font-weight-normal border-right border-dark pr-3 mr-3">
          <NavLink to="/main">Dashboard</NavLink>
        </h4>{" "}
        <span className="d-flex align-items-center">
          {" "}
          <FaHome className="mr-2" /> {props.pagename}{" "}
        </span>
      </div>
      <div className="col-12 col-md-4">
        <p className="text-center">
          Total Food Distributed in {curr_month} <FaArrowRight />{" "}
          <span className="text-success font-weight-bold">[0]</span>
        </p>
      </div>
      <div className="col-12 col-md-4">
        <p className="text-center">
          Total Food Distributed till now <FaArrowRight />{" "}
          <span className="text-danger font-weight-bold">[ 29000 ]</span>
        </p>
      </div>
    </>
  );
};
