"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  AqiAPIResponse,
  UviAPIResponse,
  WeatherAPIResponse,
} from "@/types/types";

import AQI from "@/components/aqi.component";

import Header from "@/components/header.component";
import UVI from "@/components/uvi.component";

import { isCacheExpired, loadFromCache, saveToCache } from "@/utils/cache";
import FiveDayForecast from "@/components/weather/FiveDayForecast";
import Headline from "@/components/weather/Headline";

const LAST_LOCATION_KEY = "last_location";
const AQI_CACHE_KEY_PREFIX = "aqi_";
const COORDINATES_CACHE_KEY_PREFIX = "coordinates_";
const TIMEZONE_CACHE_KEY_PREFIX = "timezone_";

export default function HomePage() {
  // Define all of the "state" variables that we need:
  // 1. location
  // 2. coordinates
  // 3. isLoading
  // 4. weatherData
  // 5. uviData ✅
  // 6. aqiData ✅

  const [location, setLocation] = useState<string>(() => {
    // Initialize the location state from local storage or use a default value
    if (typeof window !== "undefined") {
      return localStorage.getItem(LAST_LOCATION_KEY) || "New York, NY";
    }
    return "New York, NY";
  });
  const [coordinates, setCoordinates] = useState<number[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [weatherData, setWeatherData] = useState<WeatherAPIResponse | null>(
    null
  );
  const [uviData, setUviData] = useState<UviAPIResponse | null>(null);
  const [aqiData, setAqiData] = useState<AqiAPIResponse[] | null>(null);

  /// START REGION: COORDINATES
  const getCoordinatesFromLocation = async (location: string) => {
    setIsLoading(true);

    const cacheKey = `${COORDINATES_CACHE_KEY_PREFIX}${location.replace(
      /\s+/g,
      "_"
    )}`;
    const cachedData = loadFromCache(cacheKey);

    // Check if coordinates are cached
    if (cachedData) {
      setCoordinates(cachedData);
      setIsLoading(false);
      return;
    }

    try {
      // Fetch coordinates from the server-side API
      const response = await axios.get("/api/geocode", {
        params: { location },
      });

      if (response.status !== 200 || !response.data) {
        throw new Error("Failed to fetch coordinates.");
      }

      const { longitude, latitude } = response.data;
      setCoordinates([longitude, latitude]);
      saveToCache(cacheKey, [longitude, latitude]);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LAST_LOCATION_KEY, location);
    }
    if (location) {
      getCoordinatesFromLocation(location);
    }
  }, [location]);

  /// END REGION: COORDINATES

  /// START REGION: WEATHER DATA
  const fetchWeatherData = async (location: string) => {
    console.log("Fetching weather data for:", location);

    const cacheKey = `weather_${location.replace(/\s+/g, "_")}`;
    const cachedData = loadFromCache(cacheKey);

    // Check if we should use the cached data
    if (cachedData && !cachedData.error && !isCacheExpired(cacheKey)) {
      setWeatherData(cachedData.data);

      return;
    }

    try {
      const response = await axios.get("/api/weather", {
        params: { location },
      });

      if (response.status !== 200 || !response.data) {
        throw new Error("Failed to fetch weather data.");
      }

      const { weatherData: data } = response.data;

      setWeatherData(data);
      saveToCache(cacheKey, { data });
    } catch (error) {
      console.error("Failed to fetch weather data:", error);

      saveToCache(cacheKey, { error: true });
    }
  };
  useEffect(() => {
    if (location) {
      fetchWeatherData(location);
    }
  }, [location]);
  /// END REGION: WEATHER DATA

  /// START REGION: UVI DATA
  const fetchUviData = async (location: string) => {
    setIsLoading(true);

    const cacheKey = `uv_${location.replace(/\s+/g, "_")}`;

    const cachedData = loadFromCache(cacheKey);
    if (cachedData) {
      setUviData(cachedData);
      return;
    }

    try {
      let params = {};

      if (/^\d{5}$/.test(location)) {
        params = { zipCode: location };
      } else {
        const [city, state] = location.split(",").map((part) => part.trim());
        params = { city, state };
      }

      const response = await axios.get("/api/uvi", { params });

      if (response.status !== 200) {
        throw new Error("Failed to fetch UV Index data.");
      }

      const data = response.data[0];
      setUviData(data);

      saveToCache(cacheKey, data);
    } catch (error) {
      console.error("Failed to fetch UV Index data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (location) {
      fetchUviData(location);
    }
  }, [location]);
  /// END REGION: UVI DATA
  /// START REGION: AQI DATA
  const fetchAQIData = async (coordinates: number[]) => {
    // Destructure coordinates safely
    const [longitude, latitude] = coordinates || [];
    // Check if coordinates are available
    if (latitude === undefined || longitude === undefined) {
      return;
    }

    // Construct the cache key based on latitude and longitude
    const cacheKey = `${AQI_CACHE_KEY_PREFIX}${latitude}_${longitude}`;
    const cachedData = loadFromCache(cacheKey);

    // If cached data is found, set the data and stop loading
    if (cachedData) {
      setAqiData(cachedData);

      return;
    }

    try {
      // Fetch AQI data from the server-side API
      const response = await axios.get("/api/aqi", {
        params: { latitude, longitude },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch AQI data.");
      }
      console.log("response.data", response.data);

      // Save the fetched data to state and cache
      setAqiData(response.data);
      saveToCache(cacheKey, response.data);
    } catch (error) {
      console.error("Failed to fetch AQI data:", error);
    } finally {
    }
  };
  useEffect(() => {
    // Fetch AQI data if coordinates are defined
    if (coordinates) {
      fetchAQIData(coordinates);
    } else {
      // If coordinates are not defined, reset the data and error state
      setAqiData(null);
    }
  }, [coordinates]);
  /// END REGION: AQI DATA

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LAST_LOCATION_KEY, location);
    }
  }, [location]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-4 md:p-8 bg-black text-green-400 font-mono">
      <Header
        location={location}
        setLocation={setLocation}
        coordinates={coordinates}
        isLoading={isLoading}
      />

      <div id="today-summary" className="w-full flex justify-center mb-6">
        <Headline weatherData={weatherData} />
      </div>

      <div
        id="uvi-aqi-container"
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
      >
        <div id="uvi" className="component-container">
          <UVI uviData={uviData} />
        </div>
        <div id="aqi" className="component-container">
          <AQI aqiData={aqiData} />
        </div>
      </div>

      <div className="component-container w-full">
        <FiveDayForecast weatherData={weatherData} />
      </div>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </main>
  );
}
