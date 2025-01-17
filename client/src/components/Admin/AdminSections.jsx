import React from "react";

const AdminSections = (props) => {
  return (
    <>
      <div
        className="section  py-1 pl-5 brs font-weight-bold"
        style={{ fontSize: "0.8rem" }}
      >
        <p className="mb-0 text-light-gray font-weight-bold">{props.title}</p>
        <span className="text-dark ">{props.num}</span>
      </div>
    </>
  );
};

export default AdminSections;
