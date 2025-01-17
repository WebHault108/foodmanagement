import React from "react";

const LineChart = (props) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                Here, the no. of Donation Done in Every Month Listed Here
              </div>
              <div className="card-body">{props.chartType}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LineChart;
