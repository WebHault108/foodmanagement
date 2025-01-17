import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

// import logo from "../../images/logo.svg";

// icons

import { GoHome } from "react-icons/go";
import { CiViewTable } from "react-icons/ci";
import { MdOutlineManageSearch } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import Logo from "../Logo/Logo";

const Sidebar = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row bag">
          <div className="col-12  m-0 p-0 left">
            <div className="sidebar pl-3">
              <div className="sidebar-top d-flex flex-row align-items-center ">
                <Logo />
              </div>
              <div className="sidebar-bottom px-1">
                <div className="donor-details mb-5">
                  {/* donor name here  */}
                  <h4>Donor name</h4>
                  <p>Donor</p>
                </div>
                <nav>
                  <NavLink to="/main" className="nav  mb-4">
                    <GoHome className="page-icons mr-1" />{" "}
                    <span>Dashboard</span>
                  </NavLink>

                  <NavLink to="../Pages/AddFood/AddFood" className="nav mb-4">
                    <CiViewTable className="page-icons mr-1" />{" "}
                    <span>Add Food</span>{" "}
                    <IoIosArrowBack className="arrow-icons float-right" />
                  </NavLink>

                  <NavLink to="/viewfood" className="nav mb-4">
                    <MdOutlineManageSearch className="page-icons mr-1" />{" "}
                    <span>Manage Food</span>{" "}
                    <IoIosArrowBack className="arrow-icons float-right" />
                  </NavLink>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
