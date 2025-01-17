import React from "react";
import DataTable from "react-data-table-component";

import "./FoodList.css";
import Food from "./Food";

const FoodList = () => {
  return (
    <>
      <div className="food-list-container">
        <div className="section-title">
          <p>Check Out the available Food List !</p>
        </div>
        {/* <div className="list-container">
          <h1 className="food-list-title">Available Food</h1>
          <div className="table-wrapper">
            <DataTable
              columns={columns}
              data={data}
              className="data-table-bg"
              customStyles={customStyles}
            />
          </div>
        </div> */}

        <Food />
      </div>
    </>
  );
};
export default FoodList;
