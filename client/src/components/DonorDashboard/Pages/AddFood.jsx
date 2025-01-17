import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DonorHeader from "../DonorHeader/DonorHeader";
import "./Addfood.css";

import Swal from "sweetalert2";
import { addFoodInfo } from "../../../service/api";

import { DonorBodyHeading } from "../DonorBodyHeading/DonorBodyHeading";
export const AddFood = () => {
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
    } else if (!foodInfo.fname) {
      alert("Please Give Food Item name");
    } else if (!foodInfo.fooddesc) {
      alert("Please Give Food quantity (for how many people)");
    } else if (!foodInfo.address) {
      alert("Please Give accurate address for pickup");
    } else if (!foodInfo.pin || foodInfo.pin.length !== 6) {
      alert("Please Give a Valid Area Pin code ");
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

  // fetch donor data
  const [donor, setDonor] = useState(null);
  const navigate = useNavigate();

  // fetch donor details
  useEffect(() => {
    const fetchDonor = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token Not found");
        navigate("/");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Donor data fetched: ", data); // Debugging
          setDonor(data);

          // Prefill pname and pmobile in the foodInfo state
          setFoodInfo((prevState) => ({
            ...prevState,
            pname: data.fullname,
            pmobile: data.mobile,
          }));
        } else {
          alert("Not Authorised");
          localStorage.removeItem("token");
          navigate("/");
        }
      } catch (error) {
        alert("Akdom last ar error");
        console.log(error);
        localStorage.removeItem("token");
        navigate("/");
      }
    };
    fetchDonor();
  }, [navigate]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 sh py-3">
            <DonorHeader />
          </div>
        </div>

        <div className="row bodybg pt-2 ">
          <DonorBodyHeading pagename={"Add Food Information"} />
          {/* add food form here  */}
          {donor ? (
            <>
              <div className="col-12 mb-2 ">
                <div className="card rounded">
                  <div className="card-header bg-dark text-white">
                    Please Add Your Food Information
                  </div>
                  <div className="card-body bg-transparent">
                    <form className="">
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

                        <div className="col-12 col-md-3">
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
                              placeholder="HeadCount"
                            ></input>
                          </div>
                        </div>
                        <div className="col-12 col-md-3">
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
                              min={new Date().toISOString().split("T")[0]} // Set minimum date to today
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
                        <div className="col-12 col-md-3">
                          <div className="form-group">
                            <label htmlFor="expiredays">
                              Expire with in (Days){" "}
                              <span className="req">*</span>
                            </label>
                            <select
                              className="form-control"
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
                        <div className="col-12 col-md-4">
                          <div className="form-group">
                            <label htmlFor="pname">Contact Person Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="pname"
                              defaultValue={donor?.fullname} // Use defaultValue
                              name="pname"
                              placeholder="Enter Contact Person Name"
                              onChange={onValueChange}
                              readOnly
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
                              defaultValue={donor?.mobile} // Use defaultValue
                              readOnly
                              name="pmobile"
                              placeholder="Enter Contact Number"
                              onChange={onValueChange}
                            />
                          </div>
                        </div>

                        <div className="col-12 col-md-4">
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
                      <div className="row w-100">
                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-primary float-right"
                            onClick={submitData}
                          >
                            ADD FOOD
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <p>Loding donor</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};
