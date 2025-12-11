import Slider from "react-slick";
import { useRef } from "react";
import { ForecastCard } from "../ForecastCard/ForecastCard";
import type { WeatherDay } from "../../types/types";
import { TIME_RANGES } from "../../constants/constants";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./ForecastCarousel.module.css";

interface Props {
  dates: Date[];
  weatherByDate: Record<string, WeatherDay>;
  timeRange: string;
}

const ArrowLeft = ({ onClick }: { onClick: () => void }) => (
  <button
    className={`${styles.customArrow} ${styles.leftArrow}`}
    onClick={onClick}
  >
    ‹
  </button>
);

const ArrowRight = ({ onClick }: { onClick: () => void }) => (
  <button
    className={`${styles.customArrow} ${styles.rightArrow}`}
    onClick={onClick}
  >
    ›
  </button>
);

export function ForecastCarousel({ dates, weatherByDate, timeRange }: Props) {
  const sliderRef = useRef<Slider | null>(null);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 780, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className={styles.carouselWrapper}>
      <ArrowLeft onClick={() => sliderRef.current?.slickPrev()} />
      <ArrowRight onClick={() => sliderRef.current?.slickNext()} />

      <Slider ref={sliderRef} {...sliderSettings}>
        {dates.map((date, idx) => {
          const iso = date.toISOString().split("T")[0];
          const weather = weatherByDate[iso];

          const label = date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          });

          return (
            <div key={idx}>
              <ForecastCard
                label={label}
                dayData={weather}
                timeRange={TIME_RANGES[timeRange as keyof typeof TIME_RANGES]}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
