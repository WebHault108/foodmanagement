import React, { useState } from "react";
//component
import Sidebar from "../../Sidebar/Sidebar";
import Navbar from "../../Navbar/Navbar";

import "./AddFood.css";

import Swal from "sweetalert2";
import { addFoodInfo } from "../../../service/api";

const AddFood = () => {
  const [foodInfo, setFoodInfo] = useState({
    fname: "",
    fooddesc: "",
    foodpickupdate: "",
    address: "",
    pin: "",
    expiredays: "",
    pname: "",
    pmobile: "",
    image: "",
  });

  const onValueChange = (e) => {
    setFoodInfo({ ...foodInfo, [e.target.name]: e.target.value });
    // console.log(foodInfo);
  };

  const fileData = (e) => {
    setFoodInfo({ ...foodInfo, image: e.target.files[0] });
  };

  const submitData = async (e) => {
    e.preventDefault();
    //pass

    if (!foodInfo.image) {
      alert("Please Upload the image");
    } else if (!foodInfo.pname) {
      alert("Please mention Contact Person name");
    } else {
      const formData = new FormData();
      formData.append("image", foodInfo.image, foodInfo.image.name); // Updated key

      formData.append("fname", foodInfo.fname);
      formData.append("fooddesc", foodInfo.fooddesc);
      formData.append("foodpickupdate", foodInfo.foodpickupdate);
      formData.append("address", foodInfo.address);
      formData.append("pin", foodInfo.pin);
      formData.append("expiredays", foodInfo.expiredays);
      formData.append("pname", foodInfo.pname);
      formData.append("pmobile", foodInfo.pmobile);

      const res = await addFoodInfo(formData);
      if (res.status === 201) {
        console.log(foodInfo);

        Swal.fire({
          title: "Food Item Added Successfully!",
          text: res.data,
          icon: "success",
        });
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-2 p-0 m-0">
            <Sidebar />
          </div>
          <div className="col-12 col-md-10 p-0 m-0">
            <Navbar />
            <div className="container-fluid">
              <div className="row p-2">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between">
                      <span>Add Food Information</span>
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="row">
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor="fname">
                                Food Item <span className="req">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="fname"
                                onChange={onValueChange}
                                name="fname"
                                placeholder="Enter Food Item"
                              />
                            </div>
                          </div>

                          <div className="col-12 col-md-2">
                            <div className="form-group">
                              <label htmlFor="fooddesc">
                                HeadCount <span className="req">*</span>
                              </label>
                              <input
                                className="form-control"
                                id="fooddesc"
                                onChange={onValueChange}
                                name="fooddesc"
                                type="number"
                                placeholder="Enter Food Capacity as headCount"
                              ></input>
                            </div>
                          </div>
                          <div className="col-12 col-md-4">
                            <div className="form-group">
                              <label htmlFor="foodpickupdate">
                                Pickup Date <span className="req">*</span>
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="foodpickupdate"
                                onChange={onValueChange}
                                name="foodpickupdate"
                                placeholder="Enter Food Item"
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor="address">
                                Pickup Address <span className="req">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="address"
                                onChange={onValueChange}
                                name="address"
                                placeholder="Enter Pickup Address"
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-3">
                            <div className="form-group">
                              <label htmlFor="pin">
                                Area pin code <span className="req">*</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="pin"
                                onChange={onValueChange}
                                name="pin"
                                placeholder="Enter PIN CODE"
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-4">
                            <div className="form-group">
                              <label htmlFor="expiredays">
                                Expire with in (Days){" "}
                                <span className="req">*</span>
                              </label>
                              <select
                                className="form-control px-3"
                                id="expiredays"
                                onChange={onValueChange}
                                name="expiredays"
                              >
                                <option>Select Days for Expire</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor="pname">Contact Person Name</label>
                              <input
                                type="text"
                                className="form-control"
                                id="pname"
                                onChange={onValueChange}
                                name="pname"
                                placeholder="Enter Contact Person Name"
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-4">
                            <div className="form-group">
                              <label htmlFor="pmobile">
                                Contact Number <span className="req">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="pmobile"
                                onChange={onValueChange}
                                name="pmobile"
                                placeholder="Enter Contact Number"
                              />
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor="image">
                                Food Image <span className="req">*</span>
                              </label>
                              <input
                                type="file"
                                className="form-control-file"
                                id="image"
                                onChange={fileData}
                                name="image"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <button
                              type="submit"
                              className="btn btn-primary float-right"
                              onClick={submitData}
                            >
                              ADD
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFood;
