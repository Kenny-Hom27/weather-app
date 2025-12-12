import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { WeatherDay, WeatherHour } from "../../types/types";

import styles from "./WeatherChart.module.css";
import { CHART_COLORS } from "../../constants/constants";
import { formatTo12Hour } from "../../utils/formatTo12Hour";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface Props {
  dayData: WeatherDay;
  timeRange: { start: number; end: number };
}

export const WeatherChart = ({ dayData, timeRange }: Props) => {
  if (!dayData?.hours) return null;

  const filtered = dayData.hours.filter((h: WeatherHour) => {
    const hour = Number(h.datetime.split(":")[0]);
    return hour >= timeRange.start && hour <= timeRange.end;
  });

  const labels = filtered.map((h: WeatherHour) => formatTo12Hour(h.datetime));
  const temps = filtered.map((h: WeatherHour) => h.temp);
  const winds = filtered.map((h: WeatherHour) => h.windspeed);
  const humidities = filtered.map((h: WeatherHour) => h.humidity);

  const makeDataset = (label: string, data: number[], color: string) => ({
    label,
    data,
    borderColor: color,
    backgroundColor: "transparent",
    pointBackgroundColor: color,
    pointBorderColor: color,
    pointRadius: 4,
    pointHoverRadius: 6,
    borderWidth: 2,
    tension: 0.3,
  });

  const dataConfig = {
    labels,
    datasets: [
      makeDataset("Temp", temps, CHART_COLORS.temp),
      makeDataset("Wind", winds, CHART_COLORS.wind),
      makeDataset("Humidity", humidities, CHART_COLORS.humidity),
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: { dataset: { label: string }; raw: number | string }) =>
            `${ctx.dataset.label}: ${ctx.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#666",
          font: { size: 11 },
          callback: (_value: number, index: number) => {
            return labels[index] ?? "";
          },
        },
      },
      y: {
        ticks: {
          color: "#666",
          font: { size: 11 },
        },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <Line
        data={dataConfig}
        options={options as object}
        className={styles.canvas}
      />
    </div>
  );
};
