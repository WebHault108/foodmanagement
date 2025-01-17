// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DataTable from "react-data-table-component";
// import { FaTrash } from "react-icons/fa"; // Trash icon for delete
// import { AdminSidePanel } from "./AdminSidePanel";
// import { AdminNavbar } from "./AdminNavbar";
// import { AdminFooter } from "./AdminFooter";

// const AllDonors = () => {
//   const [donors, setDonors] = useState([]);
//   const navigate = useNavigate();

//   // Fetch all donors
//   useEffect(() => {
//     const fetchDonors = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/api/donors");
//         if (response.ok) {
//           const data = await response.json();
//           setDonors(data);
//         } else {
//           throw new Error("Failed to fetch donors");
//         }
//       } catch (error) {
//         console.error("Error fetching donors: ", error);
//         navigate("/");
//       }
//     };

//     fetchDonors();
//   }, [navigate]);

//   // Delete a donor
//   const deleteDonor = async (id) => {
//     if (window.confirm("Are you sure you want to delete this donor?")) {
//       try {
//         const response = await fetch(`http://localhost:8000/api/donors/${id}`, {
//           method: "DELETE",
//         });

//         if (response.ok) {
//           setDonors(donors.filter((donor) => donor._id !== id)); // Update state
//           alert("Donor deleted successfully");
//         } else {
//           throw new Error("Failed to delete donor");
//         }
//       } catch (error) {
//         console.error("Error deleting donor: ", error);
//         alert("Could not delete donor");
//       }
//     }
//   };

//   // Define columns for DataTable
//   const columns = [
//     {
//       name: "#",
//       cell: (row, index) => index + 1,
//       width: "50px",
//     },
//     {
//       name: "Full Name",
//       selector: (row) => row.fullname,
//       sortable: true,
//     },
//     {
//       name: "Mobile",
//       selector: (row) => row.mobile,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row) => row.email,
//       sortable: true,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <button
//           onClick={() => deleteDonor(row._id)}
//           className="btn btn-danger btn-sm"
//         >
//           <FaTrash /> {/* Trash Icon */}
//         </button>
//       ),
//       width: "100px",
//     },
//   ];

//   const customStyles = {
//     rows: {
//       style: {
//         // backgroundColor: "var(--clr-dark-gray)", // Dark gray rows
//         color: "var(--clr-light-gray)",
//         textAlign: "center", // Align row text to center
//       },
//     },
//     headCells: {
//       style: {
//         backgroundColor: "var(--clr-blue-bg)", // Dark blue header
//         color: "#dbdbdb", // White text
//         fontWeight: "bold",
//         textAlign: "center", // Align headers to center
//       },
//     },
//     cells: {
//       style: {
//         color: "var(--clr-gray)", // Gray text for cells
//         textAlign: "center", // Align cells to center
//         whiteSpace: "normal", // Allow text wrapping
//         wordWrap: "break-word", // Break text if too long
//         padding: "5px",
//       },
//     },
//   };

//   return (
//     <div className="container-fluid" style={{ backgroundColor: "#f5efef" }}>
//       <div className="row admin-bg">
//         <div className="col-12 col-md-2 p-0">
//           <AdminSidePanel />
//         </div>
//         <div
//           className="col-12 col-md-10 p-0"
//           style={{ backgroundColor: "#f5efef" }}
//         >
//           <AdminNavbar />
//           <div className="all-donors-list">
//             <div className="card rounded mx-3 my-3">
//               <div className="card-header">Manage Donors</div>
//               <div className="card-body">
//                 <DataTable
//                   columns={columns}
//                   data={donors}
//                   customStyles={customStyles}
//                   pagination
//                   highlightOnHover
//                   striped
//                   responsive
//                   noDataComponent="No donors found"
//                   className="text-center rounded"
//                 />
//               </div>
//             </div>
//           </div>
//           <AdminFooter />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllDonors;

//updated with search
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaTrash } from "react-icons/fa"; // Trash icon for delete
import { AdminSidePanel } from "./AdminSidePanel";
import { AdminNavbar } from "./AdminNavbar";
import { AdminFooter } from "./AdminFooter";

const AllDonors = () => {
  const [donors, setDonors] = useState([]); // Original donor list
  const [filteredDonors, setFilteredDonors] = useState([]); // Filtered list for the table
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const navigate = useNavigate();

  // Fetch all donors
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/donors`
        );
        if (response.ok) {
          const data = await response.json();
          setDonors(data);
          setFilteredDonors(data); // Initialize filtered list
        } else {
          throw new Error("Failed to fetch donors");
        }
      } catch (error) {
        console.error("Error fetching donors: ", error);
        navigate("/");
      }
    };

    fetchDonors();
  }, [navigate]);

  // Delete a donor
  const deleteDonor = async (id) => {
    if (window.confirm("Are you sure you want to delete this donor?")) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/donors/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          const updatedDonors = donors.filter((donor) => donor._id !== id);
          setDonors(updatedDonors);
          setFilteredDonors(updatedDonors);
          alert("Donor deleted successfully");
        } else {
          throw new Error("Failed to delete donor");
        }
      } catch (error) {
        console.error("Error deleting donor: ", error);
        alert("Could not delete donor");
      }
    }
  };

  // Handle search input changes
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter donors by fullname
    const filtered = donors.filter((donor) =>
      donor.fullname.toLowerCase().includes(query)
    );
    setFilteredDonors(filtered);
  };

  // Define columns for DataTable
  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1,
      width: "50px",
      center: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.fullname,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      center: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => deleteDonor(row._id)}
          className="btn btn-danger btn-sm"
        >
          <FaTrash /> {/* Trash Icon */}
        </button>
      ),
      width: "100px",
      center: true,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        color: "var(--clr-light-gray)",
        textAlign: "center",
      },
    },
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
    <div className="container-fluid" style={{ backgroundColor: "#f5efef" }}>
      <div className="row admin-bg">
        <div className="col-12 col-md-2 p-0">
          <AdminSidePanel />
        </div>
        <div
          className="col-12 col-md-10 p-0"
          style={{ backgroundColor: "#f5efef" }}
        >
          <AdminNavbar />
          <div className="all-donors-list">
            <div className="card rounded mx-3 my-3">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span>Manage Donors</span>
                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="form-control w-25"
                  style={{ borderRadius: "25px" }}
                />
              </div>
              <div className="card-body">
                <DataTable
                  columns={columns}
                  data={filteredDonors} // Use filtered donors for display
                  customStyles={customStyles}
                  pagination
                  highlightOnHover
                  striped
                  responsive
                  paginationPerPage={5}
                  paginationRowsPerPageOptions={[5, 8, 10]}
                  noDataComponent="No donors found"
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

export default AllDonors;
