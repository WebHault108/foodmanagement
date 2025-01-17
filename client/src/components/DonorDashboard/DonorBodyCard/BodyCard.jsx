import React from "react";

const BodyCard = (props) => {
  return (
    <>
      <div className="card small-card p-0">
        <div className="card-body">
          <div className="card-num text-center">{props.num}</div>
          <div className="card-title-d text-center sm">{props.title}</div>
          <div className="card-chart d-flex justify-content-center ">
            {props.chartType}
          </div>
          <div className="card-desc">
            <p className="sm text-center">
              <span className="text-success font-weight-bold ">
                {props.fnum}
              </span>{" "}
              {props.desc}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BodyCard;
