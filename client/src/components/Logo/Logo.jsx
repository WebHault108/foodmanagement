import React from "react";
import logoImg from "../../images/file.svg";
import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <>
      <div className="logo">
        <img src={logoImg} alt="logoImage" className="logo-img" />
        <h3 className="logo-name">
          <NavLink to="/" className="link">
            Annapurna
          </NavLink>
        </h3>
      </div>
    </>
  );
};

export default Logo;
