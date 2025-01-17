import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  //handle login submit data
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      //api declaration
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`,
        {
          email,
          password,
        }
      );
      setMessage(data.message);
      localStorage.setItem("token", data.token);
      navigate("/main");
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
      <form action="#" className="sign-in-form" onSubmit={handleLoginSubmit}>
        <h2 className="title">Donor Sign in</h2>
        <div className="input-field">
          <div className="icon-inp">
            <FaEnvelope className="inp-icon" />
          </div>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <div className="icon-inp">
            <FaLock className="inp-icon" />
          </div>
          <input
            type="password"
            name="pass"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Login" className="btns solid" />
        {message && <p className="text-center mt-3 text-danger">{message}</p>}
        <p className="social-text">Or Sign in with social platforms</p>
        <div className="social-media">
          <a href="#" className="social-icon">
            <FaFacebookF />
          </a>
          <a href="#" className="social-icon">
            <FaXTwitter />
          </a>
          <a href="#" className="social-icon">
            <FaGoogle />
          </a>
          <a href="#" className="social-icon">
            <FaLinkedinIn />
          </a>
        </div>
      </form>
    </>
  );
};

export default Login;
