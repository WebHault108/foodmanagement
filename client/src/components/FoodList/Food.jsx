import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getUsers } from "../../service/api.js";
import "./FoodList.css";

const Food = () => {
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
        backgroundColor: "var(--clr-dark-gray)", // Dark gray rows
        color: "var(--clr-light-gray)",
        textAlign: "center", // Align row text to center
      },
    },
    headCells: {
      style: {
        backgroundColor: "var(--clr-blue-bg)", // Dark blue header
        color: "var(--clr-heading)", // White text
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
    <div className="dark-bg">
      <h1 className="food-list-title pb-0">Available Food Inventory</h1>
      <div className="table-container pb-0">
        <DataTable
          columns={columns}
          data={users}
          customStyles={customStyles}
          pagination
          highlightOnHover
          paginationPerPage={5}
          paginationRowsPerPageOptions={[3, 5, 8, 10]}
          className="text-center"
        />
      </div>
    </div>
  );
};

export default Food;
