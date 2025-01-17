import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./DonorHeader.css";

import { FaRegBell } from "react-icons/fa6";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import profile from "../../../images/profile.png";

import { AiFillDashboard } from "react-icons/ai";
import { MdManageSearch } from "react-icons/md";
import { MdOutlineAddChart } from "react-icons/md";

const DonorHeader = () => {
  const navigate = useNavigate();
  const [isAccountVisible, setAccountVisible] = useState(false); // State to manage visibility

  const toggleAccountVisibility = () => {
    setAccountVisible((prevState) => !prevState); // Toggle the visibility
  };

  const [donor, setDonor] = useState(null);

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

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/"); // Redirect to login page
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2 sh2 border-bottom pb-4">
          <div className="left col-12 col-md-4 d-flex align-items-center">
            <div className="donor-contact">
              {donor ? (
                <>
                  <p className="mobile mb-0">Mob. & Whatsapp: {donor.mobile}</p>
                  <p className="email mb-0">Email: {donor.email}</p>
                </>
              ) : (
                <p className="text-warning">Loading Donor Contact...</p>
              )}
            </div>
          </div>
          <div className="middle col-12 col-md-4 d-flex align-items-center">
            <h2 className="text-uppercase font-weight-bold">
              annapurna-donor dashboard
            </h2>
          </div>
          <div className="right col-12 col-md-4 d-flex align-items-center">
            <div className="search-tab border border-dark px-4">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search.."
                className="text-left px-3 border-0 form-control shadow-none"
              />
            </div>
            <div className="header-icons ml-4 d-flex align-items-center">
              <FaRegBell className="mr-3" />
              <FaRegEnvelopeOpen className="mr-3" />
              <img
                src={profile}
                alt="profileImage"
                className="profile rounded-circle"
                onClick={toggleAccountVisibility} // Toggle visibility on click
              />
              {isAccountVisible && ( // Conditional rendering of account div
                <div className="account">
                  <div className="logout-design" onClick={handleLogout}>
                    <CiLogout /> Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-center pt-2">
            <div className="col-12 col-md-8 mt-1 men">
              <NavLink
                to="/main"
                className="pages d-flex align-items-center brdr "
              >
                <AiFillDashboard /> <span className="ml-1">Dashboard</span>
              </NavLink>
              <NavLink
                to="/addfood"
                className="pages d-flex align-items-center brdr"
              >
                <MdOutlineAddChart /> <span className="ml-1">Donate Food</span>
              </NavLink>
              <NavLink
                to="/viewfood"
                className="pages d-flex align-items-center brdr"
              >
                <MdManageSearch /> <span className="ml-1 ">View Food List</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonorHeader;
