import React, { useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Signup = () => {
  // Use state and datas

  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  //handle submit in signup / register
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      alert("Password length should atleast 8");
    } else if (mobile.length !== 10) {
      alert("Please enter 10 digit mobile number");
    } else {
      //pass
      console.log(fullname);
      console.log(mobile);
      console.log(email);
      console.log(password);
    }

    //api part
    //now the api post part
    try {
      //pass
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/reg`,
        {
          // pass
          fullname,
          mobile,
          email,
          password,
        }
      );
      setMessage(data.message);
    } catch (error) {
      console.error("Axios error: (data not sent properly)", error.response);
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
      <form action="#" className="sign-up-form" onSubmit={handleSignupSubmit}>
        <h2 className="title">Donor Sign up</h2>
        <div className="input-field">
          <div className="icon-inp">
            <FaUser className="inp-icon" />
          </div>
          <input
            type="text"
            name="fullname"
            value={fullname}
            placeholder="Full Name"
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="input-field">
          <div className="icon-inp">
            <FaPhone className="inp-icon" />
          </div>
          <input
            type="number"
            name="mobile"
            value={mobile}
            placeholder="Mobile"
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
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
        <input type="submit" className="btns" value="Sign up" />
        <p className="text-center text-success">{message}</p>
        <p className="social-text">Or Sign up with social platforms</p>
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

export default Signup;
