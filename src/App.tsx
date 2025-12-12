import { ForecastCarousel } from "./components/ForecastCarousel/ForecastCarousel";
import { WeatherProvider } from "./contexts/WeatherProvider";

import styles from "./App.module.css";
import ScheduleBar from "./components/ScheduleBar/ScheduleBar";
import Header from "./components/Header/Header";

export default function App() {
  return (
    <WeatherProvider>
      <div className={styles.appFrame}>
        <Header />
        <ScheduleBar />
        <ForecastCarousel />
      </div>
    </WeatherProvider>
  );
}
