import { WeatherPeriod } from "@/types/types";
import { getWeatherSvg } from "./getWeatherSVG";

export const getForecastIcon = (period: WeatherPeriod): string => {
  return getWeatherSvg(period);
};
