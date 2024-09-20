import React from "react";
import WeatherIcon from "./WeatherIcon";
import { getWeatherSvg } from "@/helpers/getWeatherSVG";

import { WeatherAPIResponse } from "@/types/types";
import SourceLink from "@/components/sourcelink.component";

interface HeadlineProps {
  weatherData: WeatherAPIResponse | null;
}

export default function Headline({ weatherData }: HeadlineProps) {
  console.log("weatherData", weatherData);
  if (!weatherData || !weatherData.periods) {
    return (
      <div className="text-center text-red-500">
        Error fetching weather data.
      </div>
    );
  } else {
    const currentPeriod = weatherData.periods[0];
    const condition = getWeatherSvg(currentPeriod);

    return (
      <div id="today-headline" className="component-container max-w-xl">
        <h3 className="h3-heading">
          {currentPeriod.isDaytime ? "Today" : "Tonight"}
        </h3>

        <div className="degree-section text-5xl md:text-6xl font-bold flex justify-center items-center mb-4">
          <WeatherIcon condition={condition} />
          <span className="ml-2">{currentPeriod.temperature}°</span>
        </div>

        <div className="descriptions text-base md:text-lg mb-4">
          <div className="short-description mb-2">
            <strong>{currentPeriod.shortForecast}</strong>
          </div>
          <div id="detailed-forecast">{currentPeriod.detailedForecast}</div>
        </div>

        <SourceLink url="https://www.weather.gov/" />
      </div>
    );
  }
}
