import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DonorHeader from "./DonorHeader/DonorHeader";
import DonorBody from "./DonorBody/DonorBody";
import "./DonorDashboard.css";

const DonorDashboard = () => {
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

  return (
    <>
      {donor ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 sh py-3">
              <DonorHeader />
            </div>
          </div>
          <div className="row bodybg">
            <div className="col-12">
              <DonorBody donorname={`${donor.fullname}`} />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-warning">Loading user Details </p>
      )}
    </>
  );
};

export default DonorDashboard;
