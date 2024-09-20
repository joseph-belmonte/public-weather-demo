import { TemperatureUnit } from "@/types/types";

export const convertTemperature = (
  temperature: number,
  unit: TemperatureUnit
): number => {
  if (unit === "C") {
    return Math.round(((temperature - 32) * 5) / 9);
  }
  return temperature;
};
