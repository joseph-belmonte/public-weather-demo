/* eslint-disable @next/next/no-img-element */
import React from "react";

interface WeatherIconProps {
  condition: string;
}

const WeatherIcon = ({ condition: filePath }: WeatherIconProps) => {
  const iconSrc = `${filePath}`;

  return (
    <div id="weather-icon">
      <img src={iconSrc} alt={`${filePath} weather`} className="w-16 h-16 " />
    </div>
  );
};

export default WeatherIcon;
