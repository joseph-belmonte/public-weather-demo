import React from "react";
import ForecastItem from "./ForecastItem";
import { WeatherAPIResponse } from "@/types/types";

interface FiveDayForecastProps {
  weatherData: WeatherAPIResponse | null;
}

const FiveDayForecast = ({ weatherData }: FiveDayForecastProps) => {

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  // if the weather data is undefined, return an error message
  if (!weatherData.periods) {
    return <div>Error fetching weather data.</div>;
  }

  const forecastData = weatherData.periods;
  const fiveDayData = forecastData
    .filter((period) => period.isDaytime)
    .slice(0, 5);

  const fiveNightData = forecastData
    .filter((period) => !period.isDaytime)
    .slice(0, 5);

  return (
    <div>
      <h3 className="h3-heading">Five Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
        {fiveDayData.map((day, index) => {
          const nightPeriod = fiveNightData.find(
            (period) =>
              new Date(period.startTime).getDate() ===
              new Date(day.startTime).getDate()
          );

          const highTemp = day.temperature;
          const lowTemp = nightPeriod ? nightPeriod.temperature : "N/A";

          return (
            <div key={index} className="p-4 rounded">
              <ForecastItem day={day} highTemp={highTemp} lowTemp={lowTemp} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FiveDayForecast;
