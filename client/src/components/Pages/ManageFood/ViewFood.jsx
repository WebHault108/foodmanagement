import React from "react";
// import FoodList from "../../FoodList/FoodList";
// import Food from "../../FoodList/Food";
import Sidebar from "../../Sidebar/Sidebar";
import Navbar from "../../Navbar/Navbar";
import FoodTable from "../../FoodTable/FoodTable";

const ViewFood = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-2 p-0 m-0">
            <Sidebar />
          </div>
          <div className="col-12 col-md-10 p-0 m-0">
            <Navbar />
            <FoodTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewFood;
