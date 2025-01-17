import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
// import { barChartData } from "../../FakeData";

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const BarGraph = () => {
  const options = {
    legend: {
      display: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Week",
        },
      },
      //   y: {
      //     display: true,
      //     title: {
      //       display: true,
      //       text: "Value",
      //     },
      //   },
    },
  };

  const barChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [1, 3, 2, 5, 3, 4, 1],
        backgroundColor: "#A7D477",
        borderColor: "#A7D477",
        borderWidth: 0.1,
      },
    ],
  };
  return (
    <>
      <div
        // className="right-part"
        // style={{ width: "100px", position: "relative" }}
        className="px-5"
      >
        <Bar options={options} data={barChartData} className="px-5 wd" />
      </div>
    </>
  );
};
