import React from "react";

import DonorHeader from "../DonorHeader/DonorHeader";
import { DonorBodyHeading } from "../DonorBodyHeading/DonorBodyHeading";
import FoodTable from "../../FoodTable/FoodTable";

export const ViewFoodList = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 sh py-3">
            <DonorHeader />
          </div>
        </div>
        <div className="row bodybg py-2 d-flex justify-content-center pb-5 align-items-center">
          <DonorBodyHeading pagename="View Your Food List" />
          <div className="card rounded mx-4 my-3">
            <div className="card-header">Available Food</div>
            <div className="card-body d-flex align-items-center justify-content-center p-0">
              <div className="col-12 text-center mb-3 d-flex align-items-center justify-content-center">
                <FoodTable />
              </div>
            </div>
          </div>
          {/* <FoodTable /> */}
        </div>
      </div>
    </>
  );
};
