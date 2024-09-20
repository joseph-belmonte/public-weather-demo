import { WeatherPeriod } from "@/types/types";

export const getWeatherSvg = (period: WeatherPeriod): string => {
  const { shortForecast, isDaytime } = period;

  const forecast = shortForecast.toLowerCase();

  if (isDaytime) {
    if (forecast.includes("sunny")) {
      return "/weather-svgs/clear-day.svg";
    } else if (forecast.includes("partly cloudy")) {
      return "/weather-svgs/partly-cloudy-day.svg";
    } else if (forecast.includes("cloudy")) {
      return "/weather-svgs/cloudy.svg";
    } else if (forecast.includes("rain") || forecast.includes("showers")) {
      return "/weather-svgs/rain.svg";
    } else if (
      forecast.includes("thunderstorms") ||
      forecast.includes("storm")
    ) {
      return "/weather-svgs/thunderstorms-rain.svg";
    } else if (forecast.includes("snow")) {
      return "/weather-svgs/snow.svg";
    } else if (forecast.includes("fog") || forecast.includes("haze")) {
      return "/weather-svgs/fog.svg";
    } else {
      return "/weather-svgs/not-available.svg";
    }
  } else {
    if (forecast.includes("clear")) {
      return "/weather-svgs/clear-night.svg";
    } else if (forecast.includes("partly cloudy")) {
      return "/weather-svgs/partly-cloudy-night.svg";
    } else if (forecast.includes("cloudy")) {
      return "/weather-svgs/cloudy.svg";
    } else if (forecast.includes("rain") || forecast.includes("showers")) {
      return "/weather-svgs/rain.svg";
    } else if (
      forecast.includes("thunderstorms") ||
      forecast.includes("storm")
    ) {
      return "/weather-svgs/thunderstorms-night-rain.svg";
    } else if (forecast.includes("snow")) {
      return "/weather-svgs/snow.svg";
    } else if (forecast.includes("fog") || forecast.includes("haze")) {
      return "/weather-svgs/fog-night.svg";
    } else {
      return "/weather-svgs/not-available.svg";
    }
  }
};
