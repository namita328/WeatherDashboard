import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  LineElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  CategoryScale
);

const TemperatureChart = ({ forecast }) => {
  if (!forecast || !forecast.list || forecast.list.length === 0) {
    console.log("No forecast or forecast.list is undefined or empty");
    return null; // Or return a loading indicator or message
  }

  const chartData = {
    labels: forecast.list.map((day) => new Date(day.dt_txt)),
    datasets: [
      {
        label: "Temperature (°C)",
        data: forecast.list.map((day) => day.main.temp),
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day", // Display data per day
          displayFormats: {
            day: "MMM d", // Format for day scale
          },
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 7,
        },
      },
      y: {
        type: "linear",
        min: 0,
        max: 40,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default TemperatureChart;
