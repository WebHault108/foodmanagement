import React, { useEffect } from "react";

import "./JoinUs.css";

import login1 from "../../images/login/login1.svg";
import login2 from "../../images/login/login2.svg";

import Login from "./Login";
import Signup from "./Signup";

const JoinUs = () => {
  //navigation

  // useeffect add
  useEffect(() => {
    const signInBtn = document.querySelector("#sign-in-btn");
    const signUpBtn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".containerr");

    signUpBtn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });

    signInBtn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });

    // Clean up event listeners when component unmounts
    return () => {
      signUpBtn.removeEventListener("click", () => {
        container.classList.add("sign-up-mode");
      });

      signInBtn.removeEventListener("click", () => {
        container.classList.remove("sign-up-mode");
      });
    };
  }, []);

  return (
    <div className="join-us-container">
      <div className="section-title">
        <p>Hey ! Join Us Now as a Donor</p>
      </div>
      <div className="containerr">
        <div className="forms-container">
          <div className="signin-signup">
            <Login />
            <Signup />
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Join Our Mission?</h3>
              <p>
                Sign up today to support our mission, uplift communities, and
                bring hope.
              </p>
              <button className="btns transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>
            <img src={login2} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Already with us ?</h3>
              <p>
                Sign in to track your contributions and stay updated on new
                initiatives.
              </p>
              <button className="btns transparent" id="sign-in-btn">
                Sign in
              </button>
            </div>
            <img src={login1} className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
