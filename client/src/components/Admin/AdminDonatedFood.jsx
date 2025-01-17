import React, { useState, useEffect } from "react";
import { AdminSidePanel } from "./AdminSidePanel";
import { AdminFooter } from "./AdminFooter";
import { AdminNavbar } from "./AdminNavbar";

import { getPickedFoods, deletePickedFoodById } from "../../service/api.js";
import DataTable from "react-data-table-component";
// import { FaTrash } from "react-icons/fa"; // Trash icon

const AdminDonatedFood = () => {
  const [pickedFood, setPickedFood] = useState([]);

  useEffect(() => {
    fetchAllPickedFood();
  }, []);

  const fetchAllPickedFood = async () => {
    try {
      const response = await getPickedFoods();
      if (response && response.data) {
        setPickedFood(response.data);
      } else {
        console.error("No data found for picked food.");
      }
    } catch (error) {
      console.error("Error fetching picked food list:", error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      try {
        await deletePickedFoodById(id);
        fetchAllPickedFood(); // Refresh the list after deletion
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
    rows: { style: { color: "var(--clr-light-gray)", textAlign: "center" } },
    headCells: {
      style: {
        backgroundColor: "var(--clr-blue-bg)",
        color: "#dbdbdb",
        fontWeight: "bold",
        textAlign: "center",
      },
    },
    cells: {
      style: {
        color: "var(--clr-gray)",
        textAlign: "center",
        whiteSpace: "normal",
        wordWrap: "break-word",
        padding: "5px",
      },
    },
  };

  return (
    <div className="container-fluid">
      <div className="row admin-bg">
        <div className="col-12 col-md-2 p-0">
          <AdminSidePanel />
        </div>
        <div
          className="col-12 col-md-10 p-0 mh-100 d-block"
          style={{ backgroundColor: "#f5efef" }}
        >
          <AdminNavbar />
          <div className="col-12 mt-3 mb-5">
            <div className="card rounded">
              <div className="card-header">Here's the List of Donated Food</div>
              <div className="card-body">
                <DataTable
                  columns={columns}
                  data={pickedFood}
                  customStyles={customStyles}
                  pagination
                  paginationPerPage={3}
                  paginationRowsPerPageOptions={[3, 5, 8, 10]}
                  highlightOnHover
                  className="text-center rounded"
                />
              </div>
            </div>
          </div>
          <AdminFooter />
        </div>
      </div>
    </div>
  );
};

export default AdminDonatedFood;
