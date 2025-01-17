import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
// import { LineChartData } from "../../FakeData";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const LineGraph = () => {
  const options = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  const LineChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        fill: true,
        label: "Donations per Month",
        data: [4, 2, 6, 8, 3, 0, 5, 3, 3, 4, 6],
        borderColor: "#FCC737",
        backgroundColor: "rgba(252, 199, 55, .8)", // Ensure transparency
        tension: 0.4, // Optional for a smoother curve
      },
    ],
  };
  return (
    <>
      <Line options={options} data={LineChartData} />
    </>
  );
};
