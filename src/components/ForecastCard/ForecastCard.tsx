import { WeatherChart } from "../WeatherChart/WeatherChart";
import styles from "./ForecastCard.module.css";
import type { WeatherDay } from "../../types/types";
import { interpretWeather } from "../../utils/interpretWeather";

interface Props {
  label: string;
  dayData?: WeatherDay;
  timeRange: { start: number; end: number };
}

export function ForecastCard({ label, dayData, timeRange }: Props) {
  const { icon, message, result } = interpretWeather(dayData);

  if (!dayData) {
    return <div className={styles.card}>Loading...</div>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.title}>{label}</h2>

        <div className={styles.summary}>
          <div className={styles.icon}>{icon}</div>
          <div>
            <div className={styles.temp}>
              {result} {Math.round(dayData.temp)}°F
            </div>
            <div className={styles.line}>Humidity: {dayData.humidity}%</div>
            <div className={styles.line}>Wind: {dayData.windspeed} mph</div>
          </div>
        </div>

        {dayData.hours ? (
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <span className={`${styles.swatch} ${styles.tempSwatch}`} /> Temp
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.swatch} ${styles.windSwatch}`} /> Wind
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.swatch} ${styles.humiditySwatch}`} />{" "}
              Humidity
            </div>
          </div>
        ) : (
          <div className={styles.noHours}>
            <span className={styles.noHoursIcon}>⚠️</span>
            <p className={styles.noHoursText}>
              Hourly data unavailable for this day
            </p>
          </div>
        )}

        {dayData.hours && (
          <div className={styles.chart}>
            <WeatherChart dayData={dayData} timeRange={timeRange} />
          </div>
        )}
      </div>

      <div className={styles.note}>{message}</div>
    </div>
  );
}
