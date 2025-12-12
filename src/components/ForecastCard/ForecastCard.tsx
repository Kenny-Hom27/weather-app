import { WeatherChart } from "../WeatherChart/WeatherChart";
import styles from "./ForecastCard.module.css";
import type { WeatherDay } from "../../types/types";
import { interpretWeather } from "../../utils/interpretWeather";

interface Props {
  label: string;
  dayData?: WeatherDay;
  timeRange: { start: number; end: number };
}

const LegendItem = ({
  label,
  swatchClass,
}: {
  label: string;
  swatchClass: string;
}) => {
  return (
    <div className={styles.legendItem}>
      <span className={`${styles.swatch} ${swatchClass}`} />
      {label}
    </div>
  );
};

const NoHoursMessage = () => {
  return (
    <div className={styles.noHours}>
      <span className={styles.noHoursIcon}>⚠️</span>
      <p className={styles.noHoursText}>Hourly data unavailable for this day</p>
    </div>
  );
};

export const ForecastCard = ({ label, dayData, timeRange }: Props) => {
  const { icon, message, result } = interpretWeather(dayData);

  if (!dayData) {
    return <div className={styles.card}>Loading...</div>;
  }

  const roundedTemp = Math.round(dayData.temp);

  return (
    <div className={styles.card}>
      {/* HEADER AREA */}
      <div className={styles.cardHeader}>
        <h2 className={styles.title}>{label}</h2>

        <div className={styles.summary}>
          <div className={styles.icon}>{icon}</div>

          <div>
            <div className={styles.temp}>
              {result} {roundedTemp}°F
            </div>

            <div className={styles.line}>Humidity: {dayData.humidity}%</div>
            <div className={styles.line}>Wind: {dayData.windspeed} mph</div>
          </div>
        </div>

        {/* LEGEND OR NO-HOURLY MESSAGE */}
        {dayData.hours ? (
          <div className={styles.legend}>
            <LegendItem label="Temp" swatchClass={styles.tempSwatch} />
            <LegendItem label="Wind" swatchClass={styles.windSwatch} />
            <LegendItem label="Humidity" swatchClass={styles.humiditySwatch} />
          </div>
        ) : (
          <NoHoursMessage />
        )}

        {/* HOURLY CHART */}
        {dayData.hours && (
          <div className={styles.chart}>
            <WeatherChart dayData={dayData} timeRange={timeRange} />
          </div>
        )}
      </div>

      {/* FOOTER MESSAGE */}
      <div className={styles.note}>{message}</div>
    </div>
  );
};
