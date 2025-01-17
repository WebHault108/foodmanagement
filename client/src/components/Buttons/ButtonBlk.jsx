import React from "react";
import { NavLink } from "react-router-dom";

const ButtonBlk = (props) => {
  return (
    <>
      <div className="btne blk" style={{ color: "#fff" }}>
        <NavLink to="/JoinUs" className="blk-text">
          {props.text}
        </NavLink>
      </div>
    </>
  );
};

export default ButtonBlk;
