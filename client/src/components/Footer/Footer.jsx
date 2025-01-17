import React from "react";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router-dom";

import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="footer-containerr pt-5">
        <div className="footerr">
          <div className="top-part">
            <div className="top-left">
              <Logo />
              <p className="text">
                Waste Less, Feed More, Together, We Can Make a Difference
              </p>
            </div>
            <div className="top-right">
              <div className="links-grid">
                <div className="donate">
                  <div className="links-title">Donate</div>
                  <div className="donate-links">
                    <NavLink to="/">Education</NavLink>
                    <NavLink to="/">Social</NavLink>
                    <NavLink to="/">Medicine</NavLink>
                    <NavLink to="/">Food</NavLink>
                  </div>
                </div>
                <div className="help">
                  <div className="links-title">Help</div>
                  <div className="donate-links">
                    <NavLink to="/">FAQ</NavLink>
                    <NavLink to="/">PrivacyPolicy</NavLink>
                    <NavLink to="/">Accessibility</NavLink>
                    <NavLink to="/">ContactUS</NavLink>
                  </div>
                </div>
                <div className="Company">
                  <div className="links-title">Company</div>
                  <div className="donate-links">
                    <NavLink to="/">AboutUs</NavLink>
                    <NavLink to="/">Careers</NavLink>
                    <NavLink to="/">Services</NavLink>
                    <NavLink to="/">Pricing</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="bottom-part">
            <div className="bottom-left">
              <p className="copyright">
                @AnnapurnaInc. {year} All Rights Reserved.
              </p>
            </div>
            <div className="bottom-right">
              <div className="social-links">
                <a href="#">
                  <div className="social">
                    <FaInstagram />
                    <div className="s-text">Instagram</div>
                  </div>
                </a>

                <a href="https://www.facebook.com/profile.php?id=100022242964905">
                  <div className="social">
                    <FaFacebook />
                    <div className="s-text">Facebook</div>
                  </div>
                </a>

                <a href="#">
                  <div className="social">
                    <FaXTwitter />
                    <div className="s-text">Twitter</div>
                  </div>
                </a>

                <a href="#">
                  <div className="social">
                    <FaLinkedin />
                    <div className="s-text">Linkedin</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
