import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // Keep this import

function LineChart({ chartData }) {
  const options = {
    plugins: {
      legend: {
        display: true, // Always show the legend
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      crypto1: {
        type: "linear",
        position: "left", // Position for Crypto 1
        title: {
          display: true,
          text: 'Crypto 1 Prices', // Title for the left Y-axis
        },
      },
      crypto2: {
        type: "linear",
        position: "right", // Position for Crypto 2
        title: {
          display: true,
          text: 'Crypto 2 Prices', // Title for the right Y-axis
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;
