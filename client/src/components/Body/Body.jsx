import React from "react";
import "./Body.css";

import { DashCard } from "../../Stock/DashCard";

const Body = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 pt-4">
            <h1 className="body-title">Dashboard</h1>
            <hr />
          </div>
        </div>
        <div className="row">
          {DashCard.map((item) => {
            return (
              <div className="col-12 col-md-4">
                <div className="card1 my-3">
                  <div className="card1-left">
                    <div className="num">{item.num}</div>
                    <div className="titlee">{item.title}</div>
                  </div>
                  <div className="card1-right">
                    <img src={item.img} alt="" className="card-img" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Body;
