import React from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { GoBellFill } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
export const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/"); // Redirect to login page
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row bg-white " style={{ height: "8vh" }}>
          <div className="col-12 d-flex align-items-center  justify-content-between ">
            <div className="float-left">
              <div className="search-bar d-flex align-items-center">
                <IoSearchOutline className="mr-1" />
                <input
                  type="text"
                  name="Search"
                  id="search-inp"
                  placeholder="Search..."
                  className=""
                />
              </div>
            </div>
            <div className="external-links float-right">
              <a
                className="rounded pd light-gray-bg text-center ml-3"
                style={{ backgroundColor: "#ECEBDE", cursor: "pointer" }}
              >
                <GoBellFill style={{ color: "#A59D84" }} />
              </a>
              <a
                to=""
                className="rounded pd light-gray-bg text-center ml-3"
                style={{ backgroundColor: "#ECEBDE", cursor: "pointer" }}
              >
                <FaUser style={{ color: "#A59D84" }} />
              </a>

              <a
                className="rounded pd light-gray-bg text-center ml-3"
                style={{ backgroundColor: "#ECEBDE", cursor: "pointer" }}
                onClick={handleLogout}
              >
                <IoMdLogOut style={{ color: "#A59D84" }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
