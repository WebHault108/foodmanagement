import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";

import { CiLogout } from "react-icons/ci";

// import ButtonGrn from "../Buttons/ButtonGrn";

const AdminSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/adminreg`,
        {
          email,
          password,
        }
      );
      setMessage(data.message);
    } catch (error) {
      console.error("Axios Error:", error.response);
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };
  return (
    <>
      <div className="donor-full">
        <div className="donor-container log">
          <p className="pagelink ">
            <span>
              <NavLink to="/">Home</NavLink> /Signup
            </span>

            <span className="float-right mr-4">
              <NavLink to="/adminlogin">
                <CiLogout /> Login
              </NavLink>
            </span>
          </p>
          <div className="container-fluid">
            <div className="row justify-content-center mt-4 ps">
              <div className="col-12 col-md-8 col-lg-6 donor-sign-in justify-content-center align-items-center form-out">
                <h2 className="text-center font-weight-normal text-capitalize text-white mb-5">
                  admin signup{" "}
                </h2>
                <form
                  action=""
                  className="donor-form align-items-stretch"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="inp"
                    placeholder="Enter EmailId"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    name="pass"
                    id="pass"
                    className="inp"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <input
                    type="submit"
                    value="Signup"
                    className="inp lg d-btn"
                    // onClick={pageNavtoLogin}
                  />

                  <p className="text-center text-success">{message}</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSignup;
