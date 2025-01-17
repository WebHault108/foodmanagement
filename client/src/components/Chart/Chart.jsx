import React, { useEffect, useState, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as chartjs, ArcElement, Tooltip, Legend } from "chart.js";
import SmallBox from "./SmallBox";
import "./Chart.css";
chartjs.register(ArcElement, Tooltip, Legend);

const Chart = () => {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="charts">
        <div className="chart-container">
          <div className="left-part">
            <div className="chart-heading">
              <h1 className="headline">
                How We Spend your <br />
                donations and where it goes
              </h1>
              <p className="chart-subtitle">
                we understand that when you make a donation, you want to know
                exactly where your <br /> donation is going and we pledge to be
                transparent.
              </p>
            </div>

            <div className="legends">
              {legendsValue.map((val) => (
                <SmallBox
                  key={val.id}
                  value={val.value}
                  name={val.name}
                  color={val.color}
                />
              ))}
            </div>
          </div>
          <div
            className="right-part"
            style={{ width: "300px", position: "relative" }}
          >
            <Doughnut data={data} options={options} ref={chartRef} />
            <div className="center-text">Annapurna</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;
