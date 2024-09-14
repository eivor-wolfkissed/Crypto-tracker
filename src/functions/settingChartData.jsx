import { convertDate } from "./convertDate";

export const settingChartData = (setChartData, prices1, prices2) => {
  const labels = prices1.map((price) => convertDate(price[0]));

  const datasets = [
    {
      label: "Crypto 1",
      data: prices1.map((price) => price[1]),
      borderWidth: 2,
      fill: false,
      backgroundColor: "#61c96f",
      tension: 0.25,
      borderColor: "#3a80e9",
      pointRadius: 0,
      yAxisID: "crypto1", // ID for the left Y-axis
    },
    // Only add Crypto 2 if prices2 exists
    prices2 ? {
      label: "Crypto 2",
      data: prices2.map((price) => price[1]),
      borderWidth: 2,
      fill: false,
      backgroundColor: "#3a80e9",
      tension: 0.25,
      borderColor: "#61c96f",
      pointRadius: 0,
      yAxisID: "crypto2", // ID for the right Y-axis
    } : null,
  ].filter(Boolean); // Filter out any null values

  // Set the chart data
  setChartData({ labels, datasets });
};

export default settingChartData;
