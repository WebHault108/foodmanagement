import React, { useState, useEffect, useRef } from "react";
import { AdminSidePanel } from "./AdminSidePanel";
import { AdminNavbar } from "./AdminNavbar";
import { Doughnut } from "react-chartjs-2";
import { Chart as chartjs, ArcElement, Tooltip, Legend } from "chart.js";
import ChartBox from "./ChartBox";
import { AdminFooter } from "./AdminFooter";

chartjs.register(ArcElement, Tooltip, Legend);

const AdminCharts = () => {
  const chartRef = useRef(null);
  const [legendsValue, setLegendsValue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/data`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (data && data.legends) {
          setLegendsValue(data.legends); // Access the legends array
        } else {
          console.error("Invalid data structure from API");
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: legendsValue.map((legend) => legend.name),
    datasets: [
      {
        label: "/NGO Programs",
        data: legendsValue.map((legend) => legend.value),
        backgroundColor: legendsValue.map((legend) => legend.color),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "none",
      },
      maintainAspectRatio: false,
    },
  };

  //   const updateCharts = async (e) => {
  //     e.preventDefault();
  //     const datastring = document.getElementById("datas").value;
  //     const newDataArray = datastring.split(",").map(Number);

  //     // Send data to backend
  //     try {
  //       const response = await fetch("http://localhost:8000/api/data", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ data: newDataArray }),
  //       });

  //       console.log(response);

  //       if (!response.ok) {
  //         throw new Error("Failed to update data");
  //       }

  //       const updatedData = await response.json();
  //       console.log(updatedData.ngoData.legends.length);

  //       setLegendsValue(updatedData.ngoData.legends); // Update legends state
  //       if (chartRef.current) {
  //         chartRef.current.update(); // Trigger chart update
  //       }
  //     } catch (err) {
  //       console.error("Error updating data:", err);
  //     }
  //   };
  const updateCharts = async (e) => {
    e.preventDefault();

    const datastring = document.getElementById("datas").value;

    // Validate input
    if (!datastring || (datastring.match(/,/g) || []).length !== 4) {
      console.error(
        "Invalid input: Input must be non-empty and contain exactly 4 commas."
      );
      return;
    }

    const newDataArray = datastring.split(",").map(Number);

    // Send data to backend
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/data`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: newDataArray }),
        }
      );

      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      const updatedData = await response.json();
      console.log(updatedData.ngoData.legends.length);

      setLegendsValue(updatedData.ngoData.legends); // Update legends state
      if (chartRef.current) {
        chartRef.current.update(); // Trigger chart update
      }
    } catch (err) {
      console.error("Error updating data:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container-fluid " style={{ backgroundColor: "#f5efef" }}>
        <div className="row admin-bg">
          <div className="col-12 col-md-2 p-0">
            <AdminSidePanel />
          </div>
          <div
            className="col-12 col-md-10 p-0"
            style={{ backgroundColor: "#f5efef" }}
          >
            <AdminNavbar />
            <div className="all-donors-list">
              <div className="col-12 mb-5">
                <div className="card mt-2 rounded mb-5">
                  <div className="card-header">Spend Analysis</div>
                  <div className="card-body bg-dark">
                    <div className="left-part float-left text-left">
                      <div className="legends ml-3">
                        {legendsValue.map((val) => (
                          <ChartBox
                            key={val.id}
                            value={val.value}
                            name={val.name}
                            color={val.color}
                          />
                        ))}
                      </div>

                      <div className="text-left ml-5 w-100 mt-4">
                        <h2
                          className="text-light font-weight-bold text-left mt-2 text-uppercase"
                          style={{ fontSize: "1.3rem" }}
                        >
                          Update Chart
                        </h2>

                        <form action="" className="text-left w-100 pl-0">
                          <div className="col-12">
                            <div class="form-group">
                              <label for="datas text-white">Give Data</label>
                              <input
                                type="text"
                                class="form-control"
                                id="datas"
                                placeholder="Enter data to update"
                                // value={datas}
                              />
                            </div>

                            <button
                              className="btn btn-primary px-3"
                              onClick={updateCharts}
                            >
                              Update
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div
                      className="right-part float-right"
                      style={{ width: "300px", position: "relative" }}
                    >
                      <Doughnut data={data} options={options} ref={chartRef} />
                      <div className="center-text">Annapurna</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AdminFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCharts;
