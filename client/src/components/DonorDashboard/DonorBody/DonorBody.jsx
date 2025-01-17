import React, { useState, useEffect, useCallback } from "react";
import "./DonorBody.css";
import profile from "../../../images/profile.png";
import donorInfoImg from "../../../images/donor2.jpg";
import BodyCard from "../DonorBodyCard/BodyCard";
import Chart from "../Charts/Chart";
import { LineGraph } from "../Charts/LineGraph";
import { Dounut } from "../Charts/Dounut";
import { BarGraph } from "../Charts/BarGraph";

import { GrStatusGoodSmall } from "react-icons/gr";
import { DonorBodyHeading } from "../DonorBodyHeading/DonorBodyHeading";
import {
  getUsersByMobile,
  getPickedupFoodByMobile,
} from "../../../service/api.js";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const DonorBody = (props) => {
  const [users, setUsers] = useState([]); // Pending food
  const [donor, setDonor] = useState(null); // Donor details
  const [pickedUpFoods, setPickedUpFoods] = useState([]); // Donated food
  const navigate = useNavigate();

  // Fetch donor details
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
        console.error("Error fetching donor details:", error);
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchDonor();
  }, [navigate]);

  // Fetch all users based on donor's mobile
  const getAllUsers = useCallback(async () => {
    if (!donor?.mobile) return;
    try {
      const response = await getUsersByMobile(donor.mobile);
      if (response?.data) {
        setUsers(response.data);
      } else {
        console.error("Failed to fetch users by mobile.");
      }
    } catch (error) {
      console.error("Error fetching users by mobile:", error);
    }
  }, [donor?.mobile]);

  // Fetch picked-up food based on donor's mobile
  const getPickedUpFoods = useCallback(async () => {
    if (!donor?.mobile) return;
    try {
      const response = await getPickedupFoodByMobile(donor.mobile);
      if (response?.data) {
        setPickedUpFoods(response.data);
      } else {
        console.error("Failed to fetch picked-up food by mobile.");
      }
    } catch (error) {
      console.error("Error fetching picked-up food by mobile:", error);
    }
  }, [donor?.mobile]);

  // Fetch picked-up foods when donor data is available
  useEffect(() => {
    if (donor?.mobile) {
      getPickedUpFoods();
    }
  }, [donor, getPickedUpFoods]);

  // Fetch users on component mount
  useEffect(() => {
    if (donor?.mobile) {
      getAllUsers();
    }
  }, [donor, getAllUsers]);

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <DonorBodyHeading pagename={"Analysis"} />
        </div>

        <div className="row card-top mt-3 mb-1 ">
          <div className="col-12 col-md-8 mb-3">
            <div className="card">
              <div className="card-body d-flex justify-content-between px-4 ">
                <div className="card-left py-1">
                  <div className="card-left-top">
                    <div className="donor-info d-flex align-items-center">
                      <img
                        src={profile}
                        alt="profileImage"
                        className="profile rounded-circle"
                        style={{ height: "40px", width: "40px" }}
                      />
                      <div className="donor-content text-left ml-2">
                        <span className="mb-0">Welcome,</span>
                        <h3 className="donor-name font-weight-normal">
                          {props.donorname}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="left-bottom mt-1">
                    <p className="ff text-left text-capitalize">
                      status:{" "}
                      <span className="text-lowercase font-weight-bold text-success d-inline-flex align-items-center">
                        active{" "}
                        <GrStatusGoodSmall className="bg-success rounded-circle ml-1 sm blink" />
                      </span>
                    </p>
                  </div>
                </div>
                <div className="card-right">
                  <img
                    src={donorInfoImg}
                    alt="donor-info-img"
                    className="donor-info-img"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-2 mb-3">
            <BodyCard
              num={users.length}
              title={"Pending Food"}
              fnum={`[ ${users.length} ]`}
              chartType={<Dounut />}
              desc={"more food delivered from last month"}
            />
          </div>
          <div className="col-12 col-md-2 mb-3">
            <BodyCard
              num={pickedUpFoods.length}
              title={"Donated Food"}
              chartType={<BarGraph />}
            />
          </div>
        </div>

        <div className="row card-bottom mb-4">
          <div className="col-12 col-md-6">
            <Chart chartType={<LineGraph />} />
          </div>
          <div className="col-12 col-md-6">
            <div className="card">
              <div className="card-header">Available food</div>
              <div className="card-body">
                <table className="table table-sm table-striped">
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Food Item</th>
                      <th>Head Count</th>
                      <th>Expire in (Days)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.fname}</td>
                        <td>{user.fooddesc}</td>
                        <td>{user.expiredays}</td>
                        <td>
                          <button
                            className="btn btn-info btn-sm"
                            onClick={() => navigate(`/viewfood`)}
                          >
                            <IoEye /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonorBody;
