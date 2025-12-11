import { useEffect, useState } from "react";
import { ForecastCarousel } from "./components/ForecastCarousel/ForecastCarousel";

import { loadWeatherData } from "./utils/loadWeatherData";
import type { TimeRangeKey, WeatherDay } from "./types/types";

import styles from "./App.module.css";
import ScheduleBar from "./components/ScheduleBar/ScheduleBar";
import Header from "./components/Header/Header";

export default function App() {
  const [location, setLocation] = useState<string>("New York, NY");
  const [weekday, setWeekday] = useState<string>("Friday");
  const [timeRange, setTimeRange] = useState<TimeRangeKey>("Afternoon");

  const [dates, setDates] = useState<Date[]>([]);
  const [weatherByDate, setWeatherByDate] = useState<
    Record<string, WeatherDay>
  >({});

  useEffect(() => {
    async function load() {
      const { dates, weatherMap } = await loadWeatherData(location, weekday, 5);

      setDates(dates);
      setWeatherByDate(weatherMap);
    }

    load();
  }, [location, weekday]);

  return (
    <div className={styles.appFrame}>
      <Header />
      <ScheduleBar
        location={location}
        weekday={weekday}
        timeRange={timeRange}
        setLocation={setLocation}
        setWeekday={setWeekday}
        setTimeRange={setTimeRange}
      />
      <ForecastCarousel
        dates={dates}
        weatherByDate={weatherByDate}
        timeRange={timeRange}
      />
    </div>
  );
}
