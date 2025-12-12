import { WeatherProvider } from "./contexts/WeatherProvider";
import { Header } from "./components/Header/Header";
import { ScheduleBar } from "./components/ScheduleBar/ScheduleBar";
import { ForecastCarousel } from "./components/ForecastCarousel/ForecastCarousel";
import styles from "./App.module.css";

export const App = () => {
  return (
    <WeatherProvider>
      <div className={styles.appFrame}>
        <Header />
        <ScheduleBar />
        <ForecastCarousel />
      </div>
    </WeatherProvider>
  );
};
