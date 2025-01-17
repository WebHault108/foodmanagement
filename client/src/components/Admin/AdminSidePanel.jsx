import React from "react";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { CgSandClock } from "react-icons/cg";
import { AiOutlineFileDone } from "react-icons/ai";
// import { SiEventstore } from "react-icons/si";
import { AiOutlineRadarChart } from "react-icons/ai";
// import { LuSettings } from "react-icons/lu";

export const AdminSidePanel = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-12 hg pl-0">
            <div className="top-part my-3 d-flex flex-column pl-2">
              <div className="logo w-100">
                <Logo />
              </div>
              <div className="pagess mt-4 pt-2 w-100">
                <NavLink to="/admin" className="text-white mt-2 hvr">
                  <span
                    style={{ fontSize: "0.88rem" }}
                    className="d-flex align-items-center justify-content-flex-start"
                  >
                    {" "}
                    <GoHomeFill className="mr-2" /> Home
                  </span>
                </NavLink>
                <NavLink to="/all-donors" className="text-white mt-2 hvr">
                  <span
                    style={{ fontSize: "0.88rem" }}
                    className="d-flex align-items-center justify-content-flex-start"
                  >
                    {" "}
                    <FaUsers className="mr-2" /> Donors
                  </span>
                </NavLink>
                <NavLink className="text-white mt-2 hvr" to="/donatedfood">
                  <span
                    style={{ fontSize: "0.88rem" }}
                    className="d-flex align-items-center justify-content-flex-start"
                  >
                    {" "}
                    <AiOutlineFileDone className="mr-2" /> Donated Food
                  </span>
                </NavLink>
                <NavLink className="text-white mt-2 hvr" to="/pendingfood">
                  <span
                    style={{ fontSize: "0.88rem" }}
                    className="d-flex align-items-center justify-content-flex-start"
                  >
                    {" "}
                    <CgSandClock className="mr-2" /> Pending Food
                  </span>
                </NavLink>
                {/* <NavLink className="text-white mt-2 hvr">
                  <span
                    style={{ fontSize: "0.88rem" }}
                    className="d-flex align-items-center justify-content-flex-start"
                  >
                    {" "}
                    <SiEventstore className="mr-2" /> Events
                  </span>
                </NavLink> */}
                <NavLink className="text-white mt-2 hvr" to="/AdminCharts">
                  <span
                    style={{ fontSize: "0.88rem" }}
                    className="d-flex align-items-center justify-content-flex-start"
                  >
                    {" "}
                    <AiOutlineRadarChart className="mr-2" /> Analysis
                  </span>
                </NavLink>
              </div>
            </div>

            {/* <div className="bttom-part mb-3 ">
              <NavLink className="text-white mt-2 hvr">
                <span
                  style={{ fontSize: "0.88rem" }}
                  className="d-flex align-items-center justify-content-flex-start"
                >
                  {" "}
                  <LuSettings className="mr-2" /> Settings
                </span>
              </NavLink>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
