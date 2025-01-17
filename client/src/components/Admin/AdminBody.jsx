import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSections from "./AdminSections";
import { MdDateRange } from "react-icons/md";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import DataTable from "react-data-table-component";
import { getUsers, getPickedFoods } from "../../service/api.js";
import adminright from "../../images/admin-right.png";

const AdminBody = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers();
  }, []);

  const [pickedfood, setPickedFood] = useState([]);
  useEffect(() => {
    getAllPickedFood();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await getUsers();
      if (response && response.data) {
        setUsers(response.data); // Load data into state
      } else {
        console.error("No data found in response");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getAllPickedFood = async () => {
    try {
      const respose = await getPickedFoods();
      if (respose && respose.data) {
        setPickedFood(respose.data); //load pickedfood into state
      } else {
        console.error("No Data found in PickedUp food");
      }
    } catch (error) {
      console.error("Error fetching pickedup food list");
    }
  };

  const columns = [
    {
      name: "S.No.",
      selector: (_, index) => index + 1,
      sortable: true,
      center: true,
    },
    {
      name: "Food Item",
      selector: (row) => row.fname,
      sortable: true,
      wrap: true,
    },
    {
      name: "Head Count",
      selector: (row) => row.fooddesc,
      sortable: true,
      center: true,
    },
    {
      name: "Pickup Date",
      selector: (row) => new Date(row.foodpickupdate).toLocaleDateString(),
      sortable: true,
      center: true,
    },
    {
      name: "Location",
      selector: (row) => `${row.address}, ${row.pin}`,
      sortable: true,
      wrap: true,
    },
    {
      name: "Expire in Days",
      selector: (row) => row.expiredays,
      sortable: true,
      center: true,
    },
    {
      name: "Contact Person",
      selector: (row) => row.pname,
      wrap: true,
    },
    {
      name: "Contact No.",
      selector: (row) => row.pmobile,
      center: true,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        // backgroundColor: "var(--clr-dark-gray)", // Dark gray rows
        color: "var(--clr-light-gray)",
        textAlign: "center", // Align row text to center
      },
    },
    headCells: {
      style: {
        backgroundColor: "var(--clr-blue-bg)", // Dark blue header
        color: "#dbdbdb", // White text
        fontWeight: "bold",
        textAlign: "center", // Align headers to center
      },
    },
    cells: {
      style: {
        color: "var(--clr-gray)", // Gray text for cells
        textAlign: "center", // Align cells to center
        whiteSpace: "normal", // Allow text wrapping
        wordWrap: "break-word", // Break text if too long
        padding: "5px",
      },
    },
  };

  // step 2: grab the id through event

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-11 dark-green-bg m-4 px-4 py-3 d-flex align-items-center justify-content-between"
            style={{ borderRadius: "15px" }}
          >
            <div className="float-left">
              <h1 className="font-weight-normal text-light ">
                Transform Food Waste into Smiles
              </h1>
              <p className="mb-1 text-white">
                Innovative solutions to connect donors and recipients
                efficiently
              </p>

              <button
                className="btn btn-light px-3 py-1  mt-3 font-weight-bold"
                style={{
                  color: "#f65a11",
                  fontSize: "0.8rem",
                  borderRadius: "5px",
                }}
                onClick={() => {
                  navigate("/");
                }}
              >
                Learn More <FaArrowUpRightFromSquare className="ml-1" />
              </button>
            </div>
            <div className="float-right">
              <img
                src={adminright}
                alt="adminrightImage"
                className="adminrightimg"
              />
            </div>
          </div>

          <div className="col-12 px-3 m-0">
            <div className="top-part d-flex justify-content-between align-items-center">
              <h5 className="font-weight-normal">Orders</h5>

              <div className="buttonss">
                <button className="btn btn-light brr ml-3 px-3 py-1 sm text-dark font-weight-bold">
                  Export
                </button>
                <button className="btn btn-light brr ml-3 px-3 py-1 sm text-dark font-weight-bold">
                  More actions
                </button>
                <button
                  className="btn brr ml-3 px-3 py-1 sm text-white font-weight-bold"
                  style={{ backgroundColor: "#f65a11" }}
                  onClick={() => {
                    navigate("/all-donors");
                  }}
                >
                  Manage Donors
                </button>
              </div>
            </div>
          </div>

          <div className="col-11 px-3 d-flex align-items-center bg-white py-2 m-4 justify-content-around brr">
            <div className="day font-weight-bold">
              <span style={{ fontSize: "1rem" }} className="pr-3">
                <MdDateRange /> This Year
              </span>
            </div>
            <AdminSections
              title="Total Listed Food"
              num={pickedfood.length + users.length}
            />
            {/* here i want to display the row count from getallusers   */}
            <AdminSections title="Available Food till now" num={users.length} />
            {/* here i want to display the row count from getAllPickedFood   */}
            <AdminSections title="Total Donated Food" num={pickedfood.length} />
          </div>
          {/* desc of all pending food  */}
          <div className="col-11  mx-4">
            <DataTable
              columns={columns}
              data={users}
              customStyles={customStyles}
              pagination
              paginationPerPage={3}
              paginationRowsPerPageOptions={[3, 5, 8, 10]}
              highlightOnHover
              className="text-center rounded "
            />
          </div>

          {/* desc of all donated food  */}
          {/* <div className="col-11  mx-4 mt-4">
            <DataTable
              columns={columns}
              data={pickedfood}
              customStyles={customStyles}
              pagination
              highlightOnHover
              className="text-center rounded "
            />
          </div> */}
        </div>
      </div>
    </>
  );
};
export default AdminBody;
