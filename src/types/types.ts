export type lat = number;
export type lng = number;
export type TemperatureUnit = "F" | "C";

export type WeatherPeriod = {
  detailedForecast: string;
  dewpoint: { unitCode: string; value: number };
  endTime: Date;
  icon: string;
  isDaytime: boolean;
  name: string;
  number: number;
  probabilityOfPrecipitation: { unitCode: string; value: number };
  relativeHumidity: { unitCode: string; value: number };
  shortForecast: string;
  startTime: Date;
  temperature: number;
  temperatureTrend: null;
  temperatureUnit: string;
  windDirection: string;
  windSpeed: string;
};

export interface WeatherAPIResponse {
  units: string;
  forecastGenerator: string;
  generatedAt: string;
  updateTime: string;
  validTimes: string;
  elevation: {
    unitCode: string;
    value: number;
  };
  periods: WeatherPeriod[];
}

export interface UviAPIResponse {
  CITY: string;
  STATE: string;
  UV_INDEX: string;
  UV_ALERT: string;
  DATE: string;
}

export interface AqiAPIResponse {
  DateObserved: string;
  HourObserved: number;
  LocalTimeZone: string;
  ReportingArea: string;
  StateCode: string;
  Latitude: number;
  Longitude: number;
  ParameterName: string;
  AQI: number;
  Category: {
    Number: number;
    Name: string;
  };
}
