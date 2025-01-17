import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5"; // Import the Close icon
import "./HomeNav.css";
//

import ButtonBlk from "../Buttons/ButtonBlk";
import Logo from "../Logo/Logo";

export const HomeNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <>
      <div className="navbar-container">
        <div className="navbar">
          <div className="nav-left">
            <Logo />
            <div className="page-links">
              <ul>
                <NavLink to="/" className="link">
                  Home
                </NavLink>
                <NavLink to="/About" className="link">
                  About
                </NavLink>
                <NavLink to="/Services" className="link">
                  What we do
                </NavLink>
                <NavLink to="/FoodList" className="link">
                  Food List
                </NavLink>
              </ul>
            </div>
          </div>
          <div className="nav-right">
            <div className="btn-grp">
              <ButtonBlk text="join us" />
            </div>
            <div className="menu" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <IoClose className="menu-icon" /> // Show close icon
              ) : (
                <IoMenu className="menu-icon" /> // Show menu icon
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={` ${isMobileMenuOpen ? "open nav-mobile " : "pg"}`}>
          <div className="page-links hid ">
            <ul>
              <NavLink to="/" className="link" onClick={toggleMobileMenu}>
                Home
              </NavLink>
              <NavLink to="/About" className="link" onClick={toggleMobileMenu}>
                About
              </NavLink>
              <NavLink
                to="/Services"
                className="link"
                onClick={toggleMobileMenu}
              >
                What we do
              </NavLink>
              <NavLink
                to="/FoodList"
                className="link"
                onClick={toggleMobileMenu}
              >
                Food List
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
