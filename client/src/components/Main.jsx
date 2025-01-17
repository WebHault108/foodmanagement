import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import Body from "./Body/Body";

const Main = () => {
  return (
    <>
      <div className="container-fluid dash">
        <div className="row">
          <div className="col-12 col-md-2 p-0 m-0">
            <Sidebar />
          </div>
          <div className="col-12 col-md-10 p-0 m-0">
            <Navbar />
            <Body />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
