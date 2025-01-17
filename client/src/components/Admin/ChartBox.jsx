import React from "react";

const ChartBox = (props) => {
  return (
    <div className="small-box">
      <div className="box" style={{ backgroundColor: props.color }}></div>
      <p className="box-title">
        {props.value}% {props.name}
      </p>
    </div>
  );
};

export default ChartBox;
