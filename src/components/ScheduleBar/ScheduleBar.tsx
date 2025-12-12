import type { TimeRangeKey } from "../../types/types";
import { DAYS } from "../../constants/constants";
import { LocationAutocomplete } from "../LocationAutocomplete/LocationAutocomplete";
import { useWeather } from "../../contexts/useWeatherContext";
import styles from "./ScheduleBar.module.css";

export const ScheduleBar = () => {
  const {
    location,
    weekday,
    timeRange,
    setLocation,
    setWeekday,
    setTimeRange,
  } = useWeather();

  return (
    <div className={styles.scheduleBar}>
      <LocationAutocomplete value={location} onSelect={setLocation} />

      <div className={styles.timeSelector}>
        🕒
        <select value={weekday} onChange={(e) => setWeekday(e.target.value)}>
          {DAYS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as TimeRangeKey)}
        >
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
        </select>
      </div>
    </div>
  );
};
