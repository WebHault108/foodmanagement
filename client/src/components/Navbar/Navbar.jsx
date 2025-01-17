import React from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";

// icons

import { FaBell } from "react-icons/fa";
// import { IoSearch } from "react-icons/io5";
// import { FaUser } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("../JoinUs/JoinUs.jsx"); // Redirect to login page
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row boxx">
          <div className="col-12 col-md-4 ">
            <div class="form-group">
              <input
                type="search"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="col-12 col-md-8  pr-5 link-style">
            <div className="linkss  float-right">
              <NavLink to="/" className="ml-4 round">
                <FaBell className="nav-icons" />
              </NavLink>

              <NavLink to="/" className="ml-4 round">
                <FaEnvelope className="nav-icons" />
              </NavLink>

              <NavLink to="" className="ml-4 round" onClick={handleLogout}>
                <IoIosLogOut className="nav-icons" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
