import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { AdminSidePanel } from "./AdminSidePanel";
import { AdminFooter } from "./AdminFooter";
import { AdminNavbar } from "./AdminNavbar";

import { getUsers, deletePendingFoodById } from "../../service/api.js";
import DataTable from "react-data-table-component";

const AdminPendingFood = () => {
  // const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers();
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      try {
        await deletePendingFoodById(id);
        getAllUsers(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting food item:", error);
      }
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
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(row._id)}
        >
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
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

  return (
    <>
      <div className="container-fluid">
        <div className="row admin-bg">
          <div className="col-12 col-md-2 p-0 ">
            <AdminSidePanel />
          </div>
          <div
            className="col-12 col-md-10 p-0 "
            style={{ backgroundColor: "#f5efef" }}
          >
            <AdminNavbar />
            {/* here will show all donated foodlist  */}
            <div className="col-12 mt-3 mb-5">
              <div className="card rounded">
                <div className="card-header">Here the Available Food list</div>
                <div className="card-body">
                  <DataTable
                    columns={columns}
                    data={users}
                    customStyles={customStyles}
                    pagination
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 8, 10]}
                    highlightOnHover
                    className="text-center rounded "
                  />
                </div>
              </div>
            </div>
            <AdminFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPendingFood;
