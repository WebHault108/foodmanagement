//update foodtable.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

//step 5: call deleteUsers here and your work on front end is done. now go to user-controller in backend/ server directory
import { getUsersByMobile, deletePickedUpFood } from "../../service/api.js";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const FoodTable = () => {
  const [users, setUsers] = useState([]);

  // Dependency on donor ensures it fetches when donor.mobile is available

  // step 2: grab the id through event
  const delbtn = async (e) => {
    console.log("Food ID to be moved:", e);
    try {
      const res = await deletePickedUpFood({ id: e });
      if (res.status === 201) {
        alert("Food Picked up Successfully!");
        // Remove the food from the UI after successful deletion from the backend
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== e));
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error("Error while moving food to picked-up list:", error);
      alert("Something went wrong while moving.");
    }
  };

  // fetch donor data
  const [donor, setDonor] = useState(null);
  const navigate = useNavigate();

  // fetch donor details
  useEffect(() => {
    const fetchDonor = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token Not found");
        navigate("/");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Donor data fetched: ", data); // Debugging
          setDonor(data);
        } else {
          alert("Not Authorised");
          localStorage.removeItem("token");
          navigate("/");
        }
      } catch (error) {
        alert("Akdom last ar error");
        console.log(error);
        localStorage.removeItem("token");
        navigate("/");
      }
    };
    fetchDonor();
  }, [navigate]);

  const getAllUsers = async () => {
    if (!donor?.mobile) return;
    try {
      const response = await getUsersByMobile(donor.mobile);
      if (response && response.data) {
        setUsers(response.data);
      } else {
        console.error("Failed to fetch users by mobile.");
      }
    } catch (error) {
      console.error("Error fetching users by mobile:", error);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    if (donor && donor.mobile) {
      getAllUsers();
    }
  }, [donor]);

  return (
    <div className="container-fluid ">
      <div className="row ">
        <div className="col-12 w-100">
          {/* <h2 className="text-center">
            {donor
              ? `Showing data of ${donor.fullname} and mobile: ${donor.mobile}`
              : "Loading donor details..."}
          </h2> */}

          <table className="table table-responsive text-center w-100">
            <thead className="border-top border-light">
              <tr>
                <th>S.no.</th>
                <th>Food Item</th>
                <th>Head Count</th>
                <th>Pickup Date</th>
                <th>Location</th>
                <th>Expire in Days</th>
                <th>Contact Person</th>
                <th>Contact No.</th>
                <th>Pick up Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.fname}</td>
                  <td>{user.fooddesc}</td>
                  <td>{new Date(user.foodpickupdate).toLocaleDateString()}</td>
                  <td>{user.address + " " + user.pin}</td>
                  <td>{user.expiredays}</td>
                  <td>{user.pname}</td>
                  <td>{user.pmobile}</td>
                  <td>
                    {/* step 1: create function delbtn to access the _id property  */}
                    <NavLink
                      to=""
                      onClick={() => {
                        delbtn(`${user._id}`);
                      }}
                    >
                      <IoCheckmarkDoneCircle className="dl" />
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FoodTable;
