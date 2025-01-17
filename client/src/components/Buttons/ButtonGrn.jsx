import React from "react";
import { NavLink } from "react-router-dom";
import "../JoinUs/JoinUs";

const ButtonGrn = (props) => {
  return (
    <>
      <div className="btne grn">
        <NavLink to="/Donor" className="grn-text">
          {props.text}
        </NavLink>
      </div>
    </>
  );
};

export default ButtonGrn;
