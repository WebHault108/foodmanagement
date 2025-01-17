import React from "react";
import { AdminNavbar } from "./AdminNavbar";
import { AdminSidePanel } from "./AdminSidePanel";

import "./Admin.css";
import AdminBody from "./AdminBody";
import { AdminFooter } from "./AdminFooter";

export const Admin = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row admin-bg">
          <div className="col-12 col-md-2 p-0 ">
            <AdminSidePanel />
          </div>
          <div
            className="col-12 col-md-10 p-0 "
            style={{ backgroundColor: "#f5efef" }}
          >
            <AdminNavbar />
            <AdminBody />
            <AdminFooter />
          </div>
        </div>
      </div>
    </>
  );
};
