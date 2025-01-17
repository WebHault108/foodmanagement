import { Doughnut } from "react-chartjs-2";
import { Chart as chartjs, ArcElement, Tooltip, Legend } from "chart.js";
chartjs.register(ArcElement, Tooltip, Legend);

export const Dounut = () => {
  const data = {
    labels: ["pending food"],
    datasets: [
      {
        label: "Pending food",
        data: [100],
        backgroundColor: ["#A7D477"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: 40, // Adjust the cutout percentage here
    radius: 40,
    plugins: {
      legend: {
        position: "none",
      },
      maintainAspectRatio: false,
    },
  };
  return (
    <>
      <div
        className="right-part-d"
        style={{ width: "100px", position: "relative" }}
      >
        <Doughnut data={data} options={options} />
        <div className="center-text-d">100%</div>
      </div>
    </>
  );
};
