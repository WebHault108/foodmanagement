import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./AdminLogin.css";
import axios from "axios";

// import ButtonGrn from "../Buttons/ButtonGrn";

const AdminLogin = () => {
  const navigate = useNavigate();

  // const pageNavtoSignup = () => {
  //   navigate("/adminsignup");
  // };

  //login system start

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  //now the main part to handel the submitted form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/adminlogin`,
        {
          email,
          password,
        }
      );
      setMessage(data.message);
      localStorage.setItem("token", data.token);
      navigate("/admin");
    } catch (error) {
      setMessage(
        error.response?.status === 401
          ? "Invalid username or password"
          : error.response?.data?.error || "Something went wrong"
      );
    }
  };

  return (
    <>
      <div className="donor-full">
        <div className="donor-container log">
          <p className="pagelink ">
            {" "}
            <NavLink to="/">Home</NavLink> /Login
          </p>
          <div className="container-fluid">
            <div className="row justify-content-center mt-4">
              <div className="col-12 col-md-8 col-lg-6 donor-sign-in justify-content-center align-items-center form-out">
                <h2 className="text-center font-weight-normal text-capitalize text-white mb-5">
                  admin login{" "}
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
                    value="Login Now"
                    className="inp lg d-btn"
                    // onClick={() => pageNavtoLogin()}
                  />
                  {/* <input
                    type="button"
                    value="Signup"
                    className="inp d-btn"
                    onClick={() => pageNavtoSignup()}
                  /> */}
                </form>
                {message && (
                  <p className="text-center mt-3 text-danger">{message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
