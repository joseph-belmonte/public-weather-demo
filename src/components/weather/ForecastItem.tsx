/* eslint-disable @next/next/no-img-element */
import React from "react";

import { WeatherPeriod } from "@/types/types";
import { getDayLabel, getForecastIcon } from "@/helpers/helpers";

interface ForecastItemProps {
  day: WeatherPeriod;
  highTemp: number;
  lowTemp: number | string;
}

const ForecastItem = ({ day, highTemp, lowTemp }: ForecastItemProps) => {
  const icon = getForecastIcon(day);
  const label = getDayLabel(day.startTime);

  return (
    <div className="flex flex-col items-center p-4 text-center border-2 border-green-400 max-h-full">
      <div className="text-xl font-bold">{label}</div>
      <img src={icon} alt={day.shortForecast} className="w-12 h-12 my-2" />
      <div className="text-lg">
        <span className="font-semibold">{highTemp}°</span>
        {lowTemp !== "N/A" && <span className="text-sm ml-2">/{lowTemp}°</span>}
      </div>
      <div className="text-sm">{day.shortForecast}</div>
    </div>
  );
};

export default ForecastItem;
